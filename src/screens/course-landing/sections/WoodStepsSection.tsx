import { TicketStepCard } from "../components/TicketStepCard";
import { imgBgWoodSteps } from "../lib/landingAssets";

export function WoodStepsSection() {
  return (
    <section className="relative overflow-hidden px-4 py-12">
      <img
        src={imgBgWoodSteps}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="relative z-10">
        <h2 className="mb-8 text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
          <span className="block">смотри,</span>
          <span className="block">как накручивают цены на наши хотелки</span>
        </h2>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4">
          <TicketStepCard
            step="1/"
            text="сначала товар производится на китайской фабрике"
          />
          <TicketStepCard
            step="2//"
            text="потом этот товар выставляют на китайских маркетплейсах (таобао и 1688)"
          />
          <TicketStepCard
            step="3//"
            text="затем его выкупают российские селлеры и продают на наших маркетплейсах (вб, озон), в шоурумах и брендах"
          />
        </div>

        <p className="mt-6 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
          можно собирать целые образы по цене одной вещи
        </p>
      </div>
    </section>
  );
}
