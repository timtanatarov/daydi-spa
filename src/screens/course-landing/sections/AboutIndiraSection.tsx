import Image from "next/image";

import {
  staticAboutPhotoCoat,
  staticAboutPhotoJacket,
  staticAboutPhotoBags,
  staticAboutTapeBanner,
  staticAboutPaperclip,
  staticAboutMiniTape1,
  staticAboutMiniTape2,
  staticIconStar,
  staticAboutIndiraBg,
} from "../lib/landingAssets";

export function AboutIndiraSection() {
  return (
    <div>
      <section className="relative overflow-hidden bg-transparent px-4 py-10 ">
        <Image
          src={staticAboutIndiraBg}
          alt=""
          fill
          priority
          sizes="480px"
          className="object-cover"
        />

        <div className="relative z-10 mx-auto flex max-w-[360px] flex-col items-center">
          <div className="relative  w-full max-w-[310px]">
            <Image src={staticAboutTapeBanner} alt="" sizes="310px" className="h-auto w-full" />

            <h2 className="absolute inset-0 flex flex-col items-center justify-center text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
              <span className="text-[#49301c] italic -ml-20">Привет,</span>

              <span className="text-[#49301c] italic -mr-20 -mt-2">я Индира</span>
            </h2>
          </div>

          <div className="flex w-full items-start justify-between gap-2">
            <div className="relative h-[400px] w-[170px] shrink-0">
              <div className="absolute left-0 top-0 z-10 w-[148px] rotate-[-2.5deg]">
                <Image
                  src={staticAboutPhotoCoat}
                  alt=""
                  sizes="148px"
                  className="block h-auto w-full"
                />
                <Image
                  src={staticAboutMiniTape1}
                  alt=""
                  sizes="50px"
                  className="pointer-events-none absolute left-29 -top-4 z-10 w-[50px]"
                />
                <Image
                  src={staticAboutMiniTape2}
                  alt=""
                  sizes="48px"
                  className="pointer-events-none absolute right-[95px] -bottom-10 z-10 w-20"
                />
              </div>

              <div className="absolute left-[42px] top-[118px] z-20 w-[128px] rotate-2">
                <Image
                  src={staticAboutPhotoJacket}
                  alt=""
                  sizes="138px"
                  className="block h-auto w-full"
                />
                <Image
                  src={staticAboutMiniTape1}
                  alt=""
                  sizes="48px"
                  className="pointer-events-none absolute -right-4 bottom-33 z-10 w-12 rotate-12"
                />
                <Image
                  src={staticAboutMiniTape2}
                  alt=""
                  sizes="48px"
                  className="pointer-events-none absolute right-1 -bottom-7 z-30 w-12 rotate-100"
                />
              </div>

              <div className="absolute left-[8px] top-[228px] z-30 w-[123px] rotate-[-1.5deg]">
                <Image
                  src={staticAboutPhotoBags}
                  alt=""
                  sizes="133px"
                  className="block h-auto w-full"
                />
                <Image
                  src={staticAboutMiniTape1}
                  alt=""
                  sizes="48px"
                  className="pointer-events-none absolute -left-3 -top-2 z-10 w-12 -rotate-75"
                />
                <Image
                  src={staticAboutMiniTape2}
                  alt=""
                  sizes="48px"
                  className="pointer-events-none absolute right-20 -bottom-7 z-30 w-16 rotate-185"
                />
              </div>
            </div>

            <div className="flex w-[205px] shrink-0 flex-col gap-4 ">
              <div className="relative bg-[#f9e7b5] mt-12 -ml-4 w-[200px]">
                <p className="relative z-0 w-[180px] mx-4 my-1 font-inter-course text-left text-[9.5px] font-medium leading-[14px] tracking-normal text-[#49301c]">
                  уже больше 4 лет я заказываю себе одежду, аксессуары и декор для дома с китайских
                  маркетплейсов таобао и 1688 🇨🇳
                </p>
                <Image
                  src={staticAboutPaperclip}
                  alt=""
                  sizes="32px"
                  className="pointer-events-none absolute -right-1 -top-2.5 z-10 h-8 w-8  object-contain"
                />
              </div>

              <ul className="w-full mt-4 space-y-[16px] text-[9px] font-light leading-[15px] text-[#49301c]">
                <li className="flex gap-1 rotate-2 pl-2">
                  <Image
                    src={staticIconStar}
                    alt=""
                    sizes="16px"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span className="leading-2.5">
                    экономлю 20-40 тысяч рублей ежемесячно благодаря Китаю
                  </span>
                </li>
                <li className="flex gap-2 -rotate-2 -ml-2">
                  <Image
                    src={staticIconStar}
                    alt=""
                    sizes="16px"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span className="leading-2.5">
                    собираю стильный гардероб как у инфлюенсеров, но до 10 раз дешевле
                  </span>
                </li>
                <li className="flex gap-2 rotate-3 pl-6">
                  <Image
                    src={staticIconStar}
                    alt=""
                    sizes="16px"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span className="leading-2.5">
                    делюсь честными обзорами и распаковками в блоге
                  </span>
                </li>
                <li className="flex gap-2 -rotate-2 -ml-6 max-w-[180px]">
                  <Image
                    src={staticIconStar}
                    alt=""
                    sizes="16px"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span className="leading-2.5">
                    обучаю других выгодному шопингу на Таобао и 1688
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
