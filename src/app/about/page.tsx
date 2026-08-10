import React from "react";
import { AboutSection } from "@/app/(landing)/about";
import { ParcelIntroSection } from "@/app/(landing)/parcel";

export const metadata = {
  title: "About Us | Ghumakkadh",
  description: "Building a Smarter, Happier Commute with Ghumakkadh.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection hideBadge={true} />
      <ParcelIntroSection hideBadge={true} />
    </main>
  );
}
