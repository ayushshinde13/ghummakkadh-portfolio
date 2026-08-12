import React from 'react';

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Safety at Ghumakkadh
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Your Safety is Our Priority</h2>
            <p className="mb-4">
              We implement industry-standard safety protocols, conduct thorough background checks on our drivers, and offer live ride tracking features so you can share your trip status with loved ones.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>24/7 SOS Support</li>
              <li>Live GPS Tracking</li>
              <li>Verified Drivers</li>
              <li>Secure In-App Payments</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
