import {
  imgBgWoodSteps,
  imgScallopEdgeMidBottom,
  imgScallopEdgeMidTop,
} from "../lib/landingAssets";
import { ScallopEdgeStrip } from "../ui/ScallopEdgeStrip";

export function WoodBenefitsSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none relative z-20 h-[61px] w-full overflow-hidden">
        <ScallopEdgeStrip src={imgScallopEdgeMidTop} />
      </div>

      <div className="relative overflow-hidden px-4 py-12">
        <img
          src={imgBgWoodSteps}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div className="relative z-10">
          <div className="mx-auto mb-10 flex w-[200px] items-center justify-center rounded-[30px] bg-[#fbe8b5] px-3 py-2">
            <p className="text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
              после обучения ты
            </p>
          </div>

          <ul className="mx-auto grid max-w-[360px] grid-cols-2 gap-x-4 gap-y-8 text-center text-[10px] font-light leading-snug text-[#e9e5e2]">
            <li>начнешь экономить десятки тысяч рублей ежемесячно</li>
            <li>перестанешь переплачивать в 2–3 раза за те же вещи</li>
            <li>разберешься, как заказывать на Taobao и 1688 без ошибок и переплат</li>
            <li>научишься выбирать вещи, которые выглядят дорого и служат долго</li>
            <li>сможешь покупать оригинальные бренды дешевле</li>
            <li>будешь пользоваться базой проверенных магазинов и посредников</li>
          </ul>

          <div className="mx-auto mt-12 max-w-[220px] rounded-sm bg-[#f6f5f1]/95 px-4 py-3 text-center text-[15px] font-light leading-[16px] text-[#49301c]">
            <p>и, скорее всего,</p>
            <p>уже не захочешь покупать как раньше</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-20 h-[58px] w-full overflow-hidden">
        <ScallopEdgeStrip src={imgScallopEdgeMidBottom} />
      </div>
    </section>
  );
}
