import type { ReactNode } from "react";
import { Inter, Playfair, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-course-inter",
  display: "swap",
});

/**
 * Курсивом Inter в макете набраны только номера тарифов «01» / «02»:
 * достаточно латиницы и не нужна предзагрузка. Семейство то же — Inter.
 */
const interItalic = Inter({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-course-inter-italic",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-course-playfair",
  display: "swap",
});

/** Playfair (с оптическим размером) — в макете им набрана только крупная цифра шага. */
const playfair = Playfair({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-course-playfair-opsz",
  display: "swap",
  preload: false,
});

type Props = {
  children: ReactNode;
};

/**
 * Общая рамка лендинга: шрифты и единица масштаба.
 * --u — один px макета (ширина фрейма 390): на экране 390px он равен 1px,
 * на других ширинах вся вёрстка пропорционально масштабируется (до 480px).
 * По горизонтали рамка обрезает содержимое: clip, а в старых Safari (до 16) — hidden.
 * На экранах шире 480px лендинг остаётся колонкой по центру на тёмном фоне.
 */
export function LandingFrame({ children }: Props) {
  return (
    <main
      className={`${inter.variable} ${interItalic.variable} ${playfairDisplay.variable} ${playfair.variable} w-full min-w-0 overflow-x-hidden bg-[#2a1f18] pb-8 [--u:calc(min(100vw,480px)/390)] supports-[overflow:clip]:overflow-x-clip`}
    >
      <div className="relative mx-auto w-full max-w-[480px]">{children}</div>
    </main>
  );
}
