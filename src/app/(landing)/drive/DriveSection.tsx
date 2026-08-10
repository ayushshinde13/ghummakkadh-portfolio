import React from "react";
import { Container } from "@/components/common";
import { 
  Car, Wallet, Clock, ShieldCheck, 
  UserRound, ArrowRight, IndianRupee, 
  Gift, Headphones, Star
} from "lucide-react";

interface DriveSectionProps {
  hideBadge?: boolean;
}

export const DriveSection: React.FC<DriveSectionProps> = ({ hideBadge = false }) => {
  return (
    <section className="bg-[#FFFEF8] pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden relative" id="drive">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HERO AREA - 3 Columns on Desktop */}
        <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-between mb-16">
          
          {/* LEFT: Content (~35%) */}
          <div className="flex-1 w-full max-w-[420px] flex flex-col items-start text-left z-20 xl:shrink-0 xl:pt-4">
            {/* Badge */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 bg-[#F3FCEB] text-green-700 font-bold text-[11px] px-3 py-1.5 rounded-full mb-6 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Drive with Ghumakkadh
              </div>
            )}

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[68px] font-black text-[#162238] leading-[1.05] tracking-tight mb-6">
              Drive. Earn.<br />
              <span className="text-[#57E600]">Grow with us.</span>
            </h2>

            {/* Description */}
            <p className="text-[#526174] text-sm sm:text-base font-medium max-w-[360px] mb-12 leading-relaxed">
              Join thousands of drivers who are earning flexibly and building their future with Ghumakkadh.
            </p>

            {/* Three Benefit Blocks */}
            <div className="flex flex-col sm:flex-row gap-5 mb-8 w-full justify-start">
              
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-[#57E600]" />
                </div>
                <h4 className="font-black text-[#162238] text-[13px]">Great Earnings</h4>
                <p className="text-[11px] text-[#526174] font-medium leading-snug">Earn more with<br/>better incentives</p>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#57E600]" />
                </div>
                <h4 className="font-black text-[#162238] text-[13px]">Flexible Hours</h4>
                <p className="text-[11px] text-[#526174] font-medium leading-snug">Drive on your time,<br/>your way</p>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#57E600]" />
                </div>
                <h4 className="font-black text-[#162238] text-[13px]">Safe & Secure</h4>
                <p className="text-[11px] text-[#526174] font-medium leading-snug">Your safety is our<br/>top priority</p>
              </div>

            </div>
          </div>

          {/* CENTER: Hero Illustration (~50%) */}
          <div className="flex-1 w-full max-w-[650px] relative flex justify-center items-center z-10 xl:-mx-6">
            <img 
              src="/images/ghumakkadh_drive_car_driver_asset.png" 
              alt="Drive with Ghumakkadh" 
              className="w-full h-auto object-contain scale-100 xl:scale-[1.05]"
            />
          </div>

          {/* RIGHT: 3 Simple Steps Card (~20%) */}
          <div className="w-full max-w-[340px] shrink-0 relative z-20 flex justify-center xl:justify-end xl:pt-4">
            <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col">
              
              <div className="mb-8">
                <p className="text-[13px] font-black text-[#162238] mb-0.5">Start earning in</p>
                <h3 className="text-xl font-black text-[#57E600]">3 simple steps</h3>
              </div>

              <div className="flex flex-col gap-0 relative">
                
                {/* Connector Lines */}
                <div className="absolute left-[15px] top-[20px] bottom-[40px] w-[1.5px] border-l-[1.5px] border-dashed border-[#57E600]/30 z-0"></div>

                {/* Step 1 */}
                <div className="flex gap-4 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#F3FCEB] rounded-full flex items-center justify-center">
                      <UserRound className="w-4 h-4 text-[#57E600]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">1</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-[#162238] mb-1">Sign Up</h4>
                    <p className="text-[11px] text-[#526174] font-medium leading-snug">Register in just a<br/>few minutes</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#F3FCEB] rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#57E600]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">2</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-[#162238] mb-1">Get Verified</h4>
                    <p className="text-[11px] text-[#526174] font-medium leading-snug">Upload documents<br/>and complete<br/>verification</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 mb-8 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-[#F3FCEB] rounded-full flex items-center justify-center">
                      <Car className="w-4 h-4 text-[#57E600]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#57E600] rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">3</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-black text-[#162238] mb-1">Start Driving</h4>
                    <p className="text-[11px] text-[#526174] font-medium leading-snug">Go online and start<br/>earning</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#57E600] hover:bg-[#4ddb00] text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span>Become a driver</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

        {/* BENEFITS STRIP */}
        <div className="w-full bg-white rounded-[32px] p-6 sm:p-8 mb-12 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] overflow-x-auto">
          <div className="flex items-center min-w-[900px] xl:min-w-0 justify-between gap-4">
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                <IndianRupee className="w-5 h-5 text-[#162238]" />
              </div>
              <div>
                <h4 className="font-black text-[#162238] text-[13px] mb-0.5">High Earnings</h4>
                <p className="text-[11px] text-[#526174] font-medium">Competitive fares and<br/>regular bonuses</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-gray-100 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-[#57E600]" />
              </div>
              <div>
                <h4 className="font-black text-[#162238] text-[13px] mb-0.5">Incentives & Bonuses</h4>
                <p className="text-[11px] text-[#526174] font-medium">Boost your income with<br/>exciting offers</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-gray-100 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-[#57E600]" />
              </div>
              <div>
                <h4 className="font-black text-[#162238] text-[13px] mb-0.5">24/7 Support</h4>
                <p className="text-[11px] text-[#526174] font-medium">We're here to help<br/>you anytime</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-gray-100 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F3FCEB] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#57E600]" />
              </div>
              <div>
                <h4 className="font-black text-[#162238] text-[13px] mb-0.5">Insurance Cover</h4>
                <p className="text-[11px] text-[#526174] font-medium">Comprehensive insurance<br/>for your safety</p>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-gray-100 shrink-0 mx-2"></div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#57E600] flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div>
                <h4 className="font-black text-[#162238] text-[13px] mb-0.5">Grow with Us</h4>
                <p className="text-[11px] text-[#526174] font-medium">Opportunities, rewards<br/>and recognition</p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="w-full bg-[#F3FCEB] rounded-[24px] p-8 md:p-0 md:h-[110px] flex flex-col md:flex-row items-center justify-between border border-[#E8F8DD] relative overflow-hidden">
          
          <div className="flex items-center md:pl-10 z-10 w-full md:w-auto text-center md:text-left flex-col md:flex-row gap-6">
            
            <div className="hidden md:block relative h-[140px] w-[90px] mt-10 shrink-0 transform -rotate-12">
              <div className="absolute bottom-0 w-[70px] h-[100px] bg-[#162238] rounded-[14px] border-4 border-[#162238] overflow-hidden flex flex-col justify-center items-center shadow-lg left-4">
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100">
                    <img src="/images/logo.png" alt="logo" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-[100px] h-[70px] bg-[#F2C999] rounded-full blur-sm opacity-90 z-[-1]"></div>
            </div>

            <div className="pt-0 md:pt-1">
              <h3 className="text-[19px] font-black text-[#162238] mb-0.5">Ready to hit the road?</h3>
              <p className="text-[#526174] font-medium text-[12px]">Join Ghumakkadh today and be your own boss.</p>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:pr-10 z-10 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#57E600] hover:bg-[#4ddb00] text-white font-bold text-[13px] px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm">
              <span>Join now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </Container>
    </section>
  );
};
