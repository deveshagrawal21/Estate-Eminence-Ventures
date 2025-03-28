import { HeroSection } from "@/components/hero-section";
import { IntroSection } from "@/components/intro-section";
import { PlatformSection } from "@/components/platform-section";
import { PremiumListingsSection } from "@/components/premium-listings-section";
import { PropertyTypesSection } from "@/components/property-types-section"; // Updated import
import { MarketAnalysisSection } from "@/components/market-analysis-section"; // Updated import
import { ModernLivingSection } from "@/components/modern-living-section";
import { ServicesSection } from "@/components/services-section"; // Updated import
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <PlatformSection />
      <PremiumListingsSection />
      <ModernLivingSection />
      <MarketAnalysisSection />
      <PropertyTypesSection />
      <ServicesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
