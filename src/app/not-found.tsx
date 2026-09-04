import React from "react";
import Link from "next/link";
import { Home, HelpCircle, Compass } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Ghumakkadh",
  description: "Oops! The page you are looking for cannot be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] pt-28 pb-20 flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#0A0E1A] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#57E600]/10 dark:bg-[#57E600]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#57E600]/10 border border-[#57E600]/20 text-[#2d7701] dark:text-[#57E600] text-xs font-black uppercase tracking-wider mb-6 shadow-sm">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
          <span>404 • Lost in Transit</span>
        </div>

        {/* Animated Cat GIF */}
        <div className="w-full flex justify-center mb-6">
          <img
            src="/images/404 error page with cat.svg"
            alt="404 Error Page with Cat"
            className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[660px] h-auto object-contain select-none pointer-events-none"
          />
        </div>

        {/* Heading & Tagline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          Oops! Taken a <span className="text-[#2d7701] dark:text-[#57E600]">Wrong Turn?</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
          Even the best Ghumakkadhs take an unexpected route sometimes. The page you&apos;re looking for has either moved, expired, or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4eb902] hover:bg-[#3d9400] text-slate-950 font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_4px_14px_rgba(78,185,2,0.4)] hover:shadow-[0_6px_20px_rgba(78,185,2,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full border border-slate-200 dark:border-white/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Helpful Quick Navigation Links */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 w-full max-w-md">
          <p className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-zinc-500 mb-3">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-zinc-400">
            <Link href="/ride" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors">
              Book a Ride
            </Link>
            <Link href="/drive" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors">
              Become a Driver
            </Link>
            <Link href="/parcel" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors">
              Send a Parcel
            </Link>
            <Link href="/safety" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors">
              Safety Guidelines
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
