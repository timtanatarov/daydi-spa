"use client";

import { Fragment, useId, useState } from "react";
import { T, boxStyle, type Box } from "../../ui/canvas";

type WoodStep = 1 | 2 | 3;

const STEP_COUNT = 3;

/** Строки шагов — как в макете: шаги 1 и 2 — слои 382:208 и 382:209, шаг 3 — видимый слой 382:214. */
const STEP_LINES: Record<WoodStep, readonly string[]> = {
  1: ["сначала товар производится", "на китайской фабрике"],
  2: ["потом товар выставляют", "на китайских маркетплейсах", "(таобао и 1688)"],
  3: [
    "затем его выкупают",
    "российские селлеры",
    "и продают на наших",
    "маркетплейсах (вб, озон),",
    "в шоурумах и брендах",
  ],
};

/** Содержимое билета: объединяющий прямоугольник цифры (665:20) и текста шага (382:214). */
const CONTENT = { x: 58, y: 251, w: 276, h: 100 };

/** Текст шага 382:214: пять строк с интервалом 20; шаги короче центрируются в той же высоте. */
const TEXT = { x: 124, y: 251, w: 210, leading: 20, maxLines: 5 };

/** Цифра 665:20; lineWidth — ширина строки «3» в макете: по её середине стоят «1» и «2». */
const DIGIT = { x: 58, y: 282, w: 26, h: 20, lineWidth: 28.12 };

/**
 * Оптический размер цифры в макете отвязан от кегля: начертание совпадает при opsz 12.
 * Задан явно, чтобы форма цифры не менялась вместе с шириной экрана.
 */
const DIGIT_OPSZ = '"opsz" 12';

/** Стрелки в арте: группы линий 662:10 (слева) и 662:7 (справа). */
const ARROW_PREV = { x: 15, y: 288, w: 11.8, h: 23.24 };
const ARROW_NEXT = { x: 362.98, y: 289.02, w: 11.8, h: 23.24 };

/** Сторона области нажатия: квадрат с центром в центре стрелки. */
const HIT = 44;

const hitBox = (arrow: Box): Box => ({
  x: arrow.x + arrow.w / 2 - HIT / 2,
  y: arrow.y + arrow.h / 2 - HIT / 2,
  w: HIT,
  h: HIT,
});

/** Появление нового шага: не дольше 200 мс, при prefers-reduced-motion — без анимации. */
const FADE =
  "transition-opacity duration-150 ease-out starting:opacity-0 motion-reduce:transition-none";

type ArrowProps = {
  arrow: Box;
  label: string;
  controls: string;
  onClick: () => void;
  /** атрибут, по которому кнопку находит проверка клика */
  marker: "data-step-prev" | "data-step-next";
};

/** Прозрачная кнопка поверх стрелки из арта; рамка фокуса обводит саму стрелку. */
function ArrowButton({ arrow, label, controls, onClick, marker }: ArrowProps) {
  const hit = hitBox(arrow);
  return (
    <button
      type="button"
      {...{ [marker]: "" }}
      aria-label={label}
      aria-controls={controls}
      onClick={onClick}
      className="group cursor-pointer touch-manipulation outline-none [-webkit-tap-highlight-color:transparent]"
      style={boxStyle(hit)}
    >
      <span
        aria-hidden
        className="rounded-[calc(var(--u)*4)] outline-offset-[calc(var(--u)*4)] outline-[#FEFBEF] group-focus-visible:outline-[length:calc(var(--u)*2)]"
        style={boxStyle({ ...arrow, origin: hit })}
      />
    </button>
  );
}

/** Билет-слайдер: цифра и текст шага, стрелки листают по кругу 1 → 2 → 3 → 1. */
export function WoodStepsSlider() {
  const contentId = useId();
  const [step, setStep] = useState<WoodStep>(1);
  // анимация включается после первого переключения: при загрузке страницы шаг не мигает
  const [switched, setSwitched] = useState(false);

  const go = (delta: 1 | -1) => {
    setStep((current) => (((current - 1 + delta + STEP_COUNT) % STEP_COUNT) + 1) as WoodStep);
    setSwitched(true);
  };

  const lines = STEP_LINES[step];
  // в макете нарисован третий шаг: только он сверяется со слоями по data-fig
  const isMockupStep = step === 3;
  const fade = switched ? FADE : undefined;

  return (
    <>
      <ArrowButton
        arrow={ARROW_PREV}
        label="Предыдущий шаг"
        controls={contentId}
        onClick={() => go(-1)}
        marker="data-step-prev"
      />
      <div id={contentId} aria-live="polite" aria-atomic="true" style={boxStyle(CONTENT)}>
        <span className="sr-only">
          Шаг {step} из {STEP_COUNT}:
        </span>
        <T
          key={`digit-${step}`}
          aria-hidden
          fig={isMockupStep ? "665:20" : undefined}
          origin={CONTENT}
          x={DIGIT.x}
          y={DIGIT.y}
          w={isMockupStep ? DIGIT.w : DIGIT.lineWidth}
          h={DIGIT.h}
          size={64}
          leading={20}
          font="playfair-opsz"
          align={isMockupStep ? "left" : "center"}
          color="#49301C"
          tracking={-0.02}
          className={fade}
          style={{ fontVariationSettings: DIGIT_OPSZ }}
        >
          {/* в Figma после последнего знака строки трекинга нет, в CSS он есть и сдвинул бы ось цифры */}
          <span style={{ letterSpacing: 0 }}>{step}</span>
        </T>
        <T
          key={`text-${step}`}
          fig={isMockupStep ? "382:214" : undefined}
          origin={CONTENT}
          x={TEXT.x}
          y={TEXT.y + ((TEXT.maxLines - lines.length) * TEXT.leading) / 2}
          w={TEXT.w}
          h={lines.length * TEXT.leading}
          size={10}
          leading={TEXT.leading}
          color="#49301C"
          tracking={-0.02}
          className={fade}
        >
          {lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </T>
      </div>
      <ArrowButton
        arrow={ARROW_NEXT}
        label="Следующий шаг"
        controls={contentId}
        onClick={() => go(1)}
        marker="data-step-next"
      />
    </>
  );
}
