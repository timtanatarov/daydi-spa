import { pricingContent } from "../lib/content";
import { imgLine10, imgMagicEraser2604231658461 } from "../lib/landingAssets";

export function PricingSection() {
  return (
    <section id="buy" className="px-4 py-12">
      <h2 className="mb-8 text-center font-serif text-[21px] text-[#49301c]">
        {pricingContent.title}
      </h2>

      <div className="flex flex-col gap-10">
        {pricingContent.plans.map((plan) => (
          <article
            key={plan.number}
            className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-sm bg-[#efeade] px-5 py-6"
          >
            <img
              src={imgMagicEraser2604231658461}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
            />
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <img src={imgLine10} alt="" className="h-px w-8" aria-hidden />
                <span className="px-2 font-semibold italic text-[#1e1e1e] text-[12px]">
                  {plan.number}
                </span>
                <img src={imgLine10} alt="" className="h-px w-8" aria-hidden />
              </div>
              <p className="text-center text-[10px] font-medium text-[#49301c]">{plan.subtitle}</p>
              <p className="mt-1 text-center text-[10px] text-[#49301c]">{plan.description}</p>
              <h3 className="mt-6 text-center font-serif text-[21px] text-[#49301c]">
                «{plan.name}»
              </h3>
              <p className="mt-6 text-center text-2xl font-bold text-[#49301c]">{plan.price}</p>
              <p className="text-center text-sm text-[#49301c]/60 line-through">{plan.oldPrice}</p>
              <ul className="mt-4 space-y-1 text-center text-[10px] font-semibold text-[#1e1e1e]">
                {plan.duration.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <button
                type="button"
                className="mx-auto mt-6 flex h-9 w-full max-w-[140px] items-center justify-center rounded-full bg-[#531608] text-[11px] font-bold text-white"
              >
                {plan.cta}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
