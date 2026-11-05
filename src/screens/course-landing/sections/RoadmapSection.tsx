import { roadmapArt, roadmapCardClipArt, roadmapCardSealArt } from "../lib/blockArt";
import { Block, Pic, T, boxStyle, u, type BlockArt } from "../ui/canvas";

const INK = "#49301C";

/** Окно горизонтальной прокрутки: на всю ширину блока, по высоте — карточки целиком. */
const RAIL = { x: 0, y: 143, w: 390, h: 273 };

/** Лист с зажимом (слой 396:338) и лист с печатью (слой 396:335) — как стоят в макете. */
const CLIP_CARD = { x: 25, y: 143, w: 211, h: 273 };
const SEAL_CARD = { x: 174, y: 178, w: 196, h: 206 };

/**
 * Третья карточка в макете не нарисована: за правым краем фрейма лежат только её тексты.
 * По ним она стоит на 365 правее первой; лист — такой же, как у первой.
 */
const THIRD_SHIFT = 365;

/** Ширина ленты: правый край третьей карточки плюс такое же поле, как слева от первой. */
const RAIL_WIDTH = CLIP_CARD.x + THIRD_SHIFT + CLIP_CARD.w + CLIP_CARD.x;

type CardText = { fig?: string; x: number; y: number; w: number; lines: string[] };

type Card = {
  art: BlockArt;
  box: { x: number; y: number; w: number; h: number };
  title: CardText;
  text: CardText;
  /** первая карточка в макете лежит поверх второй */
  onTop?: boolean;
};

const CARDS: Card[] = [
  {
    art: roadmapCardClipArt,
    box: CLIP_CARD,
    title: { fig: "382:281", x: 25, y: 246, w: 149, lines: ["знакомство", "с маркетплейсами"] },
    text: { fig: "382:286", x: 42, y: 277, w: 115, lines: ["регистрация без риска", "блокировки"] },
    onTop: true,
  },
  {
    art: roadmapCardSealArt,
    box: SEAL_CARD,
    title: { fig: "382:283", x: 202, y: 259, w: 149, lines: ["поиск товаров"] },
    text: {
      fig: "382:291",
      x: 204,
      y: 277,
      w: 145,
      lines: [
        "как находить любые товары,",
        "бренды в разы дешевле, чем",
        "у нас? все про экспортные",
        "товары",
      ],
    },
  },
  {
    art: roadmapCardClipArt,
    box: { ...CLIP_CARD, x: CLIP_CARD.x + THIRD_SHIFT },
    // тексты — слои 382:285 и 382:293 макета; по вертикали стоят по центру, как у первой карточки
    title: { x: 390, y: 252, w: 149, lines: ["рейтинг продавцов"] },
    text: { x: 397, y: 271, w: 136, lines: ["как выбрать хороший", "товар?"] },
  },
];

/**
 * Строки текстового слоя, как в макете. Пробел перед <br /> на раскладку не влияет (в конце строки
 * он схлопывается), но не даёт словам соседних строк склеиться в textContent.
 */
function lines(items: string[]) {
  return items.flatMap((line, index) =>
    index < items.length - 1 ? [`${line} `, <br key={index} />] : [line],
  );
}

/** Дорожная карта курса: заголовок и ряд карточек тем, который листается по горизонтали. */
export function RoadmapSection() {
  return (
    <Block name="07-roadmap" height={456} art={roadmapArt}>
      <T
        fig="382:298"
        x={82}
        y={107}
        w={226}
        h={10}
        size={10}
        leading={10}
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

      {/* tabIndex: прокручиваемую область должно быть можно листать с клавиатуры */}
      <div
        role="group"
        aria-label="Темы курса"
        tabIndex={0}
        className="scrollbar-hide overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none focus-visible:outline-solid"
        style={{
          ...boxStyle(RAIL),
          outlineColor: INK,
          outlineWidth: u(2),
          outlineOffset: u(-4),
        }}
      >
        <div className="relative h-full" style={{ width: u(RAIL_WIDTH) }}>
          {CARDS.map((card) => (
            <article
              key={card.title.lines.join(" ")}
              className={card.onTop ? "z-10" : undefined}
              style={boxStyle({ ...card.box, origin: RAIL })}
            >
              <Pic art={card.art} {...card.box} origin={card.box} />
              <T
                as="h3"
                fig={card.title.fig}
                origin={card.box}
                x={card.title.x}
                y={card.title.y}
                w={card.title.w}
                h={card.title.lines.length * 13}
                size={13}
                leading={13}
                font="playfair"
                align="center"
                color={INK}
              >
                {lines(card.title.lines)}
              </T>
              <T
                fig={card.text.fig}
                origin={card.box}
                x={card.text.x}
                y={card.text.y}
                w={card.text.w}
                h={card.text.lines.length * 13}
                size={10}
                leading={13}
                align="center"
                color={INK}
              >
                {lines(card.text.lines)}
              </T>
            </article>
          ))}
        </div>
      </div>
    </Block>
  );
}
