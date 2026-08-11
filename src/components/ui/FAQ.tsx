import React from "react";
import { Container, Section, Card, Heading } from "@/components/common";
import { FAQS } from "@/constants/faqs";
import { SectionHeading } from "./SectionHeading";

export const FAQ: React.FC = () => {
  return (
    <Section id="faq" className="bg-transparent">
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
              className="flex flex-col gap-2 !bg-white/5 !backdrop-blur-md !border-white/10 border-2 hover:border-[#FBBF24] hover:shadow-[0_20px_55px_rgba(251,191,36,0.3)] hover:-translate-y-1 hover:z-10 transition-all duration-300 relative"
            >
              <Heading level={4} className="text-white">
                {faq.question}
              </Heading>
              <p className="text-sm text-gray-400">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
