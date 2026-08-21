"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="bg-[#1A2138] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300"
            onClick={() => setOpenIndex(isOpen ? null : index)}
          >
            <div className="flex justify-between items-center p-6">
              <h5 className="text-sm md:text-base font-black text-white">{faq.q}</h5>
              <ChevronRight className={cn("w-5 h-5 text-[#57E600] transition-transform duration-300 shrink-0 ml-4", isOpen ? "rotate-90" : "")} />
            </div>
            <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed px-6 pb-6 pt-0">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
