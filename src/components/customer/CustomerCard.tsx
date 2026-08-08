import React from "react";
import { cn } from "@/lib/cn";
import { Testimonial } from "@/types/testimonial";
import { Star, MapPin } from "lucide-react";

interface CustomerCardProps {
  testimonial: Testimonial;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ testimonial }) => {
  // Split comment to highlight the specified text with a yellow background matching screenshot
  const parts = testimonial.highlightedText
    ? testimonial.comment.split(testimonial.highlightedText)
    : [testimonial.comment];

  return (
    <div
      className={cn(
        "bg-white rounded-[32px] p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[380px]",
        "border-2 border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.2)] hover:-translate-y-1 hover:z-10"
      )}
    >
      <div>
        {/* Top Row: Giant Quote Mark & 5 Golden Stars */}
        <div className="flex items-start justify-between">
          <span className="text-[#FBBF24] text-5xl font-serif font-black leading-none -mt-1 select-none">
            &ldquo;
          </span>
          <div className="flex items-center gap-1 text-[#FBBF24] text-lg">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i}><Star className="w-4 h-4 fill-current" /></span>
            ))}
          </div>
        </div>

        {/* Quote Paragraph with Yellow Highlighted Text */}
        <p className="text-[#1E293B] text-[15px] sm:text-base leading-relaxed font-normal my-4">
          &ldquo;
          {parts[0]}
          {testimonial.highlightedText && (
            <span className="bg-[#E0FFCC] font-extrabold px-1 py-0.5 rounded text-[#1E293B]">
              {testimonial.highlightedText}
            </span>
          )}
          {parts.length > 1 && parts[1]}
          &rdquo;
        </p>
      </div>

      <div>
        {/* User Profile Section matching Screenshot */}
        <div className="flex items-center gap-3.5 my-4">
          {/* Avatar Circle with Custom Gradient & Portrait SVG */}
          <div
            className={cn(
              "w-14 h-14 rounded-full bg-gradient-to-tr flex items-center justify-center text-white font-black text-xl shadow-sm shrink-0 relative overflow-hidden",
              testimonial.avatarBg
            )}
          >
            {/* Elegant Silhouette Portrait SVG */}
            <svg
              className="w-10 h-10 text-white/90 translate-y-1.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + Blue Verified Badge */}
            <div className="flex items-center gap-1.5">
              <h4 className="text-base font-black text-[#1E293B] truncate">
                {testimonial.name}
              </h4>
              <svg
                className="w-4 h-4 text-[#2563EB] shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Role */}
            <div className="text-xs text-gray-500 font-medium">
              {testimonial.role}
            </div>

            {/* Location */}
            <div className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-0.5">
              <span><MapPin className="w-3 h-3" /></span>
              <span>{testimonial.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Tags Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
          {testimonial.tags.map((tag, i) => {
            const IconComponent = tag.icon;
            return (
            <span
              key={i}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                tag.bg,
                tag.text
              )}
            >
              <span><IconComponent className="w-3.5 h-3.5" /></span>
              <span>{tag.label}</span>
            </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
