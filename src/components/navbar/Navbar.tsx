"use client";

import React, { useState } from "react";
import { Container } from "@/components/common";
import { Smartphone, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Ride", href: "/ride" },
    { label: "Drive", href: "/drive" },
    { label: "About us", href: "#about" },
    { label: "Support & Features", href: "#support-features" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDEB]/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <Container className="flex items-center justify-between h-20">
        {/* Logo matching Image 2: Yellow map pin + Ghumakkadh + Slogan */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src="/images/logo.png" alt="Ghumakkadh Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1E293B] leading-none">
              Ghumakkadh
            </span>
            <span className="text-[11px] font-medium text-gray-500 mt-0.5">
              Chalo. Ghoomo. Khush Raho.
            </span>
          </div>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#1E293B] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs matching Image 2 */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#drive"
            className="hidden sm:inline-flex items-center bg-white border border-gray-300 text-[#1E293B] font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            Become a driver
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-[#77FF00] hover:bg-[#66E000] text-[#1E293B] font-bold text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm transition-colors"
          >
            <span><Smartphone className="w-4 h-4" /></span>
            <span className="hidden sm:inline">Get the app</span>
            <span className="sm:hidden">App</span>
          </a>

          {/* Hamburger Button for Mobile/Tablet */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-[#1E293B] transition-colors bg-white/50 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white border-b border-gray-200 shadow-2xl py-4 px-4 flex flex-col gap-2 z-40 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-gray-800 hover:text-[#1E293B] hover:bg-gray-50 p-4 rounded-xl transition-colors border border-transparent hover:border-gray-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
