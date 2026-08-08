import React from "react";
import { Container } from "@/components/common";
import { SectionHeading } from "@/components/ui";
import { CityCard } from "@/components/city";
import { CITIES } from "@/constants/cities";

export const CitiesSection: React.FC = () => {
  return (
    <section id="cities" className="bg-[#F8F9FA] pt-8 lg:pt-10">
      <Container>
        <SectionHeading
          badge="Network"
          title="We Are Present in Your City"
          subtitle="Providing service across India."
          className="!mb-0"
        />
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {CITIES.map((city) => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>
      </Container>
    </section>
  );
};
