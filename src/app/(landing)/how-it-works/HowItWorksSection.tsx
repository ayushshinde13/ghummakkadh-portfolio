import React from "react";
import { Container } from "@/components/common";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: "01",
      title: "Choose Pickup",
      description: "Enter your pickup and destination.",
      badgeText: "ETA 3 mins",
      badgeIcon: "📍",
      badgeColor: "text-[#D97706] bg-[#FFFBEB] border-[#FEF3C7]",
      iconBg: "bg-[#F6C64A]/25 text-[#D97706]",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      stepNumber: "02",
      title: "Get Matched",
      description:
        "We'll instantly connect you with the nearest verified driver.",
      badgeText: "Driver Found",
      badgeIcon: "✨",
      badgeColor: "text-[#0284C7] bg-[#F0F9FF] border-[#E0F2FE]",
      iconBg: "bg-[#7CC8FF]/25 text-[#0284C7]",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
    {
      stepNumber: "03",
      title: "Ride Safely",
      description:
        "Track your ride live and rate your experience after the trip.",
      badgeText: "Ride Confirmed",
      badgeIcon: "🛡️",
      badgeColor: "text-[#15803D] bg-[#F0FDF4] border-[#DCFCE7]",
      iconBg: "bg-[#7ED9A3]/30 text-[#15803D]",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative bg-[#FFFDF5] py-20 lg:py-28 overflow-hidden"
    >
      {/* Soft Radial Gradients in Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F6C64A]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[#7CC8FF]/15 to-[#7ED9A3]/10 blur-3xl pointer-events-none" />

      {/* Abstract Clouds & Sparkles */}
      <div className="absolute top-16 left-12 w-32 h-14 bg-white/50 rounded-full blur-[2px] hidden lg:block pointer-events-none" />
      <div className="absolute top-28 right-16 w-40 h-16 bg-white/40 rounded-full blur-[2px] hidden lg:block pointer-events-none" />
      <span className="absolute top-20 right-1/3 text-xl text-[#F6C64A] animate-pulse hidden md:block pointer-events-none">
        ✦
      </span>
      <span className="absolute top-44 left-1/4 text-sm text-[#7CC8FF] animate-pulse hidden md:block pointer-events-none">
        ✨
      </span>
      <span className="absolute bottom-28 right-1/4 text-lg text-[#7ED9A3] animate-pulse hidden md:block pointer-events-none">
        ✦
      </span>

      {/* Floating Glowing Dots */}
      <div className="absolute top-36 left-20 w-2.5 h-2.5 rounded-full bg-[#F6C64A]/60 shadow-sm pointer-events-none" />
      <div className="absolute top-52 right-24 w-3 h-3 rounded-full bg-[#7CC8FF]/60 shadow-sm pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-[#7ED9A3]/60 shadow-sm pointer-events-none" />

      {/* Minimal Decorative Travel Lines in Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <path
          d="M100 200 C 400 100, 800 350, 1340 180"
          stroke="#F6C64A"
          strokeWidth="1.5"
          strokeDasharray="8 8"
        />
      </svg>

      {/* Low-opacity City Skyline Silhouette across bottom (no roads, cars, scooters) */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none overflow-hidden z-0">
        <svg
          className="w-full h-full text-[#F6C64A]/20"
          viewBox="0 0 1200 160"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Abstract Architectural Skyline Domes & Buildings */}
          <path d="M0 160V120h40v-20h20v20h40v40H0z" />
          <path d="M140 160V90c0-20 20-35 40-35s40 15 40 35v70h-80z" />
          <path d="M260 160V110h20V85l15-15 15 15v25h20v50H260z" />
          <path d="M400 160V100c0-15 15-25 30-25s30 10 30 25v60h-60z" />
          <path d="M780 160V100c0-15 15-25 30-25s30 10 30 25v60h-60z" />
          <path d="M920 160V90c0-20 20-35 40-35s40 15 40 35v70h-80z" />
          <path d="M1060 160V120h30V95l15-15 15 15v25h30v40h-90z" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Top Center Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          {/* Small Rounded Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#FEF9C3] text-[#1E293B] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm mb-3">
            <span>⚡</span>
            <span>How It Works</span>
          </div>

          {/* Bold Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Book Your Ride in{" "}
            <span className="text-[#EAB308]">Just 3 Simple Steps</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 font-normal mt-3 leading-relaxed">
            Choose your destination, get matched with a nearby verified driver,
            and enjoy a safe journey.
          </p>
        </div>

        {/* 3 Cards Container with Curved Dotted Route Line connecting them */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Curved Dotted SVG Route Line (desktop only) */}
          <div className="absolute top-28 left-0 w-full h-24 pointer-events-none hidden lg:block z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 100"
              fill="none"
            >
              <path
                d="M 180 50 Q 330 0, 500 50 T 820 50"
                stroke="#EAB308"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* 3 Glassmorphism Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.stepNumber}
                className="relative bg-white/85 backdrop-blur-md rounded-[32px] p-8 border border-white/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.11)] transition-all duration-300 flex flex-col justify-between group min-h-[320px]"
              >
                {/* Floating Notification Badge near Card */}
                <div
                  className={`absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border shadow-md bg-white/95 backdrop-blur-sm ${step.badgeColor} z-20`}
                >
                  <span>{step.badgeIcon}</span>
                  <span>{step.badgeText}</span>
                </div>

                {/* Top Section: Step Number & Circular Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Large Colored Circular Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.iconBg}`}
                    >
                      {step.icon}
                    </div>

                    {/* Step Number Badge */}
                    <span className="text-2xl font-black text-gray-200 group-hover:text-gray-300 transition-colors select-none font-mono">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="text-xl font-black text-[#1E293B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-gray-600 font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Decorative Minimal Dot Line */}
                <div className="mt-8 pt-4 border-t border-gray-100/80 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>Step {index + 1} of 3</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span
                      className={`w-4 h-1.5 rounded-full ${
                        index === 0
                          ? "bg-[#F6C64A]"
                          : index === 1
                          ? "bg-[#7CC8FF]"
                          : "bg-[#7ED9A3]"
                      }`}
                    />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
