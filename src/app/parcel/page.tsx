import React from "react";
import { ParcelSection } from "@/app/(landing)/parcel";

export const metadata = {
  title: "Parcel Delivery with Ghumakkadh",
  description: "Send parcels quickly and safely across India with Ghumakkadh.",
};

export default function ParcelPage() {
  return (
    <main className="pt-20">
      <ParcelSection hideBadge={true} />
    </main>
  );
}
