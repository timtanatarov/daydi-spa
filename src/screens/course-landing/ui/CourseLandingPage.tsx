import { Inter, Playfair_Display } from "next/font/google";
import { paperShowcaseSections } from "../lib/content";
import { imgScallopEdgeHero } from "../lib/landingAssets";
import { AboutIndiraSection } from "../sections/AboutIndiraSection";
import { HeroSection } from "../sections/HeroSection";
import { PaperShowcaseSection } from "../sections/PaperShowcaseSection";
import { PricingSection } from "../sections/PricingSection";
import { QuotePaperSection } from "../sections/QuotePaperSection";
import { RoadmapSection } from "../sections/RoadmapSection";
import { SectionDivider } from "../sections/SectionDivider";
import { WoodBenefitsSection } from "../sections/WoodBenefitsSection";
import { WoodStepsSection } from "../sections/WoodStepsSection";
import { LandingContainer } from "./LandingContainer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-course-inter",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
      className={`${inter.variable} ${playfair.variable} w-full min-w-0 overflow-x-clip bg-[#f6f5f1] pb-8`}
      style={{
        fontFamily: "var(--font-course-inter), system-ui, sans-serif",
      }}
    >
      <LandingContainer>
        <HeroSection />
        <SectionDivider src={imgScallopEdgeHero} />
        <AboutIndiraSection />
        <WoodStepsSection />

        {paperShowcaseSections.map((section) => (
          <PaperShowcaseSection
            key={typeof section.title === "string" ? section.title : section.title.join("-")}
            title={section.title}
            pairs={[...section.pairs]}
            footer={section.footer}
          />
        ))}

        <QuotePaperSection />
        <WoodBenefitsSection />
        <RoadmapSection />
        <PricingSection />
      </LandingContainer>
    </main>
  );
}
