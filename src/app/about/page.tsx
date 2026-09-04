import React from "react";
import { AboutSection } from "@/app/(landing)/about";
import { ParcelIntroSection } from "@/app/(landing)/parcel";

export const metadata = {
  title: "About Us | Ghumakkadh",
  description: "Building a Smarter, Happier Commute with Ghumakkadh.",
};

export default function AboutPage() {
  return (
    <main className="pt-20 bg-slate-50 dark:bg-[#0A0E1A] min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <AboutSection hideBadge={true} />
      <div className="mt-20 lg:mt-32 pb-20">
        <ParcelIntroSection hideBadge={true} />
      </div>
    </main>
  );
}
