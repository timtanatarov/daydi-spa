/**
 * Раскладка блока тарифов. Макета под крупный шрифт для него нет, поэтому координаты
 * не переписаны из Figma, а считаются: билет описан списком строк (см. tariffs.ts), у каждой
 * строки своя высота и отступ до следующей. Отсюда получаются все y, высота билета, место
 * линии отрыва с боковыми вырезами и высота блока — правка текста сводится к правке строк.
 * Все числа — px макета (ширина фрейма 390), у строк — от левого верхнего угла билета.
 */

/** Поля блока: как в макете. */
export const BLOCK = {
  /** высота арта (бумага): ниже её продолжают зеркальные копии */
  artHeight: 1974,
  headingY: 88,
  firstTicketY: 172,
  /** между билетами */
  between: 70,
  /** бумага под вторым билетом */
  below: 200,
} as const;

/** Цвета блока — из макета. */
export const COLOR = {
  /** бумага билета и текст на кнопке */
  paper: "#EFEADE",
  /** заголовки, описания, линии */
  brown: "#49301C",
  /** номер, списки, подзаголовки */
  ink: "#1E1E1E",
  /** цена и кнопка */
  red: "#531608",
  /** старая цена */
  gray: "#969696",
} as const;

/** Билет: кремовая бумага с вырезами (форма — в TicketPaper). */
export const TICKET = {
  x: 49,
  w: 293,
  fill: COLOR.paper,
  /** верх строки с номером: её середина приходится на линейку, y = 28 */
  top: 19,
  /** линейка: слева до gapFrom, справа от gapTo, между ними — номер */
  rule: { gapFrom: 32, gapTo: 69, weight: 1, color: COLOR.brown },
  /** линия отрыва: штрих 5 через 4, от выреза до выреза */
  tear: { weight: 1.7, dash: 5, space: 4, color: COLOR.brown },
  /** радиус боковых полукруглых вырезов, их центры — на краях билета у линии отрыва */
  notch: 20,
  /** вырез посередине нижнего края: верхние углы скруглены */
  tab: { w: 67, h: 12, r: 5 },
} as const;

/** Текстовая колонка билета: поля по 24. Ни одна строка не должна быть шире. */
export const COLUMN = { x: 24, w: 245 } as const;

/** Кегль и интерлиньяж: основной текст — Inter 17/20, как в блоках, увеличенных дизайнером. */
export const TYPE = {
  text: { size: 17, leading: 20 },
  number: { size: 15, leading: 18 },
  title: { size: 25, leading: 17 },
  price: { size: 24, leading: 24 },
} as const;

/** Пара цен: новая над старой. Старую зачёркивает плашка — в макете 73.68×3 при кегле 19. */
export const PRICES = {
  gap: 3,
  strike: { w: 93, h: 4, color: COLOR.gray },
  /** верх плашки от верха строки старой цены: чуть ниже середины цифр */
  strikeY: 12,
} as const;

/** Кнопка «купить»: в макете 126×35 при кегле 19. Текст стоит по середине строчных букв. */
export const BUTTON = { w: 170, h: 46, textY: 9 } as const;

/** Отступы после строк. Между смысловыми группами — один и тот же. */
export const GAP = {
  /** номер → первое описание */
  number: 15,
  /** между абзацами описания */
  paragraph: 12,
  /** описание → линия отрыва */
  stub: 40,
  /** линия отрыва → название тарифа */
  tear: 28,
  /** название → первая группа */
  title: 28,
  /** подзаголовок → его список */
  subhead: 8,
  /** между пунктами списка: пункты в две-три строки без него сливаются */
  item: 6,
  /** между группами: список → подзаголовок, сроки → цены */
  group: 26,
  /** цены → кнопка */
  prices: 16,
  /** кнопка → нижний край билета */
  bottom: 60,
} as const;

type PriceText = { fig: string; text: string };

/** Строка билета. fig — id слоя в Figma, по нему текст находится в макете. */
export type TicketRow = {
  /** отступ до следующей строки, у последней — до нижнего края билета */
  gap: number;
} & (
  | { kind: "number"; fig: string; text: string }
  | { kind: "text"; fig: string; lines: readonly string[]; weight: 300 | 400 | 600; color: string }
  /** линия отрыва с боковыми вырезами: высоты не занимает */
  | { kind: "tear" }
  | { kind: "title"; fig: string; text: string }
  /** список: у каждого пункта свои строки */
  | { kind: "list"; fig: string; items: readonly (readonly string[])[] }
  /** label — цена одной фразой для скринридера */
  | { kind: "prices"; price: PriceText; old: PriceText; label: string }
  /** label — подпись кнопки для скринридера */
  | { kind: "button"; fig: string; label: string }
);

export type Tariff = {
  /** латиницей: из него собирается id заголовка билета */
  id: string;
  rows: readonly TicketRow[];
};

export type PlacedRow = TicketRow & { y: number; h: number };

export type PlacedTicket = {
  id: string;
  /** верх билета от верха блока */
  y: number;
  h: number;
  /** линейка под номером и линия отрыва — от верха билета */
  ruleY: number;
  tearY: number;
  rows: readonly PlacedRow[];
};

function rowHeight(row: TicketRow): number {
  switch (row.kind) {
    case "number":
      return TYPE.number.leading;
    case "text":
      return row.lines.length * TYPE.text.leading;
    case "list": {
      const lines = row.items.reduce((sum, item) => sum + item.length, 0);
      return lines * TYPE.text.leading + (row.items.length - 1) * GAP.item;
    }
    case "tear":
      return 0;
    case "title":
      return TYPE.title.leading;
    case "prices":
      return TYPE.price.leading * 2 + PRICES.gap;
    case "button":
      return BUTTON.h;
  }
}

function placeTicket(tariff: Tariff, y: number): PlacedTicket {
  const rows: PlacedRow[] = [];
  let cursor: number = TICKET.top;
  for (const row of tariff.rows) {
    const h = rowHeight(row);
    rows.push({ ...row, y: cursor, h });
    cursor += h + row.gap;
  }
  const number = rows.find((row) => row.kind === "number");
  const tear = rows.find((row) => row.kind === "tear");
  if (!number || !tear) {
    throw new Error(`Тариф «${tariff.id}»: в строках нет номера или линии отрыва`);
  }
  return { id: tariff.id, y, h: cursor, ruleY: number.y + number.h / 2, tearY: tear.y, rows };
}

/** Билеты один под другим и высота блока. */
export function placePricing(tariffs: readonly Tariff[]): {
  height: number;
  tickets: readonly PlacedTicket[];
} {
  const tickets: PlacedTicket[] = [];
  let y: number = BLOCK.firstTicketY;
  for (const tariff of tariffs) {
    const ticket = placeTicket(tariff, y);
    tickets.push(ticket);
    y += ticket.h + BLOCK.between;
  }
  return { height: y - BLOCK.between + BLOCK.below, tickets };
}
