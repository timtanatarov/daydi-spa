import { imgLineDecor } from "../lib/landingAssets";

export function RoadmapSection() {
  return (
    <section className="px-4 py-12">
      <p className="mb-2 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
        итак... что тебя ждет на этом курсе?
      </p>
      <h2 className="mb-6 text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
        дорожная карта курса
      </h2>
      <img
        src={imgLineDecor}
        alt=""
        className="mx-auto mb-8 h-px w-full max-w-[287px]"
        aria-hidden
      />

      <div className="flex flex-col gap-6">
        <article className="mx-auto w-full max-w-[280px] rounded-sm bg-[#dcd7d1] p-4">
          <h3 className="text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
            <span className="block">знакомство</span>
            <span className="block">с маркетплейсами</span>
          </h3>
          <p className="mt-2 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
            регистрация без риска блокировки
          </p>
        </article>

        <article className="mx-auto w-full max-w-[280px] rounded-sm bg-[#efeade] p-4">
          <h3 className="text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
            поиск товаров
          </h3>
          <p className="mt-2 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
            как находить любые товары, бренды в разы дешевле, чем у нас? все про экспортные товары
          </p>
        </article>

        <article className="mx-auto w-full max-w-[280px] rounded-sm bg-[#dcd7d1] p-4">
          <h3 className="text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
            рейтинг продавцов
          </h3>
          <p className="mt-2 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
            как выбрать хороший товар?
          </p>
        </article>
      </div>
    </section>
  );
}
