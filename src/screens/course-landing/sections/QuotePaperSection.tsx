import { imgBgPaperQuote } from "../lib/landingAssets";

export function QuotePaperSection() {
  return (
    <section className="relative overflow-hidden px-6 py-14">
      <img
        src={imgBgPaperQuote}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="relative z-10 text-center">
        <p className="text-center [font-family:var(--font-course-playfair)] text-[17px] leading-[1.75] font-normal tracking-wide text-[#49301c]">
          <span className="block">разные цены за одну и ту же вещь.</span>
          <span className="block">логичный вопрос: зачем переплачивать?</span>
        </p>
        <p className="mt-6 text-[10px] font-light leading-[16px] text-[#49301c]">с выгодой до 70%</p>
      </div>
    </section>
  );
}
