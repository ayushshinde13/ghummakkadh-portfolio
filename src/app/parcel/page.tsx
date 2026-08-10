import React from "react";
import { ParcelSection } from "@/app/(landing)/parcel";

export const metadata = {
  title: "Parcel Delivery with Ghumakkadh",
  description: "Send parcels quickly and safely across India with Ghumakkadh.",
};

export default function ParcelPage() {
  return (
    <main>
      <ParcelSection hideBadge={true} />
    </main>
  );
}
