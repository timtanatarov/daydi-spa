import { u } from "../../ui/canvas";

type Props = {
  /** строки пункта: переносы заданы явно */
  lines: readonly string[];
  /** отступ от предыдущего пункта, px макета */
  gapBefore?: number;
};

/**
 * Пункт списка тарифа — как позиция в чеке: без маркера, от левого поля; пункты отделяет
 * друг от друга отступ. Каждая строка — отдельный блок.
 */
export function ListItem({ lines, gapBefore = 0 }: Props) {
  return (
    <li style={gapBefore ? { marginTop: u(gapBefore) } : undefined}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </li>
  );
}
