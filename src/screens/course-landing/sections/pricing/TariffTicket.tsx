import { Fragment } from "react";
import { boxStyle, T } from "../../ui/canvas";
import { BuyButton } from "./BuyButton";
import {
  BUTTON,
  COLOR,
  COLUMN,
  GAP,
  PRICES,
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
    case "number":
      return (
        <T
          fig={row.fig}
          {...column}
          x={TICKET.rule.gapFrom}
          w={TICKET.rule.gapTo - TICKET.rule.gapFrom}
          {...TYPE.number}
          weight={600}
          italic
          align="center"
          color={COLOR.ink}
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
          align="center"
          color={row.color}
        >
          {withBreaks(row.lines)}
        </T>
      );
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
    case "list":
      return (
        <T
          as="ul"
          role="list"
          fig={row.fig}
          {...column}
          {...TYPE.text}
          weight={300}
          align="center"
          color={COLOR.ink}
        >
          {row.items.map((lines, index) => (
            <ListItem key={lines.join(" ")} lines={lines} gapBefore={index > 0 ? GAP.item : 0} />
          ))}
        </T>
      );
    case "prices": {
      const line = TYPE.price.leading;
      const oldY = row.y + line + PRICES.gap;
      return (
        <>
          {/* скринридеру цена читается одной фразой; видимые слои ниже для него скрыты */}
          <p className="sr-only">{row.label}</p>
          <T
            aria-hidden
            fig={row.price.fig}
            {...column}
            h={line}
            {...TYPE.price}
            weight={900}
            align="center"
            color={COLOR.red}
          >
            {row.price.text}
          </T>
          <T
            as="del"
            aria-hidden
            className="no-underline"
            fig={row.old.fig}
            {...column}
            y={oldY}
            h={line}
            {...TYPE.price}
            weight={700}
            align="center"
            color={COLOR.gray}
          >
            {row.old.text}
          </T>
          {/* старую цену зачёркивает плашка, как в макете: она чуть шире цифр */}
          <span
            aria-hidden
            style={{
              ...boxStyle({
                x: (TICKET.w - PRICES.strike.w) / 2,
                y: oldY + PRICES.strikeY,
                w: PRICES.strike.w,
                h: PRICES.strike.h,
              }),
              backgroundColor: PRICES.strike.color,
            }}
          />
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
            h={TYPE.price.leading}
            {...TYPE.price}
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
      <TicketPaper h={ticket.h} ruleY={ticket.ruleY} tearY={ticket.tearY} />
      {ticket.rows.map((row, index) => (
        <Row key={index} row={row} titleId={titleId} />
      ))}
    </article>
  );
}
