import { quotePaperContent } from "../lib/content";
import { imgImg44101 } from "../lib/landingAssets";

export function QuotePaperSection() {
  return (
    <section className="relative overflow-hidden px-6 py-14">
      <img
        src={imgImg44101}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="relative z-10 text-center">
        <p className="font-serif text-[17px] italic leading-[1.75] tracking-wide text-[#49301c]">
          {quotePaperContent.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-6 text-[10px] text-[#49301c]">{quotePaperContent.badge}</p>
      </div>
    </section>
  );
}
