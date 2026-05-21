"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { ProductCompareCard } from "../components/ProductCompareCard";
import {
  staticBgPaperQuote,
  staticPaperShowcaseDividerHalf,
  staticPaperShowcaseDividerAltHalf,
} from "../lib/landingAssets";

export type CompareItem = {
  brand: string;
  price: string;
  oldPrice: string;
  discount: string;
};

export type PaperShowcaseSectionProps = {
  title: string | string[];
  subtitle?: string;
  pairs: {
    left: CompareItem;
    right: CompareItem;
  }[];
};

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center text-[#49301c] ${
        direction === "left" ? "left-0" : "right-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 6l-6 6 6 6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

export function PaperShowcaseSection({ title, subtitle, pairs }: PaperShowcaseSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const nextIndex = (index + pairs.length) % pairs.length;
      const slideWidth = container.clientWidth;

      container.scrollTo({ left: slideWidth * nextIndex, behavior: "smooth" });
      setActiveIndex(nextIndex);
    },
    [pairs.length],
  );

  return (
    <section className="relative overflow-hidden">
      <Image
        src={staticPaperShowcaseDividerHalf}
        alt=""
        aria-hidden
        sizes="480px"
        className="absolute z-20 block h-auto w-full"
      />
      <div className="relative py-10">
        <Image
          src={staticBgPaperQuote}
          alt=""
          aria-hidden
          fill
          sizes="480px"
          className="pointer-events-none z-0 object-cover"
        />
        <div className="relative z-10 mt-16 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-1">
            <span className="mr-4 text-center [font-family:var(--font-course-playfair)] text-[51px] leading-[20px] font-normal text-[#49301c]">
              (
            </span>
            <h2 className="text-center [font-family:var(--font-course-playfair)] text-[21px] leading-[20px] font-normal text-[#49301c]">
              {(Array.isArray(title) ? title : [title]).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <span className="ml-4 text-center [font-family:var(--font-course-playfair)] text-[51px] leading-[20px] font-normal text-[#49301c]">
              )
            </span>
          </div>

          {subtitle ? (
            <p className="mx-auto mb-6 w-[230px] text-center text-[10px] font-light leading-[10px] text-[#49301c]">
              {subtitle}
            </p>
          ) : null}

          <div className="relative mx-auto mb-12 max-w-[340px] min-w-0 rounded-sm bg-[#cac1b5] px-8 py-4">
            {pairs.length > 1 ? (
              <>
                <CarouselArrow
                  direction="left"
                  label="Предыдущее сравнение"
                  onClick={() => scrollToIndex(activeIndex - 1)}
                />
                <CarouselArrow
                  direction="right"
                  label="Следующее сравнение"
                  onClick={() => scrollToIndex(activeIndex + 1)}
                />
              </>
            ) : null}

            <div
              ref={scrollRef}
              className="scrollbar-hide flex min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            >
              {pairs.map((pair, index) => (
                <div
                  key={index}
                  className="flex w-full shrink-0 snap-center justify-center gap-3 mr-6"
                >
                  <ProductCompareCard item={pair.left} />
                  <ProductCompareCard item={pair.right} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Image
        src={staticPaperShowcaseDividerAltHalf}
        alt=""
        className="absolute bottom-0 right-0 z-20 block h-auto w-full"
      />
    </section>
  );
}
