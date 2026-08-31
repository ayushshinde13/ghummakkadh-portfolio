import React from "react";
import { Container } from "@/components/common";
import { 
  Car, Wallet, Clock, ShieldCheck, 
  UserRound, ArrowRight, IndianRupee, 
  Gift, Headphones, Star, TrendingUp, BarChart3,
  FileText, CreditCard, Award, CheckCircle2,
  Zap, HeartPulse, Umbrella, CalendarDays, Users, Wrench,
  Menu, Bell, MapPin, Navigation, ChevronRight, Smartphone, Banknote
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

interface DriveSectionProps {
  hideBadge?: boolean;
}

export const DriveSection: React.FC<DriveSectionProps> = ({ hideBadge = false }) => {
  return (
    <section className="bg-gradient-to-b from-[#0A0E1A] to-[#0D1220] pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden relative" id="drive">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HERO AREA - 3 Columns on Desktop */}
        <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-between mb-16">
          
          {/* LEFT: Content (~35%) */}
          <div className="flex-1 w-full max-w-[420px] flex flex-col items-start text-left z-20 xl:shrink-0 xl:pt-4">
            {/* Badge */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 bg-[#4eb902] text-green-700 font-bold text-[11px] px-3 py-1.5 rounded-full mb-6 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Drive with Ghumakkadh
              </div>
            )}

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[68px] font-black text-white leading-[1.05] tracking-tight mb-6">
              Drive. Earn.<br />
              <span className="text-[#57E600]">Grow with us.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base font-medium max-w-[360px] mb-12 leading-relaxed">
              Join thousands of drivers who are earning flexibly and building their future with Ghumakkadh.
            </p>

            {/* Three Benefit Blocks */}
            <div className="flex flex-row gap-3 sm:gap-5 mb-8 w-full justify-start">
              
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-black text-white text-[13px]">Great Earnings</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">Earn more with<br/>better incentives</p>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-black text-white text-[13px]">Flexible Hours</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">Drive on your time,<br/>your way</p>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-black text-white text-[13px]">Safe & Secure</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-snug">Your safety is our<br/>top priority</p>
              </div>

            </div>
          </div>

          {/* CENTER: Hero Illustration (~50%) */}
          <div className="flex-1 w-full max-w-[650px] relative flex justify-center items-center z-10 xl:-mx-6">
            <img 
              src="/images/ghumakkadh_drive.png" 
              alt="Drive with Ghumakkadh" 
              className="w-full h-auto object-contain scale-100 xl:scale-[1.05]"
            />
          </div>

          {/* RIGHT: 3 Simple Steps Card (~20%) */}
          <div className="w-full max-w-[340px] shrink-0 relative z-20 flex justify-center xl:justify-end xl:pt-4">
            <div className="w-full bg-white/5 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col">
              
              <div className="mb-8">
                <p className="text-[13px] font-black text-white mb-0.5">Start earning in</p>
                <h3 className="text-xl font-black text-[#57E600]">3 simple steps</h3>
              </div>

              <div className="flex flex-col gap-0 relative">
                
                {/* Connector Lines */}
                <div className="absolute left-[15px] top-[20px] bottom-[40px] w-[1.5px] border-l-[1.5px] border-dashed border-[#57E600]/30 z-0"></div>

                {/* Step 1 */}
                <div className="flex gap-4 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center">
                      <UserRound className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-transparent flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">1</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-white mb-1">Sign Up</h4>
                    <p className="text-[11px] text-gray-400 font-medium leading-snug">Register in just a<br/>few minutes</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-transparent flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">2</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-white mb-1">Get Verified</h4>
                    <p className="text-[11px] text-gray-400 font-medium leading-snug">Upload documents<br/>and complete<br/>verification</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 mb-8 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center">
                      <Car className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-transparent flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">3</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-white mb-1">Start Driving</h4>
                    <p className="text-[11px] text-gray-400 font-medium leading-snug">Go online and start<br/>earning</p>
                  </div>
                </div>
              </div>

              <a href="https://play.google.com/store/apps/details?id=com.ghumakkadh.partner" target="_blank" rel="noopener noreferrer" className="w-full bg-[#57E600] hover:bg-[#4ddb00] text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span>Become a driver</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>

        {/* BENEFITS STRIP */}
        <div className="w-full bg-white/5 backdrop-blur-md rounded-[32px] p-6 sm:p-8 mb-12 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] overflow-x-auto">
          <div className="flex items-center min-w-[900px] xl:min-w-0 justify-between gap-4">
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-black text-white text-[13px] mb-0.5">High Earnings</h4>
                <p className="text-[11px] text-gray-400 font-medium">Competitive fares and<br/>regular bonuses</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-white/10 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-black text-white text-[13px] mb-0.5">Incentives & Bonuses</h4>
                <p className="text-[11px] text-gray-400 font-medium">Boost your income with<br/>exciting offers</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-white/10 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-black text-white text-[13px] mb-0.5">24/7 Support</h4>
                <p className="text-[11px] text-gray-400 font-medium">We're here to help<br/>you anytime</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-white/10 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-black text-white text-[13px] mb-0.5">Insurance Cover</h4>
                <p className="text-[11px] text-gray-400 font-medium">Comprehensive insurance<br/>for your safety</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-white/10 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#4eb902] flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-black" fill="currentColor" />
              </div>
              <div>
                <h4 className="font-black text-white text-[13px] mb-0.5">Grow with Us</h4>
                <p className="text-[11px] text-gray-400 font-medium">Opportunities, rewards<br/>and recognition</p>
              </div>
            </div>

          </div>
        </div>

        {/* 1. EARNINGS BREAKDOWN SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">How You Earn</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="w-full max-w-5xl bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h4 className="text-xl font-black text-white mb-4">Transparent Earning Structure</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">Take home more of what you make. Our structure is designed to maximize your profit with minimal platform fees.</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <Banknote className="w-4 h-4 text-[#57E600] fill-[#4eb902]" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Base Fare + Distance</span>
                    <span className="text-gray-500 text-xs">Earned per km and minute</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Peak Hour Surges</span>
                    <span className="text-gray-500 text-xs">Earn extra during high demand</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Gift className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Weekly Incentives</span>
                    <span className="text-gray-500 text-xs">Bonuses for completing trip targets</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full flex flex-col gap-4">
              {/* Earning Card 1 */}
              <div className="bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center p-2">
                     <img src="/images/bike.png" alt="Bike" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">Bike Drivers</h5>
                    <p className="text-xs text-gray-400">Part-time / Full-time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Earn up to</p>
                  <p className="text-lg font-black text-[#57E600]">₹15,000<span className="text-[10px] text-gray-400 font-medium">/mo</span></p>
                </div>
              </div>
              {/* Earning Card 2 */}
              <div className="bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center p-2">
                     <img src="/images/Auto.png" alt="Auto" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">Auto Drivers</h5>
                    <p className="text-xs text-gray-400">Full-time Average</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Earn up to</p>
                  <p className="text-lg font-black text-[#57E600]">₹25,000<span className="text-[10px] text-gray-400 font-medium">/mo</span></p>
                </div>
              </div>
              {/* Earning Card 3 */}
              <div className="bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center p-2">
                     <img src="/images/cab.png" alt="Cab" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">Cab Drivers</h5>
                    <p className="text-xs text-gray-400">Sedan / SUV Full-time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Earn up to</p>
                  <p className="text-lg font-black text-[#57E600]">₹45,000<span className="text-[10px] text-gray-400 font-medium">/mo</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. VEHICLE CATEGORIES SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Drive What You Own</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { type: "Bike", img: "/images/bike.png", req: "2-Wheeler License", desc: "Best for part-time earners and students. Navigate through traffic quickly and earn daily.", highlight: "Highest trips per hour" },
              { type: "Auto", img: "/images/Auto.png", req: "Commercial Badge", desc: "Steady daily earnings with massive local demand. Lowest platform commissions.", highlight: "Consistent daily demand" },
              { type: "Cab (Mini/Sedan)", img: "/images/cab.png", req: "Commercial License (Yellow Plate)", desc: "Maximize earnings with longer routes, airport drops, and outstation trips.", highlight: "Highest per-trip earnings" },
              { type: "Outstation SUV", img: "/images/Auto.png", req: "All India Tourist Permit", desc: "Drive families and groups between cities. Big ticket sizes and assured return fares.", highlight: "Premium fares & bonuses" }
            ].map((vehicle, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="h-24 w-full flex items-center justify-center mb-4 bg-white/5 rounded-2xl p-2 border border-white/5">
                  <img src={vehicle.img} alt={vehicle.type} className="max-h-full object-contain" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">{vehicle.type}</h4>
                <div className="bg-[#57E600]/10 text-[#57E600] text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4">{vehicle.highlight}</div>
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed mb-6 flex-1">{vehicle.desc}</p>
                <div className="w-full pt-4 border-t border-white/10 text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Key Requirement</p>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {vehicle.req}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ELIGIBILITY & DOCUMENTS REQUIRED SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">What You Need</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { title: "Driving License", icon: <CreditCard className="w-6 h-6 text-blue-400" />, desc: "Valid Driving License (Commercial where applicable)" },
              { title: "Vehicle RC", icon: <FileText className="w-6 h-6 text-green-400" />, desc: "Valid Registration Certificate of the vehicle" },
              { title: "Aadhaar / ID", icon: <UserRound className="w-6 h-6 text-purple-400" />, desc: "Aadhaar card or Government issued ID for background check" },
              { title: "Vehicle Insurance", icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />, desc: "Comprehensive insurance coverage for your vehicle" },
              { title: "Age Requirement", icon: <CalendarDays className="w-6 h-6 text-red-400" />, desc: "Must be at least 18 years of age (21 for commercial)" },
              { title: "Bank Details", icon: <Wallet className="w-6 h-6 text-cyan-400" />, desc: "Active bank account for weekly payout transfers" }
            ].map((doc, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/10 transition-colors shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {doc.icon}
                </div>
                <div>
                  <h5 className="text-sm font-black text-white mb-1">{doc.title}</h5>
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. DRIVER BENEFITS / PERKS SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">More Than Just Earnings</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[
              { title: "Fuel & EV Incentives", icon: <Zap className="w-6 h-6 text-yellow-500" />, desc: "Get special discounts on fuel stations and extra bonuses for driving EV vehicles." },
              { title: "Health Insurance", icon: <HeartPulse className="w-6 h-6 text-red-500" />, desc: "Comprehensive health coverage for you and your family to keep you protected." },
              { title: "Accident Cover", icon: <Umbrella className="w-6 h-6 text-blue-500" />, desc: "On-trip accident insurance up to ₹5,00,000 for complete peace of mind." },
              { title: "Weekly Payouts", icon: <Banknote className="w-6 h-6 text-green-500" />, desc: "Don't wait for your hard-earned money. Get paid on time, every single week." },
              { title: "Referral Bonuses", icon: <Users className="w-6 h-6 text-purple-500" />, desc: "Bring your friends to drive with Ghumakkadh and earn massive referral rewards." },
              { title: "Maintenance Support", icon: <Wrench className="w-6 h-6 text-orange-500" />, desc: "Discounted rates at partner garages for your vehicle's regular servicing." }
            ].map((perk, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-full bg-[#1A2138] border border-white/10 flex items-center justify-center mb-6">
                  {perk.icon}
                </div>
                <h4 className="text-lg font-black text-white mb-3">{perk.title}</h4>
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. DRIVER TESTIMONIALS SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Hear From Our Partners</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {[
              { name: "Rahul S.", type: "Cab Driver", quote: "Switching to Ghumakkadh was the best decision. The platform fee is low, so I take home much more every day. The weekly incentives are great too!" },
              { name: "Amit P.", type: "Auto Driver", quote: "I get back-to-back rides in my area. The app is so easy to use, and customer support is always there when I need them." },
              { name: "Suresh K.", type: "Bike Partner", quote: "Driving part-time has helped me pay my college fees. I just turn on the app whenever I'm free, earn my daily target, and go offline." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#151B2E] border border-white/10 rounded-[32px] p-8 relative flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[15px] text-gray-300 font-medium italic leading-relaxed mb-8">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-black text-white text-sm">{testimonial.name}</h5>
                    <p className="text-xs text-green-500 font-bold">{testimonial.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. DRIVER APP FEATURES SECTION */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 pb-24 relative z-20">
          <div className="flex-1 w-full flex flex-col items-start max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#4ddb00] text-[#1a4d00] font-bold text-[11px] px-3 py-1.5 rounded-full mb-6 border border-green-300">
              <Smartphone className="w-4 h-4" />
              Built for Drivers
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
              Your business, <br />
              <span className="text-[#57E600]">in your pocket.</span>
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              The Ghumakkadh Driver app gives you everything you need to earn more, track your progress, and stay safe on the road.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Smart Navigation</h4>
                  <p className="text-[13px] text-gray-400 font-medium">Built-in turn-by-turn navigation to pick up and drop off customers efficiently.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#57E600] fill-[#4eb902]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Real-time Earnings</h4>
                  <p className="text-[13px] text-gray-400 font-medium">Track your daily and weekly earnings, incentives, and bonuses instantly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">In-app SOS & Support</h4>
                  <p className="text-[13px] text-gray-400 font-medium">One tap access to emergency services and 24/7 dedicated driver support.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[400px] shrink-0 relative flex justify-center xl:justify-end">
            {/* DRIVER APP MOCKUP */}
            <div className="w-[340px] h-[680px] bg-[#1E293B] rounded-[36px] border-4 border-[#0F172A] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative">
              
              {/* Status Bar */}
              <div className="h-6 w-full flex justify-between items-center px-6 pt-2 bg-[#1E293B] z-30 relative">
                <span className="text-[10px] text-white font-bold">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Online Toggle & Map */}
              <div className="h-[280px] bg-[#334155] relative flex-shrink-0">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-[200%] h-4 bg-black rotate-12"></div>
                  <div className="absolute top-30 left-0 w-[200%] h-4 bg-black -rotate-12"></div>
                </div>
                
                {/* Header Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Menu className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[#57E600] text-black px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-wide flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                    You're Online
                  </div>
                </div>

                {/* Simulated Ride Request */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 animate-bounce">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">New Request</p>
                      <h4 className="text-xl font-black text-black">₹ 145</h4>
                    </div>
                    <div className="bg-[#F0FFEA] text-green-600 font-bold text-[10px] px-2 py-1 rounded-md border border-green-200">
                      4.5 km total
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-3 bg-gray-200 my-0.5"></div>
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-black">Rajiv Chowk Metro</p>
                      <p className="text-[11px] font-black text-black mt-1">CP Block B</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button className="flex-1 bg-red-50 text-red-500 font-bold text-[13px] py-3 rounded-xl border border-red-100">Decline</button>
                    <button className="flex-1 bg-[#57E600] text-white font-bold text-[13px] py-3 rounded-xl shadow-md">Accept</button>
                  </div>
                </div>
              </div>

              {/* Bottom Dashboard Area */}
              <div className="flex-1 bg-[#0F172A] rounded-t-3xl p-5 flex flex-col relative z-20">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5"></div>
                
                <h4 className="text-white font-black text-sm mb-4">Today's Progress</h4>
                
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                    <p className="text-[10px] text-gray-400 font-medium mb-1">Earnings</p>
                    <p className="text-lg font-black text-white">₹ 840</p>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                    <p className="text-[10px] text-gray-400 font-medium mb-1">Trips</p>
                    <p className="text-lg font-black text-white">6 / <span className="text-gray-500">10</span></p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-purple-200 font-bold mb-1">Daily Quest</p>
                    <p className="text-[10px] text-gray-400">Complete 10 trips to unlock ₹200 bonus</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-4 border-purple-500 flex items-center justify-center shrink-0 bg-[#0F172A]">
                    <span className="text-white font-black text-[10px]">60%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 7. FAQ SECTION */}
        <div className="w-full flex flex-col items-center pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-white">Frequently Asked Questions</h3>
            <div className="w-6 h-[2px] bg-green-200"></div>
          </div>
          
          <FAQAccordion 
            className="max-w-4xl"
            faqs={[
              { q: "How much can I earn as a Ghumakkadh driver?", a: "Earnings depend on your vehicle category, driving hours, and active incentives. Full-time drivers can earn between ₹15,000 to ₹45,000+ per month." },
              { q: "When do I get paid?", a: "We offer weekly payouts directly to your registered bank account. You can also track your daily earnings in real-time through the driver app." },
              { q: "Can I drive part-time?", a: "Absolutely! You are your own boss. Turn on the app when you want to earn and go offline when you're done. There are no mandatory login hours." },
              { q: "How long does the verification process take?", a: "If all your documents are correct and clear, verification is usually completed within 24-48 hours, allowing you to start driving quickly." }
            ]}
          />
        </div>

        {/* 8. FINAL CTA BANNER */}
        <div className="w-full bg-gradient-to-r from-[#0A0E1A] to-[#151B2E] rounded-[32px] p-8 md:p-12 mb-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#57E600]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="z-10 w-full md:w-auto text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-[#57E600]/20 text-[#57E600] font-bold text-[11px] px-3 py-1.5 rounded-full mb-4 border border-[#57E600]/30">
              <span className="w-2 h-2 rounded-full bg-[#57E600]"></span>
              Join the Fleet
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to start earning?</h3>
            <p className="text-gray-400 font-medium text-sm md:text-base max-w-md mx-auto md:mx-0">
              Sign up today, get verified quickly, and start making money on your own schedule with Ghumakkadh.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors border border-white/10">
              Need Help?
            </button>
            <a href="https://play.google.com/store/apps/details?id=com.ghumakkadh.partner" target="_blank" rel="noopener noreferrer" className="bg-[#57E600] hover:bg-[#4ddb00] text-black font-black text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg">
              <span>Become a Driver</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>

      </Container>
    </section>
  );
};


