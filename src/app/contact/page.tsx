import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us & Support</h1>
          <p className="text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">We're here to help</h2>
            <p>If you have any questions, feedback, or issues, please reach out to our support team.</p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email:</strong> support@hindustaan.in</li>
              <li><strong>Phone:</strong> 0771- 299 - 4005</li>
              <li><strong>Website:</strong> <a href="https://hindustaan.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hindustaan.in</a></li>
              <li><strong>Address:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001</li>
              <li><strong>Support Hours:</strong> 24/7</li>
            </ul>
          </section>
        
        </div>
      </div>
    </main>
  );
}
