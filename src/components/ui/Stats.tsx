import React from "react";
import { Container, Section, Heading } from "@/components/common";

export const Stats: React.FC = () => {
  const stats = [
    { label: "Daily Rides", value: "1,00,000+" },
    { label: "Active Drivers", value: "50,000+" },
    { label: "Cities Covered", value: "25+" },
    { label: "User Rating", value: "4.8/5" },
  ];

  return (
    <Section className="bg-[#F8D84E] py-16 border-y-4 border-[#7DD3FC]">
      <Container className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm p-6 rounded-3xl border-2 border-[#7DD3FC] shadow-sm hover:scale-105 transition-transform"
          >
            <Heading level={2} className="text-[#0284C7]">
              {stat.value}
            </Heading>
            <span className="text-sm font-bold text-[#1E293B]">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </Section>
  );
};
