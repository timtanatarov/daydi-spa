import { roadmapArt } from "../lib/blockArt";
import { Block, T, boxStyle } from "../ui/canvas";

const INK = "#49301C";

/** Подложки карточек — слои 396:338 и 396:335 макета; листы с зажимом и печатью запечены в арт. */
const INTRO_CARD = { x: 25, y: 143, w: 211, h: 273 };
const SEARCH_CARD = { x: 174, y: 178, w: 196, h: 206 };

/**
 * Строки текстового слоя, как в макете. Пробел перед <br /> на раскладку не влияет (в конце строки
 * он схлопывается), но не даёт словам соседних строк склеиться в textContent.
 */
function lines(...items: string[]) {
  return items.flatMap((line, index) =>
    index < items.length - 1 ? [`${line} `, <br key={index} />] : [line],
  );
}

/** Дорожная карта курса: заголовок и две карточки тем. */
export function RoadmapSection() {
  return (
    <Block name="07-roadmap" height={456} art={roadmapArt}>
      <T
        fig="382:298"
        x={82}
        y={107}
        w={226}
        h={10}
        size={10}
        leading={10}
        align="center"
        color={INK}
      >
        итак... что тебя ждет на этом курсе?
      </T>
      <T
        as="h2"
        fig="382:296"
        x={60}
        y={122}
        w={271}
        h={17}
        size={25}
        leading={17}
        font="playfair"
        align="center"
        color={INK}
      >
        дорожная карта курса
      </T>

      <article style={boxStyle(INTRO_CARD)}>
        <T
          as="h3"
          fig="382:281"
          origin={INTRO_CARD}
          x={25}
          y={246}
          w={149}
          h={26}
          size={13}
          leading={13}
          font="playfair"
          align="center"
          color={INK}
        >
          {lines("знакомство", "с маркетплейсами")}
        </T>
        <T
          fig="382:286"
          origin={INTRO_CARD}
          x={42}
          y={277}
          w={115}
          h={26}
          size={10}
          leading={13}
          align="center"
          color={INK}
        >
          {lines("регистрация без риска", "блокировки")}
        </T>
      </article>

      <article style={boxStyle(SEARCH_CARD)}>
        <T
          as="h3"
          fig="382:283"
          origin={SEARCH_CARD}
          x={202}
          y={259}
          w={149}
          h={13}
          size={13}
          leading={13}
          font="playfair"
          align="center"
          color={INK}
        >
          поиск товаров
        </T>
        <T
          fig="382:291"
          origin={SEARCH_CARD}
          x={204}
          y={277}
          w={145}
          h={52}
          size={10}
          leading={13}
          align="center"
          color={INK}
        >
          {lines(
            "как находить любые товары,",
            "бренды в разы дешевле, чем",
            "у нас? все про экспортные",
            "товары",
          )}
        </T>
      </article>
    </Block>
  );
}
