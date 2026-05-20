type Props = {
  src: string;
  className?: string;
};

/**
 * Полоска перфорации «как марка» из Figma.
 * Использует заранее обрезанный webp (нативная высота ~60px), без сжатия
 * всего 1024px-маска в 60px — иначе полукруги превращаются в кашу.
 */
export function ScallopEdgeStrip({ src, className }: Props) {
  return (
    <img
      alt=""
      aria-hidden
      decoding="async"
      loading="lazy"
      src={src}
      className={`pointer-events-none h-full w-full max-w-none object-fill ${className ?? ""}`}
    />
  );
}
