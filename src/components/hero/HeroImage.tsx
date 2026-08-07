import React from "react";
import { cn } from "@/lib/cn";

export const HeroImage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center mt-6 lg:mt-2 pb-4",
        className
      )}
    >
      {/* Background dotted golden arc lines matching Image 2 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
        viewBox="0 0 500 500"
        fill="none"
      >
        <path
          d="M50 400 C 150 200, 350 100, 450 150"
          stroke="#EAB308"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M100 450 C 250 300, 400 250, 480 300"
          stroke="#EAB308"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10">
        {/* Floating Card 1: Fare Locked (Left of phone, shifted safely away from notch) */}
        <div className="absolute -left-4 sm:-left-20 top-24 z-30 bg-[#FFFDEB] rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-[#FEF08A] hidden sm:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FEF9C3] flex items-center justify-center text-[#CA8A04] text-base font-bold">
            🔒
          </div>
          <div>
            <div className="text-xs font-black text-[#1E293B]">
              Fare Locked
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              No Surge Pricing
            </div>
          </div>
        </div>

        {/* Floating Card 2: OTP Verified (Right of phone) */}
        <div className="absolute -right-4 sm:-right-20 top-28 z-30 bg-[#FFFDEB] rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-[#DCFCE7] hidden sm:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#166534] text-base font-bold">
            🛡️
          </div>
          <div>
            <div className="text-xs font-black text-[#1E293B]">
              OTP Verified
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              Every Ride, Every Time
            </div>
          </div>
        </div>

        {/* Floating Card 3: Driver Nearby (Middle-Right of phone) */}
        <div className="absolute -right-4 sm:-right-20 bottom-28 z-30 bg-[#FFFDEB] rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-[#FFEDD5] hidden sm:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FFEDD5] flex items-center justify-center text-[#EA580C] text-base font-bold">
            📍
          </div>
          <div>
            <div className="text-xs font-black text-[#1E293B]">
              Driver Nearby
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              2 mins away
            </div>
          </div>
        </div>

        {/* Floating Card 4: Live Tracking (Bottom-Left overlapping guardrail matching Image 2) */}
        <div className="absolute left-6 sm:left-4 -bottom-6 z-40 bg-[#FFFDEB] rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-[#E0F2FE] hidden sm:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] text-base font-bold">
            📍
          </div>
          <div>
            <div className="text-xs font-black text-[#1E293B]">
              Live Tracking
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              On Route
            </div>
          </div>
        </div>

        {/* Phone Mockup: Shifted upside and increased in height (580px) */}
        <div className="relative mx-auto w-[300px] sm:w-[320px] h-[540px] sm:h-[580px] bg-white rounded-[44px] border-[8px] border-[#1E293B] shadow-[0_20px_50px_rgba(30,41,59,0.22)] overflow-hidden flex flex-col justify-between">
          {/* Top Status Bar & Notch */}
          <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5 bg-white z-20">
            <span className="text-[11px] font-bold text-[#1E293B]">9:41</span>
            <div className="w-20 h-3.5 bg-[#1E293B] rounded-full" />
            <div className="flex items-center gap-1 text-[9px] text-[#1E293B] font-bold">
              <span>5G</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Location Selection Card matching Image 2 */}
          <div className="mx-3 my-1 p-2.5 bg-white rounded-xl border border-gray-100 shadow-sm z-20">
            {/* Pickup */}
            <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <div className="text-left">
                <div className="text-[9px] text-gray-400 font-medium">
                  Pickup Location
                </div>
                <div className="text-[11px] font-bold text-[#1E293B]">
                  Nehru Nagar, Raipur
                </div>
              </div>
            </div>
            {/* Drop */}
            <div className="flex items-center gap-2 pt-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
              <div className="text-left">
                <div className="text-[9px] text-gray-400 font-medium">
                  Drop Location
                </div>
                <div className="text-[11px] font-bold text-[#1E293B]">
                  Shastri Chowk, Raipur
                </div>
              </div>
            </div>
          </div>

          {/* Map Area with Dotted GPS Route and Scooter Icon */}
          <div className="relative w-full h-[38%] bg-[#EAEFF8] overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(#CBD5E1 1.5px, transparent 1.5px), linear-gradient(to right, #CBD5E1 1.5px, transparent 1.5px)",
                backgroundSize: "44px 44px",
              }}
            />
            {/* Dotted GPS Route Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 280 180"
              fill="none"
            >
              <path
                d="M40 150 Q 130 110, 230 30"
                stroke="#EAB308"
                strokeWidth="3.5"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />
            </svg>
            {/* Origin Dot */}
            <div className="absolute bottom-5 left-10 z-10 w-3.5 h-3.5 bg-[#EA580C] rounded-full border-2 border-white shadow" />
            {/* Destination Dot */}
            <div className="absolute top-6 right-10 z-10 w-3.5 h-3.5 bg-[#22C55E] rounded-full border-2 border-white shadow" />
            {/* Scooter Icon on route */}
            <div className="absolute top-16 left-32 z-10 bg-white px-2 py-0.5 rounded-full shadow-sm text-xs font-bold border border-yellow-300">
              🛵
            </div>
          </div>

          {/* Bottom Sheet Card "Choose a ride" matching Image 2 exactly */}
          <div className="bg-white rounded-t-2xl p-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-20">
            <h3 className="text-[11px] font-bold text-gray-500 mb-1.5 text-left">
              Choose a ride
            </h3>

            {/* Bike */}
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="text-base">🏍️</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#1E293B]">
                    Bike
                  </div>
                  <div className="text-[9px] text-gray-400">2 mins away</div>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-[#1E293B]">
                ₹48
              </span>
            </div>

            {/* Auto */}
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="text-base">🛺</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#1E293B]">
                    Auto
                  </div>
                  <div className="text-[9px] text-gray-400">3 mins away</div>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-[#1E293B]">
                ₹95
              </span>
            </div>

            {/* Cab */}
            <div className="flex items-center justify-between py-1.5 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-base">🚗</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#1E293B]">Cab</div>
                  <div className="text-[9px] text-gray-400">5 mins away</div>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-[#1E293B]">
                ₹180
              </span>
            </div>

            {/* Book Now Button */}
            <button className="w-full bg-[#F8D84E] hover:bg-[#E5C330] text-[#1E293B] font-bold text-xs py-2.5 rounded-xl shadow-sm transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
