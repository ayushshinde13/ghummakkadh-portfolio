import React from 'react';

export default function DriverBenefitsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Driver Benefits
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Why Drive with Us?</h2>
            <p className="mb-4">
              Join Ghumakkadh to be your own boss, set your own hours, and enjoy exclusive perks.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>0% Commission for the first month</li>
              <li>Daily Instant Payouts</li>
              <li>Health Insurance coverage on active trips</li>
              <li>24/7 Priority Support for Drivers</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
