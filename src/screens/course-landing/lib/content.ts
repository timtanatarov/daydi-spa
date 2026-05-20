export type ProductCompareItem = {
  brand: string;
  price: string;
  oldPrice: string;
  discount: string;
};

export type ProductComparePair = {
  left: ProductCompareItem;
  right: ProductCompareItem;
};

export type TicketStep = {
  step: string;
  text: string;
};

export const heroContent = {
  badge: "курс по Китаю",
  title: ["Как заказывать", "на Таобао и 1688"],
  description: [
    "пошаговое обучение, как покупать",
    "одежду и декор для дома до 10 раз выгоднее, чем на Вайлдберриз",
    "и Алиэкспресс",
  ],
  tags: ["taobao", "1688"] as const,
  cta: "купить",
};

export const aboutContent = {
  tapeTitle: ["Привет,", "я Индира"],
  stickyNote:
    "уже больше 4 лет я заказываю себе одежду, аксессуары и декор для дома с китайских маркетплейсов таобао и 1688 🇨🇳",
  bullets: [
    "экономлю 20-40 тысяч рублей ежемесячно благодаря Китаю",
    "собираю стильный гардероб как у инфлюенсеров, но до 10 раз дешевле",
    "делюсь честными обзорами и распаковками в блоге",
    "обучаю других выгодному шопингу на Таобао и 1688",
  ],
};

export const woodStepsContent = {
  title: ["смотри,", "как накручивают цены на наши хотелки"],
  steps: [
    {
      step: "1/",
      text: "сначала товар производится на китайской фабрике",
    },
    {
      step: "2//",
      text: "потом этот товар выставляют на китайских маркетплейсах (таобао и 1688)",
    },
    {
      step: "3//",
      text: "затем его выкупают российские селлеры и продают на наших маркетплейсах (вб, озон), в шоурумах и брендах",
    },
  ] satisfies TicketStep[],
  footer: "можно собирать целые образы по цене одной вещи",
};

const defaultProductPair: ProductComparePair = {
  left: {
    brand: "zara",
    price: "3 914 ₽",
    oldPrice: "7 383 ₽",
    discount: "-47%",
  },
  right: {
    brand: "таобао",
    price: "3 914 ₽",
    oldPrice: "7 383 ₽",
    discount: "-47%",
  },
};

export const paperShowcaseSections = [
  {
    title: "вот такие наценки на обычной одежде, обуви и аксессуарах",
    footer: undefined,
    pairs: [defaultProductPair],
  },
  {
    title: ["а такая разница", "в товарах для дома"],
    footer: "можно обустроить квартиру как из pinterest, но в 3-5 раз дешевле, чем у нас!",
    pairs: [defaultProductPair],
  },
  {
    title: "еще можно заказывать бренды, по которым мы соскучились",
    footer: undefined,
    pairs: [
      {
        left: {
          brand: "никита ефремов",
          price: "3 914 ₽",
          oldPrice: "7 383 ₽",
          discount: "-47%",
        },
        right: defaultProductPair.right,
      },
    ],
  },
];

export const quotePaperContent = {
  lines: [
    "разные цены за одну и ту же вещь.",
    "логичный вопрос: зачем переплачивать?",
  ],
  badge: "с выгодой до 70%",
};

export const woodBenefitsContent = {
  badge: "после обучения ты",
  items: [
    { text: "начнешь экономить десятки тысяч рублей ежемесячно", position: "tl" },
    { text: "перестанешь переплачивать в 2–3 раза за те же вещи", position: "tr" },
    { text: "разберешься, как заказывать на Taobao и 1688 без ошибок и переплат", position: "bl" },
    { text: "научишься выбирать вещи, которые выглядят дорого и служат долго", position: "br" },
    { text: "сможешь покупать оригинальные бренды дешевле", position: "r" },
    { text: "будешь пользоваться базой проверенных магазинов и посредников", position: "l" },
  ],
  ticket: ["и, скорее всего,", "уже не захочешь покупать как раньше"],
};

export const roadmapContent = {
  eyebrow: "итак... что тебя ждет на этом курсе?",
  title: "дорожная карта курса",
  cards: [
    {
      title: ["знакомство", "с маркетплейсами"],
      subtitle: "регистрация без риска блокировки",
      variant: "clip" as const,
    },
    {
      title: "поиск товаров",
      subtitle:
        "как находить любые товары, бренды в разы дешевле, чем у нас? все про экспортные товары",
      variant: "seal" as const,
    },
    {
      title: "рейтинг продавцов",
      subtitle: "как выбрать хороший товар?",
      variant: "clip" as const,
    },
  ],
};

export const pricingContent = {
  title: "выбери свой тариф",
  plans: [
    {
      number: "01",
      subtitle: "Только Таобао + выкуп через посредника",
      description: "Для тех, кто хочет делегировать максимум процесса посреднику",
      name: "Базовый",
      price: "3.490р",
      oldPrice: "4.500р",
      duration: ["Доступ к курсу 3 месяца", "Обратная связь 1 месяц"],
      cta: "КУПИТЬ",
    },
    {
      number: "02",
      subtitle: "Таобао +1688 + все способы обмена валюты и оплаты",
      description:
        "Для тех, кто хочет максимально экономить и знать о китайском шопинге абсолютно всё",
      name: "Полный",
      price: "4.990р",
      oldPrice: "6.500р",
      duration: ["Доступ к курсу 4 месяца", "Обратная связь 2 месяца"],
      cta: "КУПИТЬ",
    },
  ],
};
