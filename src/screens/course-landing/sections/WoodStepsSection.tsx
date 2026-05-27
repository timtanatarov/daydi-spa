import Image from "next/image";

import { TicketStepCard } from "../components/TicketStepCard";

import {
  staticAboutIndiraBottomEdge,
  staticImgWoodBg as staticImgWoodBg,
} from "../lib/landingAssets";

export function WoodStepsSection() {
  return (
    <div className="overflow-hidden">
      <Image
        src={staticAboutIndiraBottomEdge}
        alt=""
        aria-hidden
        sizes="480px"
        className="absolute z-15 block w-full -mt-px max-w-[480px]"
      />

      <section className="relative overflow-hidden py-12">
        <Image
          src={staticImgWoodBg}
          alt=""
          aria-hidden
          fill
          priority
          sizes="480px"
          className="pointer-events-none object-cover "
        />

        <div className="relative z-10 mt-16 min-w-0">
          <h2 className="mb-8 mx-auto w-[300px] px-3 text-center font-playfair text-[25px] leading-[18px] font-normal text-[#F6F5F1]">
            <span className="block">смотри,</span>

            <span className="block">как накручивают </span>

            <span className="block">цены на наши хотелки</span>
          </h2>

          <div className="scrollbar-hide flex w-full min-w-0 gap-4 overflow-x-auto overscroll-x-contain pb-4">
            <TicketStepCard step="1//" text="сначала товар производится на китайской фабрике" />

            <TicketStepCard
              step="2//"
              text="потом этот товар выставляют на китайских маркетплейсах (таобао и 1688)"
            />

            <TicketStepCard
              step="3//"
              text="затем его выкупают российские селлеры и продают на наших маркетплейсах (вб, озон), в шоурумах и брендах"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
