import React from "react";
import { Container } from "@/components/common";
import { 
  Headphones, MessageCircle, ShieldCheck, 
  MessagesSquare, Mail, Phone, CircleHelp,
  Car, IndianRupee, Clock, MapPin, Package, Smartphone, Leaf,
  Users, Star, Heart
} from "lucide-react";

export const SupportSection: React.FC = () => {
  return (
    <section className="bg-[#FFFEF8] pt-12 md:pt-32 pb-24 overflow-hidden relative" id="support-features">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HERO SECTION */}
        <div className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[450px] flex justify-center items-end mb-6 md:mb-10 mt-0">
          
          {/* Hero Main Illustration */}
          <div className="absolute bottom-0 w-full max-w-[900px] z-10 flex justify-center pb-2">
            <img 
              src="/images/Support_img.png" 
              alt="Ghumakkadh Support Representative" 
              className="w-full h-auto object-contain scale-125 md:scale-100 origin-bottom"
            />
          </div>

          {/* Floating Badges (Left) (Desktop Only) */}
          <div className="hidden md:flex absolute top-0 left-0 md:left-[5%] z-20 flex-col gap-6 w-full max-w-[200px]">
            {/* 24/7 Support */}
            <div className="bg-[#F3FCEB] border border-[#d2edbe] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm self-start">
              <Headphones className="w-5 h-5 text-[#2d911b]" />
              <span className="font-bold text-[#1f6b11] text-sm">24/7 Support</span>
            </div>
            
            {/* Safe & Reliable */}
            <div className="bg-[#f2f1ff] border border-[#dad7fc] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm self-start ml-2 mt-2">
              <ShieldCheck className="w-5 h-5 text-[#6c5eff]" />
              <span className="font-bold text-[#4437cc] text-[13px] whitespace-pre-line leading-[1.2]">Safe &{"\n"}Reliable</span>
            </div>
          </div>
          {/* Quick Responses Badge (Desktop Only) */}
          <div className="hidden md:flex absolute top-[22%] left-[22%] md:left-[24%] z-20 flex-col gap-4">
            {/* Quick Responses */}
            <div className="bg-[#fffcf0] border border-[#ffecb3] rounded-2xl p-2 px-3 flex items-center gap-3 shadow-sm">
              <div className="bg-[#ffba00] p-1.5 rounded-full">
                <MessageCircle className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-[#1E293B] text-[13px] whitespace-pre-line leading-[1.2]">Quick{"\n"}Responses</span>
            </div>
          </div>
          
        </div>

        {/* SUPPORT OPTIONS & CONTACT CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-16 items-stretch w-full">
          
          {/* Live Chat */}
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 flex flex-col items-center justify-start text-center shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] h-full">
            <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#57E600] shrink-0">
              <Headphones className="w-12 h-12" />
            </div>
            <h4 className="font-bold text-[#1E293B] text-[15px] mb-2">Live Chat</h4>
            <p className="text-[12px] text-[#526174] leading-relaxed">Chat with our<br/>support team<br/>in real-time.</p>
          </div>

          {/* Email Support */}
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 flex flex-col items-center justify-start text-center shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] h-full">
            <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#f5a623] shrink-0">
              <Mail className="w-12 h-12" />
            </div>
            <h4 className="font-bold text-[#1E293B] text-[15px] mb-2">Email Support</h4>
            <p className="text-[12px] text-[#526174] leading-relaxed">Drop us an email<br/>and we'll get back<br/>to you.</p>
          </div>

          {/* Call Support */}
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 flex flex-col items-center justify-start text-center shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] h-full">
            <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#7363ff] shrink-0">
              <Phone className="w-12 h-12" />
            </div>
            <h4 className="font-bold text-[#1E293B] text-[15px] mb-2">Call Support</h4>
            <p className="text-[12px] text-[#526174] leading-relaxed">Speak to our<br/>team for quick<br/>assistance.</p>
          </div>

          {/* Help Center */}
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 flex flex-col items-center justify-start text-center shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] h-full">
            <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#57E600] shrink-0">
              <div className="bg-[#57E600] text-white rounded-full p-2">
                <CircleHelp className="w-8 h-8" />
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[15px] mb-2">Help Center</h4>
            <p className="text-[12px] text-[#526174] leading-relaxed">Find answers to<br/>common questions<br/>and guides.</p>
          </div>

          {/* Reach us anytime (Right) */}
          <div className="bg-[#F3FCEB] border border-[#e5f5d8] rounded-[32px] p-6 lg:p-8 flex flex-col shadow-sm relative overflow-hidden h-full col-span-2 lg:col-span-2">
            <h3 className="text-xl font-black text-[#1E293B] mb-2 text-center lg:text-left">Reach us anytime</h3>
            <div className="w-12 h-[3px] bg-[#57E600] rounded-full mb-6 lg:mb-8 mx-auto lg:mx-0"></div>
            
            <div className="flex flex-col md:flex-row xl:flex-row gap-6 h-full items-center md:items-start lg:items-start text-center md:text-left">
              {/* Left Contact */}
              <div className="flex flex-col justify-center md:justify-start gap-4 flex-1 z-10 whitespace-nowrap h-full pt-1">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#526174] font-medium text-[13px]">support@ghumakkadh.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#526174] font-medium text-[13px]">+91 98765 43210</span>
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="block md:hidden xl:hidden w-full h-[1px] bg-[#dcedc7] my-1"></div>

              {/* Divider */}
              <div className="hidden xl:block w-[1px] bg-[#dcedc7] h-[90%] self-center my-2"></div>

              {/* Right Clock */}
              <div className="flex flex-col justify-center md:justify-start gap-2 flex-1 z-10 xl:pl-2 h-full pt-2 items-center md:items-start">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Clock className="w-6 h-6 text-[#7a8a68]" />
                  <span className="font-bold text-[#1E293B] text-[14px]">24/7 Support</span>
                </div>
                <p className="text-[#526174] text-[12px] font-medium leading-relaxed max-w-[140px]">
                  We're here for you,<br/>round the clock.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 FEATURES STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-4 lg:gap-5 w-full mb-16 items-stretch justify-center">
          
          {/* 1. Safe & Secure */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 relative shrink-0">
              <div className="w-[80px] h-[40px] bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center relative shadow-sm mt-4">
                <Car className="w-8 h-8 text-gray-700" />
                <div className="absolute -bottom-3 -right-3 bg-[#57E600] rounded-md p-1.5 border-2 border-white shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Safe & Secure</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Verified drivers, live tracking<br/>and safety features to<br/>keep you protected.</p>
          </div>

          {/* 2. Affordable Pricing */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[72px] h-[72px] bg-[#ffba00] rounded-full border-4 border-[#ffca33] flex items-center justify-center shadow-inner relative">
                 <div className="absolute inset-2 border-2 border-[#ffca33] rounded-full opacity-50"></div>
                 <IndianRupee className="w-8 h-8 text-white z-10" strokeWidth={3} />
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Affordable Pricing</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Transparent fares with no<br/>hidden charges. Travel<br/>more, spend less.</p>
          </div>

          {/* 3. Quick & Reliable */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[72px] h-[72px] rounded-full border-[5px] border-[#57E600] flex items-center justify-center relative bg-white shadow-sm">
                <Clock className="w-8 h-8 text-[#57E600]" />
                <div className="absolute -left-6 top-4 w-5 h-[2px] bg-gray-300 rounded-full"></div>
                <div className="absolute -left-4 top-8 w-3 h-[2px] bg-gray-300 rounded-full"></div>
                <div className="absolute -left-5 top-12 w-4 h-[2px] bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Quick & Reliable</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Quick pickups and on-time<br/>drops, every time you<br/>ride or send.</p>
          </div>

          {/* 4. Live Tracking */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex flex-col items-center justify-center mb-4 relative shrink-0">
              <MapPin className="w-10 h-10 text-[#57E600] absolute -top-1 z-10 drop-shadow-md" fill="#57E600" color="white" />
              <div className="w-16 h-12 bg-[#F2EBCA] mt-7 rounded-md transform rotate-[15deg] skew-x-12 shadow-sm border border-[#e0d6a4] flex justify-center items-center overflow-hidden">
                <div className="w-[2px] h-[200%] bg-white mx-2 transform -rotate-[15deg]"></div>
                <div className="w-[200%] h-[2px] bg-white absolute transform -rotate-[15deg]"></div>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Live Tracking</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Track your ride or parcel<br/>in real-time and share<br/>with loved ones.</p>
          </div>

          {/* 5. Parcel Delivery */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[64px] h-[64px] bg-[#d9a362] rounded-md border-t-[10px] border-[#c08d50] flex flex-col justify-center items-center relative shadow-sm">
                 <div className="w-full h-full absolute inset-0 opacity-10 flex flex-col justify-between p-1">
                   <div className="w-full h-[1px] bg-black"></div>
                   <div className="w-full h-[1px] bg-black"></div>
                 </div>
                 <div className="flex gap-1 z-10">
                   <div className="w-4 h-4 bg-[#b58348] rounded-full flex items-center justify-center">
                     <Leaf className="w-2.5 h-2.5 text-[#57E600]" />
                   </div>
                   <div className="w-4 h-4 bg-[#b58348] rounded-full flex items-center justify-center">
                     <Leaf className="w-2.5 h-2.5 text-[#57E600]" />
                   </div>
                 </div>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Parcel Delivery</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Send documents, gifts<br/>or anything with safe<br/>and fast delivery.</p>
          </div>

          {/* 6. Easy to Use */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[44px] h-[72px] bg-white border-[4px] border-[#1E293B] rounded-xl flex items-center justify-center shadow-md relative">
                <div className="absolute top-1 w-4 h-1 bg-[#1E293B] rounded-full"></div>
                <div className="w-7 h-7 bg-[#F3FCEB] rounded-full flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-[#57E600]" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] text-[13px] mb-2">Easy to Use</h4>
            <p className="text-[11px] text-[#526174] leading-relaxed">Simple app, smooth<br/>experience. Book rides<br/>or parcels in a few taps.</p>
          </div>

        </div>

        {/* SUPPORT FORM SECTION */}
        <div className="w-full bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#1E293B] mb-2">Send us a message</h3>
            <p className="text-[#526174] font-medium">Fill out the form below and our team will get back to you shortly.</p>
          </div>
          
          <form className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-[#1E293B] font-bold text-sm mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#57E600] focus:ring-1 focus:ring-[#57E600] transition-colors" />
              </div>
              <div className="flex-1">
                <label className="block text-[#1E293B] font-bold text-sm mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#57E600] focus:ring-1 focus:ring-[#57E600] transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-[#1E293B] font-bold text-sm mb-2">Subject</label>
              <select defaultValue="" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#57E600] focus:ring-1 focus:ring-[#57E600] transition-colors text-gray-600 appearance-none">
                <option value="" disabled>Select a topic</option>
                <option value="ride">Ride Issue</option>
                <option value="drive">Driver Onboarding</option>
                <option value="parcel">Parcel Delivery</option>
                <option value="payment">Payment & Billing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#1E293B] font-bold text-sm mb-2">Message</label>
              <textarea placeholder="How can we help you?" rows={4} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#57E600] focus:ring-1 focus:ring-[#57E600] transition-colors resize-none"></textarea>
            </div>
            
            <button type="button" className="bg-[#57E600] hover:bg-[#4ddb00] text-white font-bold py-3.5 px-8 rounded-xl transition-colors mt-2 self-start shadow-sm">
              Send Message
            </button>
          </form>
        </div>

        {/* BOTTOM BRAND VALUES */}
        <div className="w-full bg-[#F3FCEB] border border-[#e5f5d8] rounded-[32px] p-8 md:p-12 flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 shadow-sm mb-8">
          
          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-12 h-12 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-[#1E293B] text-[14px] mb-1.5">Community First</h4>
              <p className="text-[12px] text-[#526174] font-medium leading-relaxed">Building a community that<br/>moves together and grows<br/>together.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-12 h-12 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[#1E293B] text-[14px] mb-1.5">Trusted by Millions</h4>
              <p className="text-[12px] text-[#526174] font-medium leading-relaxed">Millions of happy commuters<br/>and customers across<br/>India trust us.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-12 h-12 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-[#1E293B] text-[14px] mb-1.5">Always Improving</h4>
              <p className="text-[12px] text-[#526174] font-medium leading-relaxed">We keep innovating to bring<br/>you better features and<br/>experiences.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start">
            <div className="w-12 h-12 bg-[#57E600] rounded-full flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-[#1E293B] text-[14px] mb-1.5">Made in India</h4>
              <p className="text-[12px] text-[#526174] font-medium leading-relaxed">Proudly made for India,<br/>powering movement in<br/>every city and town.</p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};
