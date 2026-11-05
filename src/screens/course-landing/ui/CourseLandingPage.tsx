import { AboutIndiraSection } from "../sections/AboutIndiraSection";
import { HeroSection } from "../sections/HeroSection";
import { PaperShowcaseSection } from "../sections/PaperShowcaseSection";
import { PricingSection } from "../sections/PricingSection";
import { QuotePaperSection } from "../sections/QuotePaperSection";
import { RoadmapSection } from "../sections/RoadmapSection";
import { WoodBenefitsSection } from "../sections/WoodBenefitsSection";
import { WoodStepsSection } from "../sections/WoodStepsSection";
import { LandingFrame } from "./LandingFrame";

/** Лендинг курса: блоки идут в том же порядке, что и во фрейме «единая верстка» макета. */
export function CourseLandingPage() {
  return (
    <LandingFrame>
      <HeroSection />
      <AboutIndiraSection />
      <WoodStepsSection />
      <PaperShowcaseSection />
      <QuotePaperSection />
      <WoodBenefitsSection />
      <RoadmapSection />
      <PricingSection />
    </LandingFrame>
  );
}
