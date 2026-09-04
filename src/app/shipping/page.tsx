"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  AlertOctagon,
  Truck,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
} from "lucide-react";

const sections = [
  { id: 1, title: "Introduction to Ghumakkadh Parcel" },
  { id: 2, title: "Service Categories & Cargo Thresholds" },
  { id: 3, title: "Strictly Prohibited & Banned Items" },
  { id: 4, title: "Sender Packaging Obligations" },
  { id: 5, title: "Pickup, Tracking & Delivery Verification" },
  { id: 6, title: "Undelivered Shipments & RTO" },
  { id: 7, title: "Driver Partner's Right to Inspect & Decline" },
  { id: 8, title: "Transit Insurance & Liability Limits" },
  { id: 9, title: "Contact & Parcel Support" },
];

export default function ShippingPolicyPage() {
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
              <Package className="w-4 h-4" />
            </span>
            Logistics &amp; Courier Rules
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Parcel Shipping &amp; Logistics Policy
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • Guidelines for Senders, Drivers &amp; Recipients
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
                  <span>Parcel support?</span>
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
                  <span className="text-[#7ED321]">1.</span> Introduction to Ghumakkadh Parcel
                </h2>
                <p className="mb-3">
                  <strong className="text-slate-900">Ghumakkadh Parcel</strong> is an on-demand, intra-city express logistics service provided by <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong> connecting package senders with independent driver partners for the rapid point-to-point delivery of personal items, business documents, packages, and merchandise across supported Indian cities.
                </p>
                <p>
                  This Parcel Shipping Policy outlines permissible goods, weight and size limitations, sender packaging obligations, pickup/handover verification protocols, transit insurance, and strictly prohibited contraband.
                </p>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">2.</span> Service Categories &amp; Cargo Thresholds
                </h2>
                <p className="mb-4">
                  To ensure rider safety, vehicle stability, and legal compliance on Indian roadways, shipments must fit within the physical boundaries of the selected vehicle category:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-1">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      Two-Wheeler Bike Parcel (Express)
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 mt-2 font-medium">
                      <li><strong>Maximum Weight:</strong> 10 kg total.</li>
                      <li><strong>Maximum Dimensions:</strong> 40 cm x 40 cm x 40 cm (must fit safely in delivery backpack or rear footboard without obstructing rider vision or balance).</li>
                      <li><strong>Ideal For:</strong> Documents, keys, medicines, apparel, books, small electronic accessories, and non-perishable goods.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      Four-Wheeler Cab / Cargo Parcel
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 mt-2 font-medium">
                      <li><strong>Maximum Weight:</strong> Up to 100 kg total.</li>
                      <li><strong>Maximum Volume:</strong> Must fit comfortably inside the vehicle&apos;s boot / trunk or rear seating compartment.</li>
                      <li><strong>Ideal For:</strong> Bulk retail cartons, multiple packages, large gifts, home essentials, and corporate supplies.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section-3" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2 text-red-600">
                  <AlertOctagon className="w-6 h-6 text-red-600 shrink-0" />
                  <span>3. Strictly Prohibited &amp; Banned Items</span>
                </h2>
                <p className="mb-4">
                  Under Indian law and Ghumakkadh safety regulations, sending any of the following items is <strong className="text-red-700">strictly forbidden</strong>. Attempting to ship prohibited items will result in immediate shipment confiscation, permanent account blacklisting, and reporting to police authorities:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Explosives &amp; Flammable Substances</strong>
                    <p className="text-red-800">Fireworks, firecrackers, ammunition, petrol, diesel, kerosene, LPG gas cylinders, butane cans, matches, and highly flammable chemical solvents.</p>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Illegal Drugs &amp; Narcotics</strong>
                    <p className="text-red-800">Any substance banned under the NDPS Act 1985 (Cannabis, THC, cocaine, heroin, opium, psychotropic drugs, unauthorized prescription opioids).</p>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Weapons &amp; Dangerous Implements</strong>
                    <p className="text-red-800">Firearms, unlicensed handguns, airguns, switchblade knives, swords, daggers, tactical weapons, and military-grade hardware.</p>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Currency, Bullion &amp; Precious Metals</strong>
                    <p className="text-red-800">Physical currency notes, coins, bearer bonds, bank cheques, raw gold/silver bullion, loose diamonds, and uncertified precious jewelry.</p>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Toxic, Corrosive &amp; Biohazard Materials</strong>
                    <p className="text-red-800">Hydrochloric/sulfuric acids, toxic pesticides, radioactive elements, infectious clinical waste, biological specimens, or corpses.</p>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                    <strong className="text-red-900 block text-sm">Live Animals &amp; Wildlife Products</strong>
                    <p className="text-red-800">Live pets, livestock, birds, reptiles, insects, animal carcasses, ivory, protected wildlife trophies, and endangered plants.</p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="section-4" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">4.</span> Sender Packaging Obligations
                </h2>
                <p className="mb-3">
                  Senders are strictly responsible for properly packaging, sealing, and labeling all parcels before the driver partner arrives for pickup:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Secure Sealing:</strong> All items must be packed in sturdy cardboard boxes, padded envelopes, or sealed tamper-evident bags with tape.</li>
                  <li><strong>Fragile Items:</strong> Glassware, ceramics, or delicate electronics must be cushioned with adequate bubble wrap or styrofoam padding. Senders must explicitly mark &quot;FRAGILE&quot; on the exterior.</li>
                  <li><strong>Liquid Containers:</strong> Liquids or oils must be enclosed in leak-proof, double-sealed containers.</li>
                  <li><strong>Clear Destination Label:</strong> Senders should clearly write the Recipient&apos;s Name and Contact Number on the parcel exterior.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="section-5" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">5.</span> Pickup, In-Transit Tracking &amp; Delivery Verification
                </h2>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                    <strong className="text-slate-900 block">Step 1: Pickup OTP Handover</strong>
                    <p className="text-xs text-slate-600 mt-0.5">The driver partner will verify the physical package condition and confirm pickup by requesting the 4-digit Pickup OTP from the sender.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                    <strong className="text-slate-900 block">Step 2: Real-Time GPS Tracking</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Both the sender and recipient receive a live tracking link via SMS/WhatsApp to monitor the courier partner&apos;s real-time transit location.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                    <strong className="text-slate-900 block">Step 3: Delivery OTP Handover</strong>
                    <p className="text-xs text-slate-600 mt-0.5">To complete the delivery, the recipient must provide the secure 4-digit Delivery OTP sent to their mobile number before receiving the parcel.</p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="section-6" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">6.</span> Undelivered Shipments &amp; Return-to-Origin (RTO)
                </h2>
                <p className="mb-3">
                  A delivery may fail if the recipient is unreachable, refuses acceptance, or if the destination address is inaccurate:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Waiting Protocol:</strong> The driver partner will attempt to contact the recipient for up to 10 minutes at the destination coordinates.</li>
                  <li><strong>Return Trip:</strong> If the recipient remains unreachable, the package will be returned to the sender&apos;s pickup coordinates.</li>
                  <li><strong>RTO Return Charges:</strong> Senders agree that standard return distance fares will be charged to compensate the driver partner for the return journey.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="section-7" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">7.</span> Driver Partner&apos;s Right to Inspect &amp; Decline
                </h2>
                <p className="mb-3">
                  For their personal safety and legal compliance, Driver Partners possess the unequivocal right to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li>Inspect the package exterior, weight, and sealing integrity in the sender&apos;s presence prior to accepting the pickup OTP.</li>
                  <li>Decline pickup if the cargo is unsealed, leaking, emits a pungent chemical odor, exceeds safe weight bounds, or appears suspicious.</li>
                  <li>Hand over suspicious or illegal packages directly to the nearest police station without liability.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="section-8" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">8.</span> Transit Insurance &amp; Liability Limits
                </h2>
                <p className="mb-3">
                  Ghumakkadh provides complimentary transit protection for eligible standard intra-city shipments:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Coverage Limit:</strong> Up to a maximum of <strong className="text-slate-900">₹5,000</strong> per verified shipment in the event of accidental loss or physical damage occurring directly during transit.</li>
                  <li><strong>Exclusions:</strong> Coverage does NOT apply to unverified cash, fragile items sent without proper cushioning, perishable foodstuffs, or shipments involving prohibited goods.</li>
                  <li><strong>Claims Protocol:</strong> Claims must be formally submitted through Customer Support within <strong className="text-slate-900">24 hours</strong> of trip completion, accompanied by original purchase invoices, packaging photos, and booking IDs.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="section-9" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">9.</span> Contact &amp; Parcel Support
                </h2>
                <p className="mb-3">For parcel status inquiries, lost package claims, or corporate logistics partnerships, contact us:</p>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                  <p><strong className="text-slate-900">Logistics Division:</strong> Ghumakkadh Parcel Helpdesk</p>
                  <p><strong className="text-slate-900">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
                  <p><strong className="text-slate-900">Helpline:</strong> <a href="tel:0771-299-4005" className="text-blue-600 font-bold hover:underline">0771-299-4005</a> (9:30 AM – 7:30 PM)</p>
                  <p><strong className="text-slate-900">Operating Entity:</strong> Hindustaan Innovations Pvt. Ltd., Raipur (C.G.) - 492001, India</p>
                </div>
              </section>

              {/* Bottom Card */}
              <div className="p-4 bg-[#7ED321]/10 rounded-2xl border border-[#7ED321]/30 text-slate-800 text-sm font-semibold text-center">
                By dispatching a parcel on Ghumakkadh, you certify that your shipment complies fully with this Shipping Policy and Indian Law.
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
