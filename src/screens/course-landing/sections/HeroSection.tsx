import { heroArt, heroTapeArt } from "../lib/blockArt";
import { Block, Pic, T, boxStyle, u } from "../ui/canvas";
import { BuyLink } from "./hero/BuyLink";

/**
 * Скотч под надписью «курс по Китаю» — слой 352:176, увеличенный в 1.3 раза от своей середины:
 * с крупным шрифтом надпись занимала его почти целиком, заказчик попросил подложку побольше.
 */
const TAPE = { x: 103.65, y: 157.03, w: 186.68, h: 112.45 };

/**
 * Плашки под «taobao» и «1688» — слои «Rectangle 17» и «Rectangle 32» макета (63×24, поворот
 * вместе с листом), увеличенные до 76×30 по той же просьбе. Чтобы между ними остался просвет,
 * они раздвинуты на 4 в стороны вдоль строки — вместе с надписями.
 */
const PILLS = [
  { x: 122.4, y: 449.64, w: 76, h: 30, rotate: -3.49 },
  { x: 210.08, y: 443.66, w: 76, h: 30, rotate: -3.49 },
];

/**
 * Цвет верха экрана телефона над первым экраном (см. TopTint) и высота перехода к нему.
 * Safari на iPhone заливает зону под строкой состояния одним цветом — картинку туда вывести нельзя,
 * поэтому верх фотографии плавно уходит в этот цвет: резкой границы «фото обрезано» нет.
 */
const TOP_TINT = "#49433E";
const TOP_FADE = 72;

/** Первый экран: лист с названием курса и кнопка «купить». */
export function HeroSection() {
  return (
    <Block name="01-hero" height={780} art={heroArt} priority background={TOP_TINT}>
      <div
        aria-hidden
        className="pointer-events-none"
        style={{
          ...boxStyle({ x: 0, y: 0, w: 390, h: TOP_FADE }),
          background: `linear-gradient(to bottom, ${TOP_TINT}, ${TOP_TINT}00)`,
        }}
      />
      <Pic art={heroTapeArt} {...TAPE} eager />
      {/* В макете строка начинается с неразрывного пробела: он участвует в центрировании */}
      <T
        fig="352:178"
        x={79}
        y={206.31}
        w={219}
        h={30}
        rotate={-3.49}
        size={15}
        leading={30}
        weight={500}
        align="center"
        color="#49301C"
      >
        {"\u00a0курс по Китаю"}
      </T>

      <T
        as="h1"
        fig="352:171"
        x={54}
        y={254.98}
        w={278.71}
        h={56}
        rotate={-3.49}
        size={36}
        leading={28}
        font="playfair"
        align="center"
        color="#49301C"
      >
        Как заказывать <br />
        на Таобао и 1688
      </T>

      <T
        fig="352:174"
        x={49}
        y={331.14}
        w={297.7}
        h={80}
        rotate={-3.49}
        size={17}
        leading={20}
        weight={300}
        align="center"
        color="#49301C"
        tracking={-0.01}
      >
        пошаговое обучение, как покупать <br />
        одежду и декор для дома до 10 раз <br />
        выгоднее, чем на Вайлдберриз <br />и Алиэкспресс
      </T>

      {PILLS.map((pill) => (
        <span
          key={pill.x}
          aria-hidden
          style={{ ...boxStyle(pill), backgroundColor: "#CDC5AD", borderRadius: u(pill.h / 2) }}
        />
      ))}
      {/* Подписи на плашках повторяют заголовок — для скринридеров скрыты */}
      <T
        as="span"
        aria-hidden
        fig="352:179"
        x={51}
        y={454.57}
        w={219}
        h={30}
        rotate={-3.49}
        size={15}
        leading={30}
        weight={500}
        align="center"
        color="#49301C"
      >
        taobao
      </T>
      <T
        as="span"
        aria-hidden
        fig="352:180"
        x={139}
        y={449.09}
        w={219}
        h={30}
        rotate={-3.49}
        size={15}
        leading={30}
        weight={500}
        align="center"
        color="#49301C"
      >
        1688
      </T>

      <BuyLink />
    </Block>
  );
}
