import React from "react";
import { Container } from "@/components/common";

export const Navbar: React.FC = () => {
  const navLinks = [
    { label: "How it works", href: "/how-it-works" },
    { label: "Ride", href: "#ride" },
    { label: "Drive", href: "#drive" },
    { label: "Cities", href: "#cities" },
    { label: "About us", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDEB]/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <Container className="flex items-center justify-between h-20">
        {/* Logo matching Image 2: Yellow map pin + Ghummakkadh + Slogan */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F8D84E] flex items-center justify-center text-[#1E293B] shadow-sm shrink-0">
            {/* SVG Location Map Pin Icon */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1E293B] leading-none">
              Ghummakkadh
            </span>
            <span className="text-[11px] font-medium text-gray-500 mt-0.5">
              Chalo. Ghoomo. Khush Raho.
            </span>
          </div>
        </a>

        {/* Navigation Links */}
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
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#drive"
            className="hidden sm:inline-flex items-center bg-white border border-gray-300 text-[#1E293B] font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            Become a driver
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-[#F8D84E] hover:bg-[#E5C330] text-[#1E293B] font-bold text-sm px-5 py-2.5 rounded-full shadow-sm transition-colors"
          >
            <span>📱</span>
            <span>Get the app</span>
          </a>
        </div>
      </Container>
    </header>
  );
};
