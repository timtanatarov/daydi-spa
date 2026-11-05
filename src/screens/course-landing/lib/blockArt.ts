import type { BlockArt } from "../ui/canvas";

import hero2x from "@/assets/course-landing/art/01-hero@2x.webp";
import hero3x from "@/assets/course-landing/art/01-hero@3x.webp";
import about2x from "@/assets/course-landing/art/02-about@2x.webp";
import about3x from "@/assets/course-landing/art/02-about@3x.webp";
import woodSteps2x from "@/assets/course-landing/art/03-wood-steps@2x.webp";
import woodSteps3x from "@/assets/course-landing/art/03-wood-steps@3x.webp";
import showcase2x from "@/assets/course-landing/art/04-showcase@2x.webp";
import showcase3x from "@/assets/course-landing/art/04-showcase@3x.webp";
import quote2x from "@/assets/course-landing/art/05-quote@2x.webp";
import quote3x from "@/assets/course-landing/art/05-quote@3x.webp";
import woodBenefits2x from "@/assets/course-landing/art/06-wood-benefits@2x.webp";
import woodBenefits3x from "@/assets/course-landing/art/06-wood-benefits@3x.webp";
import roadmap2x from "@/assets/course-landing/art/07-roadmap@2x.webp";
import roadmap3x from "@/assets/course-landing/art/07-roadmap@3x.webp";
import pricing2x from "@/assets/course-landing/art/08-pricing@2x.webp";
import pricing3x from "@/assets/course-landing/art/08-pricing@3x.webp";

/**
 * Арт блоков лендинга: все нетекстовые слои макета (фото, бумага, текстуры, плашки, линии),
 * запечённые в одну картинку на блок. Файлы — в src/assets/course-landing/art,
 * имена совпадают с блоками из design/reference/blocks.json.
 */
export const heroArt: BlockArt = { x2: hero2x, x3: hero3x };
export const aboutArt: BlockArt = { x2: about2x, x3: about3x };
export const woodStepsArt: BlockArt = { x2: woodSteps2x, x3: woodSteps3x };
export const showcaseArt: BlockArt = { x2: showcase2x, x3: showcase3x };
export const quoteArt: BlockArt = { x2: quote2x, x3: quote3x };
export const woodBenefitsArt: BlockArt = { x2: woodBenefits2x, x3: woodBenefits3x };
export const roadmapArt: BlockArt = { x2: roadmap2x, x3: roadmap3x };
export const pricingArt: BlockArt = { x2: pricing2x, x3: pricing3x };
