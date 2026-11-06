import { showcaseArt, showcaseItemArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";
import { CompareCarousel, type ComparePair } from "./showcase/CompareCarousel";

const INK = "#49301C";

// Общие параметры однотипных слоёв; координаты и строки у каждого слоя свои.

/** Заголовок группы: кегль 25 при шаге строк 17 — как в первой группе макета. */
const titleProps = {
  as: "h2",
  size: 25,
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

/**
 * Поясняющие строки под заголовком. В макете они ещё мелкие (10): набраны, как крупный текст
 * первого экрана, — 17 при шаге строк 15.
 */
const noteProps = { size: 17, leading: 15, align: "center", color: INK } as const;

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
 * Крупный шрифт в макете есть только у первой группы. Вторая и третья набраны так же: заголовки 25,
 * подписи 17; скобки отодвинуты от ставших шире заголовков на прежний просвет, а заголовок второй
 * группы поднят на 10, чтобы под ним поместились три строки пояснения.
 *
 * Сравнение цен на бумажном фоне: три группы «заголовок в скобках + карусель пар zara / таобао».
 * Подложки групп и кольца-разделители запечены в арт блока; карточки товаров — отдельные
 * картинки, потому что листаются. Стрелки «›» — кнопки поверх арта, во всех группах одинаковые:
 * тонкие, как во второй и третьей группе макета.
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
        // в макете здесь стрелка потолще (группа 662:17): тонкая стоит по её центру
        arrow={{ x: 366.61, y: 304.62 }}
        pairs={[CLOTHES_PAIR, CLOTHES_PAIR]}
      />

      {/* Товары для дома */}
      <T {...parenProps} fig="397:376" x={46} y={611.5} size={35}>
        (
      </T>
      <T {...titleProps} fig="382:203" x={75} y={604} w={240} h={34}>
        а такая разница
        <br />в товарах для дома
      </T>
      <T {...parenProps} fig="397:375" x={345} y={611.5} size={35} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:211" x={20} y={646} w={350} h={45}>
        можно обустроить квартиру
        <br />
        как из pinterest, но в 3-5 раз
        <br />
        дешевле, чем у нас!
      </T>
      <CompareCarousel
        label="Разница в товарах для дома"
        viewport={{ x: 41, y: 704, w: 308, h: 180 }}
        arrow={{ x: 358, y: 782 }}
        pairs={[HOME_PAIR, HOME_PAIR]}
      />

      {/* Бренды, по которым соскучились */}
      <T {...parenProps} fig="397:379" x={18} y={1080.5} size={53}>
        (
      </T>
      <T {...titleProps} fig="382:265" x={45} y={1066} w={300} h={51}>
        еще можно заказывать
        <br />
        бренды, по которым
        <br />
        мы соскучились
      </T>
      <T {...parenProps} fig="397:378" x={372} y={1080.5} size={53} matrix={MIRROR}>
        (
      </T>
      <T {...noteProps} fig="382:267" x={82} y={1125} w={226} h={15}>
        с выгодой до 70%
      </T>
      <CompareCarousel
        label="Бренды, по которым мы соскучились"
        viewport={{ x: 42, y: 1161, w: 308, h: 180 }}
        arrow={{ x: 358, y: 1239 }}
        pairs={[BRANDS_PAIR, BRANDS_PAIR]}
      />
    </Block>
  );
}
