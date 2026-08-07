import React from "react";
import { Card, Heading, Badge } from "@/components/common";

export const DriverCard: React.FC = () => {
  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      <Badge variant="primary" className="self-start">
        Drive With Us
      </Badge>
      <Heading level={3} className="text-white">
        Earn on Your Own Schedule
      </Heading>
      <p className="text-sm text-gray-300">
        Join thousands of verified Ghumakkadh partners earning daily with flexible hours and instant payouts.
      </p>
    </Card>
  );
};
