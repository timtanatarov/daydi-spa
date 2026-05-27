import { Inter, Playfair_Display } from "next/font/google";
import { AboutIndiraSection } from "../sections/AboutIndiraSection";
import { HeroSection } from "../sections/HeroSection";
import { PricingSection } from "../sections/PricingSection";
import { QuotePaperSection } from "../sections/QuotePaperSection";
import { PaperShowcaseSection } from "../sections/PaperShowcaseSection";
import { RoadmapSection } from "../sections/RoadmapSection";
import { paperShowcaseSections } from "../lib/paperShowcaseContent";
import { WoodBenefitsSection } from "../sections/WoodBenefitsSection";
import { WoodStepsSection } from "../sections/WoodStepsSection";
import { LandingContainer } from "./LandingContainer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-course-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-course-playfair",
  display: "swap",
  weight: ["400", "700"],
});

export function CourseLandingPage() {
  return (
    <main
      className={`${inter.variable} ${playfair.variable} w-full min-w-0 overflow-x-clip bg-[#2a1f18] pb-8`}
      style={{
        fontFamily: "var(--font-course-inter), system-ui, sans-serif",
      }}
    >
      <LandingContainer>
        <HeroSection />
        <AboutIndiraSection />
        <WoodStepsSection />
        {paperShowcaseSections.map((section, index) => (
          <div key={index}>
            <PaperShowcaseSection {...section} index={index} />
          </div>
        ))}
        <QuotePaperSection />
        <WoodBenefitsSection />
        <RoadmapSection />
        <PricingSection />
      </LandingContainer>
    </main>
  );
}
