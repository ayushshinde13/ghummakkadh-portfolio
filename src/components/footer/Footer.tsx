import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const Facebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090B] text-[#F5F7FA] border-t border-white/5">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">

          {/* Column 1: Brand (Takes up 2 columns on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/images/logo.png" alt="Ghumakkadh Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-[#57E600] to-orange-500 text-transparent bg-clip-text">Ghumakkadh</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Your trusted travel partner for bike, auto, and cab rides across India.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#77FF00] hover:bg-white/10 transition-colors border border-white/5">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#77FF00] hover:bg-white/10 transition-colors border border-white/5">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#77FF00] hover:bg-white/10 transition-colors border border-white/5">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#77FF00] hover:bg-white/10 transition-colors border border-white/5">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-lg">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/story" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Our Story</Link></li>
            </ul>
          </div>

          {/* Column 3: For Riders */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-lg">For Riders</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/ride" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Book a Ride</Link></li>
              <li><Link href="/how-it-works" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Ride Options</Link></li>
              <li><Link href="/safety" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Safety</Link></li>
              <li><Link href="/fare-policy" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Fare Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: For Drivers */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-lg">For Drivers</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/drive" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Become a Driver</Link></li>
              <li><Link href="/driver-benefits" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Driver Benefits</Link></li>
              <li><Link href="/support" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Driver Support</Link></li>
              <li><Link href="/drive" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Drive with Us</Link></li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-lg">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/support" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Help Center</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/cookie" className="text-zinc-400 hover:text-[#77FF00] transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Download App Section */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-xl">Download the Ghumakkadh App</h3>
            <p className="text-zinc-400 text-sm">Book rides faster, track your trip live, and travel with confidence.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a href="#" className="inline-block flex-shrink-0 hover:scale-105 transition-all cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-[44px] w-auto" />
            </a>
            <a href="#" className="inline-block flex-shrink-0 hover:scale-105 transition-all cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[44px] w-auto" />
            </a>
          </div>
        </div>
      </div>

      {/* BRAND / "BUILT IN HINDUSTAAN" STRIP (ORIGINAL) */}
      <div className="w-full bg-[#09090B] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 w-full">

          {/* Left: Hindustaan Innovations Pvt. Ltd. */}
          <a href="https://hindustaan.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            {/* 'hi' Logo Custom SVG */}
            <svg className="w-[34px] h-[40px] shrink-0" viewBox="8 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hiShadow" x1="25" y1="17" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="8" y="12" width="6" height="33" fill="#d4d4d8" />
              <path d="M13 28 C 18 22, 23 23, 26 26 V 45 H 20.5 V 29 C 18.5 26.5, 16 27, 13 30 Z" fill="#d4d4d8" />
              <path d="M25 17 C 36 17, 36 28, 32 36 C 34 28, 30 22, 24 22 Z" fill="url(#hiShadow)" />
              <circle cx="25.5" cy="17" r="4.5" fill="#d4d4d8" />
            </svg>
            <div className="flex flex-col leading-[1.2]">
              <span className="text-[22px] font-semibold text-white">
                Hindustaan
              </span>
              <span className="text-[13px] text-zinc-400 font-medium">
                Innovations Pvt. Ltd.
              </span>
            </div>
          </a>

          {/* Right: Built in / Built for Hindustaan */}
          <div className="flex items-center gap-4">
            <span className="text-[42px] font-medium text-zinc-400 leading-none pb-1">
              #
            </span>
            <div className="flex flex-col text-[16px] leading-[1.3] text-zinc-400 font-medium">
              <span>
                Built in <span className="font-bold text-white">Hindustaan</span>
              </span>
              <span>
                Built for <span className="font-bold text-white">Hindustaan</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="w-full bg-[#080B12] py-5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-zinc-400 text-xs sm:text-sm text-center lg:text-left">
            © 2026 Ghumakkadh. All rights reserved.
          </div>
          <div className="flex items-center gap-3 sm:gap-6 text-zinc-400 text-xs sm:text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};