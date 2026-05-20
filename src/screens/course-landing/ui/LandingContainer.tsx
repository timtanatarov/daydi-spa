import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Обёртка мобильного макета 430px вместо scale-frame */
export function LandingContainer({ children, className = "" }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[430px] overflow-x-clip bg-[#f6f5f1] shadow-sm md:rounded-sm ${className}`}
    >
      {children}
    </div>
  );
}
