import React from "react";
import { Hero } from "./(landing)/hero";
import { FeaturesSection } from "./(landing)/features";
import { RideOptionsSection } from "./(landing)/ride-options";
import { HowItWorksSection } from "./(landing)/how-it-works";
import { CitiesSection } from "./(landing)/cities";
import { TestimonialsSection } from "./(landing)/testimonials";
import { FAQ, CTA, Stats } from "@/components/ui";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <RideOptionsSection />
      <HowItWorksSection />
      <CitiesSection />
      <TestimonialsSection />
      <FAQ />
      <CTA />
    </div>
  );
}
