import React from "react";
import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-12 border-t border-white/10">
      <Container className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-12">
        <div className="flex flex-col justify-between">
          <div>
          <a href="/" className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img src="/images/logo.png" alt="Ghumakkadh Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold text-white">
              Ghumakkadh
            </span>
          </a>
          <p className="text-sm text-gray-400 mt-1">{siteConfig.description}</p>
          </div>
          
          {/* Powered by Hindustaan Innovations */}
          <div className="mt-12 md:mt-0 flex flex-col items-start">
            <span className="text-[11px] text-gray-500 mb-2 font-medium">Powered by</span>
            <div className="flex items-center gap-3">
              {/* 'hi' Logo Custom SVG matching the uploaded image */}
              <svg className="w-10 h-11" viewBox="8 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hiShadow" x1="25" y1="17" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Left stem of h */}
                <rect x="8" y="12" width="6" height="33" fill="white" />
                
                {/* Right stem and arch (overlaps left stem to prevent anti-aliasing gap) */}
                <path d="M13 28 C 18 22, 23 23, 26 26 V 45 H 20.5 V 29 C 18.5 26.5, 16 27, 13 30 Z" fill="white" />
                
                {/* Shadow swoosh */}
                <path d="M25 17 C 36 17, 36 28, 32 36 C 34 28, 30 22, 24 22 Z" fill="url(#hiShadow)" />
                
                {/* Dot of i */}
                <circle cx="25.5" cy="17" r="4.5" fill="white" />
              </svg>
              <div className="h-10 w-[1px] bg-gray-700 mx-1"></div>
              <div className="flex flex-col items-start leading-[1.15]">
                <span className="text-white font-bold tracking-[0.15em] text-[13px]">HINDUSTAAN</span>
                <span className="text-gray-400 font-bold tracking-[0.15em] text-[13px]">INNOVATIONS</span>
                <span className="text-white text-[8px] font-bold tracking-widest mt-0.5">PRIVATE LIMITED</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end md:items-end gap-6 mt-12 md:mt-0">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} HINDUSTAAN INNOVATIONS PRIVATE LIMITED. All rights reserved.
          </div>
          
          {/* Built in / Built for Hindustaan */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[38px] font-light italic text-white leading-none -mt-1 -ml-2">#</span>
            <div className="flex flex-col text-white text-[17px] leading-[1.15] tracking-tight">
              <div className="font-normal">Built in <span className="font-bold">Hindustaan</span></div>
              <div className="font-normal">Built for <span className="font-bold">Hindustaan</span></div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
