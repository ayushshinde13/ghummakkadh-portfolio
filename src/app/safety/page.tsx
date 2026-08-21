import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SafetyPage() {
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Safety at Ghumakkadh</h1>
          <p className="text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">

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
