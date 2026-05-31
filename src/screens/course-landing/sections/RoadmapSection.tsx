import Image from "next/image";
import type { StaticImageData } from "next/image";

import {
  imgLineDecor,
  staticBgPaperQuote,
  staticRoadmapCardClip,
  staticRoadmapCardSeal,
} from "../lib/landingAssets";

type RoadmapCard = {
  image: StaticImageData;
  title: string[];
  text: string;
  /** Rendered card width — tuned so the visible "paper" band is the same height across cards. */
  widthClass: string;
  /** Tailwind top offset that clears the clip / seal decoration on the asset. */
  contentTop: string;
};

const roadmapCards: RoadmapCard[] = [
  {
    image: staticRoadmapCardClip,
    title: ["знакомство", "с маркетплейсами"],
    text: "регистрация без риска блокировки",
    widthClass: "w-[181px]",
    contentTop: "top-[26%]",
  },
  {
    image: staticRoadmapCardSeal,
    title: ["поиск товаров"],
    text: "как находить любые товары, бренды в разы дешевле, чем у нас? все про экспортные товары",
    widthClass: "w-[263px]",
    contentTop: "top-[32%]",
  },
  {
    image: staticRoadmapCardClip,
    title: ["рейтинг", "продавцов"],
    text: "как выбрать хороший товар?",
    widthClass: "w-[181px]",
    contentTop: "top-[26%]",
  },
];

export function RoadmapSection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={staticBgPaperQuote}
        alt=""
        aria-hidden
        fill
        sizes="480px"
        className="pointer-events-none object-cover"
      />

      <div className="relative z-10 pt-20 pb-24">
        <p className="mb-1 text-center text-[10px] font-light leading-[16px] text-[#49301c]">
          итак... что тебя ждет на этом курсе?
        </p>
        <h2 className="mb-3 text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
          дорожная карта курса
        </h2>
        <Image
          src={imgLineDecor.src}
          alt=""
          aria-hidden
          width={287}
          height={1}
          sizes="287px"
          className="mx-auto mb-10 h-px w-full max-w-[287px]"
        />

        <div className="scrollbar-hide flex w-full min-w-0 items-end gap-4 overflow-x-auto overscroll-x-contain px-4">
          {roadmapCards.map((card, index) => (
            <article key={index} className={`relative shrink-0 ${card.widthClass}`}>
              <Image
                src={card.image}
                alt=""
                aria-hidden
                sizes="280px"
                className="block h-auto w-full"
              />

              <div
                className={`absolute inset-x-0 bottom-0 ${card.contentTop} flex flex-col items-center justify-center px-7 text-center`}
              >
                <h3 className="font-playfair text-[19px] leading-[24px] font-normal text-[#49301c]">
                  {card.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-2 max-w-[180px] text-[10px] font-light leading-[16px] text-[#49301c]">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
