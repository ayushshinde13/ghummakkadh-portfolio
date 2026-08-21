import React from "react";
import { Container } from "@/components/common";
import Link from "next/link";

interface DriveIntroSectionProps {
  hideBadge?: boolean;
}

export const DriveIntroSection: React.FC<DriveIntroSectionProps> = ({ hideBadge = false }) => {
  return (
    <section id="drive-intro" className="py-8 lg:py-12 relative z-20 bg-transparent overflow-hidden">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Section Header */}
        {!hideBadge && (
          <div className="flex flex-col items-start lg:items-center text-left lg:text-center w-full mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 bg-[#F5F9F6] text-[#1E293B] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm border border-green-100/50">
              <img src="/images/mini.png" alt="Mini" className="w-6 h-4 object-contain" /> Driver
            </div>
          </div>
        )}

        {/* Mobile Image (Visible only on mobile/tab) */}
        <div className="flex lg:hidden w-full justify-center relative z-10 my-10">
          <img 
            src="/images/ghumakkadh_drive.png" 
            alt="Ghumakkadh Driver" 
            className="w-full max-w-[280px] h-auto object-contain" 
          />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 lg:p-10 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50 -z-10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#77FF00]/10 rounded-full blur-2xl opacity-60 -z-10 translate-x-1/2 translate-y-1/2"></div>

          {/* Left Text Content */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 z-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white m-0 leading-tight tracking-tight">
              Earn Money Driving with Ghumakkadh
            </h2>
            
            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Join thousands of partners across India who are making a reliable income. Whether you ride a bike, drive an auto, or own a cab, there's a place for you here.
            </p>
            
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 text-gray-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                Daily and instant payouts directly to your account
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                Flexible hours—work whenever you want
              </li>
            </ul>

            <div className="mt-4">
              <Link href="/drive" className="inline-block bg-[#57E600] hover:bg-green-600 text-[#1E293B] font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md">
                Sign Up to Drive
              </Link>
            </div>
          </div>

          {/* Right Image Content (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-[45%] justify-center lg:justify-end z-10 relative">
            <img 
              src="/images/ghumakkadh_drive.png" 
              alt="Ghumakkadh Driver" 
              className="w-full max-w-[460px] h-auto object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
            />
          </div>
          
        </div>
      </Container>
    </section>
  );
};
