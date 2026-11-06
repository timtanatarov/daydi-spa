import { woodStepsArt } from "../lib/blockArt";
import { Block, T, u } from "../ui/canvas";
import { WoodStepsSlider } from "./wood-steps/WoodStepsSlider";

/** Доска с билетом-слайдером: три шага, как накручивают цены. */
export function WoodStepsSection() {
  return (
    <Block name="03-wood-steps" id="steps" height={477} art={woodStepsArt} background="#492B1B">
      <T
        as="h2"
        fig="382:201"
        x={60}
        y={92}
        w={271}
        h={84}
        size={25}
        // в макете шаг строк 17 — строки наезжали друг на друга; разведены, как в сравнениях
        leading={28}
        font="playfair"
        align="center"
        color="#F6F5F1"
        style={{ textShadow: `0 0 ${u(10)} rgba(0, 0, 0, 0.5)` }}
      >
        смотри,
        <br />
        как накручивают
        <br />
        цены на наши хотелки
      </T>
      <WoodStepsSlider />
    </Block>
  );
}
