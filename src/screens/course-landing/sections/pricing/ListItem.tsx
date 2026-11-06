import { u } from "../../ui/canvas";

type Props = {
  /** строки пункта: переносы заданы явно */
  lines: readonly string[];
  /** отступ от предыдущего пункта, px макета */
  gapBefore?: number;
};

/**
 * Пункт списка тарифа: точка у левого края колонки, текст — с отступом в 1em от него.
 * Строки-продолжения стоят под текстом, а не под точкой (висячий отступ), поэтому пункт
 * в две-три строки читается как один. Каждая строка — отдельный блок.
 */
export function ListItem({ lines, gapBefore = 0 }: Props) {
  return (
    <li style={gapBefore ? { marginTop: u(gapBefore) } : undefined}>
      {lines.map((line, index) => (
        <span key={line} className="block">
          <span data-bullet aria-hidden className="inline-block w-[1em]">
            {index === 0 ? "•" : null}
          </span>
          {line}
        </span>
      ))}
    </li>
  );
}
