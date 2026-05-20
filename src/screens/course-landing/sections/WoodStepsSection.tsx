import { TicketStepCard } from "../components/TicketStepCard";
import { woodStepsContent } from "../lib/content";
import { imgMagicEraser2604222127391 } from "../lib/landingAssets";

export function WoodStepsSection() {
  return (
    <section className="relative overflow-hidden px-4 py-12">
      <img
        src={imgMagicEraser2604222127391}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="relative z-10">
        <h2 className="mb-8 text-center font-serif text-[25px] leading-snug text-white drop-shadow-md">
          {woodStepsContent.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4">
          {woodStepsContent.steps.map((step) => (
            <TicketStepCard key={step.step} step={step} />
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-[#49301c]">{woodStepsContent.footer}</p>
      </div>
    </section>
  );
}
