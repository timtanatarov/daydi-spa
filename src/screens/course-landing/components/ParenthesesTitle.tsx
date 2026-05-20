import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ParenthesesTitle({ children, className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center gap-2 px-4 ${className}`}>
      <span className="font-serif text-[2.5rem] leading-none text-[#49301c]">(</span>
      <div className="text-center font-serif text-[21px] leading-[1.2] text-[#49301c]">
        {children}
      </div>
      <span className="font-serif text-[2.5rem] leading-none text-[#49301c]">)</span>
    </div>
  );
}
