import React from "react";
import { cn } from "@/lib/cn";
import { Lock, ShieldCheck, MapPin, Battery, Bike, CarFront, Car } from "lucide-react";

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
          stroke="#77FF00"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M100 450 C 250 300, 400 250, 480 300"
          stroke="#77FF00"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10">
        {/* Floating Card 1: Fare Locked (Left of phone, shifted safely away from notch) */}
        <div className="absolute -left-4 sm:-left-20 top-24 z-30 bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 hidden sm:flex items-center gap-2.5 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#F0FFEA] dark:bg-[#57E600]/10 flex items-center justify-center text-[#4D9900] dark:text-[#57E600] text-base font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">
              Fare Locked
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
              No Surge Pricing
            </div>
          </div>
        </div>

        {/* Floating Card 2: OTP Verified (Right of phone) */}
        <div className="absolute -right-4 sm:-right-20 top-28 z-30 bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 hidden sm:flex items-center gap-2.5 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] dark:bg-[#57E600]/15 flex items-center justify-center text-[#166534] dark:text-[#57E600] text-base font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">
              OTP Verified
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
              Every Ride, Every Time
            </div>
          </div>
        </div>

        {/* Floating Card 3: Driver Nearby (Middle-Right of phone) */}
        <div className="absolute -right-4 sm:-right-20 bottom-28 z-30 bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 hidden sm:flex items-center gap-2.5 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#FFEDD5] dark:bg-orange-500/15 flex items-center justify-center text-[#EA580C] dark:text-orange-400 text-base font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">
              Driver Nearby
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
              2 mins away
            </div>
          </div>
        </div>

        {/* Floating Card 4: Live Tracking (Bottom-Left overlapping guardrail matching Image 2) */}
        <div className="absolute left-6 sm:left-4 -bottom-6 z-40 bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 hidden sm:flex items-center gap-2.5 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] dark:bg-blue-500/15 flex items-center justify-center text-[#0284C7] dark:text-blue-400 text-base font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">
              Live Tracking
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
              On Route
            </div>
          </div>
        </div>

        {/* Phone Image */}
        <img src="/images/phone.png" alt="Phone App Mockup" className="relative mx-auto w-[300px] sm:w-[320px] h-auto object-contain" />
      </div>
    </div>
  );
};

