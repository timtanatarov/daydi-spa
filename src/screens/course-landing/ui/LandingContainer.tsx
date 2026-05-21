import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Общая ширина мобильного лендинга — 480px (см. HomePage breakpoint 481px). */
export const landingMaxWidthClass = "mx-auto w-full min-w-0 max-w-[480px] overflow-x-clip";

export function LandingContainer({ children, className = "" }: Props) {
  return <div className={`${landingMaxWidthClass} ${className}`.trim()}>{children}</div>;
}
