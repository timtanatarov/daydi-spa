import {
  aboutArt,
  aboutClipArt,
  aboutPhotoArt,
  aboutStarArt,
  aboutTapeBottomArt,
  aboutTapeTopArt,
} from "../lib/blockArt";
import { Block, Pic, T, boxStyle, type ArtInsert } from "../ui/canvas";

type Rect = { x: number; y: number; w: number; h: number };

/** Заголовок на скотче: объединяющий прямоугольник слоёв 352:183 и 352:184. */
const TITLE = { x: 92, y: 86, w: 207, h: 60 };

/** Поля страницы слева и справа: заказчик попросил 16 вместо широких полей макета. */
const GUTTER = 16;

/**
 * Фото (слой «IMG_2441 1», в макете 188×235 от x = 101) растянуто почти на всю ширину между полями:
 * заказчик дважды просил сделать его больше. Верхний край остался на месте — фото растёт вниз
 * и в стороны. Кусочки скотча увеличены в 1.25 раза и держатся за те же углы фото, что в макете.
 */
const PHOTO_MOCKUP = { x: 101, y: 337.5, w: 188, h: 235 };
const PHOTO: Rect = { x: 32, y: PHOTO_MOCKUP.y, w: 326, h: 407.5 };
const TAPE_SCALE = 1.25;
/** Скотч у правого верхнего угла (в макете 76×67 от 242, 317) и у левого нижнего (152×152 от 37, 486). */
const TAPE_TOP: Rect = {
  x: PHOTO.x + PHOTO.w + (242 - (PHOTO_MOCKUP.x + PHOTO_MOCKUP.w)) * TAPE_SCALE,
  y: PHOTO.y + (317 - PHOTO_MOCKUP.y) * TAPE_SCALE,
  w: 76 * TAPE_SCALE,
  h: 67 * TAPE_SCALE,
};
const TAPE_BOTTOM: Rect = {
  x: PHOTO.x + (37 - PHOTO_MOCKUP.x) * TAPE_SCALE,
  y: PHOTO.y + PHOTO.h + (486 - (PHOTO_MOCKUP.y + PHOTO_MOCKUP.h)) * TAPE_SCALE,
  w: 152 * TAPE_SCALE,
  h: 152 * TAPE_SCALE,
};

/**
 * Скрепка на углу жёлтой заметки (в макете 60×60 от 299, 177) увеличена в 1.6 раза от своей
 * середины: заказчик попросил — была слишком тонкой и незаметной.
 */
const CLIP: Rect = { x: 281, y: 159, w: 96, h: 96 };

/**
 * Фото стало ниже на 172.5 — всё, что под ним, съехало на 174: в арт под фото вставлены полосы
 * бумаги (три подряд, каждая из чистой полосы 580…610 над вставкой — выше неё стык листов бумаги),
 * нижние фотографии в арте съезжают вместе с ними.
 */
const SHIFT = 174;
const INSERTS: ArtInsert[] = [
  { at: 610, height: 60 },
  { at: 610, height: 60 },
  { at: 610, height: 54 },
];

/**
 * Пункты списка стоят «лесенкой» заметнее, чем в макете: нечётные правее, чётные левее —
 * заказчик попросил развести (в макете всё стояло слишком по центру) и прижать к полям страницы.
 * Чётные пункты начинаются от левого поля (у него стоит их звёздочка), нечётные — кончаются
 * у правого: самая длинная строка каждого доходит до поля (width — её ширина при кегле 17;
 * 2 — запас на поворот строки).
 */
const TEXT_X_EVEN = GUTTER + 33;
const textXOdd = (width: number) => 390 - GUTTER - 2 - width;

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
    width: 195.8,
    box: { x: 132.59, y: 613.36, w: 196.8, h: 45 },
    rotate: 2.5,
    star: { x: 93, y: 618.5 },
    lines: ["экономлю 20-40 тысяч", "рублей ежемесячно", "благодаря Китаю"],
  },
  {
    fig: "352:188",
    width: 242,
    box: { x: 72.01, y: 692.7, w: 243.41, h: 45 },
    rotate: -2.5,
    star: { x: 35, y: 699 },
    lines: ["собираю стильный гардероб", "как у инфлюенсеров,", "но до 10 раз дешевле"],
  },
  {
    fig: "352:189",
    width: 238.4,
    box: { x: 130.98, y: 762.72, w: 239.62, h: 30 },
    rotate: 2.5,
    star: { x: 91, y: 759 },
    lines: ["делюсь честными обзорами", "и распаковками в блоге"],
  },
  {
    fig: "352:190",
    width: 222.6,
    box: { x: 75.89, y: 821.38, w: 222.47, h: 30 },
    rotate: -2.5,
    star: { x: 38.5, y: 818.5 },
    lines: ["обучаю других выгодному", "шопингу на Таобао и 1688"],
  },
].map((item, index) => {
  const dx = (index % 2 === 0 ? textXOdd(item.width) : TEXT_X_EVEN) - item.box.x;
  const height = item.lines.length * FACT_LEADING;
  const grown = height - item.lines.length * FACT_LEADING_MOCKUP;
  return {
    ...item,
    box: { ...item.box, x: item.box.x + dx, y: item.box.y + SHIFT, h: height },
    star: { x: item.star.x + dx, y: item.star.y + SHIFT + grown / 2, w: 38, h: 38 },
    starArt: aboutStarArt[index % 2],
  };
});

/**
 * Высота блока: арт (1221) со вставкой, без нижних 76 — в макете под нижними фотографиями
 * оставалось 127 пустой бумаги, заказчик попросил меньше; лишнее просто не показывается.
 */
const HEIGHT = 1221 + SHIFT - 76;

/** Контейнер списка: объединяющий прямоугольник пунктов. */
const FACTS = { x: GUTTER, y: 613.36 + SHIFT, w: 390 - 2 * GUTTER, h: 250 };

/**
 * Об авторе: «Привет, я Индира», жёлтая заметка, фото и четыре факта. Бумага, заметка и нижние
 * фотографии — в арте; фото со скотчем и звёздочки — отдельные слои (см. выше, почему).
 */
export function AboutIndiraSection() {
  return (
    <Block
      name="02-about"
      id="about"
      height={HEIGHT}
      art={aboutArt}
      background="#DBD3C8"
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

      <Pic art={aboutClipArt} {...CLIP} />
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
