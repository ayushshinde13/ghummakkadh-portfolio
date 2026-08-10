import React from "react";
import { Container } from "@/components/common";
import { RideCard } from "@/components/ride";
import { RIDE_OPTIONS } from "@/constants/rideOptions";
import { Users } from "lucide-react";

export const RideOptionsSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      iconBg: "bg-[#F0FFEA] text-[#4D9900]",
      title: "Safe & Secure",
      subtitle: "Verified drivers & OTP protection",
    },
    {
      icon: <span className="text-xl font-extrabold">₹</span>,
      iconBg: "bg-[#DCFCE7] text-[#166534]",
      title: "Affordable Pricing",
      subtitle: "Best prices. No hidden charges",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      iconBg: "bg-[#E0F2FE] text-[#CC5F00]",
      title: "24/7 Support",
      subtitle: "We're here. Always.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      iconBg: "bg-[#E0FFCC] text-[#4D9900]",
      title: "Top Rated Service",
      subtitle: "Loved by 3M+ happy riders",
    },
  ];

  return (
    <section id="ride-options" className="bg-[#FFFDF5] pt-4 lg:pt-6 pb-6 lg:pb-8 relative">
      <Container>
        {/* Section Header matching Screenshot exactly */}
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center max-w-2xl mx-auto w-full">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-[#F0FFEA] text-[#1E293B] text-xs font-extrabold px-4 py-1.5 rounded-full shadow-sm mb-3">
            <span><Users className="w-4 h-4" /></span>
            <span>Ride for Everyone</span>
          </div>

          {/* H2 Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Choose Your Ride Option
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 mt-2 font-normal">
            From zipping through traffic on a bike to relaxing in an AC cab, we have got you covered.
          </p>
        </div>

        {/* 3 Ride Cards Grid matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {RIDE_OPTIONS.map((option) => (
            <RideCard
              key={option.type}
              type={option.type}
              tagline={option.tagline}
              priceEstimate={option.priceEstimate}
            />
          ))}
        </div>

        {/* 4-Column Feature Strip matching Screenshot exactly */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-6 lg:p-8 mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg}`}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-black text-[#1E293B]">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
