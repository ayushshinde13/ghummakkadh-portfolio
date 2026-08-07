import React from "react";
import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-12 border-t border-white/10">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-2xl font-bold">
            Ghum<span className="text-[#F8D84E]">mak</span>
            <span className="text-[#7DD3FC]">kad</span>
          </span>
          <p className="text-sm text-gray-400 mt-1">{siteConfig.description}</p>
        </div>
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};
