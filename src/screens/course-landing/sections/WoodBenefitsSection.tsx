import { Fragment } from "react";
import { woodBenefitsArt } from "../lib/blockArt";
import { Block, boxStyle, T } from "../ui/canvas";

/** Общий прямоугольник шести пунктов списка — контейнер ul. */
const LIST = { x: 34, y: 78, w: 325, h: 280 };

/** Результаты обучения в порядке чтения: сверху вниз, слева направо. */
const RESULTS = [
  {
    fig: "382:271",
    x: 139,
    y: 78,
    w: 112,
    lines: ["перестанешь", "переплачивать в 2–3", "раза за те же вещи"],
  },
  {
    fig: "382:275",
    x: 45,
    y: 135,
    w: 105,
    lines: ["начнешь экономить", "десятки тысяч", "рублей ежемесячно"],
  },
  {
    fig: "382:274",
    x: 229,
    y: 135,
    w: 130,
    lines: ["будешь пользоваться", "базой проверенных", "магазинов и посредников"],
  },
  {
    fig: "382:272",
    x: 34,
    y: 263,
    w: 128,
    lines: ["научишься выбирать", "вещи, которые выглядят", "дорого и служат долго"],
  },
  {
    fig: "382:273",
    x: 240,
    y: 265,
    w: 111,
    lines: ["сможешь покупать", "оригинальные бренды", "дешевле"],
  },
  {
    fig: "382:270",
    x: 125,
    y: 319,
    w: 141,
    lines: ["разберешься, как", "заказывать на Taobao и", "1688 без ошибок и переплат"],
  },
];

/** «После обучения ты…»: шесть результатов вокруг жёлтой плашки и билет с выводом. */
export function WoodBenefitsSection() {
  return (
    <Block name="06-wood-benefits" height={607} art={woodBenefitsArt} background="#492B1B">
      {/* заголовок попадает в прямоугольник списка: z-10 поднимает его над ul, иначе текст не выделить */}
      <T
        as="h2"
        fig="382:277"
        x={115}
        y={201}
        w={161}
        h={34}
        size={21}
        leading={17}
        font="playfair"
        align="center"
        color="#49301C"
        className="z-10"
      >
        после обучения
        <br />
        ты
      </T>

      {/* role="list": Safari не считает списком ul без маркеров */}
      <ul role="list" style={boxStyle(LIST)}>
        {RESULTS.map(({ fig, x, y, w, lines }) => (
          <T
            key={fig}
            as="li"
            fig={fig}
            x={x}
            y={y}
            w={w}
            h={39}
            origin={LIST}
            size={10}
            leading={13}
            align="center"
            color="#E9E5E2"
          >
            {lines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </T>
        ))}
      </ul>

      <T
        fig="382:278"
        x={94}
        y={440}
        w={202}
        h={51}
        size={15}
        leading={17}
        font="playfair"
        align="center"
        color="#49301C"
      >
        и, скорее всего,
        <br />
        уже не захочешь покупать
        <br />
        как раньше
      </T>
    </Block>
  );
}
