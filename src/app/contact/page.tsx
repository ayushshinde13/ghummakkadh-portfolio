import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Contact Us & Support</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-8 md:p-12 text-slate-600 dark:text-zinc-300 space-y-8 shadow-xl border border-slate-200/80 dark:border-white/10 transition-colors duration-300">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">We're here to help</h2>
            <p>If you have any questions, feedback, or issues, please reach out to our support team.</p>
            <ul className="mt-4 space-y-2">
              <li><strong className="text-slate-900 dark:text-white">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 hover:underline">support@hindustaan.in</a></li>
              <li><strong className="text-slate-900 dark:text-white">Phone:</strong> <a href="tel:0771-299-4005" className="text-blue-600 hover:underline">0771- 299 - 4005</a></li>
              <li><strong className="text-slate-900 dark:text-white">Website:</strong> <a href="https://hindustaan.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hindustaan.in</a></li>
              <li><strong className="text-slate-900 dark:text-white">Address:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001</li>
              <li><strong className="text-slate-900 dark:text-white">Support Hours:</strong> 24/7</li>
            </ul>
          </section>
        
        </div>
      </div>
    </main>
  );
}
