import React from "react";
import { Container, Section, Card, Heading } from "@/components/common";
import { FAQS } from "@/constants/faqs";
import { SectionHeading } from "./SectionHeading";

export const FAQ: React.FC = () => {
  return (
    <Section id="faq" className="bg-white">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about booking rides with Ghumakkadh"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FAQS.map((faq) => (
            <Card key={faq.question} className="flex flex-col gap-2">
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
