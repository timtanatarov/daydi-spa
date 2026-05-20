import Image from "next/image";
import {
  staticAboutPhotoCoat,
  staticAboutPhotoJacket,
  staticAboutPhotoBags,
  staticAboutTapeBanner,
  staticAboutPaperclip,
  staticIconStar,
  staticAboutIndiraBg,
} from "../lib/landingAssets";

export function AboutIndiraSection() {
  return (
    <div>
      <section className="relative overflow-hidden bg-transparent px-4 py-10">
        <Image
          src={staticAboutIndiraBg}
          alt=""
          fill
          priority
          sizes="480px"
          className="object-cover"
        />

        <div className="relative z-10 mx-auto flex max-w-[360px] flex-col items-center">
          <div className="relative mb-8 w-full max-w-[310px]">
            <Image src={staticAboutTapeBanner} alt="" sizes="310px" className="h-auto w-full" />
            <h2 className="absolute inset-0 flex flex-col items-center justify-center text-center [font-family:var(--font-course-playfair)] text-[30px] leading-[36px] font-normal text-[#49301c]">
              <span className="text-[#49301c] italic -ml-20">Привет,</span>
              <span className="text-[#49301c] italic -mr-20 -mt-2">я Индира</span>
            </h2>
          </div>

          <div className="relative h-[400px] w-full">
            <Image
              src={staticAboutPhotoCoat}
              alt=""
              sizes="158px"
              className="absolute left-0 top-0 z-10 w-[158px] rotate-[-2.5deg] shadow-sm"
            />
            <Image
              src={staticAboutPhotoJacket}
              alt=""
              sizes="138px"
              className="absolute left-[52px] top-[128px] z-20 w-[138px] rotate-2 shadow-sm"
            />
            <Image
              src={staticAboutPhotoBags}
              alt=""
              sizes="133px"
              className="absolute left-[8px] top-[238px] z-30 w-[133px] rotate-[-1.5deg] shadow-sm"
            />

            <div className="absolute right-0 top-0 w-[160px] rounded-sm bg-[#fbe8b5] p-3 text-[10.5px] font-light leading-[17px] text-[#49301c]">
              уже больше 4 лет я заказываю себе одежду, аксессуары и декор для дома с китайских
              маркетплейсов таобао и 1688 🇨🇳
            </div>

            <Image
              src={staticAboutPaperclip}
              alt=""
              sizes="36px"
              className="absolute right-2 top-[130px] z-10 size-9 object-contain"
            />

            <ul className="absolute right-0 top-[172px] w-[160px] space-y-[10px] text-[10px] font-light leading-[15px] text-[#49301c]">
              <li className="flex gap-2">
                <Image
                  src={staticIconStar}
                  alt=""
                  sizes="16px"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>экономлю 20-40 тысяч рублей ежемесячно благодаря Китаю</span>
              </li>
              <li className="flex gap-2">
                <Image
                  src={staticIconStar}
                  alt=""
                  sizes="16px"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>собираю стильный гардероб как у инфлюенсеров, но до 10 раз дешевле</span>
              </li>
              <li className="flex gap-2">
                <Image
                  src={staticIconStar}
                  alt=""
                  sizes="16px"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>делюсь честными обзорами и распаковками в блоге</span>
              </li>
              <li className="flex gap-2">
                <Image
                  src={staticIconStar}
                  alt=""
                  sizes="16px"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>обучаю других выгодному шопингу на Таобао и 1688</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
