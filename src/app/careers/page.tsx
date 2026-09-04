import React from 'react';

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0E1A] text-slate-800 dark:text-zinc-200 pt-32 pb-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Careers at Ghumakkadh
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg">Shape the future of mobility in India</p>
        </div>
        <div className="space-y-10 text-slate-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-[#131B2E] p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/80 dark:border-white/10 transition-colors duration-300">
          <p>Join our team and help us revolutionize transportation across India. We are always looking for passionate individuals.</p>
          <p>Please check back later for open positions, or reach out to us at <a href="mailto:support@hindustaan.in" className="text-blue-600 hover:underline font-semibold">support@hindustaan.in</a> with your resume.</p>
        </div>
      </div>
    </main>
  );
}
