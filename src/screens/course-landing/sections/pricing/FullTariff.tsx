import { boxStyle, T } from "../../ui/canvas";
import { BuyButton } from "./BuyButton";
import { ListItem } from "./ListItem";

/** Подложка билета (Rectangle 27, 400:413): сам билет запечён в арт, от неё считаются слои. */
const TICKET = { x: 49, y: 926, w: 293, h: 768 };
/** Подложка кнопки (Rectangle 29, 401:451). */
const BUTTON = { x: 132, y: 1607, w: 126, h: 35 };

/** Билет тарифа «Полный». */
export function FullTariff() {
  return (
    <article aria-labelledby="pricing-full-title" style={boxStyle(TICKET)}>
      <T
        fig="401:505"
        x={91}
        y={946}
        w={16}
        h={15}
        origin={TICKET}
        size={12}
        leading={15}
        weight={600}
        italic
        align="center"
        color="#1E1E1E"
      >
        02
      </T>
      <T
        fig="382:289"
        x={108}
        y={976}
        w={175}
        h={26}
        origin={TICKET}
        size={10}
        leading={13}
        align="center"
        color="#49301C"
      >
        Таобао +1688 + все способы
        <br />
        обмена валюты и оплаты
      </T>
      <T
        fig="402:560"
        x={96}
        y={1011}
        w={198}
        h={39}
        origin={TICKET}
        size={10}
        leading={13}
        align="center"
        color="#49301C"
      >
        Для тех, кто хочет максимально
        <br />
        экономить и знать о китайском
        <br />
        шопинге абсолютно всё
      </T>
      <T
        as="h3"
        id="pricing-full-title"
        fig="382:284"
        x={121}
        y={1102}
        w={149}
        h={13}
        origin={TICKET}
        size={21}
        leading={13}
        font="playfair"
        align="center"
        color="#49301C"
      >
        “Полный”
      </T>
      <T
        fig="400:422"
        x={124}
        y={1136}
        w={143}
        h={24}
        origin={TICKET}
        size={10}
        leading={12}
        weight={600}
        align="center"
        color="#1E1E1E"
      >
        Всё, что входит в тариф
        <br />
        &quot;Базовый&quot;, а также:
      </T>
      <T
        as="ul"
        role="list"
        fig="401:444"
        x={98}
        y={1164}
        w={195}
        h={60}
        origin={TICKET}
        size={10}
        leading={12}
        weight={300}
        align="center"
        color="#1E1E1E"
      >
        <ListItem lines={["Самостоятельный выкуп с Таобао"]} />
        <ListItem lines={["Оплата другом на Таобао"]} />
        <ListItem lines={["Активация скидок на Таобао"]} />
        <ListItem lines={["Торг с продавцами на Таобао"]} />
        <ListItem lines={["Отслеживание товара по Китаю"]} />
      </T>
      <T
        fig="401:446"
        x={125}
        y={1240}
        w={143}
        h={12}
        origin={TICKET}
        size={10}
        leading={12}
        weight={600}
        align="center"
        color="#1E1E1E"
      >
        + все этапы работы с 1688:
      </T>
      <T
        as="ul"
        role="list"
        fig="401:445"
        x={98}
        y={1256}
        w={195}
        h={180}
        origin={TICKET}
        size={10}
        leading={12}
        weight={300}
        align="center"
        color="#1E1E1E"
      >
        <ListItem lines={["Безопасная регистрация на 1688"]} />
        <ListItem lines={["Все варианты поиска товара"]} />
        <ListItem lines={["Как находить производителей"]} />
        <ListItem lines={["Как находить поставщиков,", "брендирующих товары"]} />
        <ListItem lines={["Разбор рейтинга поставщика"]} />
        <ListItem lines={["Общение и торг с поставщиками"]} />
        <ListItem lines={["Схема самовыкупа, плюсы и минусы"]} />
        <ListItem lines={["Верификация и пополнение Алипей"]} />
        <ListItem lines={["Пополнение через биржу (самый", "выгодный курс юаня)"]} />
        <ListItem lines={["Самостоятельный выкуп с 1688"]} />
        <ListItem lines={["Скидки, купоны"]} />
        <ListItem lines={["Отслеживание товара по Китаю"]} />
        <ListItem lines={["Споры/возвраты"]} />
      </T>
      <T
        fig="401:447"
        x={124}
        y={1452}
        w={143}
        h={12}
        origin={TICKET}
        size={10}
        leading={12}
        weight={600}
        align="center"
        color="#1E1E1E"
      >
        Бонусные материалы:
      </T>
      <T
        fig="401:448"
        x={87}
        y={1468}
        w={217}
        h={36}
        origin={TICKET}
        size={10}
        leading={12}
        weight={300}
        align="center"
        color="#1E1E1E"
      >
        Все бонусные материалы с тарифа
        <br />
        «Базовый»
        <br />+ список проверенных поставщиков с 1688
      </T>
      <T
        fig="401:449"
        x={124}
        y={1520}
        w={143}
        h={24}
        origin={TICKET}
        size={10}
        leading={12}
        weight={600}
        align="center"
        color="#1E1E1E"
      >
        Доступ к курсу 4 месяца
        <br />
        Обратная связь 2 месяца
      </T>
      {/* скринридеру цена читается одной фразой; видимые слои ниже для него скрыты */}
      <p className="sr-only">Цена: 4 990 ₽. Старая цена: 6 500 ₽.</p>
      <T
        aria-hidden
        fig="401:506"
        x={132}
        y={1560}
        w={128}
        h={13}
        origin={TICKET}
        size={19}
        leading={13}
        weight={900}
        align="center"
        color="#531608"
      >
        4.990р
      </T>
      {/* старая цена: зачёркивающая линия уже в арте */}
      <T
        as="del"
        aria-hidden
        className="no-underline"
        fig="382:292"
        x={131}
        y={1581}
        w={128}
        h={13}
        origin={TICKET}
        size={19}
        leading={13}
        weight={700}
        align="center"
        color="#969696"
      >
        6.500р
      </T>
      <BuyButton {...BUTTON} origin={TICKET} label="купить тариф «Полный»">
        <T
          as="span"
          fig="401:450"
          x={131}
          y={1616}
          w={128}
          h={13}
          origin={BUTTON}
          size={19}
          leading={13}
          weight={900}
          align="center"
          color="#EFEADE"
        >
          купить
        </T>
      </BuyButton>
    </article>
  );
}
