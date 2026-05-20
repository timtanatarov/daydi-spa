import { aboutContent } from "../lib/content";
import {
  imgImg24411,
  imgImg30091,
  imgImg76421,
  imgImg43771,
  imgMagicEraser2604082116093,
  imgMagicEraser2604082116331,
  imgStar1,
} from "../lib/landingAssets";

export function AboutIndiraSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f5f1] px-4 py-10">
      <img
        src={imgImg43771}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-30"
      />

      <div className="relative z-10 mx-auto flex max-w-[360px] flex-col items-center">
        <div className="relative mb-6 w-full max-w-[319px]">
          <img
            src={imgMagicEraser2604082116093}
            alt=""
            className="w-full"
            decoding="async"
          />
          <h2 className="absolute inset-0 flex flex-col items-center justify-center font-serif text-[30px] italic text-[#49301c]">
            <span>{aboutContent.tapeTitle[0]}</span>
            <span>{aboutContent.tapeTitle[1]}</span>
          </h2>
        </div>

        <div className="relative mb-8 grid w-full grid-cols-[1fr_1.1fr] gap-3">
          <div className="flex flex-col gap-3">
            <img
              src={imgImg24411}
              alt=""
              className="-rotate-2 w-[120px] shadow-sm"
              loading="lazy"
            />
            <img
              src={imgImg30091}
              alt=""
              className="rotate-2 w-[95px] shadow-sm"
              loading="lazy"
            />
            <img
              src={imgImg76421}
              alt=""
              className="-rotate-1 w-[95px] shadow-sm"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <div className="rounded-sm bg-[#fbe8b5] p-3 text-[9.5px] leading-snug text-[#49301c]">
              {aboutContent.stickyNote}
            </div>
            <img
              src={imgMagicEraser2604082116331}
              alt=""
              className="ml-auto size-9 object-contain"
              loading="lazy"
            />
            <ul className="space-y-3 text-[9px] leading-snug text-[#49301c]">
              {aboutContent.bullets.map((text) => (
                <li key={text} className="flex gap-2">
                  <img src={imgStar1} alt="" className="mt-0.5 size-4 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
