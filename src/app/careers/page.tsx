import React from 'react';

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Careers at Ghumakkadh
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <p>Join our team and help us revolutionize transportation across India. We are always looking for passionate individuals.</p>
          <p>Please check back later for open positions, or reach out to us with your resume.</p>
        </div>
      </div>
    </main>
  );
}
