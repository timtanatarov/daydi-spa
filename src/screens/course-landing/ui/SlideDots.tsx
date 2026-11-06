import { boxStyle, u } from "./canvas";

/** Диаметр точки, шаг между центрами точек и высота области нажатия, px макета. */
const DOT = 8;
const PITCH = 20;
const HIT = 28;

type Props = {
  count: number;
  /** номер показанного слайда, с нуля */
  active: number;
  /** середина ряда точек по горизонтали и их верхний край, px макета от верха секции */
  x: number;
  y: number;
  /** левый верхний угол родителя, если точки вложены в другой позиционированный слой */
  origin?: { x: number; y: number };
  /** цвет: точка показанного слайда залита им целиком, у остальных — только обводка */
  color: string;
  /** подпись точки для скринридера */
  label: (index: number) => string;
  /** id ленты, которой управляют точки */
  controls?: string;
  onSelect: (index: number) => void;
};

/**
 * Точки под лентой слайдов («горошины»): показывают, какой слайд на экране, и переключают
 * на нужный. В макете их нет — добавлены по просьбе заказчика вместо стрелок.
 */
export function SlideDots({
  count,
  active,
  x,
  y,
  origin,
  color,
  label,
  controls,
  onSelect,
}: Props) {
  const box = { x: x - (count * PITCH) / 2, y: y - (HIT - DOT) / 2, w: count * PITCH, h: HIT };
  return (
    <div className="flex" style={{ ...boxStyle({ ...box, origin }), color }}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          data-slide-dot
          aria-label={label(index)}
          aria-current={index === active ? "true" : undefined}
          aria-controls={controls}
          onClick={() => onSelect(index)}
          className="group flex h-full flex-1 cursor-pointer touch-manipulation items-center justify-center outline-none [-webkit-tap-highlight-color:transparent]"
        >
          <span
            aria-hidden
            className="rounded-full outline-offset-[calc(var(--u)*4)] outline-current transition-colors duration-200 group-focus-visible:outline-[length:calc(var(--u)*2)] motion-reduce:transition-none"
            style={{
              width: u(DOT),
              height: u(DOT),
              border: `${u(1)} solid currentColor`,
              backgroundColor: index === active ? "currentColor" : "transparent",
            }}
          />
        </button>
      ))}
    </div>
  );
}
