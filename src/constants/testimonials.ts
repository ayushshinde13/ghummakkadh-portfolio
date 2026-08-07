import { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aaray Sharma",
    role: "Daily Commuter",
    location: "Bangalore, KA",
    comment:
      "Ghummakkad has made my daily office commute effortless and economical! The rides are quick, affordable and super reliable.",
    highlightedText: "effortless and economical!",
    rating: 5,
    avatarBg: "from-amber-400 to-yellow-500",
    tags: [
      {
        label: "Affordable",
        icon: "🍃",
        bg: "bg-[#DCFCE7]",
        text: "text-[#166534]",
      },
      {
        label: "Verified Drivers",
        icon: "🛡️",
        bg: "bg-[#FEF9C3]",
        text: "text-[#CA8A04]",
      },
    ],
  },
  {
    name: "Riya Verma",
    role: "Student",
    location: "New Delhi, DL",
    comment:
      "Quick pickups and verified drivers make it super safe to travel. I use Ghummakkad every day for college and it never disappoints!",
    highlightedText: "super safe to travel.",
    rating: 5,
    isFeatured: true,
    avatarBg: "from-blue-500 to-indigo-600",
    tags: [
      {
        label: "Safe Rides",
        icon: "🛡️",
        bg: "bg-[#E0F2FE]",
        text: "text-[#0284C7]",
      },
      {
        label: "Quick Pickup",
        icon: "⏱️",
        bg: "bg-[#F3E8FF]",
        text: "text-[#9333EA]",
      },
    ],
  },
  {
    name: "Rohit Mehta",
    role: "Working Professional",
    location: "Mumbai, MH",
    comment:
      "As a business traveler, Ghummakkad helps me reach meetings on time. Comfortable rides, great service and transparent fares!",
    highlightedText: "on time.",
    rating: 5,
    avatarBg: "from-emerald-500 to-teal-600",
    tags: [
      {
        label: "Comfortable",
        icon: "🚕",
        bg: "bg-[#F3E8FF]",
        text: "text-[#9333EA]",
      },
      {
        label: "No Surge Pricing",
        icon: "💰",
        bg: "bg-[#FEF3C7]",
        text: "text-[#D97706]",
      },
    ],
  },
];
