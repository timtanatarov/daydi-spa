"use client";

import { Fragment, useId } from "react";
import { useSlideRail } from "../../lib/useSlideRail";
import { SlideDots } from "../../ui/SlideDots";
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
  pairs: ComparePair[];
  /** название группы для скринридера */
  label: string;
};

const INK = "#49301C";

/** От нижнего края подложки до точек. */
const DOTS_GAP = 14;

/**
 * Карусель пар «дороже / дешевле». Листается пальцем (scroll-snap), точками под подложкой
 * и сама — раз в несколько секунд, по кругу. Стрелки «›» из макета заказчик попросил заменить
 * точками.
 */
export function CompareCarousel({ viewport, pairs, label }: Props) {
  const railId = useId();
  const { railRef, active, show } = useSlideRail({ count: pairs.length });

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
                  size={17}
                  leading={15}
                  align="center"
                  color={INK}
                >
                  {item.caption.text}
                </T>
              </Fragment>
            ))}
          </div>
        ))}
      </div>

      {pairs.length > 1 ? (
        <SlideDots
          count={pairs.length}
          active={active}
          x={viewport.x + viewport.w / 2}
          y={viewport.y + viewport.h + DOTS_GAP}
          color={INK}
          label={(index) => `${label}: сравнение ${index + 1} из ${pairs.length}`}
          controls={railId}
          onSelect={show}
        />
      ) : null}
    </>
  );
}
