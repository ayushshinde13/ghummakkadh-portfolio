import React from "react";
import { Container } from "@/components/common";

interface HowItWorksSectionProps {
  hideBadge?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ hideBadge = false }) => {
  const steps = [
    {
      num: 1,
      img: "/images/img_1.png",
      title: "Choose Your Ride",
      desc: "Enter your pickup and drop location, choose your preferred ride – Bike, Auto, Car or Outstation."
    },
    {
      num: 2,
      img: "/images/img2.png",
      title: "We Find You a Rider",
      desc: "We match you with the nearest rider. Track their real-time location as they arrive."
    },
    {
      num: 3,
      img: "/images/img_3.png",
      title: "Enjoy Your Ride",
      desc: "Ride comfortably with verified riders. Share your trip details with your loved ones for added safety."
    },
    {
      num: 4,
      img: "/images/img4.png",
      title: "Reach & Pay",
      desc: "Reach your destination safely. Pay easily – Cash, UPI or Wallet. Rate your ride and help us improve."
    },
  ];

  return (
    <section id="how-it-works" className="bg-gradient-to-b from-[#0A0E1A] to-[#0D1220] pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      <Container className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center mb-16 lg:mb-20 w-full">

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-white tracking-tight mb-3">
            Your Journey in <span className="text-[#77FF00]">4 Simple Steps</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-medium">
            From booking to destination — we make every ride smooth, safe & reliable.
          </p>
        </div>

        {/* 4 Cards Grid with connecting line */}
        <div className="relative mb-16 pt-4">
          {/* Continuous Dashed Line for Desktop running across all 4 columns */}
          <div className="hidden lg:block absolute top-[16px] left-[12.5%] right-[12.5%] h-0 border-t-[2px] border-dashed border-[#77FF00] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                {/* Number Circle */}
                <div className="absolute -top-[16px] left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#77FF00] text-white font-bold text-[15px] flex items-center justify-center shadow-md z-20">
                  {step.num}
                </div>

                {/* Card Container */}
                <div className="bg-white/5 backdrop-blur-md rounded-[28px] p-6 border-2 border-white/10 hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.2)] hover:-translate-y-1 hover:z-10 transition-all duration-300 flex flex-col items-center justify-start h-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] pt-12 relative">
                  <div className="h-40 sm:h-48 w-full flex items-center justify-center mb-6 relative rounded-xl px-2">
                    <img
                      src={step.img}
                      alt={`Step ${step.num}`}
                      className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-sm"
                    />
                  </div>

                  <h3 className="text-[17px] font-black text-white mb-2.5 text-center">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 font-medium text-center leading-relaxed px-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 max-w-6xl mx-auto border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-6 z-10 relative">
            <div className="w-20 h-20 shrink-0 flex items-center justify-center">
              <img src="/images/hero.png" alt="Scooter" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-xl md:text-[22px] font-black text-white mb-1">Ready to ride?</h3>
              <p className="text-gray-400 font-medium text-[13px] md:text-sm">Ghumakkadh ke saath har safar easy, safe aur affordable.</p>
            </div>
          </div>

          <div className="flex-1 hidden md:flex items-center justify-center px-4 relative z-0">
            {/* Map dashed line graphic */}
            <svg className="w-full max-w-[250px] h-10 text-[#77FF00]" viewBox="0 0 200 40" fill="none">
              <path d="M10 20 Q 50 0, 100 20 T 190 20" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" />
              <circle cx="10" cy="20" r="4" fill="currentColor" />
              <circle cx="190" cy="20" r="4" fill="currentColor" />
            </svg>
          </div>

          <a href="#book" className="shrink-0 bg-[#77FF00] hover:bg-[#66E000] text-[#1E293B] font-bold text-[15px] px-7 py-3.5 rounded-xl shadow-sm transition-all z-10 relative">
            Book Your Ride →
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-white/10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5FFF0] text-[#77FF00] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-0.5">Safe & Secure</h4>
              <p className="text-gray-400 text-[11px] font-medium">Verified riders & secure rides</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5FFF0] text-[#77FF00] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-0.5">Multiple Payments</h4>
              <p className="text-gray-400 text-[11px] font-medium">Cash, UPI, Wallet & more</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5FFF0] text-[#77FF00] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-0.5">24/7 Support</h4>
              <p className="text-gray-400 text-[11px] font-medium">We're here for you anytime</p>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5FFF0] text-[#77FF00] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-0.5">Affordable Rides</h4>
              <p className="text-gray-400 text-[11px] font-medium">Best prices for every journey</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
