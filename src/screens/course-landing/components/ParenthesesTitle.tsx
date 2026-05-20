import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const heading =
  "text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]";

export function ParenthesesTitle({ children, className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center gap-2 px-4 ${className}`}>
      <span className={heading}>(</span>
      <div className={heading}>{children}</div>
      <span className={heading}>)</span>
    </div>
  );
}
