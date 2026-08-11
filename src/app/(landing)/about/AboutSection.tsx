import React from "react";
import { Container } from "@/components/common";
import { ShieldCheck, IndianRupee, Users, Heart, Flag, MapPin, CarFront } from "lucide-react";

interface AboutSectionProps {
  hideBadge?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ hideBadge = false }) => {
  return (
    <section id="about" className="bg-gradient-to-b from-[#0A0E1A] to-[#0D1220] pt-6 md:pt-16 pb-20 overflow-hidden relative">
      <Container className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left Column: Text and Features */}
          <div className="flex flex-col items-start text-left z-20">


            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-white leading-[1.1] tracking-tight mb-6">
              More than a ride,<br />
              it's a <span className="text-[#57E600]">movement.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg font-medium max-w-xl mb-2 lg:mb-10 leading-relaxed">
              Ghumakkadh is India's trusted ride platform built to make everyday travel simpler, safer and more affordable for everyone. We connect commuters and drivers in a community that moves together and grows together.
            </p>

            {/* Mobile Image (Visible only on mobile/tab) */}
            <div className="flex lg:hidden relative justify-center z-10 w-full mt-0 mb-6">
              <img 
                src="/images/about_using.png" 
                alt="Ghumakkadh Movement" 
                className="w-full h-auto object-contain max-w-[700px]"
              />
            </div>

            {/* Features Row */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Feature 1 */}
              <div className="flex-1 bg-[#151B2E] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[13px] mb-1">Safe & Reliable</h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-tight">Verified drivers and real-time safety features for peace of mind.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex-1 bg-[#151B2E] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[13px] mb-1">Affordable Rides</h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-tight">Transparent fares with no hidden charges. Travel more, spend less.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex-1 bg-[#151B2E] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[13px] mb-1">Built for India</h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-tight">Designed for Indian roads, cities and commuters. Made for Bharat.</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column: Image (Desktop Only) */}
          <div className="hidden lg:flex relative justify-center lg:justify-end z-10 w-full mt-8 lg:mt-0">
            <img 
              src="/images/about_using.png" 
              alt="Ghumakkadh Movement" 
              className="w-full h-auto object-contain max-w-[700px]"
            />
          </div>
        </div>


        {/* Middle Section: Stats and Mission */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          {/* Left Stats Section */}
          <div className="flex-1 w-full flex flex-col">
            {/* Section Header */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-6 h-[2px] bg-yellow-400"></div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ghumakkadh <span className="text-[#57E600]">in Numbers</span>
              </h3>
              <div className="w-6 h-[2px] bg-yellow-400"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stat 1 */}
              <div className="bg-[#151B2E] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-white mb-1">Happy Commuters</p>
                  <p className="text-xs text-gray-400 font-medium">Traveling with us every day</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#151B2E] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <CarFront className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-white mb-1">Verified Drivers</p>
                  <p className="text-xs text-gray-400 font-medium">Earning and growing with us</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-[#151B2E] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-white mb-1">Cities</p>
                  <p className="text-xs text-gray-400 font-medium">Across India and expanding</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-[#151B2E] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-white mb-1">Safety Commitment</p>
                  <p className="text-xs text-gray-400 font-medium">Your safety is our priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mission/Vision Section */}
          <div className="w-full lg:w-[450px] flex flex-col gap-4">
            
            {/* Mission Card */}
            <div className="bg-[#151B2E] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-3xl p-8 flex gap-4 h-full">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <Flag className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-black text-lg text-white mb-2">Our Mission</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  To make everyday travel joyful, affordable and accessible for millions of Indians while creating opportunities for our driver partners.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-[#151B2E] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-3xl p-8 flex gap-4 h-full">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-black text-lg text-white mb-2">Our Vision</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  To build the most loved and trusted mobility platform that empowers communities and shapes the future of movement in India.
                </p>
              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};
