import { roadmapContent } from "../lib/content";
import { imgLine3 } from "../lib/landingAssets";

export function RoadmapSection() {
  return (
    <section className="px-4 py-12">
      <p className="mb-2 text-center text-[10px] text-[#49301c]">{roadmapContent.eyebrow}</p>
      <h2 className="mb-6 text-center font-serif text-[25px] text-[#49301c]">
        {roadmapContent.title}
      </h2>
      <img src={imgLine3} alt="" className="mx-auto mb-8 h-px w-full max-w-[287px]" aria-hidden />

      <div className="flex flex-col gap-6">
        {roadmapContent.cards.map((card, index) => (
          <article
            key={index}
            className={`mx-auto w-full max-w-[280px] rounded-sm p-4 ${
              card.variant === "clip" ? "bg-[#dcd7d1]" : "bg-[#efeade]"
            }`}
          >
            <h3 className="text-center font-serif text-[13px] leading-snug text-[#49301c]">
              {Array.isArray(card.title) ? (
                card.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))
              ) : (
                card.title
              )}
            </h3>
            <p className="mt-2 text-center text-[10px] leading-snug text-[#49301c]">
              {card.subtitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
