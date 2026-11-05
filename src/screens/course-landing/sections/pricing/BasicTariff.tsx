import { boxStyle, T } from "../../ui/canvas";
import { BuyButton } from "./BuyButton";
import { ListItem } from "./ListItem";

/** Подложка билета (Rectangle 30, 401:509): сам билет запечён в арт, от неё считаются слои. */
const TICKET = { x: 48, y: 174, w: 293, h: 684 };
/** Подложка кнопки (Rectangle 31, 401:510). */
const BUTTON = { x: 132, y: 771, w: 126, h: 35 };

/** Билет тарифа «Базовый». */
export function BasicTariff() {
  return (
    <article aria-labelledby="pricing-basic-title" style={boxStyle(TICKET)}>
      <T
        fig="401:514"
        x={91}
        y={194}
        w={15}
        h={15}
        origin={TICKET}
        size={12}
        leading={15}
        weight={600}
        italic
        align="center"
        color="#1E1E1E"
      >
        01
      </T>
      <T
        fig="382:288"
        x={89}
        y={229}
        w={213}
        h={13}
        origin={TICKET}
        size={10}
        leading={13}
        align="center"
        color="#49301C"
      >
        Только Таобао + выкуп через посредника
      </T>
      <T
        fig="402:559"
        x={87}
        y={251}
        w={213}
        h={26}
        origin={TICKET}
        size={10}
        leading={13}
        align="center"
        color="#49301C"
      >
        Для тех, кто хочет делегировать
        <br />
        максимум процесса посреднику
      </T>
      <T
        as="h3"
        id="pricing-basic-title"
        fig="401:511"
        x={120}
        y={350}
        w={149}
        h={13}
        origin={TICKET}
        size={21}
        leading={13}
        font="playfair"
        align="center"
        color="#49301C"
      >
        “Базовый”
      </T>
      <T
        as="ul"
        role="list"
        fig="401:520"
        x={83}
        y={384}
        w={225}
        h={144}
        origin={TICKET}
        size={10}
        leading={12}
        weight={300}
        align="center"
        color="#1E1E1E"
      >
        <ListItem lines={["Безопасная регистрация на Таобао"]} />
        <ListItem lines={["Все варианты поиска товара"]} />
        <ListItem lines={["Как находить оригинальные вещи брендов"]} />
        <ListItem lines={["Поиск экспортных магазинов"]} />
        <ListItem lines={["Разбор рейтинга продавцов"]} />
        <ListItem lines={["Общение с продавцом"]} />
        <ListItem lines={["Как выбрать качественный товар"]} />
        <ListItem lines={["Как не ошибиться с размером"]} />
        <ListItem lines={["Как сэкономить на доставке по Китаю"]} />
        <ListItem lines={["Виды доставки, тарифы и сроки"]} />
        <ListItem lines={["Схема выкупа через посредника"]} />
        <ListItem lines={["Заполнение бланка заказа"]} />
      </T>
      <T
        fig="401:516"
        x={124}
        y={544}
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
        as="ul"
        role="list"
        fig="401:519"
        x={87}
        y={560}
        w={216}
        h={108}
        origin={TICKET}
        size={10}
        leading={12}
        weight={300}
        align="center"
        color="#1E1E1E"
      >
        <ListItem lines={["Организация СП (совместных покупок)", "как способ заработка"]} />
        <ListItem lines={["Расчёт себестоимости товаров"]} />
        <ListItem lines={["Список проверенных посредников"]} />
        <ListItem
          lines={[
            "Список проверенных магазинов,",
            "официальных магазинов брендов",
            "и экспортных продавцов",
          ]}
        />
        <ListItem lines={["Словарь фраз на китайском", "для общения с продавцом"]} />
      </T>
      <T
        fig="401:517"
        x={124}
        y={684}
        w={143}
        h={24}
        origin={TICKET}
        size={10}
        leading={12}
        weight={600}
        align="center"
        color="#1E1E1E"
      >
        Доступ к курсу 3 месяца
        <br />
        Обратная связь 1 месяц
      </T>
      {/* скринридеру цена читается одной фразой; видимые слои ниже для него скрыты */}
      <p className="sr-only">Цена: 3 490 ₽. Старая цена: 4 500 ₽.</p>
      <T
        aria-hidden
        fig="401:522"
        x={131}
        y={724}
        w={128}
        h={13}
        origin={TICKET}
        size={19}
        leading={13}
        weight={900}
        align="center"
        color="#531608"
      >
        3.490р
      </T>
      {/* старая цена: зачёркивающая линия уже в арте */}
      <T
        as="del"
        aria-hidden
        className="no-underline"
        fig="401:521"
        x={131}
        y={745}
        w={128}
        h={13}
        origin={TICKET}
        size={19}
        leading={13}
        weight={700}
        align="center"
        color="#969696"
      >
        4.500р
      </T>
      {/* в макете подложка этой кнопки спрятана под билетом — на сайте кнопка видна */}
      <BuyButton {...BUTTON} origin={TICKET} label="купить тариф «Базовый»">
        <T
          as="span"
          fig="401:523"
          x={131}
          y={780}
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
