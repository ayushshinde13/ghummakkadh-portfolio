import React from "react";
import { Card, Heading, Badge } from "@/components/common";
import { City } from "@/types/city";

export const CityCard: React.FC<{ city: City }> = ({ city }) => {
  return (
    <Card className="flex items-center justify-between py-4 px-6">
      <Heading level={4} className="text-[#111827]">
        {city.name}
      </Heading>
      {city.active && <Badge variant="success">Active</Badge>}
    </Card>
  );
};
