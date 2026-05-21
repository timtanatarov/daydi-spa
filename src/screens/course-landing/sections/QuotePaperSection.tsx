import Image from "next/image";

import { staticQuotePaperSectionBg, staticPaperShowcaseDividerHalf } from "../lib/landingAssets";

export function QuotePaperSection() {
  return (
    <>
      <Image
        src={staticPaperShowcaseDividerHalf}
        alt=""
        aria-hidden
        sizes="480px"
        className="absolute z-20 block w-full h-auto"
      />
      <section className="relative overflow-hidden px-6 pb-14 pt-8">
        <Image
          src={staticQuotePaperSectionBg}
          alt=""
          aria-hidden
          fill
          sizes="480px"
          className="pointer-events-none object-cover"
        />
        <div className="relative z-10 text-center">
          <p className="text-center italic [font-family:var(--font-course-playfair)] text-[17px] leading-loose font-normal tracking-wide text-[#49301c]">
            <span className="block">разные цены за одну и ту же вещь.</span>
            <span className="block">логичный вопрос: зачем </span>
            <span className="block">переплачивать?</span>
          </p>
        </div>
      </section>
    </>
  );
}
