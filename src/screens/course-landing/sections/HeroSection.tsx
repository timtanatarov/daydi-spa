import Image from "next/image";
import {
  staticAboutIndiraTopEdge,
  staticHeroPhoto,
  staticHeroPaperCard,
  staticHeroTapeBadge,
} from "../lib/landingAssets";

export function HeroSection() {
  return (
    <div className="relative isolate flex w-full min-h-[calc(100vw*763/430)] flex-col items-center">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image src={staticHeroPhoto} alt="" fill priority sizes="480px" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 pt-8 pb-6">
        <div className="w-full max-w-[354px] rotate-[-3.53deg]">
          <div className="grid *:col-start-1 *:row-start-1">
            <Image
              src={staticHeroPaperCard}
              alt=""
              sizes="(max-width: 480px) 92vw, 354px"
              className="w-full"
            />

            <div className="flex flex-col items-center px-[12%] pt-[26%] pb-[10%]">
              <div className="relative mt-16 flex h-[61px] w-[120px] rotate-[-0.69deg] items-center justify-center">
                <Image
                  src={staticHeroTapeBadge}
                  alt=""
                  fill
                  sizes="120px"
                  className="pointer-events-none object-bottom"
                />
                <span className="relative z-10 max-w-[92px] px-0.5 text-center text-[11px] font-medium leading-snug text-[#49301c]">
                  курс по Китаю
                </span>
              </div>

              <h1 className="-mt-3 m-0 w-full max-w-[16rem] text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[30px] font-normal text-[#49301c]">
                Как заказывать на Таобао и 1688
              </h1>

              <p className="m-0 mt-3 w-full max-w-56.5 text-center [font-family:var(--font-course-inter)] text-[12px] font-light not-italic leading-[13px] tracking-normal text-[#49301c]">
                пошаговое обучение, как покупать одежду и декор для дома до 10 раз выгоднее, чем на
                Вайлдберриз и Алиэкспресс
              </p>

              <div className="mt-12 flex items-center justify-center gap-6">
                <div className="flex h-[17px] min-w-[44px] items-center justify-center rounded-[20px] bg-[rgba(205,197,173,0.65)] px-2">
                  <span className="text-[9px] font-medium leading-none text-[#49301c]">taobao</span>
                </div>
                <div className="flex h-[17px] min-w-[44px] items-center justify-center rounded-[20px] bg-[rgba(205,197,173,0.65)] px-2">
                  <span className="text-[9px] font-medium leading-none text-[#49301c]">1688</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#buy"
          className="-mt-5 mb-16 flex h-[46px] w-[197px] shrink-0 items-center justify-center rounded-[25px] bg-[#f6f5f1] text-[19px] leading-[30px] font-extrabold text-[#531608]"
        >
          купить
        </a>
      </div>

      <Image
        src={staticAboutIndiraTopEdge}
        alt=""
        aria-hidden
        sizes="480px"
        className="relative z-10 mt-auto block w-full"
      />
    </div>
  );
}
