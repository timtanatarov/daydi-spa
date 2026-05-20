import { imgLineShort, imgPricingCardTexture } from "../lib/landingAssets";

export function PricingSection() {
  return (
    <section id="buy" className="px-4 py-12">
      <h2 className="mb-8 text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
        выбери свой тариф
      </h2>

      <div className="flex flex-col gap-10">
        <article className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-sm bg-[#efeade] px-5 py-6">
          <img
            src={imgPricingCardTexture}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center">
              <img src={imgLineShort} alt="" className="h-px w-8" aria-hidden />
              <span className="px-2 text-[12px] font-semibold italic text-[#1e1e1e]">01</span>
              <img src={imgLineShort} alt="" className="h-px w-8" aria-hidden />
            </div>
            <p className="text-center text-[10px] font-medium leading-[16px] text-[#49301c]">
              Только Таобао + выкуп через посредника
            </p>
            <p className="mt-1 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
              Для тех, кто хочет делегировать максимум процесса посреднику
            </p>
            <h3 className="mt-6 text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
              «Базовый»
            </h3>
            <p className="mt-6 text-center text-2xl font-bold text-[#49301c]">3.490р</p>
            <p className="text-center text-sm text-[#49301c]/60 line-through">4.500р</p>
            <ul className="mt-4 space-y-1 text-center text-[10px] font-semibold text-[#1e1e1e]">
              <li>Доступ к курсу 3 месяца</li>
              <li>Обратная связь 1 месяц</li>
            </ul>
            <button
              type="button"
              className="mx-auto mt-6 flex h-9 w-full max-w-[140px] items-center justify-center rounded-full bg-[#531608] text-[11px] font-bold text-white"
            >
              КУПИТЬ
            </button>
          </div>
        </article>

        <article className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-sm bg-[#efeade] px-5 py-6">
          <img
            src={imgPricingCardTexture}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center">
              <img src={imgLineShort} alt="" className="h-px w-8" aria-hidden />
              <span className="px-2 text-[12px] font-semibold italic text-[#1e1e1e]">02</span>
              <img src={imgLineShort} alt="" className="h-px w-8" aria-hidden />
            </div>
            <p className="text-center text-[10px] font-medium leading-[16px] text-[#49301c]">
              Таобао +1688 + все способы обмена валюты и оплаты
            </p>
            <p className="mt-1 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
              Для тех, кто хочет максимально экономить и знать о китайском шопинге абсолютно всё
            </p>
            <h3 className="mt-6 text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
              «Полный»
            </h3>
            <p className="mt-6 text-center text-2xl font-bold text-[#49301c]">4.990р</p>
            <p className="text-center text-sm text-[#49301c]/60 line-through">6.500р</p>
            <ul className="mt-4 space-y-1 text-center text-[10px] font-semibold text-[#1e1e1e]">
              <li>Доступ к курсу 4 месяца</li>
              <li>Обратная связь 2 месяца</li>
            </ul>
            <button
              type="button"
              className="mx-auto mt-6 flex h-9 w-full max-w-[140px] items-center justify-center rounded-full bg-[#531608] text-[11px] font-bold text-white"
            >
              КУПИТЬ
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
