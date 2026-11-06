import type { ReactNode } from "react";
import { courseFontVariables } from "@/shared/fonts/course";
import { TopTint } from "./TopTint";

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
      className={`${courseFontVariables} w-full min-w-0 overflow-x-hidden bg-[#2a1f18] [--u:calc(min(100vw,480px)/390)] supports-[overflow:clip]:overflow-x-clip`}
    >
      {/* цвет верха экрана над первым блоком — тот же, что у первого экрана (HeroSection) */}
      <TopTint initial="#49433E" />
      <div className="relative mx-auto w-full max-w-[480px]">{children}</div>
    </main>
  );
}
