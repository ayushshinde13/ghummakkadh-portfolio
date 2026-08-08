import React from "react";
import { Container, Section, Card, Heading } from "@/components/common";
import { FAQS } from "@/constants/faqs";
import { SectionHeading } from "./SectionHeading";

export const FAQ: React.FC = () => {
  return (
    <Section id="faq" className="bg-white !pt-0">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about booking rides with Ghumakkadh"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FAQS.map((faq) => (
            <Card 
              key={faq.question} 
              className="flex flex-col gap-2 border-2 border-transparent hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.2)] hover:-translate-y-1 hover:z-10 transition-all duration-300 relative"
            >
              <Heading level={4} className="text-[#111827]">
                {faq.question}
              </Heading>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
