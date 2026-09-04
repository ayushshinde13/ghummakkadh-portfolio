import React from "react";
import { Hero } from "./(landing)/hero";
import { FeaturesSection } from "./(landing)/features";
import { RideOptionsSection } from "./(landing)/ride-options";
import { DriveIntroSection } from "./(landing)/drive";
import { TestimonialsSection } from "./(landing)/testimonials";
import { ParcelIntroSection } from "./(landing)/parcel";
import { FAQ, CTA, Stats, AppDownloadSection } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="bg-[#F8FAFC] dark:bg-gradient-to-b dark:from-[#050B1A] dark:to-[#0B1830] text-slate-900 dark:text-white min-h-screen pt-20 transition-colors duration-300">
      <Hero />
      <FeaturesSection />
      <RideOptionsSection />
      <DriveIntroSection />
      <TestimonialsSection />
      <ParcelIntroSection />
      <FAQ />
      <AppDownloadSection />
    </div>
  );
}
