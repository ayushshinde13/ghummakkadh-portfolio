import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DriverBenefitsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0E1A] pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Driver Benefits</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-8 md:p-12 text-slate-600 dark:text-zinc-300 space-y-8 shadow-xl border border-slate-200/80 dark:border-white/10 transition-colors duration-300">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Drive with Us?</h2>
            <p className="mb-4 leading-relaxed">
              Join Ghumakkadh to be your own boss, set your own hours, and enjoy exclusive perks.
            </p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700 dark:text-zinc-300">
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
