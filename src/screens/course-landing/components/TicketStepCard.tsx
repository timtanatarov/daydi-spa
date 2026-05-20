import type { TicketStep } from "../lib/content";

type Props = {
  step: TicketStep;
};

export function TicketStepCard({ step }: Props) {
  return (
    <article className="relative flex min-w-[260px] shrink-0 rounded-sm bg-[#efeade] px-4 py-3">
      <div
        className="absolute top-0 left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f5f1]"
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f5f1]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#f6f5f1]"
        aria-hidden
      />
      <div
        className="absolute right-0 bottom-0 h-3 w-3 translate-x-1/2 translate-y-1/2 rounded-full bg-[#f6f5f1]"
        aria-hidden
      />
      <p className="w-12 shrink-0 font-semibold text-[13px] text-[#49301c]">{step.step}</p>
      <p className="flex-1 text-[10px] leading-snug text-[#49301c]">{step.text}</p>
    </article>
  );
}
