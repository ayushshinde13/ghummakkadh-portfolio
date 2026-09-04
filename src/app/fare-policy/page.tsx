"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  IndianRupee,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
} from "lucide-react";

const sections = [
  { id: 1, title: "Transparent Pricing Structure" },
  { id: 2, title: "Dynamic Pricing (Surge Multipliers)" },
  { id: 3, title: "Waiting Charges & Tolls" },
  { id: 4, title: "Cancellation Policies & Thresholds" },
  { id: 5, title: "Refund Guidelines & Bank Timelines" },
  { id: 6, title: "Contact Billing Support" },
];

export default function FarePolicyPage() {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }

      for (let i = sections.length; i >= 1; i--) {
        const el = document.getElementById(`section-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: number) => {
    setActiveSection(id);
    setMobileOpen(false);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toString() === searchQuery.trim()
      )
    : sections;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0E1A] pt-28 pb-24 font-sans text-slate-700 dark:text-zinc-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-6 group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Title Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 text-[#7ED321] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="p-1.5 rounded-md bg-[#7ED321]/10 border border-[#7ED321]/20 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </span>
            Pricing &amp; Cancellation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Fare, Cancellation &amp; Refund Policy
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • 100% Transparent Pricing Guarantee
          </p>
        </div>

        {/* Mobile Collapsible Table of Contents (< lg) */}
        <div className="lg:hidden mb-8 bg-white dark:bg-[#0F1626]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xl transition-colors duration-300">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between text-left"
            aria-expanded={mobileOpen}
          >
            <div className="flex items-center gap-2.5">
              <ListOrdered className="w-4 h-4 text-[#7ED321]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Table of Contents</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#7ED321]/15 text-[#2d7701] dark:text-[#7ED321] font-semibold">
                Section {activeSection} of {sections.length}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-zinc-400 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileOpen && (
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 max-h-72 overflow-y-auto space-y-1 pr-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
                    activeSection === sec.id
                      ? "bg-[#7ED321]/15 text-[#2d7701] dark:text-[#7ED321] font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                    activeSection === sec.id
                      ? "bg-[#7ED321] text-black font-extrabold"
                      : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-zinc-400"
                  }`}>
                    {sec.id}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left Column: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8.5rem)]">
            <div className="bg-white dark:bg-[#0F1626]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xl dark:shadow-2xl flex flex-col max-h-[calc(100vh-8.5rem)] transition-colors duration-300">
              
              {/* Header */}
              <div className="pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-[#7ED321]" />
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Contents</h2>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#7ED321]/15 text-[#2d7701] dark:text-[#7ED321] border border-[#7ED321]/20">
                    {sections.length} Sections
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7ED321] to-[#57E600] rounded-full transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">
                  <span>Reading progress</span>
                  <span>{Math.round(readingProgress)}%</span>
                </div>

                {/* Quick Search */}
                <div className="relative mt-3">
                  <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#7ED321]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Navigation List */}
              <nav className="flex-1 overflow-y-auto mt-3 pr-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {filteredSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-[#7ED321]/15 text-[#2d7701] dark:text-[#7ED321] font-bold border-l-2 border-[#7ED321]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#7ED321] text-black font-black"
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900 dark:bg-white/10 dark:text-zinc-400 dark:group-hover:bg-white/20 dark:group-hover:text-white"
                        }`}>
                          {sec.id}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive ? "text-[#7ED321] translate-x-0.5" : "text-slate-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100"
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Footer Assistance */}
              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/10 text-center">
                <a 
                  href="mailto:support@hindustaan.in"
                  className="text-[11px] text-slate-500 hover:text-[#2d7701] dark:text-zinc-400 dark:hover:text-[#7ED321] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>Billing questions?</span>
                </a>
              </div>

            </div>
          </aside>

          {/* Right Column: Actual Content */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="policy-card bg-white dark:bg-[#131B2E] rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 dark:text-zinc-300 space-y-12 shadow-xl dark:shadow-2xl border border-slate-200/80 dark:border-white/10 leading-relaxed">

              {/* Section 1 */}
              <section id="section-1" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">1.</span> Transparent Pricing Structure
                </h2>
                <p className="mb-3">
                  At <strong className="text-slate-900">Ghumakkadh</strong>, we are committed to complete fare transparency with zero surprise surcharges. Fares are computed via our automated pricing engine before you confirm any ride or parcel dispatch:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-slate-900 block text-sm">Base Fare:</strong>
                    <p className="text-slate-600">The fixed starting rate charged upon vehicle dispatch, varying by vehicle category (Bike Taxi, Auto-rickshaw, Cab Economy, Sedan, or SUV).</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-slate-900 block text-sm">Distance Rate (Per Km):</strong>
                    <p className="text-slate-600">Calculated on the actual GPS road distance traveled from pickup to drop-off coordinates.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-slate-900 block text-sm">Time Fare (Per Minute):</strong>
                    <p className="text-slate-600">A nominal duration fee to compensate driver partners for navigating heavy traffic and slow city transit.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-slate-900 block text-sm">Taxes &amp; Platform Fees:</strong>
                    <p className="text-slate-600">Includes applicable government Goods and Services Tax (GST) and standard electronic facilitation platform charges.</p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">2.</span> Dynamic Pricing (Surge Multipliers)
                </h2>
                <p className="mb-3">
                  During peak commuting hours, heavy rainfall, festive rushes, or localized driver shortages, dynamic pricing multipliers may automatically apply.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm font-medium">
                  <li>Dynamic surge is always disclosed upfront in the fare estimate before you hit &quot;Book Ride&quot;.</li>
                  <li>Surge incentives directly encourage more driver partners to come online in high-demand zones.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="section-3" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">3.</span> Waiting Charges &amp; Tolls
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                  <li><strong>Complimentary Waiting Time:</strong> Riders receive <strong className="text-slate-800">3 free minutes</strong> of waiting time once the driver reaches the pickup coordinates.</li>
                  <li><strong>Waiting Fee:</strong> Beyond 3 minutes, a nominal waiting rate (e.g. ₹1.5 to ₹2 per minute) is charged to compensate the driver for fuel and idle time.</li>
                  <li><strong>Toll &amp; Parking Charges:</strong> Highway express tolls, airport entry fees, and municipal parking fees incurred during the ride are added to the final invoice.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="section-4" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">4.</span> Cancellation Policies &amp; Thresholds
                </h2>
                <p className="mb-3">
                  To balance rider convenience and driver fairness, cancellations are evaluated according to the following rules:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <strong className="text-emerald-900 block">Free Cancellation Window:</strong>
                    <p className="text-xs text-emerald-800 mt-0.5">You can cancel your booking without any penalty within the first 3 minutes of a driver accepting your trip request.</p>
                  </div>
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <strong className="text-amber-900 block">Standard Cancellation Fee:</strong>
                    <p className="text-xs text-amber-800 mt-0.5">If you cancel after 3 minutes or after the driver has arrived at the pickup location, a standard cancellation fee (₹20 to ₹50 depending on vehicle class) is charged and transferred to the driver to offset their fuel cost.</p>
                  </div>
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                    <strong className="text-blue-900 block">Driver-Caused Cancellations:</strong>
                    <p className="text-xs text-blue-800 mt-0.5">If the driver partner fails to make forward progress, drives in the opposite direction, or arrives excessively late, you will NOT be charged any fee upon cancellation.</p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="section-5" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">5.</span> Refund Guidelines &amp; Bank Timelines
                </h2>
                <p className="mb-3">
                  If an erroneous cancellation fee was charged, a trip was terminated prematurely due to mechanical breakdown, or a double deduction occurred:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Automatic Dispute Review:</strong> You can dispute any trip charge directly within the app ride history screen within 48 hours.</li>
                  <li><strong>Source Refund Execution:</strong> Approved refunds for online transactions (UPI, Credit/Debit cards, NetBanking processed via <strong className="text-slate-900">Razorpay</strong>) are automatically credited back to your original source payment method.</li>
                  <li><strong>Banking Credit Timelines:</strong> Refunds generally reflect in your bank account within <strong className="text-slate-800">5–7 business days</strong> depending on your issuing bank network.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="section-6" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">6.</span> Contact Billing Support
                </h2>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                  <p><strong className="text-slate-900">Billing Team:</strong> Ghumakkadh Fare &amp; Refund Desk</p>
                  <p><strong className="text-slate-900">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
                  <p><strong className="text-slate-900">Phone:</strong> <a href="tel:0771-299-4005" className="text-blue-600 font-bold hover:underline">0771-299-4005</a></p>
                  <p><strong className="text-slate-900">Corporate Address:</strong> Hindustaan Innovations Pvt. Ltd., CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001, India</p>
                </div>
              </section>

              {/* Bottom Card */}
              <div className="p-4 bg-[#7ED321]/10 rounded-2xl border border-[#7ED321]/30 text-slate-800 text-sm font-semibold text-center">
                Ghumakkadh guarantees fair, honest, and transparent fares on every journey.
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
