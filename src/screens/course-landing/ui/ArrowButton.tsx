import type { ButtonHTMLAttributes, Ref } from "react";
import { boxStyle } from "./canvas";

/**
 * Тонкая стрелка «›» макета — линии 397:366–397:369 во втором и третьем сравнении:
 * два штриха толщиной 0.7 из углов (0, 0) и (0, 24) к вершине у (10, 12).
 * Нижний штрих в макете чуть длиннее верхнего (10.58 против 10) — оставлено как нарисовано.
 */
const ARROW = { w: 10.58, h: 24, path: "M0 0L10 12M0 24L10.58 12", stroke: 0.7 };

/** Сторона области нажатия: квадрат с центром в центре стрелки. */
const HIT = 44;

type ArrowButtonProps = {
  /** куда листает; «назад» — та же стрелка, отражённая по горизонтали */
  direction: "prev" | "next";
  /** левый верхний угол стрелки, px макета от верха секции */
  x: number;
  y: number;
  /** левый верхний угол родителя, если кнопка вложена в другой позиционированный слой */
  origin?: { x: number; y: number };
  /** цвет штрихов и рамки фокуса */
  color: string;
  ref?: Ref<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "color" | "style" | "children">;

/**
 * Кнопка-стрелка слайдеров и каруселей — одна на все блоки. Рисуется вектором поверх арта,
 * поэтому одинаково чёткая на любом экране. Отключённая (disabled) кнопка плавно исчезает.
 */
export function ArrowButton({
  direction,
  x,
  y,
  origin,
  color,
  className,
  ...rest
}: ArrowButtonProps) {
  const hit = { x: x + ARROW.w / 2 - HIT / 2, y: y + ARROW.h / 2 - HIT / 2, w: HIT, h: HIT };
  return (
    <button
      type="button"
      className={[
        "group cursor-pointer touch-manipulation outline-none [-webkit-tap-highlight-color:transparent]",
        "transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-0 motion-reduce:transition-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...boxStyle({ ...hit, origin }), color }}
      {...rest}
    >
      {/* рамка фокуса обводит саму стрелку, а не всю область нажатия */}
      <span
        aria-hidden
        className="rounded-[calc(var(--u)*4)] outline-offset-[calc(var(--u)*4)] outline-current group-focus-visible:outline-[length:calc(var(--u)*2)]"
        style={boxStyle({ x, y, w: ARROW.w, h: ARROW.h, origin: hit })}
      >
        <svg
          viewBox={`0 0 ${ARROW.w} ${ARROW.h}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={ARROW.stroke}
          className={["block size-full overflow-visible", direction === "prev" && "-scale-x-100"]
            .filter(Boolean)
            .join(" ")}
        >
          <path d={ARROW.path} />
        </svg>
      </span>
    </button>
  );
}
