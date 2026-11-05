import { pricingArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";
import { BasicTariff } from "./pricing/BasicTariff";
import { FullTariff } from "./pricing/FullTariff";

/** Тарифы: два билета — «Базовый» и «Полный». На id="buy" ведёт кнопка «купить» первого экрана. */
export function PricingSection() {
  return (
    <Block name="08-pricing" height={1974} art={pricingArt} id="buy">
      <T
        as="h2"
        fig="382:297"
        x={76}
        y={88}
        w={234}
        h={17}
        size={21}
        leading={17}
        font="playfair"
        align="center"
        color="#49301C"
      >
        выбери свой тариф
      </T>
      <BasicTariff />
      <FullTariff />
    </Block>
  );
}
