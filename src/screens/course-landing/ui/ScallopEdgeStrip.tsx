import type { StaticImageData } from "next/image";
import Image from "next/image";

type Props = {
  /** @deprecated используйте `image` */
  src?: string;
  image?: StaticImageData;
  className?: string;
};

/**
 * Полоска перфорации «как марка» из Figma.
 */
export function ScallopEdgeStrip({ src, image, className }: Props) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        sizes="453px"
        className={`pointer-events-none max-w-none object-fill ${className ?? ""}`}
      />
    );
  }

  if (!src) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- legacy string src
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
