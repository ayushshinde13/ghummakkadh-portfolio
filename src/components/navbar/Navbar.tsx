"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/common";
import { Smartphone, Menu, X, Sun, Moon } from "lucide-react";
import { useThemeContext } from "@/providers/ThemeProvider";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const { theme, toggleTheme, mounted } = useThemeContext();

  const navLinks = [
    { label: "How it works", href: "/how-it-works" },
    { label: "Ride", href: "/ride" },
    { label: "Drive", href: "/drive" },
    { label: "Parcel", href: "/parcel" },
    { label: "About us", href: "/about" },
    { label: "Support & Features", href: "/support" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 dark:bg-[#0A0E1A]/90 border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300">
      <Container className="flex items-center justify-between h-20">
        {/* Logo matching Image 2: Yellow map pin + Ghumakkadh + Slogan */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <img src="/images/logo.png" alt="Ghumakkadh Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-[#57E600] to-orange-500 text-transparent bg-clip-text">Ghumakkadh</span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-medium text-slate-500 dark:text-gray-300 mt-0.5 whitespace-nowrap transition-colors">
              Chalo. Ghoomo. Khush Raho.
            </span>
          </div>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors relative flex flex-col items-center ${
                  isActive
                    ? "text-[#4eb902] dark:text-white font-semibold"
                    : "text-slate-600 hover:text-black dark:text-[#F5F7FA] dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute -bottom-2 w-[40px] h-[3px] bg-[#4eb902] rounded-full"></div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Desktop & Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
            aria-label={mounted ? (theme === "dark" ? "Switch to Light Mode" : "Switch to Night Mode") : "Toggle theme"}
            title={mounted ? (theme === "dark" ? "Switch to Light Mode" : "Switch to Night Mode") : "Toggle theme"}
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>

          <a
            href="https://play.google.com/store/apps/details?id=com.ghumakkadh.partner"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            Become a driver
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.ghumakkadh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4eb902] hover:bg-[#3d9400] text-white font-bold text-xs sm:text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-[0_4px_14px_rgba(78,185,2,0.4)] hover:shadow-[0_6px_20px_rgba(78,185,2,0.5)] transition-all"
          >
            <span><Smartphone className="w-3 h-3 sm:w-4 sm:h-4" /></span>
            <span className="hidden sm:inline">Get the app</span>
            <span className="sm:hidden">App</span>
          </a>

          {/* Hamburger Button for Mobile/Tablet */}
          <button
            className="xl:hidden p-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/10 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-[90px] left-0 w-full bg-white/95 dark:bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-3xl py-4 px-4 flex flex-col gap-2 z-40 animate-in slide-in-from-top-2 mx-auto max-w-[95%] left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-slate-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 p-4 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between px-4">
            <span className="text-sm font-semibold text-slate-600 dark:text-zinc-400">
              {theme === "dark" ? "Night Mode Active" : "Light Mode Active"}
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-white"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Switch to Night</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
