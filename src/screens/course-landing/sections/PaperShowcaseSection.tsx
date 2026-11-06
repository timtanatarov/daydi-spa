import { showcaseArt, showcaseItemArt } from "../lib/blockArt";
import { Block, T, type ArtInsert } from "../ui/canvas";
import { CompareCarousel, type CompareItem, type ComparePair } from "./showcase/CompareCarousel";

const INK = "#49301C";

/**
 * Блок раздвинут по просьбе заказчика: между строками заголовков и пояснений и между самими
 * текстами нужно больше воздуха, а под подложками — место для точек. Арт остался прежним, в него
 * добавлены полосы той же бумаги: всё, что нарисовано ниже вставки (подложки, кольца, смена бумаги),
 * съезжает вниз вместе с ней.
 */
const INSERTS: ArtInsert[] = [
  // над подложкой второй группы
  { at: 640, height: 30 },
  // над подложкой третьей группы
  { at: 1150, height: 70 },
  // под подложкой третьей группы: бумага под выросшую подложку и точки (полоса взята над ней)
  { at: 1342, height: 70, from: 1150 },
];

/** На сколько съехало всё, что в макете лежит ниже первой и ниже второй вставки. */
const HOME_SHIFT = 30;
const BRANDS_SHIFT = 100;

const HEIGHT = 1342 + 30 + 70 + 70;

// Общие параметры однотипных слоёв; координаты и строки у каждого слоя свои.

/**
 * Заголовок группы: кегль 25, шаг строк 28. В макете шаг 17 — строки наезжали друг на друга,
 * заказчик попросил развести.
 */
const TITLE_LEADING = 28;
const titleProps = {
  as: "h2",
  size: 25,
  leading: TITLE_LEADING,
  font: "playfair",
  align: "center",
  color: INK,
} as const;

/**
 * Скобка вокруг заголовка — декоративный слой «(». Высотой она во весь заголовок, поэтому выросла
 * вместе с шагом его строк: 87 у трёх строк, 58 у двух (в макете 53 и 35); от текста отодвинута
 * на прежние 6.
 */
const parenProps = {
  as: "span",
  "aria-hidden": true,
  className: "select-none",
  w: 51,
  h: 17,
  leading: 17,
  font: "playfair",
  align: "center",
  color: INK,
} as const;

/** Правая скобка в макете — та же «(», отражённая по горизонтали. */
const MIRROR = [-1, 0, 0, 1] as const;

/** Поясняющие строки под заголовком: 17 при шаге строк 22; от заголовка — 16. */
const noteProps = { size: 17, leading: 22, align: "center", color: INK } as const;

type Rect = { x: number; y: number; w: number; h: number };

/** Поля страницы: заказчик попросил 16 вместо широких полей макета. */
const GUTTER = 16;

/**
 * Подложка группы и её пара карточек, растянутые до полей страницы: всё растёт от левого верхнего
 * угла подложки в одно и то же число раз. Подпись остаётся кеглем 17 — меняется только её место.
 */
function widen(viewport: Rect, pair: ComparePair): { viewport: Rect; pair: ComparePair } {
  const k = (390 - 2 * GUTTER) / viewport.w;
  const px = (x: number) => GUTTER + (x - viewport.x) * k;
  const py = (y: number) => viewport.y + (y - viewport.y) * k;
  const item = ({ box, caption, ...rest }: CompareItem): CompareItem => ({
    ...rest,
    box: { x: px(box.x), y: py(box.y), w: box.w * k, h: box.h * k },
    // строка подписи высотой 15: растёт её место, а не кегль — держим середину строки
    caption: { ...caption, x: px(caption.x), y: py(caption.y + 7.5) - 7.5, w: caption.w * k },
  });
  return {
    viewport: { x: GUTTER, y: viewport.y, w: viewport.w * k, h: viewport.h * k },
    pair: { left: item(pair.left), right: item(pair.right) },
  };
}

/**
 * Пары для сравнения. В макете нарисовано по одной паре на группу, и это пока заглушки:
 * как и раньше на сайте, пара повторена дважды, чтобы карусель листалась.
 * Настоящие пары добавляются сюда же: картинки карточек и подписи.
 */
const CLOTHES_PAIR: ComparePair = {
  left: {
    art: showcaseItemArt["1a"],
    box: { x: 36, y: 221, w: 157, h: 172 },
    caption: { fig: "382:212", text: "zara", x: 20, y: 397, w: 190 },
  },
  right: {
    art: showcaseItemArt["1b"],
    box: { x: 198, y: 221, w: 157, h: 172 },
    caption: { fig: "382:213", text: "таобао", x: 181, y: 397, w: 190 },
  },
};

const HOME_PAIR: ComparePair = {
  left: {
    art: showcaseItemArt["2a"],
    box: { x: 57, y: 723 + HOME_SHIFT, w: 131, h: 131 },
    caption: { fig: "397:354", text: "zara", x: 33, y: 859 + HOME_SHIFT, w: 175 },
  },
  right: {
    art: showcaseItemArt["2b"],
    box: { x: 203, y: 723 + HOME_SHIFT, w: 131, h: 131 },
    caption: { fig: "397:355", text: "таобао", x: 180, y: 859 + HOME_SHIFT, w: 175 },
  },
};

const BRANDS_PAIR: ComparePair = {
  left: {
    art: showcaseItemArt["3a"],
    box: { x: 58, y: 1180 + BRANDS_SHIFT, w: 131, h: 131 },
    caption: { fig: "397:362", text: "zara", x: 34, y: 1316 + BRANDS_SHIFT, w: 175 },
  },
  right: {
    art: showcaseItemArt["3b"],
    box: { x: 204, y: 1180 + BRANDS_SHIFT, w: 131, h: 131 },
    caption: { fig: "397:363", text: "таобао", x: 181, y: 1316 + BRANDS_SHIFT, w: 175 },
  },
};

/**
 * Сравнение цен на бумажном фоне: три группы «заголовок в скобках + карусель пар zara / таобао».
 * Кольца-разделители запечены в арт блока; подложки рисует сама карусель — они шире, чем в макете
 * (до полей страницы), и закрывают собой запечённые. Карточки товаров — отдельные картинки,
 * потому что листаются. Под каждой подложкой — точки карусели.
 */
const CLOTHES = widen({ x: 29, y: 207, w: 333, h: 220 }, CLOTHES_PAIR);
const HOME = widen({ x: 41, y: 704 + HOME_SHIFT, w: 308, h: 180 }, HOME_PAIR);
const BRANDS = widen({ x: 42, y: 1161 + BRANDS_SHIFT, w: 308, h: 180 }, BRANDS_PAIR);

export function PaperShowcaseSection() {
  return (
    <Block
      name="04-showcase"
      id="prices"
      height={HEIGHT}
      art={showcaseArt}
      background="#D4CEC4"
      artHeight={1342}
      artInserts={INSERTS}
    >
      {/* Одежда, обувь и аксессуары */}
      <T {...parenProps} fig="397:373" x={32} y={118} size={87}>
        (
      </T>
      <T {...titleProps} fig="382:202" x={74} y={86} w={242} h={3 * TITLE_LEADING}>
        вот такие наценки
        <br />
        на обычной одежде,
        <br />
        обуви и аксессуарах
      </T>
      <T {...parenProps} fig="397:374" x={358} y={118} size={87} matrix={MIRROR}>
        (
      </T>
      <CompareCarousel
        label="Наценки на одежду, обувь и аксессуары"
        viewport={CLOTHES.viewport}
        pairs={[CLOTHES.pair, CLOTHES.pair]}
      />

      {/* Товары для дома */}
      <T {...parenProps} fig="397:376" x={42.7} y={588} size={58}>
        (
      </T>
      <T {...titleProps} fig="382:203" x={75} y={570} w={240} h={2 * TITLE_LEADING}>
        а такая разница
        <br />в товарах для дома
      </T>
      <T {...parenProps} fig="397:375" x={347.3} y={588} size={58} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:211" x={20} y={642} w={350} h={66}>
        можно обустроить квартиру
        <br />
        как из pinterest, но в 3-5 раз
        <br />
        дешевле, чем у нас!
      </T>
      <CompareCarousel
        label="Разница в товарах для дома"
        viewport={HOME.viewport}
        pairs={[HOME.pair, HOME.pair]}
      />

      {/* Бренды, по которым соскучились */}
      <T {...parenProps} fig="397:379" x={13.7} y={1145} size={87}>
        (
      </T>
      <T {...titleProps} fig="382:265" x={45} y={1113} w={300} h={3 * TITLE_LEADING}>
        еще можно заказывать
        <br />
        бренды, по которым
        <br />
        мы соскучились
      </T>
      <T {...parenProps} fig="397:378" x={376.3} y={1145} size={87} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:267" x={82} y={1213} w={226} h={22}>
        с выгодой до 70%
      </T>
      <CompareCarousel
        label="Бренды, по которым мы соскучились"
        viewport={BRANDS.viewport}
        pairs={[BRANDS.pair, BRANDS.pair]}
      />
    </Block>
  );
}
