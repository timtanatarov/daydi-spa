import { pricingPaperArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";
import { BLOCK, COLOR, TYPE } from "./pricing/layout";
import { TariffTicket } from "./pricing/TariffTicket";
import { PRICING } from "./pricing/tariffs";

/**
 * Тарифы: два билета — «Базовый» и «Полный». На id="buy" ведёт кнопка «купить» первого экрана.
 * Блок перекомпонован под крупный шрифт: арт — только бумага, билеты нарисованы кодом,
 * а их координаты и высота блока посчитаны из строк (см. pricing/layout.ts и pricing/tariffs.ts).
 */
export function PricingSection() {
  return (
    <Block
      name="08-pricing"
      height={PRICING.height}
      art={pricingPaperArt}
      artHeight={BLOCK.artHeight}
      id="buy"
    >
      <T
        as="h2"
        fig="382:297"
        x={20}
        y={BLOCK.headingY}
        w={350}
        h={TYPE.title.leading}
        {...TYPE.title}
        // крупнее заголовков билетов: один на весь блок, на пустой бумаге кегль 25 терялся
        size={32}
        font="playfair"
        align="center"
        color={COLOR.brown}
      >
        выбери свой тариф
      </T>
      {PRICING.tickets.map((ticket) => (
        <TariffTicket key={ticket.id} ticket={ticket} />
      ))}
    </Block>
  );
}
