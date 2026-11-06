"use client";

import { Fragment, useId } from "react";
import { woodStepsTicketArt } from "../../lib/blockArt";
import { useSlideRail } from "../../lib/useSlideRail";
import { SlideDots } from "../../ui/SlideDots";
import { Pic, T, boxStyle, u } from "../../ui/canvas";

/**
 * Строки шагов. Шаг 3 — видимый слой макета 382:214. Шаги 1 и 2 в макете лежат скрытыми слоями
 * (382:208 и 382:209) с переносами под мелкий шрифт: крупным (17) они вылезают за край билета,
 * поэтому разбиты короче.
 */
const STEPS: readonly (readonly string[])[] = [
  ["сначала товар", "производится", "на китайской фабрике"],
  ["потом товар выставляют", "на китайских", "маркетплейсах", "(таобао и 1688)"],
  [
    "затем его выкупают",
    "российские селлеры",
    "и продают на наших",
    "маркетплейсах (вб, озон),",
    "в шоурумах и брендах",
  ],
];

/** В макете нарисован третий шаг: только он сверяется со слоями по data-fig. */
const MOCKUP_STEP = 2;

/** Полоса слайдера во всю ширину блока: лента билетов и точки под ней. */
const ZONE = { x: 0, y: 227, w: 390, h: 190 };

/** Лента: окно во всю ширину блока. Слайд — билет целиком, по бокам от него видна доска. */
const RAIL = { x: 0, y: 227, w: 390, h: 153 };

/** Картинка билета (слой макета «Group 37» с запасом по краям) — у каждого шага своя копия. */
const TICKET = { x: 31, y: 227, w: 327, h: 153 };

/** Текст шага 382:214: пять строк с интервалом 20; шаги короче центрируются в той же высоте. */
const TEXT = { x: 124, y: 251, w: 210, leading: 20, maxLines: 5 };

/** Цифра 665:20; lineWidth — ширина строки «3» в макете: по её середине стоят «1» и «2». */
const DIGIT = { x: 58, y: 282, w: 26, h: 20, lineWidth: 28.12 };

/**
 * Оптический размер цифры в макете отвязан от кегля: начертание совпадает при opsz 12.
 * Задан явно, чтобы форма цифры не менялась вместе с шириной экрана.
 */
const DIGIT_OPSZ = '"opsz" 12';

/** Точки под билетом: цвет бумаги билета, как просил заказчик. */
const DOTS = { x: 195, y: 393 };
const CREAM = "#FEFBEF";

/**
 * Билеты-слайды: на каждом цифра и текст шага. Билет уезжает целиком, вместе с содержимым, —
 * так попросил заказчик (текст, ползущий по неподвижному билету, выглядел плохо), поэтому билет
 * вынут из арта блока. Листается пальцем, точками под билетом и сам — раз в несколько секунд,
 * по кругу. Стрелок нет: заказчик попросил попробовать без них (в макете они были по бокам).
 */
export function WoodStepsSlider() {
  const railId = useId();
  const { railRef, rootRef, active, show } = useSlideRail<HTMLOListElement, HTMLDivElement>({
    count: STEPS.length,
  });

  return (
    <div ref={rootRef} style={boxStyle(ZONE)}>
      {/* tabIndex: прокручиваемую область должно быть можно листать с клавиатуры */}
      <ol
        ref={railRef}
        id={railId}
        role="list"
        data-step-rail
        aria-label="Как накручивают цены: три шага"
        tabIndex={0}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none focus-visible:outline-solid"
        style={{
          ...boxStyle({ ...RAIL, origin: ZONE }),
          outlineColor: CREAM,
          outlineWidth: u(2),
          outlineOffset: u(-2),
        }}
      >
        {STEPS.map((lines, index) => {
          const inMockup = index === MOCKUP_STEP;
          return (
            <li key={index} className="relative h-full w-full shrink-0 snap-start">
              {/* eager: билеты второго и третьего шага стоят за краем экрана, lazy их заранее не подгрузит */}
              <Pic art={woodStepsTicketArt} {...TICKET} origin={RAIL} eager />
              <span className="sr-only">
                Шаг {index + 1} из {STEPS.length}:
              </span>
              <T
                aria-hidden
                fig={inMockup ? "665:20" : undefined}
                origin={RAIL}
                x={DIGIT.x}
                y={DIGIT.y}
                w={inMockup ? DIGIT.w : DIGIT.lineWidth}
                h={DIGIT.h}
                size={64}
                leading={20}
                font="playfair-opsz"
                align={inMockup ? "left" : "center"}
                color="#49301C"
                tracking={-0.02}
                style={{ fontVariationSettings: DIGIT_OPSZ }}
              >
                {/* в Figma после последнего знака строки трекинга нет, в CSS он есть и сдвинул бы ось цифры */}
                <span style={{ letterSpacing: 0 }}>{index + 1}</span>
              </T>
              <T
                fig={inMockup ? "382:214" : undefined}
                origin={RAIL}
                x={TEXT.x}
                y={TEXT.y + ((TEXT.maxLines - lines.length) * TEXT.leading) / 2}
                w={TEXT.w}
                h={lines.length * TEXT.leading}
                size={17}
                leading={TEXT.leading}
                color="#49301C"
                tracking={-0.02}
              >
                {lines.map((line, lineIndex) => (
                  <Fragment key={line}>
                    {lineIndex > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </T>
            </li>
          );
        })}
      </ol>
      <SlideDots
        count={STEPS.length}
        active={active}
        {...DOTS}
        origin={ZONE}
        color={CREAM}
        label={(index) => `Шаг ${index + 1} из ${STEPS.length}`}
        controls={railId}
        onSelect={show}
      />
    </div>
  );
}
