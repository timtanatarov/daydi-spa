import { Fragment } from "react";
import { woodBenefitsTicketArt, woodBenefitsWoodArt } from "../lib/blockArt";
import { Block, boxStyle, Pic, T } from "../ui/canvas";

/** Межстрочный интервал пунктов (кегль 17). */
const LINE = 20;

/** Поля страницы и две колонки пунктов между ними. */
const GUTTER = 16;
const COLUMN_W = 176;
const LEFT_X = GUTTER;
const RIGHT_X = 390 - GUTTER - COLUMN_W;

/** Вертикальный ритм: между рядами пунктов и от рядов до плашки. */
const ROW_GAP = 26;
const PILL_GAP = 28;

/**
 * Жёлтая плашка заголовка: в макете 200×54 под кегль 21, здесь — под кегль 25. Шаг строк заголовка
 * 20, а не 17, как у заголовков макета: при 17 хвост «у» из «обучения» упирается в «ты».
 */
const PILL_SIZE = { w: 240, h: 65 };

type Item = { fig: string; lines: string[] };

/**
 * Результаты обучения — расстановка макета: пункт по центру, ряд из двух, плашка, ряд из двух,
 * пункт по центру. Шрифт крупный (17), поэтому пункты в рядах разбиты на строки заново —
 * под колонку 176; слова те же. По просьбе заказчика два пункта поменяны местами с соседями:
 * верхний — с правым пунктом первого ряда (в макете сверху стоял «перестанешь переплачивать…»),
 * нижний — с правым пунктом второго ряда (в макете внизу стоял «разберешься, как заказывать…»).
 */
const TOP: Item = {
  fig: "382:274",
  lines: ["будешь пользоваться базой", "проверенных магазинов и посредников"],
};
const ROW_ABOVE: [Item, Item] = [
  { fig: "382:275", lines: ["начнешь экономить", "десятки тысяч", "рублей ежемесячно"] },
  { fig: "382:271", lines: ["перестанешь", "переплачивать", "в 2–3 раза", "за те же вещи"] },
];
const ROW_BELOW: [Item, Item] = [
  {
    fig: "382:272",
    lines: ["научишься выбирать", "вещи, которые", "выглядят дорого", "и служат долго"],
  },
  {
    fig: "382:270",
    lines: ["разберешься,", "как заказывать", "на Taobao и 1688", "без ошибок", "и переплат"],
  },
];
const BOTTOM: Item = { fig: "382:273", lines: ["сможешь покупать", "оригинальные бренды дешевле"] };

const heightOf = (item: Item) => item.lines.length * LINE;
const rowHeight = (row: [Item, Item]) => Math.max(heightOf(row[0]), heightOf(row[1]));

/** Раскладка сверху вниз: у каждого пункта своя рамка; в ряду пункты стоят по его середине. */
const TOP_Y = 60;
const ROW_ABOVE_Y = TOP_Y + heightOf(TOP) + ROW_GAP;
const PILL = {
  x: (390 - PILL_SIZE.w) / 2,
  y: ROW_ABOVE_Y + rowHeight(ROW_ABOVE) + PILL_GAP,
  ...PILL_SIZE,
};
const ROW_BELOW_Y = PILL.y + PILL.h + PILL_GAP;
const BOTTOM_Y = ROW_BELOW_Y + rowHeight(ROW_BELOW) + ROW_GAP;
const LIST_BOTTOM = BOTTOM_Y + heightOf(BOTTOM);

const centered = (item: Item, y: number) => ({
  ...item,
  x: GUTTER,
  y,
  w: 390 - 2 * GUTTER,
  h: heightOf(item),
});
const inRow = (row: [Item, Item], y: number) =>
  row.map((item, index) => ({
    ...item,
    x: index === 0 ? LEFT_X : RIGHT_X,
    y: y + (rowHeight(row) - heightOf(item)) / 2,
    w: COLUMN_W,
    h: heightOf(item),
  }));

const RESULTS = [
  centered(TOP, TOP_Y),
  ...inRow(ROW_ABOVE, ROW_ABOVE_Y),
  ...inRow(ROW_BELOW, ROW_BELOW_Y),
  centered(BOTTOM, BOTTOM_Y),
];

/** Контейнер списка: от верха первого пункта до низа последнего, между полями страницы. */
const LIST = { x: GUTTER, y: TOP_Y, w: 390 - 2 * GUTTER, h: LIST_BOTTOM - TOP_Y };

/**
 * Билет — слой макета 400×119, увеличенный в 1.45 раза: заказчик попросил крупнее и бумагу, и текст
 * на ней (кегль 21 вместо 15 в макете). Сама бумага занимает в слое не всё: в макете это 241.7×110
 * от верха слоя, со сдвигом 78.3 от его левого края; после увеличения — 350×159.5, по центру блока,
 * почти от поля до поля страницы.
 */
const TICKET_SCALE = 1.45;
const TICKET_PAPER = { x: 78.33, w: 241.67, h: 110 };
const TICKET = {
  x: 195 - (TICKET_PAPER.x + TICKET_PAPER.w / 2) * TICKET_SCALE,
  y: LIST_BOTTOM + 50,
  w: 400 * TICKET_SCALE,
  h: 119 * TICKET_SCALE,
};
const TICKET_TEXT = { size: 21, leading: 25, lines: 3 };
const HEIGHT = Math.round(TICKET.y + TICKET_PAPER.h * TICKET_SCALE + 65);

/**
 * «После обучения ты…»: шесть результатов вокруг жёлтой плашки и билет с выводом.
 * Расстановка — как в макете, шрифт — крупный: в макете блок остался мелким (пункты кеглем 10),
 * поэтому координаты здесь свои, а не из Dev Mode. Плашка и билет, раньше запечённые в арт,
 * стали отдельными слоями: арт блока — только дерево.
 */
export function WoodBenefitsSection() {
  return (
    <Block
      name="06-wood-benefits"
      id="results"
      height={HEIGHT}
      art={woodBenefitsWoodArt}
      artHeight={607}
      background="#492B1B"
    >
      <div
        aria-hidden
        className="rounded-full"
        style={{ ...boxStyle(PILL), backgroundColor: "#FBE8B5" }}
      />
      {/* заголовок попадает в прямоугольник списка: z-10 поднимает его над ul, иначе текст не выделить */}
      <T
        as="h2"
        fig="382:277"
        x={PILL.x}
        y={PILL.y + 11}
        w={PILL.w}
        h={40}
        size={25}
        leading={20}
        font="playfair"
        align="center"
        color="#49301C"
        className="z-10"
      >
        после обучения
        <br />
        ты
      </T>

      {/* role="list": Safari не считает списком ul без маркеров */}
      <ul role="list" style={boxStyle(LIST)}>
        {RESULTS.map(({ fig, x, y, w, h, lines }) => (
          <T
            key={fig}
            as="li"
            fig={fig}
            x={x}
            y={y}
            w={w}
            h={h}
            origin={LIST}
            size={17}
            leading={LINE}
            align="center"
            color="#E9E5E2"
          >
            {lines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </T>
        ))}
      </ul>

      <Pic art={woodBenefitsTicketArt} {...TICKET} />
      {/* текст стоит на бумаге билета как в макете: поля над и под ним — в той же пропорции */}
      <T
        fig="382:278"
        x={45}
        // по середине бумаги, чуть выше — как в макете
        y={
          TICKET.y +
          (TICKET_PAPER.h * TICKET_SCALE - TICKET_TEXT.lines * TICKET_TEXT.leading) / 2 -
          3
        }
        w={300}
        h={TICKET_TEXT.lines * TICKET_TEXT.leading}
        size={TICKET_TEXT.size}
        leading={TICKET_TEXT.leading}
        font="playfair"
        align="center"
        color="#49301C"
      >
        и, скорее всего,
        <br />
        уже не захочешь покупать
        <br />
        как раньше
      </T>
    </Block>
  );
}
