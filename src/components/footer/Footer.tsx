import React from "react";
import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E293B] text-white pt-12 border-t border-white/10">
      <Container className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-12">
        <div className="flex flex-col justify-between">
          <div>
            <a href="/" className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/images/logo.png" alt="Ghumakkadh Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Ghumakkadh
              </span>
            </a>
            <p className="text-sm text-gray-400 mt-1">{siteConfig.description}</p>
          </div>
        </div>
      </Container>

      {/* APP DOWNLOAD BADGES */}
      <Container>
        <div className="mt-8 mb-4">
          <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm underline underline-offset-4">Terms & Conditions</a>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 w-full">
          {/* Apple App Store */}
          <a
            href="#"
            className="inline-block flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
              alt="Download on the App Store" 
              className="h-[40px] md:h-[50px] lg:h-[56px] w-auto"
            />
          </a>

          {/* Google Play Store */}
          <a
            href="#"
            className="inline-block flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Get it on Google Play" 
              className="h-[40px] md:h-[50px] lg:h-[56px] w-auto"
            />
          </a>
        </div>
      </Container>

      {/* BRAND / "BUILT IN HINDUSTAAN" STRIP */}
      <div className="w-full bg-[#09090B] py-8 mt-12 border-t border-white/5">
        <Container className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 w-full">

          {/* Left: Hindustaan Innovations Pvt. Ltd. */}
          <div className="flex items-center gap-3">
            {/* 'hi' Logo Custom SVG */}
            <svg className="w-[34px] h-[40px] shrink-0" viewBox="8 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hiShadow" x1="25" y1="17" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <rect x="8" y="12" width="6" height="33" fill="#d4d4d8" />
              <path d="M13 28 C 18 22, 23 23, 26 26 V 45 H 20.5 V 29 C 18.5 26.5, 16 27, 13 30 Z" fill="#d4d4d8" />
              <path d="M25 17 C 36 17, 36 28, 32 36 C 34 28, 30 22, 24 22 Z" fill="url(#hiShadow)" />
              <circle cx="25.5" cy="17" r="4.5" fill="#d4d4d8" />
            </svg>
            <div className="flex flex-col leading-[1.2]">
              <span className="text-[22px] font-semibold text-zinc-300">
                Hindustaan
              </span>
              <span className="text-[13px] text-zinc-500 font-medium">
                Innovations Pvt. Ltd.
              </span>
            </div>
          </div>

          {/* Right: Built in / Built for Hindustaan */}
          <div className="flex items-center gap-4">
            <span className="text-[42px] font-medium text-zinc-400 leading-none pb-1">
              #
            </span>
            <div className="flex flex-col text-[16px] leading-[1.3] text-zinc-400 font-medium">
              <span>
                Built in <span className="font-semibold text-zinc-300">Hindustaan</span>
              </span>
              <span>
                Built for <span className="font-semibold text-zinc-300">Hindustaan</span>
              </span>
            </div>
          </div>

        </Container>
      </div>
    </footer>
  );
};