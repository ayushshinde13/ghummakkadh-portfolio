import React from 'react';

export default function FarePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Fare Policy
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Transparent Pricing</h2>
            <p className="mb-4">
              Ghumakkadh operates with zero hidden fees. The estimated fare shown before booking is calculated based on base fare, distance, time, and dynamic demand.
            </p>
            <p>
              Toll charges or parking fees, if applicable during the trip, are not included in the base fare and must be paid by the rider.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
