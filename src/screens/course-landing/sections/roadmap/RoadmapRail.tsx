"use client";

import { useId, useRef, type ReactNode } from "react";
import { ArrowButton } from "../../ui/ArrowButton";
import { boxStyle, u } from "../../ui/canvas";

type Props = {
  /** окно прокрутки, px макета от верха секции */
  viewport: { x: number; y: number; w: number; h: number };
  /** ширина ленты с карточками, px макета */
  width: number;
  /** поле слева и справа в окне, px макета: с ним первая карточка встаёт слева, последняя — справа */
  inset: number;
  /** сдвиги ленты, в которых она останавливается: по одному на карточку, px макета, по возрастанию */
  stops: number[];
  /** название ряда для скринридера */
  label: string;
  /** цвет стрелки и рамки фокуса */
  color: string;
  /** левый верхний угол стрелки «›» */
  arrow: { x: number; y: number };
  children: ReactNode;
};

/**
 * Лента карточек с горизонтальной прокруткой: листается пальцем, колесом, с клавиатуры и стрелкой «›».
 * Останавливается только на карточках (scroll-snap) — на полпути свайп её не бросает.
 * Стрелка одна и видна всегда: нажатие показывает следующую карточку, а с конца ленты возвращает
 * в начало. Положение берётся из самой прокрутки, поэтому стрелка и свайп не расходятся.
 */
export function RoadmapRail({
  viewport,
  width,
  inset,
  stops,
  label,
  color,
  arrow,
  children,
}: Props) {
  const railId = useId();
  const railRef = useRef<HTMLDivElement>(null);
  /** куда лента едет сейчас: пока идёт плавная прокрутка, её положение ещё «в пути» */
  const pending = useRef<{ index: number; until: number } | null>(null);

  const showNext = () => {
    const rail = railRef.current;
    if (!rail || stops.length === 0) return;
    // px экрана в одном px макета; ширина окна бывает дробной, поэтому берём рамку, а не clientWidth
    const unit = rail.getBoundingClientRect().width / viewport.w;
    const now = performance.now();
    let current: number;
    if (pending.current && now < pending.current.until) {
      current = pending.current.index;
    } else {
      // ближайшая остановка: после свайпа лента стоит на одной из них
      const position = rail.scrollLeft / unit;
      current = stops.reduce(
        (nearest, stop, index) =>
          Math.abs(stop - position) < Math.abs(stops[nearest] - position) ? index : nearest,
        0,
      );
    }
    const next = (current + 1) % stops.length;
    pending.current = { index: next, until: now + 600 };
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: stops[next] * unit, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <>
      {/*
        tabIndex: прокручиваемую область должно быть можно листать с клавиатуры.
        isolate: карточки со своим z-index остаются внутри ленты и не ложатся поверх её соседей.
      */}
      <div
        ref={railRef}
        id={railId}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="scrollbar-hide isolate snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none focus-visible:outline-solid"
        style={{
          ...boxStyle(viewport),
          // поля окна для остановок: первая карточка встаёт не вплотную к краю, средние — по центру
          scrollPadding: `0 ${u(inset)}`,
          outlineColor: color,
          outlineWidth: u(2),
          outlineOffset: u(-4),
        }}
      >
        {/*
          overflow-clip, а не hidden: картинки шире своих листов и не должны удлинять ленту, но hidden
          сделал бы эту обёртку областью прокрутки — и карточки перестали бы быть остановками окна.
        */}
        <div className="relative h-full overflow-clip" style={{ width: u(width) }}>
          {children}
        </div>
      </div>
      <ArrowButton
        direction="next"
        {...arrow}
        color={color}
        data-roadmap-next
        aria-label="Следующие темы курса"
        aria-controls={railId}
        onClick={showNext}
      />
    </>
  );
}
