import { quoteArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";

/** Цитата на тетрадном листе: «разные цены за одну и ту же вещь…». */
export function QuotePaperSection() {
  return (
    <Block name="05-quote" height={243} art={quoteArt}>
      <T
        fig="382:266"
        x={52}
        y={105}
        w={287}
        h={90}
        size={17}
        leading={30}
        font="playfair"
        italic
        align="center"
        color="#49301C"
        tracking={0.02}
      >
        разные цены за одну и ту же вещь.
        <br />
        логичный вопрос: зачем
        <br />
        переплачивать?
      </T>
    </Block>
  );
}
