import React from "react";
import { Container } from "@/components/common";

export const FeaturesSection: React.FC = () => {
  const leftFeatures = [
    {
      icon: (
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      iconBg: "bg-[#FEF9C3] text-[#CA8A04]",
      title: "Safe & Secure",
      subtitle: "Verified drivers & OTP protection",
    },
    {
      icon: <span className="text-lg font-black">₹</span>,
      iconBg: "bg-[#DCFCE7] text-[#166534]",
      title: "Affordable Rides",
      subtitle: "Best prices. No hidden charges",
    },
    {
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      iconBg: "bg-[#E0F2FE] text-[#0284C7]",
      title: "Live Tracking",
      subtitle: "Track your ride in real-time",
    },
    {
      icon: (
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
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      iconBg: "bg-[#F3E8FF] text-[#9333EA]",
      title: "24/7 Support",
      subtitle: "We're here. Always.",
    },
  ];

  return (
    <section
      id="features"
      className="relative bg-[#FFFDF5] pt-20 lg:pt-28 pb-4 lg:pb-6 overflow-hidden"
    >
      {/* Background Subtle Dotted Matrix & City Skyline with Ferris Wheel on the Right */}
      <div className="absolute top-10 left-1/3 w-64 h-32 opacity-30 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(#EAB308 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* Right Background Glow & Golden City Skyline with Ferris Wheel */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden z-0">
        {/* Soft Golden Sun Circle */}
        <div className="absolute -top-12 -right-12 w-[420px] h-[420px] rounded-full bg-[#FEF08A]/45 blur-2xl" />

        {/* Golden City Skyline & Ferris Wheel SVG */}
        <svg
          className="absolute bottom-0 right-0 w-full h-72 text-[#FDE047]/45"
          viewBox="0 0 600 240"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* City Buildings */}
          <path d="M450 240V120h25v-30h10v30h25v120H450z" />
          <path d="M510 240V80h30v-20h10v20h30v160H510z" />
          <path d="M580 240V140h20v100H580z" />
          {/* Ferris Wheel Silhouette */}
          <circle
            cx="480"
            cy="150"
            r="55"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle
            cx="480"
            cy="150"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="480"
            y1="95"
            x2="480"
            y2="205"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="425"
            y1="150"
            x2="535"
            y2="150"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="441"
            y1="111"
            x2="519"
            y2="189"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="441"
            y1="189"
            x2="519"
            y2="111"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Ferris Wheel A-Frame Base */}
          <path
            d="M455 240L480 150L505 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Trees at Bottom Right */}
          <circle cx="430" cy="225" r="20" fill="currentColor" opacity="0.8" />
          <circle cx="455" cy="230" r="18" fill="currentColor" opacity="0.8" />
          <circle cx="530" cy="225" r="22" fill="currentColor" opacity="0.8" />
          <circle cx="560" cy="230" r="16" fill="currentColor" opacity="0.8" />
        </svg>

        {/* Floating Golden GPS Location Pin on Stand */}
        <div className="absolute bottom-28 right-16 z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#F8D84E] shadow-[0_10px_25px_rgba(234,179,8,0.45)] border-4 border-white flex items-center justify-center text-[#1E293B]">
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-10 h-3 bg-[#EAB308]/30 rounded-full blur-[2px] mt-1" />
        </div>
      </div>

      {/* Main 2-Column Showcase matching Screenshot */}
      <Container className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (6 Cols): Badge, Title, Subtitle, 4 Icons */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Top Badge Pill */}
            <div className="inline-flex items-center gap-2 bg-[#FEF9C3] text-[#1E293B] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm mb-5">
              <span className="text-[#CA8A04] text-sm">★</span>
              <span>WHY CHOOSE US</span>
            </div>

            {/* H2 Title matching Screenshot exactly */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-[#1E293B] mb-5">
              Smart Features for
              <br />
              <span className="text-[#EAB308]">Modern Commuters</span>
            </h2>

            {/* Subtitle paragraph */}
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-lg mb-10">
              Everything designed to make your daily travel faster, cheaper, and
              safer.
            </p>

            {/* 4 Feature Columns Row matching Screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 w-full">
              {leftFeatures.map((item, index) => (
                <div key={index} className="flex flex-col items-start text-left">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 mb-3 shadow-sm ${item.iconBg}`}
                  >
                    {item.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-[#1E293B] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (6 Cols): Two White Cards with Dotted Route Line connecting to GPS pin */}
          <div className="lg:col-span-6 relative">
            {/* Dotted Golden/Blue Route Curve SVG connecting Card 1 -> Card 2 -> GPS Pin */}
            <svg
              className="absolute -top-6 -left-4 w-[110%] h-[120%] pointer-events-none z-0"
              viewBox="0 0 500 300"
              fill="none"
            >
              {/* Golden Dotted Arch over Card 1 */}
              <path
                d="M 120 180 Q 150 70, 260 120"
                stroke="#EAB308"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <circle cx="120" cy="180" r="7" fill="#EAB308" />
              {/* Blue Dotted Arch over Card 2 to GPS Pin */}
              <path
                d="M 280 120 Q 360 70, 460 150"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>

            {/* 2 White Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7 relative z-10">
              {/* Card 1: Book Ride */}
              <div className="bg-white rounded-[36px] p-7 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between min-h-[310px] relative overflow-hidden group hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all">
                <div>
                  {/* Top Yellow Circle Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#FEF9C3] flex items-center justify-center mb-6 shadow-sm">
                    {/* Phone & Taxi SVG Illustration */}
                    <svg
                      className="w-8 h-8 text-[#CA8A04]"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect
                        x="4"
                        y="2"
                        width="14"
                        height="24"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <circle cx="11" cy="22" r="1.5" fill="currentColor" />
                      {/* Taxi symbol inside */}
                      <path
                        d="M18 16L20 12H28L30 16V22H18V16Z"
                        fill="#F8D84E"
                        stroke="#1E293B"
                        strokeWidth="1.8"
                      />
                      <circle cx="21" cy="22" r="2.5" fill="#1E293B" />
                      <circle cx="27" cy="22" r="2.5" fill="#1E293B" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-[#1E293B] mb-2 tracking-tight">
                    Book Ride
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Find nearby rides instantly with just a few taps.
                  </p>
                </div>

                {/* Bottom-Right Circle Arrow Button (Yellow) */}
                <div className="flex justify-end mt-6">
                  <div className="w-11 h-11 rounded-full bg-[#F8D84E] text-[#1E293B] flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#E5C330] transition-colors">
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
                  </div>
                </div>
              </div>

              {/* Card 2: Live Tracking */}
              <div className="bg-white rounded-[36px] p-7 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between min-h-[310px] relative overflow-hidden group hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all sm:mt-6">
                <div>
                  {/* Top Blue Circle Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center mb-6 shadow-sm">
                    {/* Location Pin SVG Illustration */}
                    <svg
                      className="w-8 h-8 text-[#2563EB]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-[#1E293B] mb-2 tracking-tight">
                    Live Tracking
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Track your ride in real-time and share with your loved ones.
                  </p>
                </div>

                {/* Bottom-Right Circle Arrow Button (Blue) */}
                <div className="flex justify-end mt-6">
                  <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#1D4ED8] transition-colors">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
