import { TICKET } from "./layout";

type Props = {
  /** высота билета, px макета */
  h: number;
  /** линия отрыва — от верха билета */
  tearY: number;
};

/**
 * Бумага билета во весь его размер: кремовый лист с двумя полукруглыми вырезами по бокам
 * у линии отрыва и вырезом посередине нижнего края, поверх — штриховая линия отрыва.
 * Вырезы настоящие (один контур с дугами), поэтому сквозь них видна фактура фона.
 * viewBox — в px макета: svg растягивается вместе с билетом, как все слои холста.
 */
export function TicketPaper({ h, tearY }: Props) {
  const { w, notch, tab, tear } = TICKET;
  const tabLeft = (w - tab.w) / 2;
  const tabRight = tabLeft + tab.w;
  const tabTop = h - tab.h;
  // по часовой стрелке от левого верхнего угла; все дуги вогнутые — внутрь билета
  const outline = [
    `M0 0H${w}V${tearY - notch}`,
    `A${notch} ${notch} 0 0 0 ${w} ${tearY + notch}`,
    `V${h}H${tabRight}V${tabTop + tab.r}`,
    `A${tab.r} ${tab.r} 0 0 0 ${tabRight - tab.r} ${tabTop}`,
    `H${tabLeft + tab.r}`,
    `A${tab.r} ${tab.r} 0 0 0 ${tabLeft} ${tabTop + tab.r}`,
    `V${h}H0V${tearY + notch}`,
    `A${notch} ${notch} 0 0 0 0 ${tearY - notch}Z`,
  ].join("");
  // линия идёт от выреза до выреза и с обеих сторон начинается одинаковым обрезком штриха
  const edgeDash = ((w - notch * 2 - tear.space) % (tear.dash + tear.space)) / 2;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full"
    >
      <path d={outline} fill={TICKET.fill} />
      <path
        d={`M${notch} ${tearY}H${w - notch}`}
        fill="none"
        stroke={tear.color}
        strokeWidth={tear.weight}
        strokeDasharray={`${tear.dash} ${tear.space}`}
        strokeDashoffset={tear.dash - edgeDash}
      />
    </svg>
  );
}
