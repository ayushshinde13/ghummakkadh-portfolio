import { Testimonial } from "@/types/testimonial";
import { Leaf, ShieldCheck, Clock, Car, IndianRupee } from "lucide-react";

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aaray Sharma",
    role: "Daily Commuter",
    location: "Shankar Nagar, Raipur",
    comment:
      "Ghumakkadh has made my daily office commute effortless and economical! The rides are quick, affordable and super reliable.",
    highlightedText: "effortless and economical!",
    rating: 5,
    avatarBg: "from-amber-400 to-yellow-500",
    tags: [
      {
        label: "Affordable",
        icon: Leaf,
        bg: "bg-[#DCFCE7]",
        text: "text-[#166534]",
      },
      {
        label: "Verified Drivers",
        icon: ShieldCheck,
        bg: "bg-[#F0FFEA]",
        text: "text-[#4D9900]",
      },
    ],
  },
  {
    name: "Riya Verma",
    role: "Student",
    location: "NIT Campus, Raipur",
    comment:
      "Quick pickups and verified drivers make it super safe to travel. I use Ghumakkadh every day for college and it never disappoints!",
    highlightedText: "super safe to travel.",
    rating: 5,
    isFeatured: true,
    avatarBg: "from-blue-500 to-indigo-600",
    tags: [
      {
        label: "Safe Rides",
        icon: ShieldCheck,
        bg: "bg-[#E0F2FE]",
        text: "text-[#CC5F00]",
      },
      {
        label: "Quick Pickup",
        icon: Clock,
        bg: "bg-[#F3E8FF]",
        text: "text-[#9333EA]",
      },
    ],
  },
  {
    name: "Rohit Mehta",
    role: "Working Professional",
    location: "Telibandha, Raipur",
    comment:
      "As a business traveler, Ghumakkadh helps me reach meetings on time. Comfortable rides, great service and transparent fares!",
    highlightedText: "on time.",
    rating: 5,
    avatarBg: "from-emerald-500 to-teal-600",
    tags: [
      {
        label: "Comfortable",
        icon: Car,
        bg: "bg-[#F3E8FF]",
        text: "text-[#9333EA]",
      },
      {
        label: "No Surge Pricing",
        icon: IndianRupee,
        bg: "bg-[#FEF3C7]",
        text: "text-[#D97706]",
      },
    ],
  },
];
