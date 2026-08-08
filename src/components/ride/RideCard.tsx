import React from "react";
import { cn } from "@/lib/cn";

interface RideCardProps {
  type: string;
  tagline: string;
  priceEstimate: string;
}

export const RideCard: React.FC<RideCardProps> = ({
  type,
  tagline,
  priceEstimate,
}) => {
  // Define color themes per vehicle type matching the screenshot
  const theme =
    type === "Bike"
      ? {
          buttonBg: "bg-[#F0FFEA] group-hover:bg-[#FDE047]",
          skylineColor: "text-[#E0FFCC]/40",
          imageSrc: "/images/bike.png",
        }
      : type === "Auto"
      ? {
          buttonBg: "bg-[#DCFCE7] group-hover:bg-[#BBF7D0]",
          skylineColor: "text-[#DCFCE7]/60",
          imageSrc: "/images/Auto.png",
        }
      : {
          buttonBg: "bg-[#E0F2FE] group-hover:bg-[#BAE6FD]",
          skylineColor: "text-[#E0F2FE]/60",
          imageSrc: "/images/cab.png",
        };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.05)] p-6 sm:p-7 relative overflow-hidden flex items-center justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 min-h-[210px]">
      {/* Subtle City Skyline Silhouette at Bottom-Left */}
      <div className="absolute bottom-0 left-0 w-44 h-24 pointer-events-none overflow-hidden z-0">
        <svg
          className={cn("w-full h-full", theme.skylineColor)}
          viewBox="0 0 200 100"
          fill="currentColor"
        >
          <path d="M0 100V60h20v-15h15v15h25v-25h15v25h35V45h20v10h15v-15h20v45H0z" />
          <path d="M120 100V70h15v-20h15v20h20v-30h15v60h-65z" opacity="0.6" />
        </svg>
      </div>

      {/* Left Side: Vehicle PNG Image matching Screenshot */}
      <div className="relative z-10 w-40 sm:w-44 lg:w-48 h-32 sm:h-36 flex items-center justify-center shrink-0 -ml-2">
        <img
          src={theme.imageSrc}
          alt={`Ghumakkadh ${type}`}
          className="w-full h-auto max-h-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.22)]"
        />
      </div>

      {/* Right Side: Title, Tagline, Price Pill, and Bottom Arrow Button */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[155px] flex-1 pl-2">
        {/* Top Price Pill & Title */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-2xl font-black text-[#1E293B] tracking-tight">
              {type}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-[150px]">
            {tagline}
          </p>
        </div>

        {/* Bottom-Right Circle Arrow Button */}
        <div className="flex justify-end mt-4">
          <button
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center text-[#1E293B] shadow-sm transition-colors",
              theme.buttonBg
            )}
            aria-label={`Select ${type}`}
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </div>
  );
};
