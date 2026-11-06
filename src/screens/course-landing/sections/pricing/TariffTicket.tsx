import { Fragment } from "react";
import { boxStyle, T } from "../../ui/canvas";
import { BuyButton } from "./BuyButton";
import {
  BUTTON,
  COLOR,
  COLUMN,
  GAP,
  TICKET,
  TYPE,
  type PlacedRow,
  type PlacedTicket,
} from "./layout";
import { ListItem } from "./ListItem";
import { TicketPaper } from "./TicketPaper";

/** Строки текстового слоя: переносы только явные, как во всех слоях холста. */
function withBreaks(lines: readonly string[]) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

type RowProps = {
  row: PlacedRow;
  /** id заголовка билета: по нему билет получает имя */
  titleId: string;
};

/** Одна строка билета по посчитанным координатам; x / y — от левого верхнего угла билета. */
function Row({ row, titleId }: RowProps) {
  const column = { x: COLUMN.x, y: row.y, w: COLUMN.w, h: row.h };
  switch (row.kind) {
    case "tear":
      // линию отрыва рисует TicketPaper
      return null;
    case "divider": {
      const { weight, dash, space, color } = TICKET.rule;
      return (
        <svg
          aria-hidden
          viewBox={`0 0 ${COLUMN.w} 2`}
          preserveAspectRatio="none"
          className="pointer-events-none"
          style={boxStyle({ x: COLUMN.x, y: row.y - 1, w: COLUMN.w, h: 2 })}
        >
          <path
            d={`M0 1H${COLUMN.w}`}
            fill="none"
            stroke={color}
            strokeWidth={weight}
            strokeDasharray={row.line === "dashed" ? `${dash} ${space}` : undefined}
          />
        </svg>
      );
    }
    case "title":
      return (
        <T
          as="h3"
          id={titleId}
          fig={row.fig}
          {...column}
          {...TYPE.title}
          font="playfair"
          align="center"
          color={COLOR.brown}
        >
          {row.text}
        </T>
      );
    case "text":
      return (
        <T
          fig={row.fig}
          {...column}
          {...TYPE.text}
          weight={row.weight}
          align={row.align ?? "center"}
          color={row.color}
        >
          {withBreaks(row.lines)}
        </T>
      );
    case "list":
      return (
        <T
          as="ul"
          role="list"
          fig={row.fig}
          {...column}
          {...TYPE.text}
          weight={300}
          align="left"
          color={COLOR.ink}
        >
          {row.items.map((lines, index) => (
            <ListItem key={lines.join(" ")} lines={lines} gapBefore={index > 0 ? GAP.item : 0} />
          ))}
        </T>
      );
    case "pair": {
      const total = row.role === "total";
      return (
        <>
          {/* скринридеру цена читается одной фразой; видимые подпись и сумма для него скрыты */}
          {row.spoken ? <p className="sr-only">{row.spoken}</p> : null}
          <T
            aria-hidden
            {...column}
            size={TYPE.text.size}
            leading={row.h}
            weight={total ? 700 : 400}
            align="left"
            color={COLOR.ink}
          >
            {row.label}
          </T>
          <T
            as={total ? "p" : "del"}
            aria-hidden
            fig={row.fig}
            {...column}
            {...(total ? TYPE.total : TYPE.text)}
            weight={total ? 900 : 400}
            align="right"
            color={total ? COLOR.red : COLOR.gray}
          >
            {row.value}
          </T>
        </>
      );
    }
    case "button":
      return (
        <BuyButton
          x={(TICKET.w - BUTTON.w) / 2}
          y={row.y}
          w={BUTTON.w}
          h={BUTTON.h}
          label={row.label}
        >
          <T
            as="span"
            fig={row.fig}
            x={0}
            y={BUTTON.textY}
            w={BUTTON.w}
            h={TYPE.total.leading}
            {...TYPE.total}
            weight={900}
            align="center"
            color={COLOR.paper}
          >
            купить
          </T>
        </BuyButton>
      );
  }
}

/** Билет тарифа: бумага с вырезами и строки поверх неё. */
export function TariffTicket({ ticket }: { ticket: PlacedTicket }) {
  const titleId = `pricing-${ticket.id}-title`;
  return (
    <article
      aria-labelledby={titleId}
      style={boxStyle({ x: TICKET.x, y: ticket.y, w: TICKET.w, h: ticket.h })}
    >
      <TicketPaper h={ticket.h} tearY={ticket.tearY} />
      {ticket.rows.map((row, index) => (
        <Row key={index} row={row} titleId={titleId} />
      ))}
    </article>
  );
}
