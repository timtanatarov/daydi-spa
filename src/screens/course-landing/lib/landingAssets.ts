import type { StaticImageData } from "next/image";

// — Backgrounds —
import woodBg from "@/assets/course-landing/bg-wood.webp";
import woodStepsBg from "@/assets/course-landing/bg-wood-steps.webp";

// — Hero section —
import heroBg from "@/assets/course-landing/hero-bg.webp";
import heroPhoto from "@/assets/course-landing/hero-photo.webp";
import heroPaperCard from "@/assets/course-landing/hero-paper-card.webp";
import heroTapeBadge from "@/assets/course-landing/hero-tape-badge.webp";

// — About Indira section —
import aboutIndiraTopEdge from "@/assets/course-landing/about-indira-top-edge.webp";
import aboutTapeBanner from "@/assets/course-landing/about-tape-banner.webp";
import aboutPhotoCoat from "@/assets/course-landing/about-photo-coat.webp";
import aboutPhotoJacket from "@/assets/course-landing/about-photo-jacket.webp";
import aboutPhotoBags from "@/assets/course-landing/about-photo-bags.webp";
import aboutPaperclip from "@/assets/course-landing/about-paperclip.webp";
import aboutMiniTape1 from "@/assets/course-landing/mini-tape-1.webp";
import aboutMiniTape2 from "@/assets/course-landing/mini-tape-2.webp";
import aboutIndiraBottomEdge from "@/assets/course-landing/about-indira-bottom-edge.webp";
import aboutIndiraBg from "@/assets/course-landing/about-indira-bg.webp";

// — Shared UI elements —
import iconStar from "@/assets/course-landing/icon-star.webp";
import paperQuoteBg from "@/assets/course-landing/bg-paper-quote.webp";
import pricingCardTexture from "@/assets/course-landing/pricing-card-texture.webp";
import productCompare from "@/assets/course-landing/product-compare.webp";

// — Paper textures & scallop edges —
import paperTexture from "@/assets/course-landing/paper-texture.webp";
import paperTextureTile from "@/assets/course-landing/paper-texture-tile.webp";
import scallopHero from "@/assets/course-landing/scallop-edge-hero.webp";
import scallopMidTop from "@/assets/course-landing/scallop-edge-mid-top.webp";
import scallopMidBottom from "@/assets/course-landing/benefits-ticket.png";
import ticketSteps from "@/assets/course-landing/ticket-steps.webp";
import paperShowcaseDivider from "@/assets/course-landing/paper-showcase-divider.webp";
import paperShowcaseDividerHalf from "@/assets/course-landing/paper-showcase-divider-half.webp";
import paperShowcaseDividerAltHalf from "@/assets/course-landing/paper-showcase-divider-alt-half.webp";
import quotePaperSectionBg from "@/assets/course-landing/quote-paper-section.webp";

// — SVG decorations —
import lineDecorSvg from "@/assets/course-landing/line-decor.svg";
import lineShortSvg from "@/assets/course-landing/line-short.svg";

function src(img: StaticImageData): string {
  return img.src;
}

// StaticImageData — for next/image components
export const staticImgWoodBg = woodBg;
export const staticHeroBg = heroBg;
export const staticHeroPhoto = heroPhoto;
export const staticHeroPaperCard = heroPaperCard;
export const staticHeroTapeBadge = heroTapeBadge;
export const staticImgScallopHero = scallopHero;
export const staticAboutIndiraTopEdge = aboutIndiraTopEdge;
export const staticAboutIndiraBg = aboutIndiraBg;
export const staticAboutIndiraBottomEdge = aboutIndiraBottomEdge;
export const staticAboutTapeBanner = aboutTapeBanner;
export const staticAboutPhotoCoat = aboutPhotoCoat;
export const staticAboutPhotoJacket = aboutPhotoJacket;
export const staticAboutPhotoBags = aboutPhotoBags;
export const staticAboutPaperclip = aboutPaperclip;
export const staticAboutMiniTape1 = aboutMiniTape1;
export const staticAboutMiniTape2 = aboutMiniTape2;
export const staticIconStar = iconStar;
export const staticTicketSteps = ticketSteps;
export const staticBgPaperQuote = paperQuoteBg;
export const staticPaperShowcaseDivider = paperShowcaseDivider;
export const staticPaperShowcaseDividerHalf = paperShowcaseDividerHalf;
export const staticPaperShowcaseDividerAltHalf = paperShowcaseDividerAltHalf;
export const staticQuotePaperSectionBg = quotePaperSectionBg;
export const staticProductCompare = productCompare;

// String URLs — for plain <img> elements
export const imgAboutIndirabg = src(aboutIndiraBg);
export const imgBgPaperQuote = src(paperQuoteBg);
export const imgBgWoodSteps = src(woodStepsBg);
export const imgPricingCardTexture = src(pricingCardTexture);
export const imgProductCompare = src(productCompare);
export const imgPaperTexture = src(paperTexture);
export const imgPaperTextureTile = src(paperTextureTile);
export const imgScallopEdgeHero = src(scallopHero);
export const imgScallopEdgeMidTop = src(scallopMidTop);
export const staticBenefitsTicket = scallopMidBottom;

export const imgLineDecor = lineDecorSvg;
export const imgLineShort = lineShortSvg;
