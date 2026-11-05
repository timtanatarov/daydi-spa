import { aboutArt } from "../lib/blockArt";
import { Block, T, boxStyle } from "../ui/canvas";

/** Заголовок на скотче: объединяющий прямоугольник слоёв 352:183 и 352:184. */
const TITLE = { x: 92, y: 86, w: 207, h: 60 };

/** Список фактов: объединяющий прямоугольник повёрнутых слоёв 352:187…352:190 (по их bounds). */
const FACTS = { x: 72.01, y: 613.36, w: 298.36, h: 238 };

/** Об авторе: «Привет, я Индира», жёлтая заметка и четыре факта. Скотч, фото и звёздочки — в арте. */
export function AboutIndiraSection() {
  return (
    <Block name="02-about" height={1221} art={aboutArt}>
      <h2 style={boxStyle(TITLE)}>
        <T
          as="span"
          fig="352:183"
          origin={TITLE}
          x={92}
          y={86}
          w={139}
          h={30}
          size={30}
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
          size={30}
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
        y={219}
        w={287}
        h={56}
        size={9.5}
        leading={14}
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

      {/* role="list": без маркеров (list-style: none) Safari не объявляет ul списком */}
      <ul role="list" style={boxStyle(FACTS)}>
        <T
          as="li"
          fig="352:187"
          origin={FACTS}
          x={132.59}
          y={613.36}
          w={196.8}
          h={45}
          rotate={2.5}
          size={10}
          leading={15}
          color="#49301C"
        >
          экономлю 20-40 тысяч
          <br />
          рублей ежемесячно
          <br />
          благодаря Китаю
        </T>
        <T
          as="li"
          fig="352:188"
          origin={FACTS}
          x={72.01}
          y={692.7}
          w={243.41}
          h={45}
          rotate={-2.5}
          size={10}
          leading={15}
          color="#49301C"
        >
          собираю стильный гардероб
          <br />
          как у инфлюенсеров,
          <br />
          но до 10 раз дешевле
        </T>
        <T
          as="li"
          fig="352:189"
          origin={FACTS}
          x={130.98}
          y={762.72}
          w={239.62}
          h={30}
          rotate={2.5}
          size={10}
          leading={15}
          color="#49301C"
        >
          делюсь честными обзорами
          <br />и распаковками в блоге
        </T>
        <T
          as="li"
          fig="352:190"
          origin={FACTS}
          x={75.89}
          y={821.38}
          w={222.47}
          h={30}
          rotate={-2.5}
          size={10}
          leading={15}
          color="#49301C"
        >
          обучаю других выгодному
          <br />
          шопингу на Таобао и 1688
        </T>
      </ul>
    </Block>
  );
}
