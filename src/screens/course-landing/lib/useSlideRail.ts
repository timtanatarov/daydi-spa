"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Пауза между автоматическими перелистываниями. */
const AUTOPLAY_MS = 5000;

type Options = {
  /** сколько слайдов в ленте */
  count: number;
  /**
   * Сдвиги ленты, на которых она останавливается, в долях ширины её окна — по одному на слайд.
   * Не заданы — слайды одинаковые, во всю ширину окна. Массив должен быть константой модуля.
   */
  stops?: readonly number[];
};

/** Сдвиг ленты для слайда, px экрана: ширина окна бывает дробной, поэтому берём рамку, а не clientWidth. */
const offsetOf = (rail: HTMLElement, index: number, stops?: readonly number[]) =>
  (stops ? stops[index] : index) * rail.getBoundingClientRect().width;

/** Слайд, на котором лента стоит или к которому она ближе всего. */
function nearest(rail: HTMLElement, count: number, stops?: readonly number[]) {
  let best = 0;
  for (let index = 1; index < count; index++) {
    const closer =
      Math.abs(offsetOf(rail, index, stops) - rail.scrollLeft) <
      Math.abs(offsetOf(rail, best, stops) - rail.scrollLeft);
    if (closer) best = index;
  }
  return best;
}

/**
 * Лента слайдов на scroll-snap: какой слайд показан, переход к слайду и автолистание.
 * Пальцем лента листается сама — это прокрутка браузера, поэтому слайд следует за пальцем,
 * а положение берётся из прокрутки: точки, автолистание и свайп не расходятся.
 *
 * Автолистание идёт по кругу и только пока ленту видно и её не трогают. Пауза: палец на ленте,
 * курсор над ней, фокус с клавиатуры внутри, скрытая вкладка, системная настройка
 * «уменьшить движение». Любая прокрутка отсчитывает паузу заново.
 *
 * railRef — сама лента (прокручиваемый элемент). rootRef — область, касание которой ставит
 * автолистание на паузу (лента вместе с точками); если не назначен, это сама лента.
 */
export function useSlideRail<
  Rail extends HTMLElement = HTMLDivElement,
  Root extends HTMLElement = HTMLDivElement,
>({ count, stops }: Options) {
  const railRef = useRef<Rail>(null);
  const rootRef = useRef<Root>(null);
  const [active, setActive] = useState(0);
  /** куда лента едет сейчас: пока идёт плавная прокрутка, её положение ещё «в пути» */
  const pending = useRef<{ index: number; until: number } | null>(null);

  const show = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;
      pending.current = { index, until: performance.now() + 600 };
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.scrollTo({ left: offsetOf(rail, index, stops), behavior: calm ? "auto" : "smooth" });
    },
    [stops],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || count < 2) return;
    const root: HTMLElement = rootRef.current ?? rail;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let held = false;
    let timer = 0;

    const current = () =>
      pending.current && performance.now() < pending.current.until
        ? pending.current.index
        : nearest(rail, count, stops);

    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const schedule = () => {
      stop();
      if (!inView || held || calm.matches || document.hidden) return;
      timer = window.setTimeout(() => {
        show((current() + 1) % count);
        schedule();
      }, AUTOPLAY_MS);
    };
    const hold = () => {
      held = true;
      stop();
    };
    const release = () => {
      held = false;
      schedule();
    };

    const onScroll = () => {
      setActive(nearest(rail, count, stops));
      // лента движется — пальцем, колесом или сама: следующий автоматический шаг отсчитываем заново
      if (!held) schedule();
    };
    // курсор: pointerenter приходит и от пальца, но палец надёжнее ловить touch-событиями —
    // когда прокрутку забирает браузер, pointer-события обрываются раньше, чем палец отпущен
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hold();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") release();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(":focus-visible")) hold();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        schedule();
      },
      { threshold: 0.6 },
    );

    observer.observe(rail);
    rail.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("touchstart", hold, { passive: true });
    root.addEventListener("touchend", release, { passive: true });
    root.addEventListener("touchcancel", release, { passive: true });
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", release);
    document.addEventListener("visibilitychange", schedule);
    calm.addEventListener("change", schedule);
    return () => {
      stop();
      observer.disconnect();
      rail.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("touchstart", hold);
      root.removeEventListener("touchend", release);
      root.removeEventListener("touchcancel", release);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", release);
      document.removeEventListener("visibilitychange", schedule);
      calm.removeEventListener("change", schedule);
    };
  }, [count, stops, show]);

  return { railRef, rootRef, active, show };
}
