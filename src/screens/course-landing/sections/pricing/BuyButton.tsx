import type { ReactNode } from "react";
import { boxStyle, u, type Box } from "../../ui/canvas";

/** Минимальная высота области нажатия, px макета. */
const MIN_TAP = 44;

type Props = Pick<Box, "x" | "y" | "w" | "h" | "origin"> & {
  /** подпись для скринридера: на кнопках обоих тарифов одно и то же слово */
  label: string;
  /** текстовый слой «купить»: его координаты — от левого верхнего угла кнопки */
  children: ReactNode;
};

/**
 * Кнопка «купить»: плашка #531608 со скруглением 30 — торцы полностью круглые.
 * Обработчик появится вместе с оплатой.
 */
export function BuyButton({ x, y, w, h, origin, label, children }: Props) {
  const tapH = Math.max(h, MIN_TAP);
  return (
    <button
      type="button"
      aria-label={label}
      className="cursor-pointer select-none focus-visible:outline-solid"
      style={{
        ...boxStyle({ x, y, w, h, origin }),
        borderRadius: u(30),
        backgroundColor: "#531608",
        outlineColor: "#531608",
        outlineWidth: u(2),
        outlineOffset: u(2),
      }}
    >
      {/* область нажатия: если кнопка ниже 44 px, добираем высоту невидимым слоем */}
      <span
        aria-hidden
        style={boxStyle({ x, y: y - (tapH - h) / 2, w, h: tapH, origin: { x, y } })}
      />
      {children}
    </button>
  );
}
