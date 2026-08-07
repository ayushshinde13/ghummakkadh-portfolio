import React from "react";
import { Container, Section, Heading, Button } from "@/components/common";

export const CTA: React.FC = () => {
  return (
    <Section className="bg-[#1E293B] text-white py-20 border-t border-white/10">
      <Container className="text-center flex flex-col items-center gap-6 max-w-3xl mx-auto">
        <Heading level={2} className="text-white">
          Ready to Ride With <span className="text-[#F8D84E]">Ghumakkadh</span>{" "}
          <span className="text-[#7DD3FC]">Today</span>?
        </Heading>
        <p className="text-gray-300 text-base">
          Download the Ghumakkadh app today and experience the smartest way to travel across your city.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button variant="primary" size="lg">
            Download App
          </Button>
          <Button variant="secondary" size="lg">
            Partner With Us
          </Button>
        </div>
      </Container>
    </Section>
  );
};
