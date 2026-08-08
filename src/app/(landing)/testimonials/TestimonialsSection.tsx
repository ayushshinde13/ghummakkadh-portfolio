import React from "react";
import { Container } from "@/components/common";
import { CustomerCard } from "@/components/customer";
import { TESTIMONIALS } from "@/constants/testimonials";
import { Heart } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-[#FFFDF5] pt-10 lg:pt-14 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Top Right Dotted Golden Route & Glowing Yellow GPS Location Pin */}
      <div className="absolute top-10 right-10 w-96 h-40 pointer-events-none hidden lg:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 300 120"
          fill="none"
        >
          <path
            d="M 10 100 Q 150 20, 270 40"
            stroke="#77FF00"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
        {/* Glowing GPS Pin matching Screenshot */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#77FF00] shadow-[0_8px_20px_rgba(234,179,8,0.45)] border-4 border-white flex items-center justify-center text-[#1E293B]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Heritage City Skyline Background Silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-44 pointer-events-none overflow-hidden z-0">
        <svg
          className="w-full h-full text-[#FDE047]/35"
          viewBox="0 0 1200 160"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Indian Heritage Domes & Palaces Silhouette */}
          <path d="M0 160V120h40v-20h20v20h40v40H0z" />
          <path d="M120 160V90c0-20 20-35 40-35s40 15 40 35v70h-80z" />
          <path d="M220 160V110h20V85l15-15 15 15v25h20v50H220z" />
          <path d="M320 160V100c0-15 15-25 30-25s30 10 30 25v60h-60z" />
          <path d="M900 160V100c0-15 15-25 30-25s30 10 30 25v60h-60z" />
          <path d="M1000 160V90c0-20 20-35 40-35s40 15 40 35v70h-80z" />
          <path d="M1100 160V120h30V95l15-15 15 15v25h30v40h-90z" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Section Header matching Screenshot exactly */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Yellow Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-[#F0FFEA] text-[#1E293B] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm mb-3">
            <span><Heart className="w-4 h-4 fill-yellow-400 text-yellow-400" /></span>
            <span>Testimonials</span>
          </div>

          {/* H2 Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Loved by Commuters{" "}
            <span className="text-[#77FF00]">Across India</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 font-normal mt-2">
            See what our daily riders and partners have to say about Ghumakkadh.
          </p>
        </div>

        {/* 3 Testimonials Grid in ONE LINE (grid-cols-1 md:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <CustomerCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
