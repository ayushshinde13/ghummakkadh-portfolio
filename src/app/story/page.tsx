import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StoryPage() {
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Our Story</h1>
          <p className="text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">

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
