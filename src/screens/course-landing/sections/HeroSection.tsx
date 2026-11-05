import { heroArt } from "../lib/blockArt";
import { Block, T, boxStyle, u } from "../ui/canvas";

/** Подложка кнопки «купить» — слой «Rectangle 16» (352:169). */
const BUY = { x: 90, y: 619, w: 210, h: 53 };

/** Первый экран: лист с названием курса и кнопка «купить». */
export function HeroSection() {
  return (
    <Block name="01-hero" height={780} art={heroArt} priority>
      {/* В макете строка начинается с неразрывного пробела: он участвует в центрировании */}
      <T
        fig="352:178"
        x={79}
        y={206.31}
        w={219}
        h={30}
        rotate={-3.49}
        size={11}
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
        size={30}
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
        h={60}
        rotate={-3.49}
        size={12}
        leading={15}
        weight={300}
        align="center"
        color="#49301C"
        tracking={-0.01}
      >
        пошаговое обучение, как покупать <br />
        одежду и декор для дома до 10 раз <br />
        выгоднее, чем на Вайлдберриз <br />и Алиэкспресс
      </T>

      {/* Подписи на плашках повторяют заголовок — для скринридеров скрыты */}
      <T
        as="span"
        aria-hidden
        fig="352:179"
        x={55}
        y={454.33}
        w={219}
        h={30}
        rotate={-3.49}
        size={9}
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
        x={135}
        y={449.33}
        w={219}
        h={30}
        rotate={-3.49}
        size={9}
        leading={30}
        weight={500}
        align="center"
        color="#49301C"
      >
        1688
      </T>

      {/* Якорь на блок тарифов; фон и скругление повторяют запечённую подложку */}
      <a
        href="#buy"
        className="outline-none focus-visible:outline-solid"
        style={{
          ...boxStyle(BUY),
          background: "#F6F5F1",
          borderRadius: u(25),
          outlineWidth: u(2),
          outlineOffset: u(3),
          outlineColor: "#F6F5F1",
        }}
      >
        <T
          as="span"
          fig="352:172"
          origin={BUY}
          x={85}
          y={631}
          w={219}
          h={30}
          size={19}
          leading={30}
          weight={800}
          align="center"
          color="#531608"
        >
          {/* Распорка до базовой линии макета (21.91): без неё браузер округляет метрики шрифта и ставит текст на 1px выше */}
          <span className="inline-block" style={{ height: u(21.91) }} />
          купить
        </T>
      </a>
    </Block>
  );
}
