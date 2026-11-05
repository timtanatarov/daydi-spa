import { showcaseArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";

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

/** Подпись под карточкой. */
const captionProps = { h: 15, size: 10, leading: 15, align: "center", color: INK } as const;

/**
 * Сравнение цен на бумажном фоне: три группы «заголовок в скобках + пара карточек zara / таобао».
 * Карточки с ценниками, кольца-разделители и стрелки «›» запечены в арт блока.
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
      <T {...captionProps} fig="382:212" x={20} y={397} w={190}>
        zara
      </T>
      <T {...captionProps} fig="382:213" x={181} y={397} w={190}>
        таобао
      </T>

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
      <T {...captionProps} fig="397:354" x={33} y={859} w={175}>
        zara
      </T>
      <T {...captionProps} fig="397:355" x={180} y={859} w={175}>
        таобао
      </T>

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
      <T {...captionProps} fig="397:362" x={34} y={1316} w={175}>
        zara
      </T>
      <T {...captionProps} fig="397:363" x={181} y={1316} w={175}>
        таобао
      </T>
    </Block>
  );
}
