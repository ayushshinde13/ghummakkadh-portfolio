import React from 'react';

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Our Story
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <p className="mb-4">
              Built in Hindustaan, Built for Hindustaan. Ghumakkadh started with a simple idea: to make daily commuting reliable, affordable, and safe for everyone.
            </p>
            <p>
              We connect riders with reliable bike, auto, and cab drivers across the city, aiming to redefine urban mobility and bring seamless travel to your doorstep.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
