import React from "react";
import { Card, Heading, Icon } from "@/components/common";
import { Feature } from "@/types/feature";

export const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  return (
    <Card className="flex flex-col gap-4 items-start hover:-translate-y-1 transition-transform duration-300">
      <Icon name={feature.icon} size="lg" />
      <Heading level={3} className="text-[#111827]">
        {feature.title}
      </Heading>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </Card>
  );
};

