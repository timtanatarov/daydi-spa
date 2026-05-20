import { heroContent } from "../lib/content";
import {
  imgImg00301,
  imgImg783021,
  imgMagicEraser2604082116092,
  imgMagicEraser2604082117071,
} from "../lib/landingAssets";

export function HeroSection() {
  return (
    <section className="relative min-h-[780px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imgImg00301}
          alt=""
          className="size-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <img
          src={imgImg783021}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-90"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-28">
        <div className="-rotate-2 relative mx-auto w-full max-w-[345px]">
          <img
            src={imgMagicEraser2604082117071}
            alt=""
            className="w-full rounded-sm shadow-md"
            decoding="async"
          />
          <div className="absolute top-6 left-1/2 flex -translate-x-1/2 rotate-[-4deg] flex-col items-center">
            <div className="relative mb-3 flex h-[61px] w-[108px] items-center justify-center">
              <img
                src={imgMagicEraser2604082116092}
                alt=""
                className="absolute inset-0 size-full object-contain"
                decoding="async"
              />
              <span className="relative z-10 max-w-[92px] text-center text-[11px] font-medium text-[#49301c]">
                {heroContent.badge}
              </span>
            </div>
            <h1 className="[font-family:var(--font-course-playfair)] text-center text-[30px] leading-tight text-[#49301c]">
              {heroContent.title[0]}
              <br />
              {heroContent.title[1]}
            </h1>
            <div className="mt-4 max-w-[226px] text-center text-[12px] font-light leading-snug text-[#49301c]">
              {heroContent.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {heroContent.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(205,197,173,0.65)] px-2 py-0.5 text-[9px] font-medium text-[#49301c]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a
          href="#buy"
          className="mt-8 flex h-[46px] w-[197px] items-center justify-center rounded-[25px] bg-[#f6f5f1] text-[19px] font-extrabold text-[#531608]"
        >
          {heroContent.cta}
        </a>
      </div>
    </section>
  );
}
