import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { PrizesSection } from "@/components/sections/prizes";
import { RegistrationSection } from "@/components/sections/registration";
import { TermsSection } from "@/components/sections/terms";
import { TimelineSection } from "@/components/sections/timeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <PrizesSection />
        <TimelineSection />
        <RegistrationSection />
        <TermsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
