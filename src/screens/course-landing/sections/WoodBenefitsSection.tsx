import Image from "next/image";

import { imgBgWoodSteps, staticBenefitsTicket } from "../lib/landingAssets";

export function WoodBenefitsSection() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden px-4 py-12">
        <Image
          src={imgBgWoodSteps}
          alt=""
          aria-hidden
          fill
          sizes="480px"
          className="pointer-events-none object-cover"
        />
        <div className="relative z-10 mx-auto max-w-[360px]">
          <ul className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-5 text-center text-[10px] font-light leading-snug text-[#e9e5e2]">
            <li className="col-span-2 mx-auto max-w-[130px]">
              перестанешь переплачивать в 2–3 раза за те же вещи
            </li>

            <li className="max-w-[130px]">начнешь экономить десятки тысяч рублей ежемесячно</li>
            <li className="max-w-[130px]">
              будешь пользоваться базой проверенных магазинов и посредников
            </li>

            <li className="col-span-2 flex justify-center">
              <div className="flex w-[200px] items-center justify-center rounded-[30px] bg-[#fbe8b5] px-3 py-2">
                <p className=" font-playfair text-[21px] leading-[17px] font-normal text-[#49301c]">
                  после обучения ты
                </p>
              </div>
            </li>

            <li className="max-w-[130px]">
              научишься выбирать вещи, которые выглядят дорого и служат долго
            </li>
            <li className="max-w-[130px]">сможешь покупать оригинальные бренды дешевле</li>

            <li className="col-span-2 mx-auto max-w-[130px]">
              разберешься, как заказывать на Taobao и 1688 без ошибок и переплат
            </li>
          </ul>

          <div className="relative mx-auto mt-10 w-full">
            <Image
              src={staticBenefitsTicket}
              alt=""
              aria-hidden
              sizes="360px"
              className="pointer-events-none w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center font-playfair text-[15px] font-normal leading-[20px] text-[#49301c] mb-1.5">
              <div className="max-w-[202px]">
                <p>и, скорее всего,</p>
                <p>уже не захочешь покупать как раньше</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
