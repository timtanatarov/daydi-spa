import { showcaseArt, showcaseItemArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";
import { CompareCarousel, type ComparePair } from "./showcase/CompareCarousel";

const INK = "#49301C";

// Общие параметры однотипных слоёв; координаты и строки у каждого слоя свои.

/** Заголовок группы. */
const titleProps = {
  as: "h2",
  size: 21,
  leading: 17,
  font: "playfair",
  align: "center",
  color: INK,
} as const;

/** Скобка вокруг заголовка — декоративный слой «(». */
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

/** Поясняющая строка под заголовком. */
const noteProps = { size: 10, leading: 10, align: "center", color: INK } as const;

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
    box: { x: 57, y: 723, w: 131, h: 131 },
    caption: { fig: "397:354", text: "zara", x: 33, y: 859, w: 175 },
  },
  right: {
    art: showcaseItemArt["2b"],
    box: { x: 203, y: 723, w: 131, h: 131 },
    caption: { fig: "397:355", text: "таобао", x: 180, y: 859, w: 175 },
  },
};

const BRANDS_PAIR: ComparePair = {
  left: {
    art: showcaseItemArt["3a"],
    box: { x: 58, y: 1180, w: 131, h: 131 },
    caption: { fig: "397:362", text: "zara", x: 34, y: 1316, w: 175 },
  },
  right: {
    art: showcaseItemArt["3b"],
    box: { x: 204, y: 1180, w: 131, h: 131 },
    caption: { fig: "397:363", text: "таобао", x: 181, y: 1316, w: 175 },
  },
};

/**
 * Сравнение цен на бумажном фоне: три группы «заголовок в скобках + карусель пар zara / таобао».
 * Подложки групп, кольца-разделители и стрелки «›» запечены в арт блока; карточки товаров —
 * отдельные картинки, потому что листаются.
 */
export function PaperShowcaseSection() {
  return (
    <Block name="04-showcase" height={1342} art={showcaseArt}>
      {/* Одежда, обувь и аксессуары */}
      <T {...parenProps} fig="397:373" x={40} y={116.5} size={53}>
        (
      </T>
      <T {...titleProps} fig="382:202" x={74} y={101} w={242} h={51}>
        вот такие наценки
        <br />
        на обычной одежде,
        <br />
        обуви и аксессуарах
      </T>
      <T {...parenProps} fig="397:374" x={350} y={116.5} size={53} matrix={MIRROR}>
        (
      </T>
      <CompareCarousel
        label="Наценки на одежду, обувь и аксессуары"
        viewport={{ x: 29, y: 207, w: 333, h: 220 }}
        arrow={{ x: 366, y: 305, w: 11.8, h: 23.2 }}
        pairs={[CLOTHES_PAIR, CLOTHES_PAIR]}
      />

      {/* Товары для дома */}
      <T {...parenProps} fig="397:376" x={64} y={621.5} size={35}>
        (
      </T>
      <T {...titleProps} fig="382:203" x={92} y={614} w={207} h={34}>
        а такая разница
        <br />в товарах для дома
      </T>
      <T {...parenProps} fig="397:375" x={327} y={621.5} size={35} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:211" x={82} y={660} w={226} h={20}>
        можно обустроить квартиру как из pinterest,
        <br />
        но в 3-5 раз дешевле, чем у нас!
      </T>
      <CompareCarousel
        label="Разница в товарах для дома"
        viewport={{ x: 41, y: 704, w: 308, h: 180 }}
        arrow={{ x: 358, y: 782, w: 10.6, h: 24 }}
        pairs={[HOME_PAIR, HOME_PAIR]}
      />

      {/* Бренды, по которым соскучились */}
      <T {...parenProps} fig="397:379" x={40} y={1080.5} size={53}>
        (
      </T>
      <T {...titleProps} fig="382:265" x={78} y={1066} w={234} h={51}>
        еще можно заказывать
        <br />
        бренды, по которым
        <br />
        мы соскучились
      </T>
      <T {...parenProps} fig="397:378" x={350} y={1080.5} size={53} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:267" x={82} y={1127} w={226} h={10}>
        с выгодой до 70%
      </T>
      <CompareCarousel
        label="Бренды, по которым мы соскучились"
        viewport={{ x: 42, y: 1161, w: 308, h: 180 }}
        arrow={{ x: 358, y: 1239, w: 10.6, h: 24 }}
        pairs={[BRANDS_PAIR, BRANDS_PAIR]}
      />
    </Block>
  );
}
