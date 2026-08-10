import React from "react";
import { Container } from "@/components/common";
import { 
  ShieldCheck, IndianRupee, Zap, MapPin, 
  Car, Clock, Users, Star, Menu, Bell,
  Search, Plus, Briefcase, ChevronRight, CheckCircle2,
  SlidersHorizontal, Home, Wallet
} from "lucide-react";

interface RideSectionProps {
  hideBadge?: boolean;
}

export const RideSection: React.FC<RideSectionProps> = ({ hideBadge = false }) => {
  return (
    <section className="bg-white pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden relative" id="ride">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HERO AREA - 3 Columns on Desktop */}
        <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-between mb-16">
          
          {/* LEFT: Content */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-start text-left z-20 xl:shrink-0 xl:pt-8">

            {/* Hero Badge */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 bg-[#F0FFEA] text-green-700 font-bold text-[11px] px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                <Car className="w-3.5 h-3.5" />
                <span>Ride with Ghumakkadh</span>
              </div>
            )}

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-[#1E293B] leading-[1.05] tracking-tight mb-6">
              Every ride,<br />
              <span className="text-[#57E600]">made</span> for you.
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base font-medium max-w-sm mb-10 leading-relaxed">
              Book a ride in just a few taps and enjoy safe, affordable and comfortable journeys across your city.
            </p>

            {/* Mobile Hero Illustration (Visible only on mobile/tab) */}
            <div className="flex xl:hidden w-full relative justify-center items-center z-10 pt-6 pb-12 sm:pb-16">
              <img 
                src="/images/Ride_img1.png" 
                alt="Ghumakkadh Ride Illustration" 
                className="w-full h-auto object-contain scale-125 md:scale-150 origin-center"
              />
            </div>

            {/* Three Benefit Features */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 mb-10 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-black text-[#1E293B] text-[13px]">Safe & Secure</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">Verified drivers and<br/>real-time tracking</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-black text-[#1E293B] text-[13px]">Affordable Fares</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">No hidden charges.<br/>Transparent pricing</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-yellow-500" fill="currentColor" />
                </div>
                <h4 className="font-black text-[#1E293B] text-[13px]">Quick & Reliable</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">Get rides in minutes,<br/>whenever you need</p>
              </div>
            </div>

            {/* Coupon Card */}
            <div className="w-full max-w-[480px] mt-2">
              <img src="/images/Rider_img2.png" alt="Get 50% off on your first 2 rides!" className="w-full h-auto object-contain scale-[1.15] origin-left" />
            </div>
          </div>

          {/* CENTER: Hero Illustration (Desktop Only) */}
          <div className="hidden xl:flex flex-1 w-full max-w-3xl relative justify-center items-center z-10 xl:-mx-12 pt-12 md:pt-20">
            <img 
              src="/images/Ride_img1.png" 
              alt="Ghumakkadh Ride Illustration" 
              className="w-full h-auto object-contain xl:scale-[1.4] origin-center"
            />
          </div>

          {/* RIGHT: Mobile Booking UI */}
          <div className="w-full max-w-[400px] shrink-0 relative z-20 flex justify-center xl:justify-end">
            <div className="w-[380px] h-[830px] bg-white rounded-[36px] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative">
              
              {/* Map Area */}
              <div className="h-[280px] bg-[#F3F4F6] relative overflow-hidden shrink-0">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-50">
                   <div className="absolute top-10 left-[-20%] w-[150%] h-[20px] bg-white rotate-12"></div>
                   <div className="absolute top-40 left-[-20%] w-[150%] h-[15px] bg-white -rotate-6"></div>
                   <div className="absolute top-0 left-20 w-[20px] h-[150%] bg-white -rotate-12"></div>
                   <div className="absolute top-0 left-60 w-[30px] h-[150%] bg-white rotate-6"></div>
                   <div className="absolute top-10 right-10 w-[100px] h-[80px] bg-green-100 rounded-full blur-md"></div>
                   <div className="absolute bottom-10 left-10 w-[120px] h-[90px] bg-green-100 rounded-[40px] blur-md"></div>
                </div>

                {/* Top Nav Over Map */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Menu className="w-5 h-5 text-[#1E293B]" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md relative">
                    <Bell className="w-5 h-5 text-[#1E293B]" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                </div>

                {/* Route Line & Markers */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <path d="M 120 100 L 260 160 L 240 230" fill="none" stroke="#57E600" strokeWidth="4" />
                  </svg>
                  
                  {/* Pickup Info Card */}
                  <div className="absolute top-[80px] left-[70px] bg-white rounded-xl py-2 px-3 shadow-md flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-3 bg-gray-200 my-0.5"></div>
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-[10px] text-green-500 font-bold">Pickup</p>
                      <p className="text-xs font-black text-[#1E293B]">Home</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                  </div>

                  {/* Destination Marker */}
                  <div className="absolute top-[140px] left-[250px] w-5 h-5 bg-green-500 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>

                  {/* Car Marker & Time */}
                  <div className="absolute top-[180px] left-[210px] flex flex-col items-center">
                    <div className="bg-white rounded-md px-2 py-1 shadow-sm mb-1">
                      <p className="text-[10px] font-black text-[#1E293B] text-center leading-tight">2 min<br/><span className="text-gray-500 font-medium text-[9px]">Away</span></p>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <img src="/images/cab.png" alt="car" className="w-5 h-5 object-contain rotate-12" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Destination Search Section */}
              <div className="bg-white rounded-t-3xl -mt-6 z-20 relative p-6 flex-1 flex flex-col">
                <h3 className="text-sm font-black text-[#1E293B] mb-4">Where are you going?</h3>
                
                <div className="bg-[#F8FAFC] rounded-2xl p-3 flex items-center justify-between border border-gray-100 mb-5">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Search className="w-5 h-5" />
                    <span className="text-[13px] font-medium">Search destination</span>
                  </div>
                  <Star className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex justify-between gap-2 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Home className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#1E293B]">Home</p>
                      <p className="text-[9px] text-gray-400">Add address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#1E293B]">Work</p>
                      <p className="text-[9px] text-gray-400">Add address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#1E293B]">Add New</p>
                      <p className="text-[9px] text-gray-400">Add address</p>
                    </div>
                  </div>
                </div>

                {/* Choose a Ride */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-[#1E293B]">Choose a ride</h3>
                  <span className="text-[11px] font-bold text-green-500 cursor-pointer">View all</span>
                </div>

                <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-4">
                  
                  {/* Option 1: ACTIVE */}
                  <div className="bg-[#F0FFEA] rounded-2xl p-3 flex items-center justify-between border border-green-500 relative">
                    <div className="flex items-center gap-3">
                      <img src="/images/cab.png" alt="Go Mini" className="w-12 h-8 object-contain" />
                      <div>
                        <p className="text-[12px] font-black text-[#1E293B]">Go Mini</p>
                        <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                          4 Seater <Users className="w-2.5 h-2.5 ml-1" /> 2
                        </p>
                      </div>
                    </div>
                    <div className="text-right pr-6">
                      <p className="text-[13px] font-black text-[#1E293B]">₹120</p>
                      <p className="text-[9px] text-gray-500">2 min away</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="bg-white rounded-2xl p-3 flex items-center justify-between border border-transparent hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="/images/cab.png" alt="Go Sedan" className="w-12 h-8 object-contain" />
                      <div>
                        <p className="text-[12px] font-black text-[#1E293B]">Go Sedan</p>
                        <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                          4 Seater <Users className="w-2.5 h-2.5 ml-1" /> 3
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-black text-[#1E293B]">₹180</p>
                      <p className="text-[9px] text-gray-500">4 min away</p>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="bg-white rounded-2xl p-3 flex items-center justify-between border border-transparent hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="/images/Auto.png" alt="Go SUV" className="w-12 h-8 object-contain" />
                      <div>
                        <p className="text-[12px] font-black text-[#1E293B]">Go SUV</p>
                        <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                          6 Seater <Users className="w-2.5 h-2.5 ml-1" /> 5
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-black text-[#1E293B]">₹250</p>
                      <p className="text-[9px] text-gray-500">6 min away</p>
                    </div>
                  </div>

                </div>

                {/* Confirm Button Area */}
                <div className="pt-2 flex gap-3">
                  <button className="flex-1 bg-[#57E600] hover:bg-green-500 text-white font-bold text-sm py-4 rounded-2xl transition-colors shadow-sm">
                    Confirm Ride
                  </button>
                  <button className="w-[52px] h-[52px] bg-[#F8FAFC] border border-gray-100 rounded-2xl flex items-center justify-center text-[#1E293B]">
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>



        {/* HOW IT WORKS */}
        <div className="flex flex-col items-center pb-8 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-xl font-black text-[#1E293B]">How it works</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 w-full max-w-[1000px] mx-auto relative">
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">1</div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-0 shadow-sm border border-gray-100">
                  <MapPin className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-[#1E293B] text-[14px] mb-1.5">Enter Location</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">Enter your pickup<br/>location and<br/>destination.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-gray-300"></div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">2</div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-0 shadow-sm border border-gray-100">
                  <Car className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-[#1E293B] text-[14px] mb-1.5">Choose a Ride</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">Select the ride that<br/>suits you best.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">3</div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-0 shadow-sm border border-gray-100">
                  <Users className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-[#1E293B] text-[14px] mb-1.5">Ride with Us</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">Get matched with a<br/>nearby driver.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-gray-300"></div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">4</div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-0 shadow-sm border border-gray-100">
                  <Wallet className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-[#1E293B] text-[14px] mb-1.5">Reach & Pay</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">Reach safely and<br/>pay easily.</p>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
};
