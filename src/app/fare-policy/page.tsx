import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FarePolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Fare Policy</h1>
          <p className="text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">

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
