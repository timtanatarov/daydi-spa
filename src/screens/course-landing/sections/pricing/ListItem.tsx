import { Bullet } from "../../ui/canvas";

type Props = {
  /** строки пункта — ровно как в макете */
  lines: readonly string[];
};

/**
 * Пункт списка тарифа. Каждая строка макета — отдельный блок:
 * маркер стоит у первой, у строк-продолжений — пустой отступ той же ширины.
 */
export function ListItem({ lines }: Props) {
  return (
    <li>
      {lines.map((line, index) => (
        <span key={line} className="block">
          <Bullet empty={index > 0} />
          {line}
        </span>
      ))}
    </li>
  );
}
