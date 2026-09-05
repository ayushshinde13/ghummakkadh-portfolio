"use client";

import React, { useState } from "react";
import { Container, Section, Card, Heading } from "@/components/common";
import { FAQS } from "@/constants/faqs";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-transparent">
      <Container>
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center max-w-2xl mx-auto w-full mb-12">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#F5F9F6] dark:bg-white/10 text-[#1E293B] dark:text-white font-bold sm:font-extrabold text-sm sm:text-lg px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-sm border border-green-200/80 dark:border-white/20 transition-all hover:scale-105 cursor-pointer mb-4">
            <HelpCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#3b9e02] dark:text-[#57E600]" />
            <span className="tracking-wide">FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-base transition-colors">
            Everything you need to know about booking rides with Ghumakkadh
          </p>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card 
                key={faq.question} 
                className="flex flex-col !bg-white dark:!bg-white/5 !backdrop-blur-md !border-slate-200/80 dark:!border-white/10 border-2 hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.2)] transition-all duration-300 relative cursor-pointer !p-0 overflow-hidden shadow-sm dark:shadow-none"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between p-6">
                  <Heading level={4} className="text-slate-900 dark:text-white !mb-0 text-base sm:text-lg transition-colors">
                    {faq.question}
                  </Heading>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ml-4", isOpen && "rotate-180")} />
                </div>
                <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-slate-600 dark:text-gray-400 px-6 pb-6 leading-relaxed transition-colors">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

