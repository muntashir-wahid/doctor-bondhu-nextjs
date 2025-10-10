import { HeroCarousel } from "@/app/(public)/_components/hero-carousel";
import { FeaturesSection } from "@/app/(public)/_components/features-section";
import { HowItWorksSection } from "@/app/(public)/_components/how-it-works-section";
import { TestimonialsSection } from "@/app/(public)/_components/testimonials-section";
import { CTASection } from "@/app/(public)/_components/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
