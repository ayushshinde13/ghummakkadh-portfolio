import React from "react";
import { Container, Section, Heading } from "@/components/common";
import { 
  FileText, Package, Box, Truck, 
  MapPin, ShieldCheck, Clock, UserRound, 
  IndianRupee, Gift, Smartphone, Briefcase, 
  ShoppingCart, ChevronRight, ArrowRight, Star
} from "lucide-react";

interface ParcelSectionProps {
  hideBadge?: boolean;
}

export const ParcelSection: React.FC<ParcelSectionProps> = ({ hideBadge = false }) => {
  return (
    <Section id="parcel" className="bg-gradient-to-b from-[#0A0E1A] to-[#0D1220] pt-6 pb-16 md:py-16 overflow-hidden">
      <Container className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch justify-between">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-[50%] flex flex-col gap-8 z-10">
            {/* Header */}
            <div>
              <div className="mb-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black m-0 tracking-tight">
                  <span className="text-[#57E600]">Ghumakkadh</span> <span className="text-orange-500">Parcel</span>
                </h2>
              </div>
              

              
              <p className="text-gray-400 text-base leading-relaxed max-w-lg">
                Send packages across the city with unprecedented speed and security. Whether it's urgent documents, electronics, or a gift for a loved one, Ghumakkadh Parcel ensures your items arrive safely, on time, and at the best rates.
              </p>
            </div>

            {/* Mobile Illustration (Visible only on mobile/tab) */}
            <div className="flex lg:hidden w-full justify-center relative -mt-4 -mb-4 z-10">
              <img 
                src="/images/parcel_main.png" 
                alt="Parcel Delivery" 
                className="w-full max-w-[320px] h-auto object-contain" 
              />
            </div>

            {/* Top Features */}
            <div className="flex flex-row flex-nowrap items-center justify-center gap-4 lg:gap-8 w-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-[#57E600] shadow-sm border border-green-500/20">
                  {/* Safe & Secure Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-bold text-white text-sm">Safe & Secure</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 shadow-sm border border-yellow-500/20">
                  {/* Fast Delivery Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-white text-sm">Fast Delivery</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-500/20">
                  {/* Live Tracking Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-bold text-white text-sm">Live Tracking</span>
              </div>
            </div>

            {/* Banner */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold text-sm mb-4">
                <span className="w-4 h-4 bg-[#57E600] rounded-sm"></span>
                Parcel Delivery
              </div>
            )}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-start gap-4">
              <div className="text-[#57E600] pt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <Heading level={4} className="text-white mb-2">Deliver Anything, Anywhere</Heading>
                <p className="text-gray-400 text-sm">From urgent documents to surprise gifts, we ensure your parcels reach their destination safely and on time.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between relative mt-6 pt-4 border-t border-white/10 gap-6 lg:gap-0">
              {/* Connector Line (desktop only) */}
              <div className="hidden lg:block absolute top-10 left-12 right-12 h-[1px] border-t-2 border-dashed border-white/20 -z-10"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center lg:w-1/4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-[#57E600] mb-3 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#57E600] rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-[#57E600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Book Your Parcel</h4>
                <p className="text-xs text-gray-400 leading-tight">Enter pick-up and drop locations, parcel details and book your delivery.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center lg:w-1/4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-yellow-400 mb-3 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-1">We Pick It Up</h4>
                <p className="text-xs text-gray-400 leading-tight">Our partner picks up your parcel from the chosen location.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center lg:w-1/4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-blue-400 mb-3 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-1">In Transit</h4>
                <p className="text-xs text-gray-400 leading-tight">Your parcel is on the way. Track it live at every step.</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center lg:w-1/4 shrink-0">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-[#57E600] mb-3 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#57E600] rounded-full text-white text-xs flex items-center justify-center font-bold">4</div>
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-[#57E600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Delivered Safely</h4>
                <p className="text-xs text-gray-400 leading-tight">We deliver it safely to the recipient, right on time.</p>
              </div>
            </div>

            {/* Middle Promotional Content */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 mt-10 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Business or Personal? We've got you covered.</h4>
                <p className="text-sm text-gray-400">From bulk corporate deliveries to sending a forgotten key to a friend, our fleet is ready to handle all your parcel needs.</p>
              </div>
              <button className="shrink-0 bg-[#57E600] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Get Started
              </button>
            </div>

            {/* Mobile Asset Illustration (Visible only on mobile/tab) */}
            <div className="flex lg:hidden w-full justify-center relative -mt-8 -mb-8 z-10">
              <img 
                src="/images/parcel_img2.png" 
                alt="Parcel Assets" 
                className="w-full max-w-[320px] h-auto object-contain" 
              />
            </div>
          </div>

          {/* Right Illustration Area (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-[48%] relative flex-col justify-between items-end mt-12 lg:mt-0 z-10">
            <img 
              src="/images/parcel_main.png" 
              alt="Parcel Delivery" 
              className="w-full max-w-[500px] h-auto object-contain object-right origin-right" 
            />
            <img 
              src="/images/parcel_img2.png" 
              alt="Parcel Assets" 
              className="w-full max-w-[450px] h-auto object-contain object-right mt-auto mb-6 lg:mb-10" 
            />
          </div>

        </div>

        {/* Bottom Features (Centered Full Width) */}
        <div className="w-full max-w-4xl mx-auto mt-4 lg:mt-16 z-10 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-xs mb-1">Send Anything</h5>
                <p className="text-[10px] text-gray-400 leading-tight">Documents, gifts, electronics, clothes & more.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0 font-bold text-xl leading-none">₹</div>
              <div>
                <h5 className="font-bold text-white text-xs mb-1">Affordable Pricing</h5>
                <p className="text-[10px] text-gray-400 leading-tight">Best rates with no hidden charges.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-xs mb-1">Support You Can Trust</h5>
                <p className="text-[10px] text-gray-400 leading-tight">24/7 support. We're always here to help.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-xs mb-1">Across India</h5>
                <p className="text-[10px] text-gray-400 leading-tight">Delivering smiles across cities and towns.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 1. PARCEL TYPES & CATEGORIES */}
        <div className="w-full flex flex-col items-center mt-24 mb-12 relative z-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">What can we deliver?</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { type: "Documents", icon: <img src="/images/document.png" alt="Documents" className="w-24 h-24 object-contain mb-2" />, weight: "Up to 1 kg", price: "₹40 - ₹80", vehicle: "Bike" },
              { type: "Small Package", icon: <img src="/images/small_parcel.png" alt="Small Package" className="w-24 h-24 object-contain mb-2" />, weight: "Up to 5 kg", price: "₹60 - ₹120", vehicle: "Bike / Auto" },
              { type: "Medium Package", icon: <img src="/images/midium_parcel.png" alt="Medium Package" className="w-24 h-24 object-contain mb-2" />, weight: "Up to 15 kg", price: "₹100 - ₹250", vehicle: "Auto" },
              { type: "Large Package", icon: <img src="/images/large_parcel.png" alt="Large Package" className="w-24 h-24 object-contain mb-2" />, weight: "Up to 50 kg", price: "₹250 - ₹500+", vehicle: "Mini Truck" }
            ].map((cat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                {cat.icon}
                <h4 className="text-lg font-black text-white mb-4">{cat.type}</h4>
                <div className="w-full space-y-3 pt-4 border-t border-white/10 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Max Weight</span>
                    <span className="text-sm font-bold text-white">{cat.weight}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Est. Price</span>
                    <span className="text-sm font-bold text-[#57E600]">{cat.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Vehicle</span>
                    <span className="text-sm font-bold text-gray-300">{cat.vehicle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. PRICING CALCULATOR / ESTIMATE */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-6 pb-8 md:py-16 relative z-20">
          <div className="flex-1 w-full max-w-lg">
            <h3 className="text-3xl font-black text-white mb-4">Transparent Pricing. No Surprises.</h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              We charge strictly based on distance and parcel weight. Get an instant estimate before you book, so you always know what you're paying.
            </p>
            <button className="bg-[#57E600] hover:bg-[#4ddb00] text-black font-black text-sm px-6 py-3 rounded-full transition-colors shadow-sm">
              Calculate Exact Fare
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-[32px] blur-xl z-0"></div>
            <div className="bg-[#151B2E] border border-white/10 rounded-[32px] p-6 sm:p-8 relative z-10 shadow-xl">
              <h4 className="text-white font-black mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#57E600]" /> Base Estimates (Bike)
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-bold text-gray-300">Within 5 km</span>
                  <span className="text-lg font-black text-[#57E600]">₹40 - ₹60</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-bold text-gray-300">5 km - 10 km</span>
                  <span className="text-lg font-black text-[#57E600]">₹60 - ₹100</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-bold text-gray-300">10 km - 20 km</span>
                  <span className="text-lg font-black text-[#57E600]">₹100 - ₹200</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. WHY CHOOSE GHUMAKKADH PARCEL */}
        <div className="w-full py-16 relative z-20">
          {/* Decorative background image from existing asset */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none z-0">
            <img src="/images/parcel_img2.png" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Why Choose Us</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              { title: "Real-time GPS Tracking", icon: <MapPin className="w-6 h-6 text-blue-400" />, desc: "Monitor your package every step of the way directly on your phone." },
              { title: "Insured Deliveries", icon: <ShieldCheck className="w-6 h-6 text-green-400" />, desc: "Every parcel is insured against loss or damage during transit." },
              { title: "Same-Day Delivery", icon: <Clock className="w-6 h-6 text-yellow-400" />, desc: "Urgent? We guarantee delivery within hours on the same day." },
              { title: "Verified Partners", icon: <UserRound className="w-6 h-6 text-purple-400" />, desc: "All delivery agents undergo strict background checks for your safety." },
              { title: "Doorstep Pickup & Drop", icon: <Box className="w-6 h-6 text-orange-400" />, desc: "We pick it up from your door and drop it right at theirs." },
              { title: "Affordable Rates", icon: <IndianRupee className="w-6 h-6 text-cyan-400" />, desc: "Enjoy premium delivery service without the premium price tag." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  {benefit.icon}
                </div>
                <div>
                  <h5 className="text-sm font-black text-white mb-2">{benefit.title}</h5>
                  <p className="text-[12px] text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. USE CASES SECTION */}
        <div className="w-full flex flex-col items-center pt-4 pb-8 md:py-16 relative z-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">What are you sending today?</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
            {[
              { title: "Documents & Files", icon: <FileText className="w-5 h-5 text-gray-300" /> },
              { title: "Gifts & Flowers", icon: <Gift className="w-5 h-5 text-red-400" /> },
              { title: "Electronics", icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
              { title: "Food & Groceries", icon: <ShoppingCart className="w-5 h-5 text-green-400" /> },
              { title: "E-commerce Returns", icon: <Box className="w-5 h-5 text-yellow-400" /> }
            ].map((useCase, i) => (
              <div key={i} className="bg-[#151B2E] border border-white/10 rounded-full py-3 px-6 flex items-center gap-3 shadow-md hover:bg-white/10 transition-colors cursor-pointer">
                {useCase.icon}
                <span className="text-sm font-bold text-white">{useCase.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BUSINESS / BULK DELIVERY SECTION */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 py-16 relative z-20">
          <div className="flex-1 w-full max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg font-bold text-[11px] uppercase tracking-wider mb-6 border border-purple-500/20">
              <Briefcase className="w-4 h-4" />
              For Business
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
              Need regular deliveries? <br />
              <span className="text-purple-400">Partner with us.</span>
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Whether you run a restaurant, a retail store, or an e-commerce business, our bulk delivery solutions offer discounted rates, dedicated account managers, and priority support.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors border border-white/10 flex items-center gap-2">
              <span>Get Bulk Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 w-full relative flex justify-center">
            {/* Reusing parcel_main.png visually in a different context */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-[40px] blur-2xl z-0"></div>
            <div className="bg-[#151B2E]/80 backdrop-blur-md border border-white/10 p-8 rounded-[40px] shadow-2xl relative z-10 w-full max-w-[340px] overflow-hidden">
              <img src="/images/parcel_main.png" alt="Business Delivery" className="w-full h-auto object-contain mb-4" />
            </div>
          </div>
        </div>

        {/* 6. CUSTOMER TESTIMONIALS SECTION */}
        <div className="w-full flex flex-col items-center pt-4 pb-8 md:py-16 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Loved by Thousands</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {[
              { name: "Priya M.", role: "Small Business Owner", quote: "Ghumakkadh Parcel is my go-to for daily customer deliveries. It's affordable, and the live tracking gives my customers peace of mind." },
              { name: "Vikram R.", role: "Regular User", quote: "I forgot my laptop charger at home and used the service to get it delivered to my office within 45 minutes. Absolutely lifesaver!" },
              { name: "Neha S.", role: "Home Baker", quote: "Delivering cakes requires care. The delivery partners are always polite and handle my packages perfectly. Highly recommended." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 relative flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[14px] text-gray-300 font-medium italic leading-relaxed mb-8">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#57E600] to-blue-500 flex items-center justify-center text-black font-black text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-black text-white text-sm">{testimonial.name}</h5>
                    <p className="text-xs text-gray-400 font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. FAQ SECTION */}
        <div className="w-full flex flex-col items-center py-16 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Got Questions?</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="w-full max-w-4xl flex flex-col gap-4">
            {[
              { q: "What items cannot be delivered?", a: "We do not deliver illegal items, hazardous materials, cash, jewelry, highly fragile antiques, or live animals." },
              { q: "How is the pricing calculated?", a: "Pricing is transparent and based on the exact pickup and drop-off distance, combined with the weight category of your parcel." },
              { q: "Can I schedule a pickup in advance?", a: "Yes! You can choose 'Schedule for Later' in the app and select a date and time up to 3 days in advance." },
              { q: "What if my parcel is damaged during transit?", a: "All deliveries are insured. In the rare event of damage, you can file a claim instantly through the support section of the app." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-sm md:text-base font-black text-white">{faq.q}</h5>
                  <ChevronRight className="w-5 h-5 text-[#57E600]" />
                </div>
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. FINAL CTA BANNER */}
        <div className="w-full bg-gradient-to-r from-[#0A0E1A] to-[#151B2E] rounded-[32px] p-8 md:p-12 mt-12 mb-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 z-20">
          
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#57E600]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="z-10 w-full md:w-auto text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-[#57E600]/20 text-[#57E600] font-bold text-[11px] px-3 py-1.5 rounded-full mb-4 border border-[#57E600]/30">
              <span className="w-2 h-2 rounded-full bg-[#57E600]"></span>
              Fast & Reliable
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to send a parcel?</h3>
            <p className="text-gray-400 font-medium text-sm md:text-base max-w-md mx-auto md:mx-0">
              Join thousands of users who trust Ghumakkadh Parcel for their daily delivery needs.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-4">
            <a href="https://play.google.com/store/apps/details?id=com.ghumakkadh" target="_blank" rel="noopener noreferrer" className="bg-[#57E600] hover:bg-[#4ddb00] text-black font-black text-sm px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg w-full sm:w-auto">
              <span>Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>

      </Container>
    </Section>
  );
};
