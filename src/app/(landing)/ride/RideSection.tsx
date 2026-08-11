import React from "react";
import { Container } from "@/components/common";
import { 
  ShieldCheck, IndianRupee, Zap, MapPin, 
  Car, Clock, Users, Star, Menu, Bell,
  Search, Plus, Briefcase, ChevronRight, CheckCircle2,
  SlidersHorizontal, Home, Wallet, Smartphone
} from "lucide-react";

interface RideSectionProps {
  hideBadge?: boolean;
}

export const RideSection: React.FC<RideSectionProps> = ({ hideBadge = false }) => {
  return (
    <section className="bg-gradient-to-b from-[#0A0E1A] to-[#0D1220] pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden relative" id="ride">
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
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight mb-6">
              Every ride,<br />
              <span className="text-[#57E600]">made</span> for you.
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base font-medium max-w-sm mb-10 leading-relaxed">
              Book a ride in just a few taps and enjoy safe, affordable and comfortable journeys across your city.
            </p>

            <div className="flex xl:hidden w-full relative justify-center items-center z-10 pb-12 sm:pb-16">
              <img 
                src="/images/ride_main.png" 
                alt="Ghumakkadh Ride Illustration" 
                className="w-full max-w-[400px] h-auto object-contain"
              />
            </div>

            {/* Three Benefit Features */}
            <div className="flex flex-row gap-3 sm:gap-4 mb-10 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-black text-white text-[13px]">Safe & Secure</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">Verified drivers and<br/>real-time tracking</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-black text-white text-[13px]">Affordable Fares</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">No hidden charges.<br/>Transparent pricing</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-yellow-500" fill="currentColor" />
                </div>
                <h4 className="font-black text-white text-[13px]">Quick & Reliable</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">Get rides in minutes,<br/>whenever you need</p>
              </div>
            </div>

            {/* Coupon Card */}
            <div className="w-full max-w-[480px] mt-2 mx-auto xl:mx-0">
              <img src="/images/Rider_img2.png" alt="Get 50% off on your first 2 rides!" className="w-full h-auto object-contain scale-[1.15] xl:origin-left" />
            </div>
          </div>

          {/* CENTER: Hero Illustration (Desktop Only) */}
          <div className="hidden xl:flex flex-1 w-full max-w-3xl relative justify-center items-center z-10 xl:-mx-12 pt-12 md:pt-20">
            <img 
              src="/images/ride_main.png" 
              alt="Ghumakkadh Ride Illustration" 
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Mobile Booking UI */}
          <div className="w-full max-w-[400px] shrink-0 relative z-20 flex justify-center xl:justify-end">
            <div className="w-[360px] h-auto pb-5 bg-white rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden relative">
              
              {/* Map Area */}
              <div className="h-[200px] bg-[#F3F4F6] relative overflow-hidden shrink-0">
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
                  <div className="absolute top-[30px] left-[60px] bg-white rounded-xl py-2 px-3 shadow-md flex items-center gap-3">
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
                  <div className="absolute top-[90px] left-[220px] w-5 h-5 bg-green-500 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>

                  {/* Car Marker & Time */}
                  <div className="absolute top-[130px] left-[180px] flex flex-col items-center">
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
              <div className="bg-white rounded-t-3xl -mt-6 z-20 relative p-5 flex flex-col">
                <h3 className="text-sm font-black text-[#1E293B] mb-3">Where are you going?</h3>
                
                <div className="bg-[#F8FAFC] rounded-2xl p-2.5 flex items-center justify-between border border-gray-100 mb-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Search className="w-4 h-4" />
                    <span className="text-xs font-medium">Search destination</span>
                  </div>
                  <Star className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Home className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#1E293B]">Home</p>
                      <p className="text-[8px] text-gray-400">Add address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Briefcase className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#1E293B]">Work</p>
                      <p className="text-[8px] text-gray-400">Add address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#1E293B]">Add New</p>
                      <p className="text-[8px] text-gray-400">Add address</p>
                    </div>
                  </div>
                </div>

                {/* Choose a Ride */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-black text-[#1E293B]">Choose a ride</h3>
                  <span className="text-[10px] font-bold text-green-500 cursor-pointer">View all</span>
                </div>

                <div className="flex flex-col gap-2">
                  
                  {/* Option 1: ACTIVE */}
                  <div className="bg-[#F0FFEA] rounded-2xl p-2.5 flex items-center justify-between border border-green-500 relative">
                    <div className="flex items-center gap-3">
                      <img src="/images/cab.png" alt="Go Mini" className="w-10 h-6 object-contain" />
                      <div>
                        <p className="text-[11px] font-black text-[#1E293B]">Go Mini</p>
                        <p className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                          4 Seater <Users className="w-2.5 h-2.5 ml-1" /> 2
                        </p>
                      </div>
                    </div>
                    <div className="text-right pr-6">
                      <p className="text-[12px] font-black text-[#1E293B]">₹120</p>
                      <p className="text-[8px] text-gray-500">2 min away</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-transparent hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="/images/cab.png" alt="Go Sedan" className="w-10 h-6 object-contain" />
                      <div>
                        <p className="text-[11px] font-black text-[#1E293B]">Go Sedan</p>
                        <p className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                          4 Seater <Users className="w-2.5 h-2.5 ml-1" /> 3
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-black text-[#1E293B]">₹180</p>
                      <p className="text-[8px] text-gray-500">4 min away</p>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-transparent hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="/images/Auto.png" alt="Auto" className="w-10 h-6 object-contain" />
                      <div>
                        <p className="text-[11px] font-black text-[#1E293B]">Auto</p>
                        <p className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                          3 Seater <Users className="w-2.5 h-2.5 ml-1" /> 3
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-black text-[#1E293B]">₹80</p>
                      <p className="text-[8px] text-gray-500">3 min away</p>
                    </div>
                  </div>

                </div>

                {/* Confirm Button Area */}
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 bg-[#57E600] hover:bg-green-500 text-[#1E293B] font-bold text-xs py-3 rounded-2xl transition-colors shadow-sm">
                    Confirm Ride
                  </button>
                  <button className="w-[40px] h-[40px] shrink-0 bg-[#F8FAFC] border border-gray-100 rounded-2xl flex items-center justify-center text-[#1E293B]">
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>



        {/* RIDE TYPES / CATEGORIES */}
        <div className="w-full flex flex-col items-center pb-20 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl font-black text-white">Choose Your Ride</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Go Mini */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/cab.png" alt="Go Mini" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-white mb-1">Go Mini</h4>
              <p className="text-[13px] text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                4 Seater <Users className="w-3 h-3 text-gray-500" />
              </p>
              <div className="w-full flex justify-between items-center mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Est. Fare</p>
                  <p className="text-base font-black text-white">₹120</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">ETA</p>
                  <p className="text-base font-black text-[#57E600]">2 Min</p>
                </div>
              </div>
              <button className="w-full bg-[#57E600] hover:bg-green-500 text-[#1E293B] font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>
            
            {/* Go Sedan */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-[#1E293B] text-[9px] font-black uppercase px-4 py-1.5 rounded-bl-2xl shadow-sm tracking-wider">Popular</div>
              <img src="/images/cab.png" alt="Go Sedan" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-white mb-1">Go Sedan</h4>
              <p className="text-[13px] text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                4 Seater <Users className="w-3 h-3 text-gray-500" />
              </p>
              <div className="w-full flex justify-between items-center mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Est. Fare</p>
                  <p className="text-base font-black text-white">₹180</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">ETA</p>
                  <p className="text-base font-black text-[#57E600]">4 Min</p>
                </div>
              </div>
              <button className="w-full bg-[#57E600] hover:bg-green-500 text-[#1E293B] font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>

            {/* Auto */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/Auto.png" alt="Auto" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-white mb-1">Auto</h4>
              <p className="text-[13px] text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                3 Seater <Users className="w-3 h-3 text-gray-500" />
              </p>
              <div className="w-full flex justify-between items-center mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Est. Fare</p>
                  <p className="text-base font-black text-white">₹80</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">ETA</p>
                  <p className="text-base font-black text-[#57E600]">3 Min</p>
                </div>
              </div>
              <button className="w-full bg-[#57E600] hover:bg-green-500 text-[#1E293B] font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>

            {/* Bike */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/bike.png" alt="Bike" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-white mb-1">Bike</h4>
              <p className="text-[13px] text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                1 Seater <Users className="w-3 h-3 text-gray-500" />
              </p>
              <div className="w-full flex justify-between items-center mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Est. Fare</p>
                  <p className="text-base font-black text-white">₹50</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">ETA</p>
                  <p className="text-base font-black text-[#57E600]">1 Min</p>
                </div>
              </div>
              <button className="w-full bg-[#57E600] hover:bg-green-500 text-[#1E293B] font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="w-full flex flex-col items-center pb-20 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl font-black text-white">Why Choose Us</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            {/* Benefit 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#57E600]" />
              </div>
              <h4 className="text-lg font-black text-white mb-3">Verified Drivers</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">All our drivers undergo strict background checks and verification before they start driving.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-lg font-black text-white mb-3">Live GPS Tracking</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">Share your live ride status with friends and family for peace of mind while you travel.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10">
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <IndianRupee className="w-7 h-7 text-purple-400" />
              </div>
              <h4 className="text-lg font-black text-white mb-3">No Surge Pricing</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">We don't charge extra during peak hours or bad weather. Just fair, consistent pricing.</p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-7 h-7 text-red-400" />
              </div>
              <h4 className="text-lg font-black text-white mb-3">SOS Emergency</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">One-tap emergency button connects you directly to our 24/7 dedicated safety team.</p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="flex flex-col items-center pb-8 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-xl font-black text-white">How it works</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:flex-row items-start justify-between gap-6 w-full max-w-[1000px] mx-auto relative">
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">1</div>
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
                  <MapPin className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-white text-[14px] mb-1.5">Enter Location</h4>
                <p className="text-[12px] text-gray-400 font-medium leading-relaxed">Enter your pickup<br/>location and<br/>destination.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-white/20"></div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">2</div>
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
                  <Car className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-white text-[14px] mb-1.5">Choose a Ride</h4>
                <p className="text-[12px] text-gray-400 font-medium leading-relaxed">Select the ride that<br/>suits you best.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-white/20"></div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">3</div>
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
                  <Users className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-white text-[14px] mb-1.5">Ride with Us</h4>
                <p className="text-[12px] text-gray-400 font-medium leading-relaxed">Get matched with a<br/>nearby driver.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-white/20"></div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white shadow-sm">4</div>
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
                  <Wallet className="w-7 h-7 text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-white text-[14px] mb-1.5">Reach & Pay</h4>
                <p className="text-[12px] text-gray-400 font-medium leading-relaxed">Reach safely and<br/>pay easily.</p>
              </div>
            </div>

          </div>
        </div>

      </Container>

      {/* ADDITIONAL SECTIONS */}
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10 mt-12">
        {/* FARE ESTIMATOR / POPULAR ROUTES */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl font-black text-white">Popular Routes & Fares</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { from: "Railway Station", to: "City Center", fare: "₹80 - 120" },
                { from: "Airport", to: "Nehru Nagar", fare: "₹250 - 350" },
                { from: "Tech Park", to: "Shastri Chowk", fare: "₹150 - 200" },
                { from: "Bus Stand", to: "University Campus", fare: "₹60 - 90" }
              ].map((route, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-5 bg-white/20 my-1"></div>
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{route.from}</p>
                      <p className="text-sm font-bold text-gray-400">{route.to}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Est. Fare</p>
                    <p className="text-lg font-black text-[#57E600]">{route.fare}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 font-medium mt-8">*Fares are estimated and may vary based on live traffic, surge and ride type.</p>
          </div>
        </div>

        {/* CUSTOMER TESTIMONIALS */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl font-black text-white">Rider Stories</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl">
            {[
              { name: "Rahul Sharma", desc: "Daily Commuter", review: "Ghumakkadh has made my daily office commute so much easier. The drivers are always on time and the fares are very transparent." },
              { name: "Priya Patel", desc: "Student", review: "As a student, affordability is key. I love that there's no surge pricing even when it rains. I always feel safe riding with them." },
              { name: "Amit Kumar", desc: "Business Traveler", review: "The Go Sedan option is perfect for airport drops. Very professional service and the cars are always clean. Highly recommended!" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                <div className="flex gap-1.5 mb-5">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-[#57E600]" fill="currentColor" />)}
                </div>
                <p className="text-[15px] text-gray-300 font-medium leading-relaxed mb-8 italic">"{testimonial.review}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-[#1E293B] font-black text-lg uppercase shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">{testimonial.name}</h5>
                    <p className="text-xs text-gray-500 font-medium">{testimonial.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl font-black text-white">Frequent Questions</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {[
              { q: "How do I book a ride?", a: "Simply enter your pickup and drop-off locations in the app, choose your preferred ride type (Mini, Sedan, etc.), and tap 'Confirm Ride'. A nearby driver will be assigned instantly." },
              { q: "What payment methods are accepted?", a: "We accept all major payment methods including UPI, Credit/Debit Cards, Mobile Wallets, and Cash. You can easily switch your payment method before confirming the ride." },
              { q: "Is it safe to ride alone at night?", a: "Absolutely! Safety is our top priority. All our rides are GPS-tracked live, drivers are background-verified, and we provide an in-app SOS emergency button that connects to our 24/7 safety response team." },
              { q: "How is the fare calculated?", a: "Fares are calculated based on the base rate, distance, and estimated time. We pride ourselves on transparent pricing—what you see before booking is exactly what you pay. No hidden surge charges!" },
              { q: "Can I schedule a ride in advance?", a: "Yes, you can schedule rides up to 7 days in advance. Just select the 'Schedule' option next to the 'Book Now' button and choose your preferred date and time." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 transition-colors group cursor-pointer">
                <h4 className="text-base font-black text-white mb-2 flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-[#57E600] group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-sm text-gray-400 font-medium leading-relaxed mt-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};
