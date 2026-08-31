"use client";

import React, { useState } from "react";
import { Container, Section, Card, Heading } from "@/components/common";
import { FAQS } from "@/constants/faqs";
import { SectionHeading } from "./SectionHeading";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-transparent">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about booking rides with Ghumakkadh"
        />
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card 
                key={faq.question} 
                className="flex flex-col !bg-white/5 !backdrop-blur-md !border-white/10 border-2 hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.3)] transition-all duration-300 relative cursor-pointer !p-0 overflow-hidden"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between p-6">
                  <Heading level={4} className="text-white !mb-0 text-base sm:text-lg">
                    {faq.question}
                  </Heading>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ml-4", isOpen && "rotate-180")} />
                </div>
                <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-400 px-6 pb-6 leading-relaxed">{faq.answer}</p>
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

