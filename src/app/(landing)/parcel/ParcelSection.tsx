import React from "react";
import { Container, Section, Heading } from "@/components/common";

interface ParcelSectionProps {
  hideBadge?: boolean;
}

export const ParcelSection: React.FC<ParcelSectionProps> = ({ hideBadge = false }) => {
  return (
    <Section id="parcel" className="bg-white pt-6 pb-16 md:py-16 overflow-hidden">
      <Container className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch justify-between">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-[50%] flex flex-col gap-8 z-10">
            {/* Header */}
            <div>
              <div className="mb-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] m-0 tracking-tight">
                  Ghumakkadh Parcel
                </h2>
              </div>
              

              
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Send packages across the city with unprecedented speed and security. Whether it's urgent documents, electronics, or a gift for a loved one, Ghumakkadh Parcel ensures your items arrive safely, on time, and at the best rates.
              </p>
            </div>

            {/* Mobile Illustration (Visible only on mobile/tab) */}
            <div className="flex lg:hidden w-full justify-center relative mt-2 -mb-4 z-10">
              <img 
                src="/images/parcel_main.png" 
                alt="Parcel Delivery" 
                className="w-full h-auto object-contain scale-110" 
              />
            </div>

            {/* Top Features */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#57E600] shadow-sm border border-green-100">
                  {/* Safe & Secure Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-bold text-[#1E293B] text-sm">Safe & Secure</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 shadow-sm border border-yellow-100">
                  {/* Fast Delivery Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-[#1E293B] text-sm">Fast Delivery</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                  {/* Live Tracking Icon */}
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-bold text-[#1E293B] text-sm">Live Tracking</span>
              </div>
            </div>

            {/* Banner */}
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold text-sm mb-4">
                <span className="w-4 h-4 bg-[#57E600] rounded-sm"></span>
                Parcel Delivery
              </div>
            )}
            <div className="bg-[#F5F8F6] p-6 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="text-[#57E600] pt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <Heading level={4} className="text-[#1E293B] mb-2">Deliver Anything, Anywhere</Heading>
                <p className="text-gray-600 text-sm">From urgent documents to surprise gifts, we ensure your parcels reach their destination safely and on time.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-start justify-between relative mt-6 pt-4 border-t border-gray-100">
              {/* Connector Line */}
              <div className="absolute top-10 left-12 right-12 h-[1px] border-t-2 border-dashed border-gray-200 -z-10"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-1/4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-[#57E600] mb-4 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#57E600] rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                  <svg className="w-8 h-8 text-[#57E600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm mb-1">Book Your Parcel</h4>
                <p className="text-xs text-gray-500 leading-tight">Enter pick-up and drop locations, parcel details and book your delivery.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-1/4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-yellow-400 mb-4 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                  <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm mb-1">We Pick It Up</h4>
                <p className="text-xs text-gray-500 leading-tight">Our partner picks up your parcel from the chosen location.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-1/4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-blue-400 mb-4 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm mb-1">In Transit</h4>
                <p className="text-xs text-gray-500 leading-tight">Your parcel is on the way. Track it live at every step.</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center w-1/4 shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-[#57E600] mb-4 relative shadow-sm">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#57E600] rounded-full text-white text-xs flex items-center justify-center font-bold">4</div>
                  <svg className="w-8 h-8 text-[#57E600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm mb-1">Delivered Safely</h4>
                <p className="text-xs text-gray-500 leading-tight">We deliver it safely to the recipient, right on time.</p>
              </div>
            </div>

            {/* Middle Promotional Content */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mt-10 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-[#1E293B] mb-1">Business or Personal? We've got you covered.</h4>
                <p className="text-sm text-gray-600">From bulk corporate deliveries to sending a forgotten key to a friend, our fleet is ready to handle all your parcel needs.</p>
              </div>
              <button className="shrink-0 bg-[#57E600] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Get Started
              </button>
            </div>

            {/* Mobile Asset Illustration (Visible only on mobile/tab) */}
            <div className="flex lg:hidden w-full justify-center relative mt-4 z-10">
              <img 
                src="/images/parcel_img2.png" 
                alt="Parcel Assets" 
                className="w-full max-w-[600px] h-auto object-contain" 
              />
            </div>
          </div>

          {/* Right Illustration Area (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-[48%] relative flex-col justify-between items-end mt-12 lg:mt-0 z-10">
            <img 
              src="/images/parcel_main.png" 
              alt="Parcel Delivery" 
              className="w-full max-w-[700px] h-auto object-contain object-right scale-110 origin-right" 
            />
            <img 
              src="/images/parcel_img2.png" 
              alt="Parcel Assets" 
              className="w-full max-w-[650px] h-auto object-contain object-right mt-auto mb-6 lg:mb-10" 
            />
          </div>

        </div>

        {/* Bottom Features (Centered Full Width) */}
        <div className="w-full max-w-4xl mx-auto mt-4 lg:mt-16 z-10 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-[#1E293B] text-xs mb-1">Send Anything</h5>
                <p className="text-[10px] text-gray-500 leading-tight">Documents, gifts, electronics, clothes & more.</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0 font-bold text-xl leading-none">₹</div>
              <div>
                <h5 className="font-bold text-[#1E293B] text-xs mb-1">Affordable Pricing</h5>
                <p className="text-[10px] text-gray-500 leading-tight">Best rates with no hidden charges.</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-[#1E293B] text-xs mb-1">Support You Can Trust</h5>
                <p className="text-[10px] text-gray-500 leading-tight">24/7 support. We're always here to help.</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
              <div className="text-[#57E600] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-[#1E293B] text-xs mb-1">Across India</h5>
                <p className="text-[10px] text-gray-500 leading-tight">Delivering smiles across cities and towns.</p>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
};
