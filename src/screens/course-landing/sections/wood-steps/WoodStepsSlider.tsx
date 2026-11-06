"use client";

import { Fragment, useId, useRef, useState, type PointerEvent } from "react";
import { ArrowButton } from "../../ui/ArrowButton";
import { T, boxStyle } from "../../ui/canvas";

type WoodStep = 1 | 2 | 3;

const STEP_COUNT = 3;

/**
 * Строки шагов. Шаг 3 — видимый слой макета 382:214. Шаги 1 и 2 в макете лежат скрытыми слоями
 * (382:208 и 382:209) с переносами под мелкий шрифт: крупным (17) они вылезают за край билета,
 * поэтому разбиты короче.
 */
const STEP_LINES: Record<WoodStep, readonly string[]> = {
  1: ["сначала товар", "производится", "на китайской фабрике"],
  2: ["потом товар выставляют", "на китайских", "маркетплейсах", "(таобао и 1688)"],
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

/**
 * Стрелки — тонкие, как в сравнениях (в макете здесь нарисованы потолще: группы 662:10 и 662:7);
 * стоят по центрам стрелок макета.
 */
const ARROW_PREV = { x: 15.61, y: 287.62 };
const ARROW_NEXT = { x: 363.59, y: 288.64 };
const ARROW_COLOR = "#FEFBEF";

/** Полоса билета во всю ширину блока: по ней шаги листаются пальцем. */
const SWIPE_ZONE = { x: 0, y: 231, w: 390, h: 146 };

/** Свайп — сдвиг пальца от 30px по горизонтали, заметно больший, чем по вертикали. */
const SWIPE_MIN = 30;
const SWIPE_RATIO = 1.5;

/** Появление нового шага: не дольше 200 мс, при prefers-reduced-motion — без анимации. */
const FADE =
  "transition-opacity duration-150 ease-out starting:opacity-0 motion-reduce:transition-none";

/**
 * Билет-слайдер: цифра и текст шага. Листается стрелками и пальцем (влево — дальше, вправо — назад),
 * по кругу 1 → 2 → 3 → 1.
 */
export function WoodStepsSlider() {
  const contentId = useId();
  const [step, setStep] = useState<WoodStep>(1);
  // анимация включается после первого переключения: при загрузке страницы шаг не мигает
  const [switched, setSwitched] = useState(false);

  const go = (delta: 1 | -1) => {
    setStep((current) => (((current - 1 + delta + STEP_COUNT) % STEP_COUNT) + 1) as WoodStep);
    setSwitched(true);
  };

  /** где палец коснулся полосы билета */
  const swipeStart = useRef<{ id: number; x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // свайп — жест одним пальцем. Мышью и пером шаги листают стрелки (протягивание выделяет текст),
    // а второй палец — это уже масштабирование страницы
    if (event.pointerType !== "touch" || !event.isPrimary) {
      swipeStart.current = null;
      return;
    }
    swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    if (!start || start.id !== event.pointerId) return;
    swipeStart.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    // палец не листал, а выделял текст
    if (document.getSelection()?.isCollapsed === false) return;
    go(dx < 0 ? 1 : -1);
  };

  // жест забрал браузер (страница поехала по вертикали) — это не свайп
  const onPointerCancel = () => {
    swipeStart.current = null;
  };

  const lines = STEP_LINES[step];
  // в макете нарисован третий шаг: только он сверяется со слоями по data-fig
  const isMockupStep = step === 3;
  const fade = switched ? FADE : undefined;

  return (
    // вертикальная прокрутка и масштабирование щипком остаются за браузером, горизонтальный жест — наш
    <div
      data-step-swipe
      className="touch-pan-y touch-pinch-zoom"
      style={boxStyle(SWIPE_ZONE)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <ArrowButton
        direction="prev"
        {...ARROW_PREV}
        origin={SWIPE_ZONE}
        color={ARROW_COLOR}
        data-step-prev
        aria-label="Предыдущий шаг"
        aria-controls={contentId}
        onClick={() => go(-1)}
      />
      <div
        id={contentId}
        aria-live="polite"
        aria-atomic="true"
        style={boxStyle({ ...CONTENT, origin: SWIPE_ZONE })}
      >
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
          size={17}
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
        direction="next"
        {...ARROW_NEXT}
        origin={SWIPE_ZONE}
        color={ARROW_COLOR}
        data-step-next
        aria-label="Следующий шаг"
        aria-controls={contentId}
        onClick={() => go(1)}
      />
    </div>
  );
}
