import { woodBenefitsContent } from "../lib/content";
import {
  imgMagicEraser2604222127391,
  imgScallopEdgeMidBottom,
  imgScallopEdgeMidTop,
} from "../lib/landingAssets";
import { ScallopEdgeStrip } from "../ui/ScallopEdgeStrip";

export function WoodBenefitsSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none relative z-20 h-[61px] w-full overflow-hidden">
        <ScallopEdgeStrip src={imgScallopEdgeMidTop} />
      </div>

      <div className="relative overflow-hidden px-4 py-12">
        <img
          src={imgMagicEraser2604222127391}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div className="relative z-10">
          <div className="mx-auto mb-10 flex w-[200px] items-center justify-center rounded-[30px] bg-[#fbe8b5] px-3 py-2">
            <p className="text-center font-serif text-[21px] leading-tight text-[#49301c]">
              {woodBenefitsContent.badge}
            </p>
          </div>

          <ul className="mx-auto grid max-w-[360px] grid-cols-2 gap-x-4 gap-y-8 text-center text-[10px] leading-snug text-[#e9e5e2]">
            {woodBenefitsContent.items.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-[220px] rounded-sm bg-[#f6f5f1]/95 px-4 py-3 text-center font-serif text-[15px] leading-snug text-[#49301c]">
            {woodBenefitsContent.ticket.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-20 h-[58px] w-full overflow-hidden">
        <ScallopEdgeStrip src={imgScallopEdgeMidBottom} />
      </div>
    </section>
  );
}
