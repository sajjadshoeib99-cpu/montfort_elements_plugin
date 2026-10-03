import { AboutSection } from "@/sections/AboutSection";
import { CtaSection } from "@/sections/CtaSection";
import { FeaturedSection } from "@/sections/FeaturedSection";
import { Hero } from "@/sections/Hero";
import { ServicesSection } from "@/sections/ServicesSection";
import { TeamSection } from "@/sections/TeamSection";
import { WhySection } from "@/sections/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedSection />
      <ServicesSection />
      <WhySection />
      <TeamSection />
      <CtaSection />
    </>
  );
}
