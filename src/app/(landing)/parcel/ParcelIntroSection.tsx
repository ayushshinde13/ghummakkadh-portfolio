import React from "react";
import { Container, Section, Heading } from "@/components/common";
import Link from "next/link";

interface ParcelIntroSectionProps {
  hideBadge?: boolean;
}

export const ParcelIntroSection: React.FC<ParcelIntroSectionProps> = ({ hideBadge = false }) => {
  return (
    <section id="parcel-intro" className="pb-0 pt-8 lg:pt-0 -mt-12 lg:-mt-20 relative z-20 bg-transparent overflow-hidden">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center max-w-2xl mx-auto mb-4 w-full">

          
          {/* Bold Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Ghumakkadh Parcel
          </h2>
          
          {/* Tagline */}
          <p className="text-base sm:text-lg text-gray-600 font-normal mt-3 max-w-xl mx-auto">
            Deliver anything, anywhere across the city. Fast, secure, and affordable.
          </p>
        </div>

        {/* Mobile Image (Visible only on mobile/tab) */}
        <div className="flex lg:hidden w-full justify-center relative z-10 mb-2 mt-0">
          <img 
            src="/images/parcel_main.png" 
            alt="Ghumakkadh Parcel Delivery" 
            className="w-full max-w-[450px] h-auto object-contain" 
          />
        </div>

        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-green-100 flex flex-col lg:flex-row items-center justify-between gap-10 relative shadow-sm">
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-50 rounded-full blur-2xl opacity-60 -z-10 -translate-x-1/2 translate-y-1/2"></div>

          {/* Left Text Content */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 z-10">
            {/* Small Badge */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 bg-[#F5F9F6] text-[#1E293B] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm border border-green-100/50 mb-3 w-fit">
                <span className="text-base">📦</span> Ghumakkadh Parcel
              </div>
            )}
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] m-0 leading-tight tracking-tight">
              Send Packages Across Town with Ease
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              Whether it's urgent documents for work or a surprise gift for a loved one, our dedicated parcel fleet ensures your items arrive safely, on time, and at unbeatable rates.
            </p>
            
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                Live tracking at every step
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#57E600] text-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                Affordable pricing with zero hidden fees
              </li>
            </ul>

            <div className="mt-4">
              <Link href="/parcel" className="inline-block bg-[#57E600] hover:bg-green-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md shadow-green-200">
                Learn More About Parcel
              </Link>
            </div>
          </div>

          {/* Right Image Content (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-[45%] justify-center lg:justify-end z-10 relative">
            <img 
              src="/images/parcel_main.png" 
              alt="Ghumakkadh Parcel Delivery" 
              className="w-full max-w-[450px] h-auto object-contain transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
        </div>
      </Container>
    </section>
  );
};
