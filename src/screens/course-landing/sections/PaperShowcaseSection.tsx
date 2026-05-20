import { ParenthesesTitle } from "../components/ParenthesesTitle";
import { ProductCompareCard } from "../components/ProductCompareCard";
import type { ProductComparePair } from "../lib/content";
import { imgImg44101 } from "../lib/landingAssets";

export type PaperShowcaseSectionProps = {
  title: string | string[];
  pairs: ProductComparePair[];
  footer?: string;
};

/**
 * Секция «4-й скрин»: бумажный фон, заголовок в скобках, пара карточек сравнения.
 * Используется 3 раза подряд с разным контентом.
 */
export function PaperShowcaseSection({ title, pairs, footer }: PaperShowcaseSectionProps) {
  const titleContent = Array.isArray(title) ? (
    <>
      {title.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  ) : (
    title
  );

  return (
    <section className="relative overflow-hidden px-4 py-10">
      <img
        src={imgImg44101}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-90"
      />
      <div className="relative z-10">
        <ParenthesesTitle className="mb-8">{titleContent}</ParenthesesTitle>

        <div className="mx-auto max-w-[340px] rounded-sm bg-[#cac1b5]/90 p-4">
          <div className="flex items-start justify-center gap-4 overflow-x-auto pb-2">
            {pairs.map((pair, idx) => (
              <div key={idx} className="flex shrink-0 gap-3">
                <ProductCompareCard item={pair.left} />
                <ProductCompareCard item={pair.right} />
              </div>
            ))}
          </div>
        </div>

        {footer ? (
          <p className="mt-6 text-center text-[10px] text-[#49301c]">{footer}</p>
        ) : null}
      </div>
    </section>
  );
}
