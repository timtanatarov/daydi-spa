import Image from "next/image";
import type { CSSProperties } from "react";

import { staticPricingPaperBg } from "../lib/landingAssets";

// Vertical position (px from the card top) of the side cutouts / perforation line.
const PERFORATION_Y = 146;
const SIDE_RADIUS = 14;

// Bottom-center rectangular slot — wide & shallow, only the top corners rounded.
const SLOT_W = 64;
const SLOT_H = 16;
const SLOT_R = 6;
const slotPath = `M0 ${SLOT_H} L0 ${SLOT_R} Q0 0 ${SLOT_R} 0 L${SLOT_W - SLOT_R} 0 Q${SLOT_W} 0 ${SLOT_W} ${SLOT_R} L${SLOT_W} ${SLOT_H} Z`;
const slotSvg = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='${SLOT_W}' height='${SLOT_H}'><path d='${slotPath}' fill='#000'/></svg>`,
)}")`;

// Punch transparent holes into an opaque base via XOR compositing (order-independent).
const ticketMask = [
  "linear-gradient(#000, #000)",
  `radial-gradient(circle at 0 ${PERFORATION_Y}px, #000 ${SIDE_RADIUS}px, transparent ${SIDE_RADIUS + 1}px)`,
  `radial-gradient(circle at 100% ${PERFORATION_Y}px, #000 ${SIDE_RADIUS}px, transparent ${SIDE_RADIUS + 1}px)`,
  slotSvg,
].join(", ");

const ticketMaskStyle: CSSProperties = {
  maskImage: ticketMask,
  WebkitMaskImage: ticketMask,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "0 0, 0 0, 0 0, bottom",
  WebkitMaskPosition: "0 0, 0 0, 0 0, bottom",
  maskSize: `100% 100%, 100% 100%, 100% 100%, ${SLOT_W}px ${SLOT_H}px`,
  WebkitMaskSize: `100% 100%, 100% 100%, 100% 100%, ${SLOT_W}px ${SLOT_H}px`,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

type TariffBlock = {
  title?: string;
  items: string[];
};

type Tariff = {
  number: string;
  subtitle: string;
  description: string;
  name: string;
  blocks: TariffBlock[];
  access: string[];
  price: string;
  oldPrice: string;
};

const tariffs: Tariff[] = [
  {
    number: "01",
    subtitle: "Только Таобао + выкуп через посредника",
    description: "Для тех, кто хочет делегировать максимум процесса посреднику",
    name: "Базовый",
    blocks: [
      {
        items: [
          "Безопасная регистрация на Таобао",
          "Все варианты поиска товара",
          "Как находить оригинальные вещи брендов",
          "Поиск экспортных магазинов",
          "Разбор рейтинга продавцов",
          "Общение с продавцом",
          "Как выбрать качественный товар",
          "Как не ошибиться с размером",
          "Как сэкономить на доставке по Китаю",
          "Виды доставки, тарифы и сроки",
          "Схема выкупа через посредника",
          "Заполнение бланка заказа",
        ],
      },
      {
        title: "Бонусные материалы:",
        items: [
          "Организация СП (совместных покупок) как способ заработка",
          "Расчёт себестоимости товаров",
          "Список проверенных посредников",
          "Список проверенных магазинов, официальных магазинов брендов и экспортных продавцов",
          "Словарь фраз на китайском для общения с продавцом",
        ],
      },
    ],
    access: ["Доступ к курсу 3 месяца", "Обратная связь 1 месяц"],
    price: "3.490р",
    oldPrice: "4.500р",
  },
  {
    number: "02",
    subtitle: "Таобао +1688 + все способы обмена валюты и оплаты",
    description: "Для тех, кто хочет максимально экономить и знать о китайском шопинге абсолютно всё",
    name: "Полный",
    blocks: [
      {
        title: "Всё, что входит в тариф «Базовый», а также:",
        items: [
          "Самостоятельный выкуп с Таобао",
          "Оплата другом на Таобао",
          "Активация скидок на Таобао",
          "Торг с продавцами на Таобао",
          "Отслеживание товара по Китаю",
        ],
      },
      {
        title: "+ все этапы работы с 1688:",
        items: [
          "Безопасная регистрация на 1688",
          "Все варианты поиска товара",
          "Как находить производителей",
          "Как находить поставщиков, брендирующих товары",
          "Разбор рейтинга поставщика",
          "Общение и торг с поставщиками",
          "Схема самовыкупа, плюсы и минусы",
          "Верификация и пополнение Алипей",
          "Пополнение через биржу (самый выгодный курс юаня)",
          "Самостоятельный выкуп с 1688",
          "Скидки, купоны",
          "Отслеживание товара по Китаю",
          "Споры/возвраты",
        ],
      },
      {
        title: "Бонусные материалы:",
        items: [
          "Все бонусные материалы с тарифа «Базовый»",
          "+ список проверенных поставщиков с 1688",
        ],
      },
    ],
    access: ["Доступ к курсу 4 месяца", "Обратная связь 2 месяца"],
    price: "4.990р",
    oldPrice: "6.500р",
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li
          key={item}
          className="mx-auto max-w-[230px] text-center text-[10px] font-light leading-normal text-[#1e1e1e]"
        >
          <span aria-hidden className="mr-1 text-[#49301c]">
            •
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function TariffTicket({ tariff }: { tariff: Tariff }) {
  return (
    <div className="h-full w-[300px] shrink-0 filter-[drop-shadow(0_10px_24px_rgba(73,48,28,0.16))]">
      <article
        className="flex h-full flex-col rounded-[18px] bg-[#efeade] px-8 pt-9 pb-10"
        style={ticketMaskStyle}
      >
        <div className="-mx-8 flex items-center gap-4">
          <span aria-hidden className="h-px w-9 bg-[#49301c]/55" />
          <span className="font-playfair text-[14px] font-semibold italic text-[#1e1e1e]">
            {tariff.number}
          </span>
          <span aria-hidden className="h-px flex-1 bg-[#49301c]/55" />
        </div>
        <p className="mt-4 text-center text-[11px] font-medium leading-[16px] text-[#49301c]">
          {tariff.subtitle}
        </p>
        <p className="mt-2 text-center text-[10px] font-light leading-[15px] text-[#49301c]">
          {tariff.description}
        </p>

        <div
          aria-hidden
          className="-mx-8 my-6 h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(73,48,28,0.6) 0 9px, transparent 9px 17px)",
          }}
        />

        <h3 className="text-center font-playfair text-[28px] leading-[34px] font-normal text-[#49301c]">
          «{tariff.name}»
        </h3>

        {tariff.blocks.map((block, index) => (
          <div key={index} className={index === 0 ? "mt-4" : "mt-5"}>
            {block.title ? (
              <p className="mb-2 mx-auto max-w-[230px] text-center text-[11px] font-bold leading-[15px] text-[#49301c]">
                {block.title}
              </p>
            ) : null}
            <BulletList items={block.items} />
          </div>
        ))}

        <div className="mt-auto pt-6 text-center text-[11px] font-bold leading-[16px] text-[#49301c]">
          {tariff.access.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="mt-4 text-center text-[26px] font-bold leading-none text-[#531608]">
          {tariff.price}
        </p>
        <p className="mt-1 text-center text-[15px] font-medium text-[#49301c]/50 line-through">
          {tariff.oldPrice}
        </p>
      </article>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="buy" className="relative overflow-hidden">
      <Image
        src={staticPricingPaperBg}
        alt=""
        aria-hidden
        fill
        sizes="480px"
        className="pointer-events-none object-cover"
      />

      <div className="relative z-10 px-4 pt-14 pb-20">
        <h2 className="mb-10 text-center font-playfair text-[30px] leading-[36px] font-normal text-[#49301c]">
          выбери свой тариф
        </h2>

        <div className="scrollbar-hide flex w-full min-w-0 items-stretch gap-8 overflow-x-auto overscroll-x-contain px-1 pt-1 pb-6">
          {tariffs.map((tariff) => (
            <TariffTicket key={tariff.number} tariff={tariff} />
          ))}
        </div>
      </div>
    </section>
  );
}
