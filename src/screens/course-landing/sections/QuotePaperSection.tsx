import { quoteArt } from "../lib/blockArt";
import { Block, T } from "../ui/canvas";

/** Цитата на тетрадном листе: «разные цены за одну и ту же вещь…». */
export function QuotePaperSection() {
  return (
    <Block name="05-quote" height={243} art={quoteArt}>
      <T
        fig="382:266"
        x={10.5}
        y={105}
        w={370}
        h={90}
        size={21}
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
