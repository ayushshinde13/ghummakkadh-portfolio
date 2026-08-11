import React from "react";
import { Hero } from "./(landing)/hero";
import { FeaturesSection } from "./(landing)/features";
import { RideOptionsSection } from "./(landing)/ride-options";
import { DriveIntroSection } from "./(landing)/drive";
import { TestimonialsSection } from "./(landing)/testimonials";
import { ParcelIntroSection } from "./(landing)/parcel";
import { FAQ, CTA, Stats } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#050B1A] to-[#0B1830] text-white min-h-screen pt-20">
      <Hero />
      <FeaturesSection />
      <RideOptionsSection />
      <DriveIntroSection />
      <TestimonialsSection />
      <ParcelIntroSection />
      <FAQ />
      <CTA />
    </div>
  );
}
