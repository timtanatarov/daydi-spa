import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import type { StaticImageData } from "next/image";

/**
 * «Холст» лендинга: все размеры задаются в px макета (ширина фрейма 390)
 * и масштабируются вместе с шириной экрана через CSS-переменную --u (см. LandingFrame).
 * Числа в пропсах x / y / w / h / size / leading — ровно те, что видны в Dev Mode.
 */
export const u = (px: number): string => `calc(var(--u) * ${px})`;

export type Box = {
  /** левый верхний угол блока, px макета от верха секции */
  x: number;
  y: number;
  w: number;
  h: number;
  /** поворот в градусах CSS (по часовой стрелке) вокруг левого верхнего угла */
  rotate?: number;
  /** для отражённых слоёв: transform: matrix(a, b, c, d, 0, 0) вокруг левого верхнего угла */
  matrix?: readonly [number, number, number, number];
  /**
   * Левый верхний угол родителя, если слой вложен в другой позиционированный слой
   * (кнопка, список, карточка): x / y остаются «от секции», как в макете.
   */
  origin?: { x: number; y: number };
};

export function boxStyle({ x, y, w, h, rotate, matrix, origin }: Box): CSSProperties {
  const transform = matrix
    ? `matrix(${matrix.join(", ")}, 0, 0)`
    : rotate
      ? `rotate(${rotate}deg)`
      : undefined;
  return {
    position: "absolute",
    left: u(origin ? x - origin.x : x),
    top: u(origin ? y - origin.y : y),
    width: u(w),
    height: u(h),
    ...(transform ? { transform, transformOrigin: "0 0" } : null),
  };
}

const FONT_FAMILY = {
  inter: "var(--font-course-inter), system-ui, sans-serif",
  playfair: "var(--font-course-playfair), Georgia, serif",
  "playfair-opsz": "var(--font-course-playfair-opsz), var(--font-course-playfair), Georgia, serif",
} as const;

export type FontName = keyof typeof FONT_FAMILY;

/**
 * Картинка макета в двух плотностях — для экранов 2x и 3x (арт блока: 780 и 1170px).
 * x4 — для картинок, которые на сайте показаны крупнее, чем в макете: иначе на экранах 3x им не хватит точек.
 */
export type BlockArt = { x2: StaticImageData; x3: StaticImageData; x4?: StaticImageData };

/** Набор файлов картинки для srcset: браузер берёт самый маленький, которого хватает экрану. */
const srcSet = (art: BlockArt): string =>
  [art.x2, art.x3, art.x4]
    .filter((file) => file !== undefined)
    .map((file) => `${file.src} ${file.width}w`)
    .join(", ");

type BlockProps = {
  as?: ElementType;
  /** имя блока из design/reference/blocks.json, например "01-hero" */
  name: string;
  /** высота блока в px макета */
  height: number;
  /** запечённый арт блока (всё, кроме текста), см. lib/blockArt.ts */
  art: BlockArt;
  /**
   * Высота арта в px макета, если блок выше него: так бывает у блоков, перекомпонованных под
   * крупный шрифт, где арт — только фактура фона (дерево, бумага). Ниже арта фон продолжают
   * его копии, каждая вторая отражена по вертикали — стыки получаются без шва.
   */
  artHeight?: number;
  /** первый экран: грузить арт без lazy */
  priority?: boolean;
  /**
   * Цвет секции, пока арт не загрузился (или не загрузился вовсе). По умолчанию — бумага макета;
   * блокам со светлым текстом на тёмном арте нужен тёмный, иначе текст до картинки не виден.
   */
  background?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Секция-холст: арт блока фоном + абсолютно позиционированные слои поверх.
 * Арт — обычный <img> с готовыми файлами под 2x и 3x: на ширине макета (390px) пиксели
 * картинки попадают в пиксели экрана один к одному. Оптимизатор next/image здесь не нужен:
 * он пережимает уже сжатый файл и размывает тонкие линии и фактуру дерева и бумаги.
 */
export function Block({
  as: Tag = "section",
  name,
  height,
  art,
  artHeight,
  priority = false,
  background = "#F6F5F1",
  id,
  className,
  children,
}: BlockProps) {
  const tiles = artHeight && artHeight < height ? Math.ceil(height / artHeight) : 1;
  const image = {
    src: art.x3.src,
    srcSet: srcSet(art),
    sizes: "(max-width: 480px) 100vw, 480px",
    width: art.x3.width,
    height: art.x3.height,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
    decoding: priority ? "sync" : "async",
    draggable: false,
  } as const;
  return (
    <Tag
      id={id}
      data-block={name}
      className={["relative w-full", className].filter(Boolean).join(" ")}
      style={{ height: u(height), backgroundColor: background }}
    >
      {tiles === 1 ? (
        // eslint-disable-next-line @next/next/no-img-element -- готовые файлы 2x/3x, без оптимизатора
        <img
          {...image}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full select-none"
        />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: tiles }, (_, index) => (
            // eslint-disable-next-line @next/next/no-img-element -- готовые файлы 2x/3x, без оптимизатора
            <img
              key={index}
              {...image}
              alt=""
              className={["absolute left-0 w-full select-none", index % 2 && "-scale-y-100"]
                .filter(Boolean)
                .join(" ")}
              // копии заходят друг на друга на пиксель: на дробных масштабах между ними не бывает щели
              style={{
                top: `calc(var(--u) * ${index * (artHeight ?? height)} - ${index}px)`,
                height: u(artHeight ?? height),
              }}
            />
          ))}
        </div>
      )}
      {children}
    </Tag>
  );
}

type PicProps = Box & {
  /** картинка в двух плотностях, как арт блока */
  art: BlockArt;
  alt?: string;
  /** грузить сразу: для картинок, скрытых за краем прокручиваемого ряда (lazy их не подгрузит заранее) */
  eager?: boolean;
  className?: string;
};

/**
 * Отдельная картинка макета, поставленная по своему слою: то, что должно двигаться
 * отдельно от арта блока (карточки в прокручиваемом ряду, слайды карусели).
 */
export function Pic({ art, alt = "", eager = false, className, ...box }: PicProps) {
  // округление вниз: иначе на экране 2x плотность файла выходит чуть меньше 2 и Safari берёт файл 3x
  const share = Math.floor((box.w / 390) * 10000) / 100;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- готовые файлы 2x/3x, без оптимизатора
    <img
      src={art.x3.src}
      srcSet={srcSet(art)}
      sizes={`(max-width: 480px) ${share}vw, ${Math.floor((box.w * 480) / 390)}px`}
      width={art.x3.width}
      height={art.x3.height}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={["pointer-events-none max-w-none select-none", className]
        .filter(Boolean)
        .join(" ")}
      style={boxStyle(box)}
    />
  );
}

type TextProps = Box & {
  as?: ElementType;
  /** id слоя в Figma (например "352:171") — по нему блок сверяется с макетом */
  fig?: string;
  /** кегль, px макета */
  size: number;
  /** межстрочный интервал, px макета */
  leading: number;
  font?: FontName;
  weight?: number;
  italic?: boolean;
  align?: "left" | "center" | "right";
  color?: string;
  /** трекинг в em (в Figma — проценты / 100) */
  tracking?: number;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "color" | "children">;

/**
 * Текстовый слой макета. Переносы строк задаются явно (<br /> или блочные строки):
 * автоматического переноса нет, поэтому раскладка не зависит от браузера.
 */
export function T({
  as: Tag = "p",
  fig,
  x,
  y,
  w,
  h,
  rotate,
  matrix,
  origin,
  size,
  leading,
  font = "inter",
  weight = 400,
  italic = false,
  align = "left",
  color,
  tracking,
  className,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      data-fig={fig}
      className={["m-0 p-0 whitespace-nowrap", className].filter(Boolean).join(" ")}
      style={{
        ...boxStyle({ x, y, w, h, rotate, matrix, origin }),
        fontFamily: FONT_FAMILY[font],
        fontSize: u(size),
        lineHeight: u(leading),
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        textAlign: align,
        color,
        letterSpacing: tracking ? `${tracking}em` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Маркер строки списка, как в Figma: отступ 1.5em слева от текста, «•» по центру отступа.
 * Строка (отступ + текст) выравнивается целиком. Для продолжения пункта — <Bullet empty />.
 */
export function Bullet({ empty = false }: { empty?: boolean }) {
  return (
    <span data-bullet aria-hidden className="inline-block w-[1.5em] text-center">
      {empty ? null : "•"}
    </span>
  );
}
