"use client";

import { useEffect } from "react";

type Props = {
  /** цвет первого блока: с ним страница приходит с сервера */
  initial: string;
};

/**
 * Цвет краёв экрана на телефоне. Safari на iPhone заливает зону под строкой состояния цветом
 * фона страницы (а до iOS 26 — цветом из <meta name="theme-color">, как и Chrome на Android).
 * Обычный фон страницы — бежевый, и над фотографией первого экрана получалась бежевая «шапка».
 * Здесь фон страницы и theme-color повторяют цвет блока, который сейчас под верхним краем экрана
 * (data-tint у блока): над фотографией верх тёмный, над бумагой — светлый.
 */
export function TopTint({ initial }: Props) {
  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-block][data-tint]")];
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.append(meta);
    }
    const themeColor = meta;
    const previous = document.body.style.backgroundColor;
    let frame = 0;
    let shown = "";

    const update = () => {
      frame = 0;
      // блок, который сейчас пересекает верхний край экрана
      let color = blocks[0]?.dataset.tint ?? initial;
      for (const block of blocks) {
        if (block.getBoundingClientRect().top > 1) break;
        color = block.dataset.tint ?? color;
      }
      if (color === shown) return;
      shown = color;
      document.body.style.backgroundColor = color;
      themeColor.content = color;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.body.style.backgroundColor = previous;
    };
  }, [initial]);

  // до запуска скрипта фон страницы уже нужного цвета — без бежевой вспышки при загрузке
  return <style>{`body{background-color:${initial}}`}</style>;
}
