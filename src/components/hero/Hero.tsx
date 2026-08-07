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
  // Disable animation on mobile and tablet (only animate on desktop >= 1024px)
  const isDesktop = width >= 1024;
  const targetX = isDesktop ? -1500 : 0;
  
  const scooterX = useTransform(scrollY, [0, 900], [0, targetX]);
  // Dashed yellow road lane lines shift RIGHT to create realistic road velocity
  const roadX = useTransform(scrollY, [0, 800], [0, 400]);
  // Background city skyline moves gently for depth parallax
  const skylineX = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <section className="relative bg-[#FFFCE8] pt-4 lg:pt-6 pb-0 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Golden City Skyline, Skyscraper & Bridge Silhouette with Parallax */}
      <motion.div
        style={{ x: skylineX }}
        className="absolute bottom-24 left-0 w-full h-56 pointer-events-none z-0 overflow-hidden"
      >
        <svg
          className="w-full h-full text-[#FDE047]/35"
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
        {/* Silver Metal Highway Guardrail with vertical posts */}
        <div className="w-full h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 border-y-2 border-gray-400 shadow-sm relative flex items-center justify-between px-6">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-full bg-gray-400/80 border-r border-white/40"
            />
          ))}
        </div>

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
        <div className="absolute -left-6 sm:-left-10 bottom-1 w-24 sm:w-36 h-8 sm:h-12 bg-white/80 rounded-full blur-xl" />
        <div className="absolute -left-4 sm:-left-6 bottom-2 w-16 sm:w-24 h-6 sm:h-8 bg-white/90 rounded-full blur-md" />

        {/* Scooter Image: Still when resting; runs horizontally ONLY when you scroll the page */}
        <img
          src="/images/hero.png"
          alt="Ghummakkadh Scooter"
          className="w-[260px] sm:w-[350px] md:w-[420px] lg:w-[520px] xl:w-[560px] h-auto object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </section>
  );
};
