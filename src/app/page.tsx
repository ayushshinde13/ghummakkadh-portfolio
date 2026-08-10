import React from "react";
import { Hero } from "./(landing)/hero";
import { FeaturesSection } from "./(landing)/features";
import { RideOptionsSection } from "./(landing)/ride-options";
import { TestimonialsSection } from "./(landing)/testimonials";
import { ParcelIntroSection } from "./(landing)/parcel";
import { FAQ, CTA, Stats } from "@/components/ui";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <RideOptionsSection />
      <TestimonialsSection />
      <ParcelIntroSection />
      <FAQ />
      <CTA />
    </div>
  );
}
