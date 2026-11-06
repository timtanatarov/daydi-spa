import { Inter, Playfair, Playfair_Display } from "next/font/google";

/**
 * Шрифты лендинга курса. Лежат в общем слое: кроме самой страницы ими набрано боковое меню,
 * которое живёт в шапке, вне рамки лендинга.
 */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-course-inter",
  display: "swap",
});

/**
 * Курсивом Inter в макете набраны только номера тарифов «01» / «02»:
 * достаточно латиницы и не нужна предзагрузка. Семейство то же — Inter.
 */
export const interItalic = Inter({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-course-inter-italic",
  display: "swap",
  preload: false,
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-course-playfair",
  display: "swap",
});

/** Playfair (с оптическим размером) — в макете им набрана только крупная цифра шага. */
export const playfair = Playfair({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-course-playfair-opsz",
  display: "swap",
  preload: false,
});

/** Классы с CSS-переменными всех шрифтов лендинга. */
export const courseFontVariables = [inter, interItalic, playfairDisplay, playfair]
  .map((font) => font.variable)
  .join(" ");
