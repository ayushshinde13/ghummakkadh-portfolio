import React from "react";
import { Container } from "@/components/common";
import { SectionHeading } from "@/components/ui";
import { CityCard } from "@/components/city";
import { CITIES } from "@/constants/cities";

export const CitiesSection: React.FC = () => {
  return (
    <section id="cities" className="bg-[#F8F9FA] pt-8 lg:pt-10 pb-6 lg:pb-8">
      <Container>
        <SectionHeading
          badge="Network"
          title="We Are Present in Your City"
          subtitle="Expanding rapidly across major metro cities in India."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CITIES.map((city) => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>
      </Container>
    </section>
  );
};
