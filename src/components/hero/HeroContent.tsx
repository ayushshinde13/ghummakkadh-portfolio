import React from "react";
import { Star, Bike, Users } from "lucide-react";

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col items-start text-left justify-center gap-4 sm:gap-5 max-w-xl z-10">
      {/* Top Live Badge - Match Image 2 */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
        <span className="text-[#1E293B] text-[11px] font-bold tracking-wider uppercase">
          NOW LIVE ACROSS PAN INDIA
        </span>
      </div>

      {/* Main H1 Headline - Compact for 1-screen fit without scroll */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-white">
        Ride Smarter.
        <br />
        <span className="text-[#77FF00] relative inline-block">
          Travel Faster.
          {/* Subtle Golden Underline Brush Stroke */}
          <svg
            className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#77FF00]"
            viewBox="0 0 240 12"
            fill="none"
          >
            <path
              d="M3 9C60 3 180 3 237 9"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      {/* Description paragraph - Match Image 2 */}
      <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-lg">
        Book rides in seconds with transparent fares, OTP-verified drivers and live GPS tracking.
      </p>

      {/* CTA Buttons Row - Match Image 2 */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <a
          href="https://play.google.com/store/apps/details?id=com.ghumakkadh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#4eb902] hover:bg-[#3d9400] text-[#1E293B] font-bold text-sm sm:text-base px-6 py-3 rounded-full shadow-md transition-colors"
        >
          <span>Book a Ride</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.ghumakkadh.partner"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-[#1E293B] font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-sm transition-colors"
        >
          {/* User Icon */}
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Drive &amp; Earn</span>
        </a>
      </div>

      {/* Stats Row with Yellow Square Icons and Vertical Dividers - Match Image 2 */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-5 mt-2 border-t border-white/20 w-full">
        {/* Stat 1: Rating */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F0FFEA] flex items-center justify-center text-[#4D9900] shrink-0 font-bold text-base">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-bold text-gray-200">
              App Rating
            </div>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />

        {/* Stat 2: Rides Completed */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F0FFEA] flex items-center justify-center text-[#4D9900] shrink-0 text-base">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-bold text-gray-200">
              Rides Completed
            </div>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />

        {/* Stat 3: Verified Drivers */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F0FFEA] flex items-center justify-center text-[#4D9900] shrink-0 text-base">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-bold text-gray-200">
              Verified Drivers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

