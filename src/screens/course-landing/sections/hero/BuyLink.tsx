import { T, boxStyle, u } from "../../ui/canvas";

/** Кнопка «купить» — плашка макета «Rectangle 16» (352:169) с надписью 352:172. */
const BUY = { x: 90, y: 619, w: 210, h: 53 };

/**
 * Звёздочки на правом верхнем углу кнопки: заказчик попросил ближе к кнопке, можно внахлёст.
 * Чтобы на светлой плашке их было видно, у звёзд золотой контур и плотное жёлтое свечение.
 */
const SPARKS = { x: 246, y: 579, w: 86, h: 80.6 };
/** Сетка, в которой заданы звёзды: рамка SPARKS растягивает её в 1.34 раза. */
const SPARKS_GRID = { w: 64, h: 60 };

/**
 * Звёзды в сетке SPARKS_GRID: центр, длина луча и задержка, мс. Вспыхивают вместе с нажатием —
 * задержки крошечные, только чтобы вспышка не выглядела одним пятном.
 */
const STARS = [
  { x: 20, y: 26, r: 17, delay: 0 },
  { x: 45, y: 40, r: 15, delay: 30 },
  { x: 41, y: 11, r: 10, delay: 60 },
  { x: 58, y: 24, r: 4, delay: 90 },
];

/** Пауза перед первым нажатием после загрузки страницы, мс (та же — в globals.css). */
const START_DELAY = 1200;

/** Четырёхлучевая звезда с тонкими лучами; вертикальные лучи чуть длиннее горизонтальных. */
function starPath(cx: number, cy: number, r: number) {
  const rx = r * 0.82;
  const toCentre = `C${cx} ${cy} ${cx} ${cy}`;
  return [
    `M${cx} ${cy - r}`,
    `${toCentre} ${cx + rx} ${cy}`,
    `${toCentre} ${cx} ${cy + r}`,
    `${toCentre} ${cx - rx} ${cy}`,
    `${toCentre} ${cx} ${cy - r}Z`,
  ].join("");
}

/**
 * Кнопка первого экрана: ведёт к тарифам. Выглядит как в макете; по просьбе заказчика раз в пять
 * секунд она «нажимается» сама, и в тот же миг на её правом углу вспыхивают звёздочки — видны около
 * секунды и медленно гаснут; под пальцем кнопка тоже проседает. Движение — в globals.css
 * (классы hero-buy…); при системной настройке «уменьшить движение» кнопка неподвижна, звёздочек нет.
 * Плашка рисуется здесь, а не в арте блока: запечённая не могла бы двигаться.
 */
export function BuyLink() {
  return (
    <a
      href="#buy"
      className="hero-buy outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline-solid"
      style={{
        ...boxStyle(BUY),
        borderRadius: u(25),
        outlineWidth: u(2),
        outlineOffset: u(3),
        outlineColor: "#F6F5F1",
      }}
    >
      <span
        className="hero-buy__pill absolute inset-0 block"
        style={{ background: "#F6F5F1", borderRadius: u(25) }}
      >
        <T
          as="span"
          fig="352:172"
          origin={BUY}
          x={85}
          y={631}
          w={219}
          h={30}
          size={24}
          leading={30}
          weight={800}
          align="center"
          color="#531608"
        >
          {/* Распорка до базовой линии макета (21.91): без неё браузер округляет метрики шрифта и ставит текст на 1px выше */}
          <span className="inline-block" style={{ height: u(21.91) }} />
          купить
        </T>
      </span>
      <svg
        aria-hidden
        viewBox={`0 0 ${SPARKS_GRID.w} ${SPARKS_GRID.h}`}
        className="pointer-events-none overflow-visible"
        style={boxStyle({ ...SPARKS, origin: BUY })}
      >
        <defs>
          <radialGradient id="hero-buy-glow">
            <stop offset="0" stopColor="#FFD84A" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FFD84A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-buy-core">
            <stop offset="0.3" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {STARS.map(({ x, y, r, delay }) => (
          <g
            key={`${x}-${y}`}
            className="hero-buy__spark"
            style={{ animationDelay: `${START_DELAY + delay}ms` }}
          >
            <circle cx={x} cy={y} r={r * 0.7} fill="url(#hero-buy-glow)" />
            <path
              d={starPath(x, y, r)}
              fill="#FFE680"
              stroke="#E8A400"
              strokeWidth={0.45}
              strokeLinejoin="round"
            />
            <circle cx={x} cy={y} r={r * 0.26} fill="url(#hero-buy-core)" />
          </g>
        ))}
      </svg>
    </a>
  );
}
