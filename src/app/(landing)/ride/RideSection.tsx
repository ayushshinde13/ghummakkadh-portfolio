import React from "react";
import { Container } from "@/components/common";
import { 
  ShieldCheck, IndianRupee, Zap, MapPin, 
  Car, Clock, Users, Star, Menu, Bell,
  Search, Plus, Briefcase, ChevronRight, CheckCircle2,
  SlidersHorizontal, Home, Wallet, Smartphone
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

interface RideSectionProps {
  hideBadge?: boolean;
}

export const RideSection: React.FC<RideSectionProps> = ({ hideBadge = false }) => {
  return (
    <section className="bg-slate-50 dark:bg-gradient-to-b dark:from-[#0A0E1A] dark:to-[#0D1220] text-slate-900 dark:text-white pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden relative transition-colors duration-300" id="ride">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HERO AREA - 3 Columns on Desktop */}
        <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-between mb-16">
          
          {/* LEFT: Content */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-start text-left z-20 xl:shrink-0 xl:pt-8">

            {/* Hero Badge */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#F5F9F6] dark:bg-white/10 text-[#1E293B] dark:text-white font-bold sm:font-extrabold text-sm sm:text-lg px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-sm border border-green-200/80 dark:border-white/20 transition-all hover:scale-105 cursor-pointer mb-6">
                <Car className="w-5 sm:w-6 h-5 sm:h-6 text-[#4eb902] dark:text-[#57E600]" />
                <span className="tracking-wide">Ride with Ghumakkadh</span>
              </div>
            )}

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
              Every ride,<br />
              <span className="text-[#3b9e02] dark:text-[#57E600]">made</span> for you.
            </h2>

            {/* Description */}
            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base font-medium max-w-sm mb-10 leading-relaxed">
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
                <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-green-700 dark:text-black" />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-[13px]">Safe & Secure</h4>
                <p className="text-[11px] text-slate-600 dark:text-gray-400 font-medium leading-snug">Verified drivers and<br/>real-time tracking</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-[#F0FFEA] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-green-700 dark:text-black" />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-[13px]">Affordable Fares</h4>
                <p className="text-[11px] text-slate-600 dark:text-gray-400 font-medium leading-snug">No hidden charges.<br/>Transparent pricing</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-yellow-50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-amber-700 dark:text-black" fill="currentColor" />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-[13px]">Quick & Reliable</h4>
                <p className="text-[11px] text-slate-600 dark:text-gray-400 font-medium leading-snug">Get rides in minutes,<br/>whenever you need</p>
              </div>
            </div>

            {/* Coupon Card */}
            <div className="w-full max-w-[380px] sm:max-w-[410px] mt-4 mx-auto xl:mx-0">
              <img src="/images/Rider_img2.png" alt="Get 50% off on your first 2 rides!" className="w-full h-auto object-contain rounded-2xl shadow-sm" />
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
            <img src="/images/phone.png" alt="Ride Booking App Mockup" className="w-[360px] h-auto object-contain drop-shadow-2xl" />
          </div>

        </div>

        {/* RIDE TYPES / CATEGORIES */}
        <div className="w-full flex flex-col items-center pb-20 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Choose Your Ride</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Go Mini */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/cab.png" alt="Go Mini" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">Go Mini</h4>
              <p className="text-[13px] text-slate-500 dark:text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                4 Seater <Users className="w-3 h-3 text-slate-400 dark:text-gray-500" />
              </p>

              <button className="w-full bg-[#4eb902] hover:bg-[#3d9400] text-slate-900 font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>
            
            {/* Go Sedan */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <img src="/images/cab.png" alt="Go Sedan" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">Go Sedan</h4>
              <p className="text-[13px] text-slate-500 dark:text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                4 Seater <Users className="w-3 h-3 text-slate-400 dark:text-gray-500" />
              </p>

              <button className="w-full bg-[#4eb902] hover:bg-[#3d9400] text-slate-900 font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>

            {/* Auto */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/Auto.png" alt="Auto" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">Auto</h4>
              <p className="text-[13px] text-slate-500 dark:text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                3 Seater <Users className="w-3 h-3 text-slate-400 dark:text-gray-500" />
              </p>

              <button className="w-full bg-[#4eb902] hover:bg-[#3d9400] text-slate-900 font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>

            {/* Bike */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col items-center text-center shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <img src="/images/bike.png" alt="Bike" className="w-32 h-20 object-contain mb-4" />
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">Bike</h4>
              <p className="text-[13px] text-slate-500 dark:text-gray-400 font-medium flex items-center justify-center gap-1.5 mb-5 w-full">
                1 Seater <Users className="w-3 h-3 text-slate-400 dark:text-gray-500" />
              </p>

              <button className="w-full bg-[#4eb902] hover:bg-[#3d9400] text-slate-900 font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mt-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="w-full flex flex-col items-center pb-20 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Why Choose Us</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            {/* Benefit 1 */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-50 dark:hover:bg-white/10">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600]" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3">Verified Drivers</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">All our drivers undergo strict background checks and verification before they start driving.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-50 dark:hover:bg-white/10">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-blue-500 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3">Live GPS Tracking</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Share your live ride status with friends and family for peace of mind while you travel.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-50 dark:hover:bg-white/10">
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <IndianRupee className="w-7 h-7 text-purple-500 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3">No Surge Pricing</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">We don't charge extra during peak hours or bad weather. Just fair, consistent pricing.</p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-50 dark:hover:bg-white/10">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-7 h-7 text-red-500 dark:text-red-400" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3">SOS Emergency</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">One-tap emergency button connects you directly to our 24/7 dedicated safety team.</p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="flex flex-col items-center pb-8 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">How it works</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:flex-row items-start justify-between gap-6 w-full max-w-[1000px] mx-auto relative">
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#4eb902] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white dark:border-[#0A0E1A] shadow-sm">1</div>
                <div className="w-16 h-16 bg-white dark:bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10">
                  <MapPin className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-slate-900 dark:text-white text-[14px] mb-1.5">Enter Location</h4>
                <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Enter your pickup<br/>location and<br/>destination.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-slate-300 dark:border-white/20"></div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#4eb902] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white dark:border-[#0A0E1A] shadow-sm">2</div>
                <div className="w-16 h-16 bg-white dark:bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10">
                  <Car className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-slate-900 dark:text-white text-[14px] mb-1.5">Choose a Ride</h4>
                <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Select the ride that<br/>suits you best.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-slate-300 dark:border-white/20"></div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left relative">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#4eb902] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white dark:border-[#0A0E1A] shadow-sm">3</div>
                <div className="w-16 h-16 bg-white dark:bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10">
                  <Users className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-slate-900 dark:text-white text-[14px] mb-1.5">Ride with Us</h4>
                <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Get matched with a<br/>nearby driver.</p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[90%] w-[35%] border-t-[1.5px] border-dashed border-slate-300 dark:border-white/20"></div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-5 text-center lg:text-left">
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#4eb902] text-white font-black text-[11px] flex items-center justify-center absolute -top-1.5 -left-1.5 z-10 border-2 border-white dark:border-[#0A0E1A] shadow-sm">4</div>
                <div className="w-16 h-16 bg-white dark:bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative z-0 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10">
                  <Wallet className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600]" />
                </div>
              </div>
              <div className="pt-2">
                <h4 className="font-black text-slate-900 dark:text-white text-[14px] mb-1.5">Reach & Pay</h4>
                <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Reach safely and<br/>pay easily.</p>
              </div>
            </div>

          </div>
        </div>

      </Container>

      {/* ADDITIONAL SECTIONS */}
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10 mt-12">

        {/* CUSTOMER TESTIMONIALS */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Rider Stories</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl">
            {[
              { name: "Rahul Sharma", location: "Samta Colony, Raipur", review: "Ghumakkadh has made my daily office commute so much easier. The drivers are always on time and the fares are very transparent." },
              { name: "Priya Patel", location: "DDU Nagar, Raipur", review: "As a student, affordability is key. I love that there's no surge pricing even when it rains. I always feel safe riding with them." },
              { name: "Amit Kumar", location: "Shankar Nagar, Raipur", review: "The Go Sedan option is perfect for airport drops. Very professional service and the cars are always clean. Highly recommended!" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                <div className="flex gap-1.5 mb-5">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-[#3b9e02] dark:text-[#57E600]" fill="currentColor" />)}
                </div>
                <p className="text-[15px] text-slate-700 dark:text-gray-300 font-medium leading-relaxed mb-8 italic">"{testimonial.review}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-black text-lg uppercase shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900 dark:text-white">{testimonial.name}</h5>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium mt-0.5">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Frequent Questions</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>
          <FAQAccordion 
            className="max-w-3xl"
            faqs={[
              { q: "How do I book a ride?", a: "Simply enter your pickup and drop-off locations in the app, choose your preferred ride type (Mini, Sedan, etc.), and tap 'Confirm Ride'. A nearby driver will be assigned instantly." },
              { q: "What payment methods are accepted?", a: "We accept all major payment methods including UPI, Credit/Debit Cards, Mobile Wallets, and Cash. You can easily switch your payment method before confirming the ride." },
              { q: "Is it safe to ride alone at night?", a: "Absolutely! Safety is our top priority. All our rides are GPS-tracked live, drivers are background-verified, and we provide an in-app SOS emergency button that connects to our 24/7 safety response team." },
              { q: "How is the fare calculated?", a: "Fares are calculated based on the base rate, distance, and estimated time. We pride ourselves on transparent pricing—what you see before booking is exactly what you pay. No hidden surge charges!" },
              { q: "Can I schedule a ride in advance?", a: "Yes, you can schedule rides up to 7 days in advance. Just select the 'Schedule' option next to the 'Book Now' button and choose your preferred date and time." }
            ]}
          />
        </div>

      </Container>
    </section>
  );
};

