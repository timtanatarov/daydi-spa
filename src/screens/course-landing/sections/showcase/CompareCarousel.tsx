"use client";

import { Fragment, useId, useRef } from "react";
import { Pic, T, boxStyle, u, type BlockArt } from "../../ui/canvas";

type Rect = { x: number; y: number; w: number; h: number };

export type CompareItem = {
  /** карточка товара: фото с ценником */
  art: BlockArt;
  box: Rect;
  /** что на карточке, для скринридера: товар и цены (у заглушек не задано) */
  alt?: string;
  /** подпись под карточкой; fig — слой макета, по которому она сверяется */
  caption: { fig: string; text: string; x: number; y: number; w: number };
};

export type ComparePair = { left: CompareItem; right: CompareItem };

type Props = {
  /** бежевая подложка группы: окно, внутри которого листаются пары */
  viewport: Rect;
  /** стрелка «›» справа от подложки (нарисована в арте блока) */
  arrow: Rect;
  pairs: ComparePair[];
  /** название группы для скринридера */
  label: string;
};

/** Сторона области нажатия стрелки: квадрат с центром в центре стрелки. */
const HIT = 44;

/**
 * Карусель пар «дороже / дешевле». Листается пальцем (scroll-snap) и стрелкой из макета —
 * по кругу. Положение берётся из самой прокрутки, поэтому стрелка и свайп не расходятся.
 */
export function CompareCarousel({ viewport, arrow, pairs, label }: Props) {
  const railId = useId();
  const railRef = useRef<HTMLDivElement>(null);
  /** куда лента едет сейчас: пока идёт плавная прокрутка, её положение ещё «в пути» */
  const pending = useRef<{ index: number; until: number } | null>(null);

  const showNext = () => {
    const rail = railRef.current;
    if (!rail) return;
    // ширина слайда бывает дробной, поэтому берём её из ленты, а не из округлённого clientWidth
    const slideWidth = rail.scrollWidth / pairs.length;
    const now = performance.now();
    const current =
      pending.current && now < pending.current.until
        ? pending.current.index
        : Math.round(rail.scrollLeft / slideWidth);
    const next = (current + 1) % pairs.length;
    pending.current = { index: next, until: now + 600 };
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: next * slideWidth, behavior: calm ? "auto" : "smooth" });
  };

  const hit = {
    x: arrow.x + arrow.w / 2 - HIT / 2,
    y: arrow.y + arrow.h / 2 - HIT / 2,
    w: HIT,
    h: HIT,
  };

  return (
    <>
      <div
        ref={railRef}
        id={railId}
        role="group"
        aria-label={label}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ ...boxStyle(viewport), borderRadius: u(2), backgroundColor: "#CAC1B5" }}
      >
        {pairs.map((pair, index) => (
          <div
            key={index}
            role="group"
            aria-label={`Сравнение ${index + 1} из ${pairs.length}`}
            // overflow-hidden: рамки подписей шире окна и иначе удлиняют ленту за последний слайд
            className="relative h-full w-full shrink-0 snap-center overflow-hidden"
          >
            {[pair.left, pair.right].map((item) => (
              <Fragment key={item.caption.fig}>
                <Pic
                  art={item.art}
                  alt={item.alt}
                  {...item.box}
                  origin={viewport}
                  eager={index > 0}
                />
                <T
                  // со слоями макета сверяется только первая пара — та, что нарисована
                  fig={index === 0 ? item.caption.fig : undefined}
                  origin={viewport}
                  x={item.caption.x}
                  y={item.caption.y}
                  w={item.caption.w}
                  h={15}
                  size={10}
                  leading={15}
                  align="center"
                  color="#49301C"
                >
                  {item.caption.text}
                </T>
              </Fragment>
            ))}
          </div>
        ))}
      </div>

      {pairs.length > 1 ? (
        <button
          type="button"
          data-compare-next
          aria-label={`Следующее сравнение: ${label}`}
          aria-controls={railId}
          onClick={showNext}
          className="group cursor-pointer touch-manipulation outline-none [-webkit-tap-highlight-color:transparent]"
          style={boxStyle(hit)}
        >
          <span
            aria-hidden
            className="rounded-[calc(var(--u)*4)] outline-offset-[calc(var(--u)*4)] outline-[#49301C] group-focus-visible:outline-[length:calc(var(--u)*2)]"
            style={boxStyle({ ...arrow, origin: hit })}
          />
        </button>
      ) : null}
    </>
  );
}
