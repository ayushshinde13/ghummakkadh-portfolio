import React from "react";
import { Container, Section } from "@/components/common";
import { DriverCard } from "@/components/driver";

export const DriverSection: React.FC = () => {
  return (
    <Section id="driver" className="bg-[#F8F9FA]">
      <Container className="max-w-4xl mx-auto">
        <DriverCard />
      </Container>
    </Section>
  );
};
