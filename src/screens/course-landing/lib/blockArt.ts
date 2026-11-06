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
import woodBenefitsWood2x from "@/assets/course-landing/art/06-wood-benefits-wood@2x.webp";
import woodBenefitsWood3x from "@/assets/course-landing/art/06-wood-benefits-wood@3x.webp";
import woodBenefitsTicket2x from "@/assets/course-landing/art/06-wood-benefits-ticket@2x.webp";
import woodBenefitsTicket3x from "@/assets/course-landing/art/06-wood-benefits-ticket@3x.webp";
import roadmap2x from "@/assets/course-landing/art/07-roadmap@2x.webp";
import roadmap3x from "@/assets/course-landing/art/07-roadmap@3x.webp";
import pricingPaper2x from "@/assets/course-landing/art/08-pricing-paper@2x.webp";
import pricingPaper3x from "@/assets/course-landing/art/08-pricing-paper@3x.webp";
import item1a2x from "@/assets/course-landing/art/04-showcase-item-1a@2x.webp";
import item1a3x from "@/assets/course-landing/art/04-showcase-item-1a@3x.webp";
import item1b2x from "@/assets/course-landing/art/04-showcase-item-1b@2x.webp";
import item1b3x from "@/assets/course-landing/art/04-showcase-item-1b@3x.webp";
import item2a2x from "@/assets/course-landing/art/04-showcase-item-2a@2x.webp";
import item2a3x from "@/assets/course-landing/art/04-showcase-item-2a@3x.webp";
import item2b2x from "@/assets/course-landing/art/04-showcase-item-2b@2x.webp";
import item2b3x from "@/assets/course-landing/art/04-showcase-item-2b@3x.webp";
import item3a2x from "@/assets/course-landing/art/04-showcase-item-3a@2x.webp";
import item3a3x from "@/assets/course-landing/art/04-showcase-item-3a@3x.webp";
import item3b2x from "@/assets/course-landing/art/04-showcase-item-3b@2x.webp";
import item3b3x from "@/assets/course-landing/art/04-showcase-item-3b@3x.webp";
import cardClip2x from "@/assets/course-landing/art/07-roadmap-card-clip@2x.webp";
import cardClip3x from "@/assets/course-landing/art/07-roadmap-card-clip@3x.webp";
import cardClip4x from "@/assets/course-landing/art/07-roadmap-card-clip@4x.webp";
import cardSeal2x from "@/assets/course-landing/art/07-roadmap-card-seal@2x.webp";
import cardSeal3x from "@/assets/course-landing/art/07-roadmap-card-seal@3x.webp";
import cardSeal4x from "@/assets/course-landing/art/07-roadmap-card-seal@4x.webp";

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
export const roadmapArt: BlockArt = { x2: roadmap2x, x3: roadmap3x };

/**
 * Блоки, перекомпонованные под крупный шрифт: арт — только фактура фона (выше блока её продолжают
 * зеркальные копии, см. artHeight у Block), остальное рисуется кодом или отдельными картинками.
 */
/** «После обучения ты»: дерево без плашки и билета, 390×607. */
export const woodBenefitsWoodArt: BlockArt = { x2: woodBenefitsWood2x, x3: woodBenefitsWood3x };
/** Бумажный билет блока «после обучения ты» с прозрачным фоном, 400×119 (слой макета «Group 33»). */
export const woodBenefitsTicketArt: BlockArt = {
  x2: woodBenefitsTicket2x,
  x3: woodBenefitsTicket3x,
};
/** Тарифы: бумага без билетов и линий, 390×1974. */
export const pricingPaperArt: BlockArt = { x2: pricingPaper2x, x3: pricingPaper3x };

/** Карточки дорожной карты: стоят в прокручиваемом ряду, поэтому не входят в арт блока. */
export const roadmapCardClipArt: BlockArt = { x2: cardClip2x, x3: cardClip3x, x4: cardClip4x };
export const roadmapCardSealArt: BlockArt = { x2: cardSeal2x, x3: cardSeal3x, x4: cardSeal4x };

/** Карточки товаров витрины: слайды карусели, по две на каждую из трёх групп. */
export const showcaseItemArt = {
  "1a": { x2: item1a2x, x3: item1a3x },
  "1b": { x2: item1b2x, x3: item1b3x },
  "2a": { x2: item2a2x, x3: item2a3x },
  "2b": { x2: item2b2x, x3: item2b3x },
  "3a": { x2: item3a2x, x3: item3a3x },
  "3b": { x2: item3b2x, x3: item3b3x },
} satisfies Record<string, BlockArt>;
