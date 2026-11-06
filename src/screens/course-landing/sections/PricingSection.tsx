import { pricingPaperArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";
import { BLOCK, COLOR, TICKET, TYPE } from "./pricing/layout";
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
        x={TICKET.x}
        y={BLOCK.headingY}
        w={TICKET.w}
        h={TYPE.title.leading}
        {...TYPE.title}
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
