declare module "*.webp" {
  import type { StaticImageData } from "next/image";
  const img: StaticImageData;
  export default img;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
