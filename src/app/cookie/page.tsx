"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
  Lock,
  Sliders,
  Smartphone,
  Database,
} from "lucide-react";

const sections = [
  { id: 1, title: "Overview & Introduction" },
  { id: 2, title: "What Are Cookies & Local Storage?" },
  { id: 3, title: "Categories of Technologies Deployed" },
  { id: 4, title: "What We Do NOT Do" },
  { id: 5, title: "Managing Preferences & Permissions" },
  { id: 6, title: "Updates to This Policy" },
  { id: 7, title: "Contact Us" },
];

export default function CookiePolicyPage() {
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
              <Cookie className="w-4 h-4" />
            </span>
            Cookies &amp; Local Storage
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Cookie &amp; Tracking Technologies Policy
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • Effective Immediately
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
                  <span>Cookie questions?</span>
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
                  <span className="text-[#7ED321]">1.</span> Overview &amp; Introduction
                </h2>
                <p className="mb-3">
                  This Cookie and Tracking Technologies Policy explains how <strong className="text-slate-900">Ghumakkadh</strong>, operated by <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), utilizes browser cookies, mobile device identifiers, local data storage, and software development kits (SDKs) across our website (<a href="https://ghumakkadh.in" className="text-blue-600 font-semibold hover:underline">ghumakkadh.in</a>) and our native mobile applications.
                </p>
                <p>
                  We believe in complete transparency. This document details why these technologies are deployed, what specific categories of data they handle, and how you can manage or configure your preferences.
                </p>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">2.</span> What Are Cookies, Local Storage &amp; Mobile SDKs?
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1">Web Browser Cookies</h3>
                    <p className="text-sm text-slate-600">
                      Small text files placed on your computer or mobile device by websites you visit. Cookies help identify your browser session, maintain login persistence, and remember site settings.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1">Mobile Local App Storage &amp; Tokens</h3>
                    <p className="text-sm text-slate-600">
                      Native Android and iOS applications do not use traditional HTTP web cookies. Instead, mobile apps utilize encrypted SQLite databases, Keychain/Keystore storage, and SharedPreferences to store authentication tokens (JWT) and cached route configurations locally on your device.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1">Mobile SDKs (Software Development Kits)</h3>
                    <p className="text-sm text-slate-600">
                      Bundles of specialized code integrated into our mobile apps to enable crucial functionality, such as interactive vector maps (Google Maps SDK), payment processing (<strong className="text-slate-900">Razorpay SDK</strong>), and instant trip notifications (Firebase Cloud Messaging).
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section-3" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">3.</span> Categories of Technologies We Deploy
                </h2>
                <p className="mb-4">We categorize our tracking and storage technologies into four distinct functional tiers:</p>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      3.1 Strictly Necessary &amp; Authentication Storage (Essential)
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      These technologies are essential for the operation and security of the Ghumakkadh Platform. Without them, core functions like logging in or booking rides cannot operate:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 font-medium">
                      <li><strong>JWT Auth Tokens:</strong> Storing encrypted session tokens to keep your passenger or driver profile authenticated.</li>
                      <li><strong>CSRF &amp; Security Tokens:</strong> Protecting against cross-site request forgery and malicious API tampering.</li>
                      <li><strong>Active Trip State:</strong> Preserving active ride IDs, driver coordinates, and destination checkpoints during app backgrounding.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      3.2 Functional &amp; Preference Storage
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      These technologies enhance your user experience by remembering your personal settings:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 font-medium">
                      <li><strong>Saved Locations:</strong> Storing frequently used Home, Work, and Favorite destination coordinates.</li>
                      <li><strong>Language &amp; Display:</strong> Remembering language preferences (English, Hindi) and dark/light UI themes.</li>
                      <li><strong>Vehicle Preferences:</strong> Remembering your last selected transit mode (Bike, Auto, Cab).</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                      3.3 Notification &amp; Device Tokens
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      We utilize Google Firebase Cloud Messaging (FCM) device registration tokens:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 font-medium">
                      <li>Delivering instant driver dispatch alerts, arrival OTPs, and ride status updates.</li>
                      <li>Broadcasting critical safety alerts and emergency SOS messages.</li>
                      <li>These tokens identify your device strictly for notification dispatch and do not track web browsing history outside our app.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                      <Database className="w-4 h-4 text-amber-600" />
                      3.4 Performance &amp; Diagnostic Telemetry
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      Technologies that help us diagnose bugs, reduce app crashes, and optimize API speed:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 font-medium">
                      <li>Logging API error stack traces and endpoint latencies to ensure 99.9% platform reliability.</li>
                      <li>Diagnostic crash logs (device architecture, OS build, memory usage during crashes).</li>
                      <li>Aggregated, anonymized trip flow statistics to eliminate bottlenecks.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="section-4" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">4.</span> What We Do NOT Do
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                  <li><strong className="text-slate-900">No Third-Party Advertising Trackers:</strong> We do NOT install invasive third-party ad networks (like Facebook Pixel or ad-retargeting brokers) on our mobile passenger apps.</li>
                  <li><strong className="text-slate-900">No Cross-App Surveillance:</strong> We do NOT track what other mobile apps you open on your smartphone.</li>
                  <li><strong className="text-slate-900">No Sale of Device Identifiers:</strong> We never sell your device tokens, IMEI numbers, or location histories to external commercial entities.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="section-5" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">5.</span> Managing Your Preferences &amp; App Permissions
                </h2>
                <p className="mb-3">
                  You maintain full authority over tracking technologies and permissions on your devices:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Web Browser Cookies:</strong> You can configure your browser (Chrome, Safari, Edge, Firefox) to block, delete, or alert you before cookies are stored.</li>
                  <li><strong>Mobile Location Permissions:</strong> You can toggle location access (Allow only while using app / Never) in your Android or iOS System Settings.</li>
                  <li><strong>Push Notification Permissions:</strong> You can enable or disable notification alerts at any time via device Settings &gt; Apps &gt; Ghumakkadh.</li>
                  <li><strong>App Data Reset:</strong> Clearing the app cache or storage via Android/iOS Settings permanently clears all locally stored preferences and active sessions.</li>
                </ul>
                <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <strong>Please Note:</strong> Disabling essential permissions (such as location or local session storage) will prevent you from booking rides or receiving live driver dispatches.
                </p>
              </section>

              {/* Section 6 */}
              <section id="section-6" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">6.</span> Updates to This Policy
                </h2>
                <p>
                  As we introduce new mobility features or integrate updated mapping and diagnostic SDKs, we may update this Cookie Policy. Material modifications will be accompanied by an updated &quot;Last Updated&quot; date and posted on our website.
                </p>
              </section>

              {/* Section 7 */}
              <section id="section-7" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">7.</span> Contact Us
                </h2>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                  <p><strong className="text-slate-900">Entity:</strong> Hindustaan Innovations Pvt. Ltd.</p>
                  <p><strong className="text-slate-900">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
                  <p><strong className="text-slate-900">Helpline:</strong> <a href="tel:0771-299-4005" className="text-blue-600 font-bold hover:underline">0771-299-4005</a></p>
                  <p><strong className="text-slate-900">Address:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001, India</p>
                </div>
              </section>

              {/* Bottom Card */}
              <div className="p-4 bg-[#7ED321]/10 rounded-2xl border border-[#7ED321]/30 text-slate-800 text-sm font-semibold text-center">
                By using Ghumakkadh, you consent to our use of local storage and tracking technologies as described in this policy.
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
