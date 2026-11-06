"use client";

import { useId, type ReactNode } from "react";
import { useSlideRail } from "../../lib/useSlideRail";
import { SlideDots } from "../../ui/SlideDots";
import { boxStyle, u } from "../../ui/canvas";

type Props = {
  /** окно прокрутки, px макета от верха секции */
  viewport: { x: number; y: number; w: number; h: number };
  /** ширина ленты с карточками, px макета */
  width: number;
  /** поле слева и справа в окне, px макета: с ним первая карточка встаёт слева, последняя — справа */
  inset: number;
  /**
   * Сдвиги ленты, в которых она останавливается, в долях ширины окна: по одному на карточку,
   * по возрастанию (те же, что даёт scroll-snap). Массив — константа модуля.
   */
  stops: readonly number[];
  /** название ряда для скринридера */
  label: string;
  /** цвет точек и рамки фокуса */
  color: string;
  /** середина ряда точек по горизонтали и их верхний край */
  dots: { x: number; y: number };
  children: ReactNode;
};

/**
 * Лента карточек с горизонтальной прокруткой: листается пальцем, колесом, с клавиатуры, точками
 * под карточками и сама — раз в несколько секунд, по кругу. Останавливается только на карточках
 * (scroll-snap) — на полпути свайп её не бросает. Положение берётся из самой прокрутки, поэтому
 * точки и свайп не расходятся.
 */
export function RoadmapRail({
  viewport,
  width,
  inset,
  stops,
  label,
  color,
  dots,
  children,
}: Props) {
  const railId = useId();
  const { railRef, active, show } = useSlideRail({ count: stops.length, stops });

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
      <SlideDots
        count={stops.length}
        active={active}
        {...dots}
        color={color}
        label={(index) => `${label}: карточка ${index + 1} из ${stops.length}`}
        controls={railId}
        onSelect={show}
      />
    </>
  );
}
