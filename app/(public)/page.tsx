import { Header } from "@/components/shared/layout/header";
import { HeroCarousel } from "@/app/(public)/_components/hero-carousel";
import { FeaturesSection } from "@/app/(public)/_components/features-section";
import { HowItWorksSection } from "@/app/(public)/_components/how-it-works-section";
import { TestimonialsSection } from "@/app/(public)/_components/testimonials-section";
import { CTASection } from "@/app/(public)/_components/cta-section";
import { Footer } from "@/components/shared/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
