/**
 * Раскладка блока тарифов. Макета под крупный шрифт для него нет, поэтому координаты
 * не переписаны из Figma, а считаются: билет описан списком строк (см. tariffs.ts), у каждой
 * строки своя высота и отступ до следующей. Отсюда получаются все y, высота билета, место
 * линии отрыва с боковыми вырезами и высота блока — правка текста сводится к правке строк.
 * Все числа — px макета (ширина фрейма 390), у строк — от левого верхнего угла билета.
 *
 * Билет набран как кассовый чек — так попросил заказчик: шапка (название и описание тарифа)
 * по центру, основное содержание от левого поля, разделы отбиты пунктиром, цены — строкой
 * «подпись слева, сумма справа», кнопка по центру.
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
  below: 110,
} as const;

/** Цвета блока — из макета. */
export const COLOR = {
  /** бумага билета и текст на кнопке */
  paper: "#EFEADE",
  /** заголовки, описания, линии */
  brown: "#49301C",
  /** сведения, списки, подзаголовки */
  ink: "#1E1E1E",
  /** цена и кнопка */
  red: "#531608",
  /** старая цена */
  gray: "#969696",
} as const;

/** Билет: кремовая бумага с вырезами (форма — в TicketPaper). */
export const TICKET = {
  // в макете билет 293 от x = 49; заказчик попросил поля страницы 16 — билет во всю ширину между ними
  x: 16,
  w: 358,
  fill: COLOR.paper,
  /** от верхнего края билета до названия тарифа */
  top: 30,
  /** линия отрыва: штрих 5 через 4, от выреза до выреза */
  tear: { weight: 1.7, dash: 5, space: 4, color: COLOR.brown },
  /** разделители разделов: пунктир или сплошная линия во всю колонку */
  rule: { weight: 1, dash: 5, space: 4, color: COLOR.brown },
  /** радиус боковых полукруглых вырезов, их центры — на краях билета у линии отрыва */
  notch: 20,
  /** вырез посередине нижнего края: верхние углы скруглены */
  tab: { w: 67, h: 12, r: 5 },
} as const;

/** Текстовая колонка билета: поля по 16. Ни одна строка не должна быть шире. */
export const COLUMN = { x: 16, w: 326 } as const;

/** Кегль и интерлиньяж: основной текст — Inter 17/20, как в блоках, увеличенных дизайнером. */
export const TYPE = {
  text: { size: 17, leading: 20 },
  /** название тарифа — Playfair */
  title: { size: 25, leading: 28 },
  /** итоговая цена и надпись на кнопке */
  total: { size: 24, leading: 24 },
} as const;

/** Кнопка «купить»: в макете 126×35 при кегле 19. Текст стоит по середине строчных букв. */
export const BUTTON = { w: 170, h: 46, textY: 9 } as const;

/** Отступы после строк. */
export const GAP = {
  /** название → описание */
  title: 10,
  /** между абзацами описания */
  paragraph: 8,
  /** описание → линия отрыва */
  stub: 28,
  /** линия отрыва → сведения о тарифе */
  tear: 24,
  /** от содержимого до разделителя и от разделителя до содержимого */
  section: 16,
  /** подзаголовок → его список */
  subhead: 8,
  /** между пунктами списка: без него пункты в две-три строки сливаются */
  item: 6,
  /** обычная цена → сплошная линия → итог */
  pair: 12,
  /** последний разделитель → кнопка */
  button: 24,
  /** кнопка → нижний край билета */
  bottom: 56,
} as const;

/** Строка билета. fig — id слоя в Figma, если у текста есть прямой предок в макете. */
export type TicketRow = {
  /** отступ до следующей строки, у последней — до нижнего края билета */
  gap: number;
} & (
  | { kind: "title"; fig: string; text: string }
  | {
      kind: "text";
      fig?: string;
      lines: readonly string[];
      weight: 300 | 400 | 600;
      color: string;
      /** по умолчанию по центру (шапка); содержимое — от левого поля билета */
      align?: "left" | "center";
    }
  /** линия отрыва с боковыми вырезами: высоты не занимает */
  | { kind: "tear" }
  /** разделитель разделов: высоты не занимает */
  | { kind: "divider"; line: "dashed" | "solid" }
  /** список без маркеров, как позиции в чеке: у каждого пункта свои строки */
  | { kind: "list"; fig: string; items: readonly (readonly string[])[] }
  /**
   * Строка «подпись слева — сумма справа». old — обычная цена, зачёркнута; total — итог, крупно.
   * spoken — цена одной фразой для скринридера (видимые подпись и сумма для него скрыты).
   */
  | {
      kind: "pair";
      fig: string;
      label: string;
      value: string;
      role: "old" | "total";
      spoken?: string;
    }
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
  /** линия отрыва — от верха билета */
  tearY: number;
  rows: readonly PlacedRow[];
};

function rowHeight(row: TicketRow): number {
  switch (row.kind) {
    case "title":
      return TYPE.title.leading;
    case "text":
      return row.lines.length * TYPE.text.leading;
    case "list": {
      const lines = row.items.reduce((sum, item) => sum + item.length, 0);
      return lines * TYPE.text.leading + (row.items.length - 1) * GAP.item;
    }
    case "tear":
    case "divider":
      return 0;
    case "pair":
      return row.role === "total" ? TYPE.total.leading : TYPE.text.leading;
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
  const tear = rows.find((row) => row.kind === "tear");
  if (!tear) throw new Error(`Тариф «${tariff.id}»: в строках нет линии отрыва`);
  return { id: tariff.id, y, h: cursor, tearY: tear.y, rows };
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
