import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import stampBg from "@/assets/course-landing/stamp-bg.png";
import paperTextureTile from "@/assets/course-landing/paper-texture-tile.webp";
import { staticImgWoodBg } from "../lib/landingAssets";

import styles from "./CraftPaperTopEdge.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero → «Привет»: дерево по ширине, лист 480px с перфорацией (марка).
 * Марка — RGB PNG без альфы; mask-mode:luminance → чёрное=прозрачно (дерево видно), белое=бумага.
 */
export function CraftPaperTopEdge({ children, className = "" }: Props) {
  const vars = {
    "--paper-texture": `url(${paperTextureTile.src})`,
    "--stamp-mask": `url(${stampBg.src})`,
  } as CSSProperties;

  return (
    <div className={`${styles.woodBlock} ${className}`.trim()}>
      <div className={styles.sheet}>
        <div className={styles.sheetBody} style={vars}>
          {children}
        </div>
      </div>
    </div>
  );
}
