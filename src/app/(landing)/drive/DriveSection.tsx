import React from "react";
import { Container } from "@/components/common";
import { 
  User, Wallet, Clock, IndianRupee, Headphones, 
  Bike, ShieldCheck, Users, Signal, Battery, 
  Menu, ChevronRight, Home, Map, Star, Circle,
  MapPin, CheckCircle2, ArrowRight
} from "lucide-react";

export const DriveSection: React.FC = () => {
  return (
    <section className="bg-[#FEFCE8] pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden relative" id="drive">
      <Container className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Badge */}
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center bg-white border border-gray-100 text-[#1E293B] font-bold text-[10px] px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
            For Drivers
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-16">
          {/* Left Column: Text and Features */}
          <div className="flex flex-col items-start text-left z-20">
            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Earn More.<br />
              <span className="text-[#77FF00] underline decoration-[#77FF00] underline-offset-[8px] sm:underline-offset-[12px] decoration-4 sm:decoration-8">Drive On.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-lg mb-8 sm:mb-12">
              Flexible hours, quick payouts, and full support to help you grow with every ride.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 w-full">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">High Earnings</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Incentives & bonuses on every ride</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Flexible Hours</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Work on your own schedule</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Quick Payouts</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">Get paid weekly without delay</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-[15px] sm:text-[17px] mb-1">Driver Support</h4>
                  <p className="text-[13px] sm:text-sm text-gray-500 font-medium leading-relaxed">24/7 support whenever you need</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-sm transition-colors">
                <span>Join as a Driver</span>
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-[#77FF00]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Phone Frame */}
              <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-white rounded-[40px] sm:rounded-[48px] shadow-2xl border-[6px] sm:border-[8px] border-[#1E293B] overflow-hidden shrink-0 mx-auto z-20">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] sm:w-[120px] h-[24px] sm:h-[28px] bg-[#1E293B] rounded-b-[16px] sm:rounded-b-[20px] z-30" />
                
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
                <div className="flex-1 overflow-y-auto bg-gray-50/50 flex flex-col h-[calc(100%-80px)]">
                  {/* Header */}
                  <div className="px-5 pt-2 pb-4 flex items-center justify-between bg-white">
                    <Menu className="w-5 h-5 text-[#1E293B]" />
                    <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#77FF00]" />
                      <span className="text-[10px] font-bold text-[#1E293B]">Online</span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="px-5 pt-2 pb-4">
                    <h3 className="text-sm font-black text-[#1E293B] mb-3">Hello, Driver!</h3>
                    
                    {/* Earnings Card (Green) */}
                    <div className="bg-[#77FF00] rounded-2xl p-4 shadow-lg shadow-[#77FF00]/20 mb-4 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-[10px] font-bold text-[#1E293B]/80 mb-1">Today's Earnings</div>
                        <div className="text-3xl font-black text-[#1E293B] mb-2">₹1,245</div>
                        <div className="text-[9px] font-bold text-[#1E293B]/80 flex items-center gap-1">
                          <span>↑ 12% more than yesterday</span>
                        </div>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-90">
                        <Wallet className="w-12 h-12 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="text-sm font-black text-[#1E293B]">8</div>
                        <div className="text-[8px] text-gray-500 font-medium leading-tight">Rides<br/>Completed</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="text-sm font-black text-[#1E293B]">32 km</div>
                        <div className="text-[8px] text-gray-500 font-medium leading-tight">Distance<br/>Traveled</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="text-sm font-black text-[#1E293B]">4.8</div>
                        <div className="text-[8px] text-gray-500 font-medium leading-tight mb-1">Rating</div>
                        <Star className="w-2.5 h-2.5 text-[#FBBF24]" fill="#FBBF24" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black text-[#1E293B]">Today's Progress</span>
                        <span className="text-sm font-black text-[#1E293B]">75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                        <div className="w-[75%] h-full bg-[#77FF00] rounded-full" />
                      </div>
                      <div className="text-[8px] text-gray-500 font-medium">Complete 12 more rides to get bonus</div>
                    </div>

                    {/* Recent Rides */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-[#1E293B]">Recent Rides</span>
                        <span className="text-[10px] font-bold text-[#77FF00]">View All</span>
                      </div>
                      
                      <div className="flex flex-col gap-2 pb-10">
                        {/* Ride 1 */}
                        <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-3">
                            <Bike className="w-4 h-4 text-[#1E293B]" />
                            <div>
                              <div className="text-[10px] font-black text-[#1E293B]">Nehru Nagar</div>
                              <div className="text-[8px] text-gray-500">Raipur</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-[#1E293B]">₹125</div>
                            <div className="text-[8px] text-[#77FF00] font-bold">Cash</div>
                          </div>
                        </div>
                        
                        {/* Ride 2 */}
                        <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-3">
                            <Circle className="w-4 h-4 text-[#1E293B]" />
                            <div>
                              <div className="text-[10px] font-black text-[#1E293B]">Pandri Chowk</div>
                              <div className="text-[8px] text-gray-500">Raipur</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-[#1E293B]">₹98</div>
                            <div className="text-[8px] text-[#77FF00] font-bold">UPI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center pb-5 z-20">
                  <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Home className="w-5 h-5 text-[#77FF00]" fill="#77FF00" />
                    <span className="text-[8px] font-bold text-[#77FF00]">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                    <IndianRupee className="w-5 h-5 text-[#1E293B]" />
                    <span className="text-[8px] font-bold text-[#1E293B]">Earnings</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                    <Map className="w-5 h-5 text-[#1E293B]" />
                    <span className="text-[8px] font-bold text-[#1E293B]">Trips</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer opacity-40">
                    <User className="w-5 h-5 text-[#1E293B]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative z-20">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#77FF00]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#77FF00]/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-[#77FF00]" />
            </div>
            <h4 className="text-sm font-black text-[#1E293B] mb-2">Be Your Own Boss</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Work independently on your own terms. Set your own schedule, choose your hours, and drive whenever it suits your lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#77FF00]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#77FF00]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#77FF00]" />
            </div>
            <h4 className="text-sm font-black text-[#1E293B] mb-2">Easy Onboarding</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Get verified quickly with our streamlined process. Submit your documents online and start driving within 24 hours.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#77FF00]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#77FF00]/10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#77FF00]" />
            </div>
            <h4 className="text-sm font-black text-[#1E293B] mb-2">Safe Platform</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Drive with peace of mind. All our riders are verified, and you have access to a dedicated 24/7 SOS emergency support line.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#77FF00]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#77FF00]/10 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-6 h-6 text-[#77FF00]" />
            </div>
            <h4 className="text-sm font-black text-[#1E293B] mb-2">Daily Payouts</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              No more waiting for weeks to get paid. Transfer your daily earnings to your bank account instantly with zero hassle.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
