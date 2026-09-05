import React from "react";
import { Globe, ArrowRight } from "lucide-react";

export const CompanyBehindSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF7F2] dark:bg-[#0B0F19] pt-4 pb-16 md:pt-6 md:pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-[1px] w-6 bg-slate-300 dark:bg-gray-700"></span>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-gray-400">
            BUILT BY
          </span>
          <span className="h-[1px] w-6 bg-slate-300 dark:bg-gray-700"></span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight mb-4 font-serif">
          The company behind Ghumakkadh
        </h2>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base text-center max-w-2xl mx-auto leading-relaxed mb-12">
          Ghumakkadh is proudly designed, developed, and maintained by{" "}
          <strong className="text-slate-900 dark:text-white font-semibold">
            Hindustaan Innovations Private Limited
          </strong>{" "}
          — a product studio building digital infrastructure for Hindustan.
        </p>

        {/* Main Floating Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#131927] rounded-[28px] p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-white/10">
          
          {/* Card Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* 'h' Logo Icon */}
              <img
                src="/images/hindustaan.png"
                alt="Hindustaan Innovations Logo"
                className="w-10 sm:w-12 h-auto shrink-0 object-contain brightness-0 dark:brightness-100"
              />

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Hindustaan Innovations Private Limited
                </h3>
                <p className="text-xs text-slate-400 dark:text-gray-400 font-medium mt-0.5">
                  Precision · Products · Progress
                </p>
              </div>
            </div>

            {/* Visit Website Button */}
            <a
              href="https://hindustaan.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm shrink-0"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Visit hindustaan.in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Description */}
          <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            Hindustaan Innovations Private Limited is a technology-first product studio rooted in India, focused on solving real-world problems for Hindustan's growing digital economy. From hyperlocal marketplaces to civic-tech platforms, we build products that matter — for the next 500 million internet users.
          </p>

          {/* 4 Stat Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#F8F9FA] dark:bg-[#0B0F19] rounded-2xl p-4 text-center border border-slate-100 dark:border-white/5">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2026</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-gray-400 tracking-wider uppercase mt-1">FOUNDED</p>
            </div>

            <div className="bg-[#F8F9FA] dark:bg-[#0B0F19] rounded-2xl p-4 text-center border border-slate-100 dark:border-white/5">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Hindustan-first</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-gray-400 tracking-wider uppercase mt-1">FOCUS</p>
            </div>

            <div className="bg-[#F8F9FA] dark:bg-[#0B0F19] rounded-2xl p-4 text-center border border-slate-100 dark:border-white/5">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Ghumakkadh</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-gray-400 tracking-wider uppercase mt-1">PRODUCTS</p>
            </div>

            <div className="bg-[#F8F9FA] dark:bg-[#0B0F19] rounded-2xl p-4 text-center border border-slate-100 dark:border-white/5">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Raipur, CG</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-gray-400 tracking-wider uppercase mt-1">HQ</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
