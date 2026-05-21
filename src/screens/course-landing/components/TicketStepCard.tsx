import Image from "next/image";

import { staticTicketSteps } from "../lib/landingAssets";

type Props = {
  step: string;
  text: string;
};

export function TicketStepCard({ step, text }: Props) {
  return (
    <article className="relative min-w-[260px] shrink-0 ml-5">
      <Image src={staticTicketSteps} alt="" sizes="260px" className="h-[110px] w-full" />

      <div className="absolute inset-0 flex items-center gap-2 px-4 py-3">
        <p className="w-12 shrink-0 text-[13px] font-medium leading-[16px] text-[#49301c]">
          {step}
        </p>
        <p className="flex-1 text-[10px] font-normal leading-[16px] text-[#49301c]">{text}</p>
      </div>
    </article>
  );
}
