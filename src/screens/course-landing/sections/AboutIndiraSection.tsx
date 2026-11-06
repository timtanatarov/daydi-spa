import {
  aboutArt,
  aboutPhotoArt,
  aboutStarArt,
  aboutTapeBottomArt,
  aboutTapeTopArt,
} from "../lib/blockArt";
import { Block, Pic, T, boxStyle, type ArtInsert } from "../ui/canvas";

type Rect = { x: number; y: number; w: number; h: number };

/** Заголовок на скотче: объединяющий прямоугольник слоёв 352:183 и 352:184. */
const TITLE = { x: 92, y: 86, w: 207, h: 60 };

/**
 * Фото с двумя кусочками скотча увеличено в 1.25 раза по просьбе заказчика. Растёт от середины
 * своего верхнего края — вниз и в стороны, чтобы не подойти к жёлтой заметке над ним.
 */
const PHOTO_SCALE = 1.25;
const PHOTO_ANCHOR = { x: 195, y: 337.5 };
const enlarged = ({ x, y, w, h }: Rect): Rect => ({
  x: PHOTO_ANCHOR.x + (x - PHOTO_ANCHOR.x) * PHOTO_SCALE,
  y: PHOTO_ANCHOR.y + (y - PHOTO_ANCHOR.y) * PHOTO_SCALE,
  w: w * PHOTO_SCALE,
  h: h * PHOTO_SCALE,
});
/** Слои макета «IMG_2441 1» и два куска скотча на его углах. */
const PHOTO = enlarged({ x: 101, y: 337.5, w: 188, h: 235 });
const TAPE_TOP = enlarged({ x: 242, y: 317, w: 76, h: 67 });
const TAPE_BOTTOM = enlarged({ x: 37, y: 486, w: 152, h: 152 });

/**
 * Фото стало ниже на 59 — всё, что под ним, съехало на 60: в арт под фото вставлена полоса бумаги,
 * нижние фотографии в арте съезжают вместе с ней.
 */
const SHIFT = 60;
const INSERTS: ArtInsert[] = [{ at: 610, height: SHIFT }];

/**
 * Пункты списка стоят «лесенкой» заметнее, чем в макете: нечётные правее, чётные левее —
 * заказчик попросил развести, в макете всё стояло слишком по центру.
 */
const SHIFT_ODD = 8;
const SHIFT_EVEN = -22;

/**
 * Шаг строк пунктов: в макете 15 при кегле 17 — строки наезжали друг на друга; разведены,
 * как остальные тексты страницы. Пункт растёт вниз, звёздочка остаётся по его середине.
 */
const FACT_LEADING = 20;
const FACT_LEADING_MOCKUP = 15;

/** Пункты — слои 352:187…352:190 с их поворотом; star — звёздочка слева от пункта (в макете 37.5×37.5). */
const FACT_ITEMS = [
  {
    fig: "352:187",
    box: { x: 132.59, y: 613.36, w: 196.8, h: 45 },
    rotate: 2.5,
    star: { x: 93, y: 618.5 },
    lines: ["экономлю 20-40 тысяч", "рублей ежемесячно", "благодаря Китаю"],
  },
  {
    fig: "352:188",
    box: { x: 72.01, y: 692.7, w: 243.41, h: 45 },
    rotate: -2.5,
    star: { x: 35, y: 699 },
    lines: ["собираю стильный гардероб", "как у инфлюенсеров,", "но до 10 раз дешевле"],
  },
  {
    fig: "352:189",
    box: { x: 130.98, y: 762.72, w: 239.62, h: 30 },
    rotate: 2.5,
    star: { x: 91, y: 759 },
    lines: ["делюсь честными обзорами", "и распаковками в блоге"],
  },
  {
    fig: "352:190",
    box: { x: 75.89, y: 821.38, w: 222.47, h: 30 },
    rotate: -2.5,
    star: { x: 38.5, y: 818.5 },
    lines: ["обучаю других выгодному", "шопингу на Таобао и 1688"],
  },
].map((item, index) => {
  const dx = index % 2 === 0 ? SHIFT_ODD : SHIFT_EVEN;
  const height = item.lines.length * FACT_LEADING;
  const grown = height - item.lines.length * FACT_LEADING_MOCKUP;
  return {
    ...item,
    box: { ...item.box, x: item.box.x + dx, y: item.box.y + SHIFT, h: height },
    star: { x: item.star.x + dx, y: item.star.y + SHIFT + grown / 2, w: 38, h: 38 },
    starArt: aboutStarArt[index % 2],
  };
});

/** Контейнер списка: объединяющий прямоугольник пунктов. */
const FACTS = { x: 54, y: 613.36 + SHIFT, w: 330, h: 250 };

/**
 * Об авторе: «Привет, я Индира», жёлтая заметка, фото и четыре факта. Бумага, заметка и нижние
 * фотографии — в арте; фото со скотчем и звёздочки — отдельные слои (см. выше, почему).
 */
export function AboutIndiraSection() {
  return (
    <Block
      name="02-about"
      id="about"
      height={1221 + SHIFT}
      art={aboutArt}
      artHeight={1221}
      artInserts={INSERTS}
    >
      <h2 style={boxStyle(TITLE)}>
        <T
          as="span"
          fig="352:183"
          origin={TITLE}
          x={92}
          y={86}
          w={139}
          h={30}
          size={36}
          leading={30}
          font="playfair"
          italic
          align="center"
          color="#49301C"
        >
          Привет,
        </T>{" "}
        <T
          as="span"
          fig="352:184"
          origin={TITLE}
          x={145}
          y={116}
          w={154}
          h={30}
          size={36}
          leading={30}
          font="playfair"
          italic
          align="center"
          color="#49301C"
        >
          я Индира
        </T>
      </h2>

      <T
        fig="352:186"
        x={52}
        // жёлтая заметка в арте — 197…299; в макете шаг строк 14, строки наезжали друг на друга
        y={208}
        w={287}
        h={80}
        size={17}
        leading={20}
        weight={500}
        align="center"
        color="#49301C"
      >
        уже больше 4 лет я заказываю
        <br />
        себе одежду, аксессуары
        <br />
        и декор для дома с китайских
        <br />
        маркетплейсов таобао и 1688 <span aria-hidden>🇨🇳</span>
      </T>

      <Pic art={aboutPhotoArt} alt="Индира в бежевой куртке у деревянной стены" {...PHOTO} />
      <Pic art={aboutTapeTopArt} {...TAPE_TOP} />
      <Pic art={aboutTapeBottomArt} {...TAPE_BOTTOM} />

      {FACT_ITEMS.map(({ fig, star, starArt }) => (
        <Pic key={fig} art={starArt} {...star} />
      ))}
      {/* role="list": без маркеров (list-style: none) Safari не объявляет ul списком */}
      <ul role="list" style={boxStyle(FACTS)}>
        {FACT_ITEMS.map(({ fig, box, rotate, lines }) => (
          <T
            key={fig}
            as="li"
            fig={fig}
            origin={FACTS}
            {...box}
            rotate={rotate}
            size={17}
            leading={FACT_LEADING}
            color="#49301C"
          >
            {lines.flatMap((line, index) =>
              index < lines.length - 1 ? [`${line} `, <br key={index} />] : [line],
            )}
          </T>
        ))}
      </ul>
    </Block>
  );
}
