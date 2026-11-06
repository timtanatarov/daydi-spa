import { Bullet, u } from "../../ui/canvas";

type Props = {
  /** строки пункта: переносы заданы явно */
  lines: readonly string[];
  /** отступ от предыдущего пункта, px макета */
  gapBefore?: number;
};

/**
 * Пункт списка тарифа. Каждая строка — отдельный блок:
 * маркер стоит у первой, у строк-продолжений — пустой отступ той же ширины.
 */
export function ListItem({ lines, gapBefore = 0 }: Props) {
  return (
    <li style={gapBefore ? { marginTop: u(gapBefore) } : undefined}>
      {lines.map((line, index) => (
        <span key={line} className="block">
          <Bullet empty={index > 0} />
          {line}
        </span>
      ))}
    </li>
  );
}
