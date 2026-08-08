import React from "react";
import { Container } from "@/components/common";
import { 
  User, Wallet, Clock, IndianRupee, Headphones, 
  Bike, ShieldCheck, Users, Signal, Battery, 
  Menu, ChevronRight, Home, Map, Star, Circle,
  MapPin, CheckCircle2, ArrowRight
} from "lucide-react";

export const RideSection: React.FC = () => {
  return (
    <section className="bg-[#FEFCE8] pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden relative" id="ride">
      <Container className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Badge */}
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center bg-white border border-gray-100 text-[#1E293B] font-bold text-[10px] px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
            For Riders
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-16">
          {/* Left Column: Text and Features */}
          <div className="flex flex-col items-start text-left z-20">
            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Book Fast.<br />
              <span className="text-[#77FF00] underline decoration-[#77FF00] underline-offset-[8px] sm:underline-offset-[12px] decoration-4 sm:decoration-8">Ride Safe.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-lg mb-8 sm:mb-12">
              Affordable, reliable, and comfortable rides at your fingertips. Choose from bikes, autos, or cars and reach your destination with ease.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 w-full">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Affordable Fares</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Low prices & no hidden charges</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Quick Pickups</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Nearest drivers reach you fast</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Safe & Secure</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Verified drivers and SOS support</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">24/7 Support</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">We're always here to help you</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-sm transition-colors">
                <span>Book a Ride Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E293B] font-bold text-sm px-8 py-3.5 rounded-full shadow-sm border border-gray-200 transition-colors">
                <span className="w-4 h-4 border-2 border-[#1E293B] rounded-full flex items-center justify-center text-[8px]">i</span>
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end z-10 w-full mt-8 lg:mt-0 lg:h-[650px]">
            {/* Wrapper for Phone + Decor */}
            <div className="relative">
              {/* Background Decor */}
              {/* Soft Yellow Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] bg-[#FDE047]/30 rounded-full blur-2xl z-0" />

              {/* Phone Mockup */}
              <div className="relative w-[280px] sm:w-[320px] h-[550px] sm:h-[600px] bg-white rounded-[40px] sm:rounded-[44px] border-[8px] sm:border-[10px] border-[#1E293B] shadow-[0_25px_50px_rgba(30,41,59,0.25)] flex flex-col overflow-hidden z-10">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-[#1E293B] rounded-b-xl z-30" />
              
              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2 bg-white z-20">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#1E293B]">9:41</span>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-[#1E293B] font-bold">
                  <Signal className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>5G</span>
                  <Battery className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50/50 flex flex-col">
                {/* Header */}
                <div className="px-5 pt-2 pb-4 flex items-center justify-between bg-white">
                  <Menu className="w-5 h-5 text-[#1E293B]" />
                  <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#77FF00]" />
                    <span className="text-[9px] font-bold text-[#1E293B] max-w-[60px] truncate">Raipur, CG</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>

                <div className="px-5 pt-2 pb-4">
                  <h3 className="text-sm font-black text-[#1E293B] mb-3">Where to today?</h3>
                  
                  {/* Search Bar */}
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 mb-4">
                    <MapPin className="w-4 h-4 text-[#77FF00]" />
                    <span className="text-[10px] text-gray-500 font-medium">Enter destination</span>
                  </div>

                  {/* Ride Options */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-[#1E293B]">Available Rides</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {/* Bike */}
                      <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-[#77FF00] shadow-sm shadow-[#77FF00]/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                            <Bike className="w-4 h-4 text-[#1E293B]" />
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-[#1E293B]">Ghumakkadh Bike</div>
                            <div className="text-[8px] text-gray-500">2 mins away</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[12px] font-black text-[#1E293B]">₹45</div>
                        </div>
                      </div>

                      {/* Auto */}
                      <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-gray-100 shadow-sm opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                            <Circle className="w-4 h-4 text-[#1E293B]" />
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-[#1E293B]">Auto Rickshaw</div>
                            <div className="text-[8px] text-gray-500">5 mins away</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[12px] font-black text-[#1E293B]">₹85</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Places */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-[#1E293B]">Recent Places</span>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-[10px] font-bold text-[#1E293B]">City Center Mall</div>
                        <div className="text-[8px] text-gray-500">Pandri, Raipur</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center pb-5 z-20">
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <Home className="w-5 h-5 text-[#77FF00]" fill="#77FF00" />
                  <span className="text-[8px] font-bold text-[#77FF00]">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                  <Map className="w-5 h-5 text-[#1E293B]" />
                  <span className="text-[8px] font-bold text-[#1E293B]">Bookings</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                  <Wallet className="w-5 h-5 text-[#1E293B]" />
                  <span className="text-[8px] font-bold text-[#1E293B]">Wallet</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                  <User className="w-5 h-5 text-[#1E293B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Bottom Benefits Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#77FF00] mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#1E293B] mb-1">Be Your Own Boss</h4>
                <p className="text-[10px] text-gray-500 font-medium">Work independently<br/>on your terms</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Bike className="w-5 h-5 text-[#77FF00] mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#1E293B] mb-1">More Rides, More Earnings</h4>
                <p className="text-[10px] text-gray-500 font-medium">Smart suggestions to<br/>maximize your income</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#77FF00] mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#1E293B] mb-1">Safe & Secure</h4>
                <p className="text-[10px] text-gray-500 font-medium">OTP verification &<br/>live trip tracking</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#77FF00] mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#1E293B] mb-1">Grow With Us</h4>
                <p className="text-[10px] text-gray-500 font-medium">Rewards, training &<br/>community support</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* City Skyline Silhouette Background */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-0">
        <svg
          className="w-full h-full text-[#FDE047]/20"
          viewBox="0 0 1440 240"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0 240V140h60v-40h40v40h80v-60h40v60h100V80h50v20h30v-40h40v180H0z" />
          <path d="M400 240V120h50v120H400zm80 0V90h60v150h-60zm100 0V110h80v130h-80zm120 0V60h70v180h-70zm100 0V130h90v110h-90zm130 0V90h70v150h-70zm100 0V100h60v140h-60zm90 0v-80h80v80h-80zm110 0V80h60v160h-60z" />
        </svg>
      </div>
    </section>
  );
};
