"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/common";
import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";
import { useWindowSize } from "@/hooks/useWindowSize";

export const Hero: React.FC = () => {
  const { width } = useWindowSize();
  const { scrollY } = useScroll();

  // Scroll-driven parallax: As you scroll down the page, Scooter drives from right screen to LEFT along the road
  // Adjust animation distance based on screen size to keep speed reasonable across devices
  // Limit distance on mobile and tab so the scooty stays on the screen and doesn't run off
  const targetX = width < 768 ? -180 : width < 1024 ? -400 : -1500;
  
  // On mobile/tablet, the Hero section is stacked and much taller. 
  // We delay the start of the scroll animation so it begins exactly when the road comes into view.
  const scrollStart = width < 768 ? 650 : width < 1024 ? 400 : 0;
  const scrollEnd = scrollStart + 900;
  
  const scooterX = useTransform(scrollY, [scrollStart, scrollEnd], [0, targetX]);
  // Dashed yellow road lane lines shift RIGHT to create realistic road velocity
  const roadX = useTransform(scrollY, [scrollStart, scrollEnd], [0, 400]);
  // Background city skyline moves gently for depth parallax
  const skylineX = useTransform(scrollY, [scrollStart, scrollEnd], [0, 150]);

  return (
    <section className="relative pt-4 lg:pt-6 pb-0 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-between bg-gradient-to-b from-[#0a0e1a] via-[#2a2140] to-[#4a3a2a]">
      {/* Dark Night Sky Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full" />
        
        {/* Scattered Stars */}
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-blue-100/50 rounded-full blur-[1px]" />
        <div className="absolute top-[10%] left-[60%] w-0.5 h-0.5 bg-white/80 rounded-full" />
        <div className="absolute top-[45%] left-[10%] w-1 h-1 bg-white/40 rounded-full" />
        <div className="absolute top-[35%] left-[85%] w-0.5 h-0.5 bg-blue-200/60 rounded-full" />
        <div className="absolute top-[20%] left-[35%] w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px]" />
        <div className="absolute top-[55%] left-[70%] w-1 h-1 bg-white/50 rounded-full" />
        <div className="absolute top-[8%] left-[45%] w-1 h-1 bg-blue-100/70 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
      </div>

      {/* Golden City Skyline, Skyscraper & Bridge Silhouette with Parallax */}
      <motion.div
        style={{ x: skylineX }}
        className="absolute bottom-24 left-0 w-full h-56 pointer-events-none z-0 overflow-hidden"
      >
        <svg
          className="w-full h-full text-[#3D4A6B]"
          viewBox="0 0 1440 240"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Background City Buildings & Arch Bridge */}
          <path d="M0 240V140h60v-40h40v40h80v-60h40v60h100V80h50v20h30v-40h40v180H0z" />
          <path d="M400 240V120h50v120H400zm80 0V90h60v150h-60zm100 0V110h80v130h-80zm120 0V60h70v180h-70zm100 0V130h90v110h-90zm130 0V90h70v150h-70zm100 0V100h60v140h-60zm90 0v-80h80v80h-80zm110 0V80h60v160h-60z" />
          {/* Arch Bridge Silhouette */}
          <path
            d="M150 240 C 250 140, 350 140, 450 240 Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* 2-Column Main Showcase matching Image 2 - Compact so entire road shows without scroll */}
      <Container className="relative z-30 pb-40 sm:pb-48 lg:pb-6 my-auto pt-8 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-6">
          {/* Left Column: Headline, Subtitle, Buttons, Stats */}
          <div className="lg:col-span-6 z-10">
            <HeroContent />
          </div>

          {/* Right Column: Phone Mockup + 4 Floating Cards */}
          <div className="lg:col-span-6 z-0">
            <HeroImage />
          </div>
        </div>
      </Container>

      {/* Highway Guardrail & Asphalt Road at the Bottom - Fully visible in 1 screen height without scroll */}
      <div className="relative w-full z-20 mt-auto">


        {/* Asphalt Highway Road with scroll-driven dashed yellow markings */}
        <div className="w-full h-20 sm:h-24 bg-gradient-to-b from-[#475569] via-[#334155] to-[#1E293B] relative overflow-hidden flex items-center justify-center">
          {/* Top White Edge Stripe */}
          <div className="absolute top-1.5 left-0 w-full h-1 bg-white/40" />
          {/* Center Dashed Yellow Highway Lane Markings (Parallax scroll velocity) */}
          <motion.div
            style={{ x: roadX }}
            className="w-full border-t-4 border-dashed border-yellow-400/90"
          />
          {/* Bottom White Edge Stripe */}
          <div className="absolute bottom-2 left-0 w-full h-1.5 bg-white/60" />
        </div>
      </div>

      {/* Scroll-Driven Scooter: Starts at right screen end and runs along the road when scrolling */}
      <motion.div
        style={{ x: scooterX }}
        className="absolute bottom-2 sm:bottom-4 lg:bottom-8 right-0 sm:right-4 lg:right-16 z-40 pointer-events-none flex items-end"
      >
        {/* Realistic white smoke / dust cloud from rear tire on asphalt */}
        <div className="hidden lg:block absolute -left-10 bottom-1 w-36 h-12 bg-white/80 rounded-full blur-xl" />
        <div className="hidden lg:block absolute -left-6 bottom-2 w-24 h-8 bg-white/90 rounded-full blur-md" />

        {/* Scooter Image: Still when resting; runs horizontally ONLY when you scroll the page */}
        <img
          src="/images/hero_img.png"
          alt="Ghumakkadh Scooter"
          className="w-[260px] sm:w-[350px] md:w-[420px] lg:w-[520px] xl:w-[560px] h-auto object-contain"
        />
      </motion.div>
    </section>
  );
};
