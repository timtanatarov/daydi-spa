import { roadmapArt, roadmapCardClipArt, roadmapCardSealArt } from "../lib/blockArt";
import { Block, Pic, T, boxStyle, type BlockArt } from "../ui/canvas";
import { RoadmapRail } from "./roadmap/RoadmapRail";

const INK = "#49301C";

type Rect = { x: number; y: number; w: number; h: number };

/**
 * Макета блока под крупный шрифт нет — он собран здесь из тех же картинок. Карточки увеличены так,
 * чтобы текст кеглем 17 лежал на листе с полями не меньше 10; обе картинки — в одно и то же число раз.
 * Всё, что ниже, считается от этого числа: рамки карточек, лента, стрелка и высота блока.
 */
const SCALE = 1.45;

/** Картинка карточки в размерах макета, до увеличения. */
type Sheet = {
  art: BlockArt;
  /** рамка картинки */
  w: number;
  h: number;
  /** сам лист внутри рамки: вокруг него прозрачный запас */
  paper: Rect;
  /** верх зажима или печати */
  top: number;
  /** их нижний край: ниже него лист свободен под текст */
  clear: number;
};

/** Лист с зажимом (слой 396:338) и лист с печатью (слой 396:335). */
const CLIP_SHEET: Sheet = {
  art: roadmapCardClipArt,
  w: 211,
  h: 273,
  paper: { x: 1.5, y: 72, w: 141.5, h: 140 },
  top: 32,
  clear: 78,
};
const SEAL_SHEET: Sheet = {
  art: roadmapCardSealArt,
  w: 196,
  h: 206,
  paper: { x: 13, y: 44.5, w: 180.5, h: 127.5 },
  top: 32.5,
  clear: 72.5,
};

/** Поле слева от листа первой карточки и справа от листа последней — как в макете. */
const EDGE = 26.5;
/** Просветы между листами в макете (первый — второй, второй — третий): растут вместе с карточками. */
const GAPS = [19, 24];
/** Линия, на которой стоят середины всех листов. */
const PAPER_CENTER_Y = 336.5;

/** Заголовок карточки (Playfair), её текст (Inter) и просвет между ними. */
const TITLE = { size: 17, leading: 18 };
const TEXT = { size: 17, leading: 20 };
const TITLE_GAP = 7;

type CardText = { fig?: string; lines: string[] };

type CardContent = {
  sheet: Sheet;
  title: CardText;
  text: CardText;
  /** первая карточка в макете лежит поверх второй */
  onTop?: boolean;
};

/** Слова — как в макете; на строки текст разбит заново, под ширину листа. */
const CONTENT: CardContent[] = [
  {
    sheet: CLIP_SHEET,
    title: { fig: "382:281", lines: ["знакомство", "с маркетплейсами"] },
    text: { fig: "382:286", lines: ["регистрация", "без риска", "блокировки"] },
    onTop: true,
  },
  {
    sheet: SEAL_SHEET,
    title: { fig: "382:283", lines: ["поиск товаров"] },
    text: {
      fig: "382:291",
      lines: [
        "как находить любые",
        "товары, бренды в разы",
        "дешевле, чем у нас?",
        "все про экспортные товары",
      ],
    },
  },
  {
    // третья карточка в макете не нарисована: за правым краем фрейма лежат только её тексты
    // (слои 382:285 и 382:293); лист — такой же, как у первой
    sheet: CLIP_SHEET,
    title: { lines: ["рейтинг продавцов"] },
    text: { lines: ["как выбрать", "хороший товар?"] },
  },
];

/** Где лента останавливается на карточке: первая встаёт у левого поля, последняя — у правого. */
type Snap = "start" | "center" | "end";

const SNAP_CLASS: Record<Snap, string> = {
  start: "snap-start",
  center: "snap-center",
  end: "snap-end",
};

const round = (value: number) => Math.round(value * 100) / 100;

/** Левый край листа карточки: поле, затем листы и просветы между ними. */
const paperX = (index: number): number =>
  index === 0
    ? EDGE
    : paperX(index - 1) + (CONTENT[index - 1].sheet.paper.w + GAPS[index - 1]) * SCALE;

const CARDS = CONTENT.map((card, index) => {
  const { sheet } = card;
  const paper: Rect = {
    x: round(paperX(index)),
    y: round(PAPER_CENTER_Y - (sheet.paper.h * SCALE) / 2),
    w: round(sheet.paper.w * SCALE),
    h: round(sheet.paper.h * SCALE),
  };
  // рамка всей картинки: лист стоит в ней так же, как в макете
  const box: Rect = {
    x: round(paper.x - sheet.paper.x * SCALE),
    y: round(paper.y - sheet.paper.y * SCALE),
    w: round(sheet.w * SCALE),
    h: round(sheet.h * SCALE),
  };
  const titleH = card.title.lines.length * TITLE.leading;
  const textH = card.text.lines.length * TEXT.leading;
  // текст — по центру свободной части листа: от зажима или печати до нижнего края
  const free = { top: box.y + sheet.clear * SCALE, bottom: paper.y + paper.h };
  const titleY = round((free.top + free.bottom - (titleH + TITLE_GAP + textH)) / 2);
  const snap: Snap = index === 0 ? "start" : index === CONTENT.length - 1 ? "end" : "center";
  return {
    ...card,
    paper,
    box,
    titleY,
    titleH,
    textY: titleY + titleH + TITLE_GAP,
    textH,
    snap,
  };
});

/** Верх самого высокого зажима и низ самого низкого листа. */
const CARDS_TOP = Math.min(...CARDS.map(({ box, sheet }) => box.y + sheet.top * SCALE));
const CARDS_BOTTOM = Math.max(...CARDS.map(({ paper }) => paper.y + paper.h));

/** Окно горизонтальной прокрутки: на всю ширину блока, по высоте — карточки с запасом в 10. */
const RAIL: Rect = {
  x: 0,
  y: round(CARDS_TOP - 10),
  w: 390,
  h: round(CARDS_BOTTOM - CARDS_TOP + 20),
};

/** Ширина ленты: правый край листа последней карточки плюс такое же поле, как слева от первой. */
const LAST_PAPER = CARDS[CARDS.length - 1].paper;
const RAIL_WIDTH = round(LAST_PAPER.x + LAST_PAPER.w + EDGE);

/** Сдвиги ленты, в которых она останавливается, — по одному на карточку (те же, что даёт scroll-snap). */
const STOPS = CARDS.map(({ paper, snap }) =>
  round(
    snap === "start"
      ? paper.x - EDGE
      : snap === "end"
        ? paper.x + paper.w + EDGE - RAIL.w
        : paper.x + paper.w / 2 - RAIL.w / 2,
  ),
);

/** Те же остановки в долях ширины окна — в таком виде их берёт лента. */
const STOP_SHARES = STOPS.map((stop) => stop / RAIL.w);

/**
 * Точки под карточками (в макете их нет): 24 от нижнего листа до точек, 8 — сами точки,
 * 30 — от них до края блока.
 */
const DOTS = { x: 195, y: CARDS_BOTTOM + 24 };
const HEIGHT = Math.ceil(DOTS.y + 8 + 30);

/**
 * Строки текстового слоя. Пробел перед <br /> на раскладку не влияет (в конце строки
 * он схлопывается), но не даёт словам соседних строк склеиться в textContent.
 */
function lines(items: string[]) {
  return items.flatMap((line, index) =>
    index < items.length - 1 ? [`${line} `, <br key={index} />] : [line],
  );
}

/**
 * Дорожная карта курса: заголовок, ряд карточек тем, который листается пальцем,
 * и стрелка «›» под ним. Ниже высоты арта (456) фон продолжает та же бумага.
 */
export function RoadmapSection() {
  return (
    <Block name="07-roadmap" id="roadmap" height={HEIGHT} art={roadmapArt} artHeight={456}>
      <T
        fig="382:298"
        x={42.5}
        y={96}
        w={305}
        h={20}
        size={17}
        leading={20}
        align="center"
        color={INK}
      >
        итак... что тебя ждет на этом курсе?
      </T>
      <T
        as="h2"
        fig="382:296"
        x={60}
        y={122}
        w={271}
        h={17}
        size={25}
        leading={17}
        font="playfair"
        align="center"
        color={INK}
      >
        дорожная карта курса
      </T>

      <RoadmapRail
        viewport={RAIL}
        width={RAIL_WIDTH}
        inset={EDGE}
        stops={STOP_SHARES}
        label="Темы курса"
        color={INK}
        dots={DOTS}
      >
        {CARDS.map((card) => (
          // рамка карточки — сам лист: по нему лента и останавливается; картинка выходит за него
          <article
            key={card.title.lines.join(" ")}
            className={[SNAP_CLASS[card.snap], card.onTop && "z-10"].filter(Boolean).join(" ")}
            style={boxStyle({ ...card.paper, origin: RAIL })}
          >
            <Pic art={card.sheet.art} {...card.box} origin={card.paper} eager />
            <T
              as="h3"
              fig={card.title.fig}
              origin={card.paper}
              x={card.paper.x}
              y={card.titleY}
              w={card.paper.w}
              h={card.titleH}
              size={TITLE.size}
              leading={TITLE.leading}
              font="playfair"
              align="center"
              color={INK}
            >
              {lines(card.title.lines)}
            </T>
            <T
              fig={card.text.fig}
              origin={card.paper}
              x={card.paper.x}
              y={card.textY}
              w={card.paper.w}
              h={card.textH}
              size={TEXT.size}
              leading={TEXT.leading}
              align="center"
              color={INK}
            >
              {lines(card.text.lines)}
            </T>
          </article>
        ))}
      </RoadmapRail>
    </Block>
  );
}
