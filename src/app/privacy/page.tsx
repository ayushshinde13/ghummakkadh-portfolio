"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
} from "lucide-react";

const sections = [
  { id: 1, title: "Introduction & Scope" },
  { id: 2, title: "Information We Collect" },
  { id: 3, title: "Payment Details & Security" },
  { id: 4, title: "Communications & Telephony Masking" },
  { id: 5, title: "Technical, Device & Diagnostic Data" },
  { id: 6, title: "How We Use Your Personal Data" },
  { id: 7, title: "How We Share Your Information" },
  { id: 8, title: "Data Security & Architecture" },
  { id: 9, title: "Data Retention & Anonymization" },
  { id: 10, title: "Your Privacy Rights & Choices" },
  { id: 11, title: "Account & Data Deletion" },
  { id: 12, title: "Children's Privacy" },
  { id: 13, title: "Policy Updates & Notifications" },
  { id: 14, title: "Grievance Redressal Officer" },
];

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-4 h-4" />
            </span>
            Privacy &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
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

        {/* 2-Column Layout: Left Sticky Table of Contents, Right Scrollable Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left Column: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8.5rem)]">
            <div className="bg-white dark:bg-[#0F1626]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xl dark:shadow-2xl flex flex-col max-h-[calc(100vh-8.5rem)] transition-colors duration-300">
              
              {/* Header with Title and Section Count */}
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

                {/* Reading Progress Bar */}
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

              {/* Scrollable Navigation List */}
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

              {/* Footer Assistance Badge */}
              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/10 text-center">
                <a 
                  href="mailto:support@hindustaan.in"
                  className="text-[11px] text-slate-500 hover:text-[#2d7701] dark:text-zinc-400 dark:hover:text-[#7ED321] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>Privacy inquiries?</span>
                </a>
              </div>

            </div>
          </aside>

          {/* Right Column: Actual Document Content */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="policy-card bg-white dark:bg-[#131B2E] rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 dark:text-zinc-300 space-y-12 shadow-xl dark:shadow-2xl border border-slate-200/80 dark:border-white/10 leading-relaxed">

              {/* Section 1 */}
              <section id="section-1" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">1.</span> Introduction &amp; Scope
                </h2>
                <p className="mb-3">
                  Welcome to <strong className="text-slate-900">Ghumakkadh</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Ghumakkadh&quot;), a digital mobility and logistics brand owned and operated by <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong>, headquartered in Raipur, Chhattisgarh, India.
                </p>
                <p className="mb-3">
                  We are dedicated to safeguarding the privacy and personal data of every individual who interacts with our platform. This comprehensive Privacy Policy explains our practices regarding the collection, storage, processing, sharing, transfer, retention, and protection of your personal information across our applications and web platform:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Ghumakkadh Passenger &amp; Sender App:</strong> For riders booking point-to-point transit and senders dispatching intra-city parcels.</li>
                  <li><strong>Ghumakkadh Driver / Captain App:</strong> For commercial driver partners and vehicle fleet owners providing transportation and courier services.</li>
                  <li><strong>Ghumakkadh Web Platform (<a href="https://ghumakkadh.in" className="text-blue-600 font-semibold hover:underline">ghumakkadh.in</a>):</strong> For account support, service information, and customer assistance.</li>
                </ul>
                <p>
                  By accessing, downloading, or using any component of the Ghumakkadh Platform, you acknowledge that you have read and understood this Privacy Policy and agree to our processing of your information as described herein.
                </p>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">2.</span> Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information necessary to connect passengers with drivers, calculate accurate fares, route intra-city parcels, maintain continuous passenger safety, and fulfill our statutory legal requirements under Indian law.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">2.1 Identity &amp; Contact Data</h3>
                    <p className="text-sm text-slate-600 mb-2">When you register an account, book rides, or onboard as a partner, we collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Full legal name, profile avatar/photograph;</li>
                      <li>Mobile phone number and email address;</li>
                      <li>Saved addresses (e.g. Home, Work, Frequent destinations);</li>
                      <li>Trusted Emergency Contacts (names and phone numbers for SOS alerts).</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">2.2 Driver Partner KYC &amp; Fleet Verification Data</h3>
                    <p className="text-sm text-slate-600 mb-2">For commercial driver partners, compliance with the Motor Vehicles Act, 1988 requires collecting:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Commercial Driving License (DL) details, category, and expiry date;</li>
                      <li>Vehicle Registration Certificate (RC), commercial permits, and fitness certificates;</li>
                      <li>Vehicle insurance policy documents and Pollution Under Control (PUC) certificates;</li>
                      <li>Government-issued identity cards (Aadhaar Card, PAN Card, Voter ID);</li>
                      <li>Police background verification certificates and live facial KYC selfies.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">2.3 Real-Time Geolocation &amp; Route Telemetry</h3>
                    <p className="text-sm text-slate-600 mb-2">Location data is vital for ride-hailing and parcel logistics:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>For Passengers &amp; Senders:</strong> High-accuracy GPS coordinates collected while the app is active in the foreground to detect exact pickup pins, match nearest drivers, display live vehicle approach, and share trip progress with emergency contacts.</li>
                      <li><strong>For Driver Partners:</strong> Continuous high-precision GPS tracking (both in foreground and background while marked &quot;Online&quot;) to broadcast location to nearby riders, compute route distances, log waiting times, and calculate earnings.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">2.4 Trip, Transaction &amp; Parcel Data</h3>
                    <p className="text-sm text-slate-600 mb-2">For every booking, we automatically generate and record:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Pickup coordinates, destination coordinates, and intermediate stops;</li>
                      <li>Trip timestamps, route polylines, duration, average speed, and distance traveled;</li>
                      <li>Selected vehicle category (Bike, Auto, Cab Economy, Sedan, SUV);</li>
                      <li>Parcel package description, sender and recipient details, declared cargo weight;</li>
                      <li>Trip fare breakdown (Base rate, distance fee, time charge, dynamic surge, waiting fees, tolls, and GST).</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section-3" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">3.</span> Payment Details &amp; Financial Security
                </h2>
                <p className="mb-3">
                  All digital payment transactions on Ghumakkadh are processed through RBI-authorized payment aggregators and gateways, including <strong className="text-slate-900">Razorpay</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Zero Sensitive Storage:</strong> Ghumakkadh does NOT store complete credit/debit card numbers, CVVs, card PINs, or UPI security pins on internal servers.</li>
                  <li><strong>Payment Tokens:</strong> We retain secure tokenized transaction IDs, payment statuses (Success, Pending, Failed), payment method types (UPI, Card, Wallet, Cash), and invoice numbers for accounting and dispute resolution.</li>
                  <li><strong>Driver Settlement Accounts:</strong> For driver partners, we securely store bank account numbers, IFSC codes, and verified UPI IDs to process automated weekly and daily earnings payouts.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="section-4" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">4.</span> Communications &amp; Telephony Masking
                </h2>
                <p className="mb-3">
                  To protect the personal contact information of both passengers and drivers:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Encrypted Number Masking:</strong> When a rider calls a driver (or vice versa) through the app, phone calls are routed through a virtual telecom masking service. Neither party sees the other&apos;s personal mobile number.</li>
                  <li><strong>Chat Transcripts:</strong> In-app text chats between riders and drivers during an active trip are recorded and stored for quality assurance, dispute resolution, and harassment investigations.</li>
                  <li><strong>Transactional Notifications:</strong> We send essential OTPs, driver arrival alerts, trip receipts, and safety notifications via SMS, Push Notifications, and WhatsApp.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="section-5" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">5.</span> Technical, Device &amp; Diagnostic Data
                </h2>
                <p className="mb-2">When you access our platform, our servers automatically log technical metadata, including:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li>IP address, network provider, and connection type (Wi-Fi/4G/5G);</li>
                  <li>Device model, manufacturer, hardware specifications, and OS version;</li>
                  <li>Unique device tokens for Firebase Cloud Messaging (FCM) push notifications;</li>
                  <li>App crash logs, performance diagnostics, and API response latencies to troubleshoot system failures.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="section-6" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">6.</span> How We Use Your Personal Data
                </h2>
                <p className="mb-3">We process personal information only for legitimate, transparent purposes:</p>
                <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
                  <li><strong>Core Mobility &amp; Logistics Services:</strong> Dispatching drivers, calculating optimal routes, managing parcel delivery chains, processing fares, and issuing tax invoices.</li>
                  <li><strong>Passenger &amp; Driver Safety:</strong> Verifying start-trip OTPs, monitoring SOS emergency signals, dispatching live coordinates to emergency contacts, and investigating safety incidents.</li>
                  <li><strong>Customer Support &amp; Dispute Resolution:</strong> Resolving fare discrepancies, lost-and-found items, cancellation reviews, and refund disbursements.</li>
                  <li><strong>Fraud Prevention &amp; Security:</strong> Detecting GPS spoofing, automated bot scripts, fake accounts, promotional voucher abuse, and compromised devices.</li>
                  <li><strong>Legal &amp; Regulatory Compliance:</strong> Complying with transport aggregator rules, taxation mandates (GST), and lawful orders issued by Indian courts or law enforcement.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="section-7" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">7.</span> How We Share Your Information
                </h2>
                <p className="mb-3">
                  <strong className="text-slate-900">We do NOT sell, rent, or trade your personal data to third-party data brokers.</strong> We share data only with the following authorized entities:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-sm">Between Riders and Drivers:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">During an active trip, riders see the driver&apos;s name, photo, vehicle make/model, license plate number, rating, and live GPS location. Drivers see the rider&apos;s first name, pickup coordinates, drop coordinates, and parcel delivery instructions.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-sm">Emergency Services &amp; Contacts:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">If the in-app SOS button is triggered, live vehicle location, route coordinates, driver details, and passenger information are transmitted to local police (112) and saved emergency contacts.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-sm">Authorized Technology Partners:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Mapping infrastructure (Google Maps API), payment processing (<strong className="text-slate-900">Razorpay</strong>), cloud hosting, telecom masking, and SMS gateway providers under strict non-disclosure obligations.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-sm">Law Enforcement &amp; Legal Authorities:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">When formally required by Indian statutory authorities, court orders, or Section 91 CrPC notices during criminal investigations or accident inquiries.</p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="section-8" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">8.</span> Data Security &amp; Storage Architecture
                </h2>
                <p className="mb-3">
                  We implement enterprise-grade technical and organizational measures to safeguard personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Data in Transit:</strong> 256-bit TLS/SSL encryption for all data flowing between mobile applications and our backend servers.</li>
                  <li><strong>Data at Rest:</strong> AES-256 encrypted databases with secure credential vaulting and isolated VPC network architecture.</li>
                  <li><strong>Access Controls:</strong> Multi-factor authentication (MFA) and strict role-based access control (RBAC) restricting customer data access to authorized personnel.</li>
                  <li><strong>Indian Cloud Servers:</strong> Data is hosted primarily in secure data center regions located within the Republic of India.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="section-9" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">9.</span> Data Retention &amp; Anonymization
                </h2>
                <p className="mb-3">
                  We retain personal data for as long as your account remains active or as required to fulfill the purposes set forth in this policy.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Trip &amp; Invoice Records:</strong> Stored for a minimum of 7 years in compliance with the Goods and Services Tax (GST) Act and Indian accounting laws.</li>
                  <li><strong>Driver Partner KYC Files:</strong> Retained during the partnership tenure and up to 3 years following deactivation for regulatory inspection.</li>
                  <li><strong>Anonymized Telemetry:</strong> Technical logs stripped of personal identifiers may be stored indefinitely for traffic modeling and AI platform optimization.</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section id="section-10" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">10.</span> Your Privacy Rights &amp; Choices
                </h2>
                <p className="mb-2">Under applicable Indian data protection frameworks, you hold the following rights:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
                  <li><strong>Access &amp; Review:</strong> View your profile, ride receipts, transaction history, and saved addresses in the app.</li>
                  <li><strong>Correction:</strong> Update personal contact information directly through profile settings.</li>
                  <li><strong>Revoke Permissions:</strong> Disable location permissions or push notifications via your mobile device OS settings (note that disabling location disables ride booking).</li>
                  <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from promotional WhatsApp and SMS broadcasts by following opt-out links.</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="section-11" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">11.</span> Account &amp; Data Deletion
                </h2>
                <p className="mb-3">
                  Users and driver partners may request permanent deletion of their account and associated personal data at any time through our dedicated <Link href="/delete-account" className="text-blue-600 font-bold hover:underline">Delete Account</Link> page or by emailing our privacy team.
                </p>
                <p>
                  Upon receiving a valid request, we permanently purge or anonymize your personal records within 30 days, retaining only those transaction and tax logs required by statutory law.
                </p>
              </section>

              {/* Section 12 */}
              <section id="section-12" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">12.</span> Children&apos;s Privacy
                </h2>
                <p>
                  Ghumakkadh services are strictly intended for individuals aged 18 and above. We do not knowingly collect personal data from minors. If we discover that a minor under 18 has created an independent account, we will immediately terminate the profile and erase all associated records.
                </p>
              </section>

              {/* Section 13 */}
              <section id="section-13" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">13.</span> Policy Updates &amp; Notifications
                </h2>
                <p>
                  We may revise this Privacy Policy periodically to accommodate new features, security protocols, or legislative updates. Whenever material revisions occur, we will notify you through in-app notifications or email and update the &quot;Last Updated&quot; date at the top of this document. Continued use of Ghumakkadh after changes take effect constitutes acceptance.
                </p>
              </section>

              {/* Section 14 */}
              <section id="section-14" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-[#7ED321]">14.</span> Grievance Redressal Officer
                </h2>
                <p className="mb-3">
                  In accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Grievance Redressal Officer for Ghumakkadh is:
                </p>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                  <p><strong className="text-slate-900">Designation:</strong> Data Protection &amp; Grievance Redressal Officer</p>
                  <p><strong className="text-slate-900">Legal Entity:</strong> Hindustaan Innovations Pvt. Ltd.</p>
                  <p><strong className="text-slate-900">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
                  <p><strong className="text-slate-900">Helpline:</strong> <a href="tel:0771-299-4005" className="text-blue-600 font-bold hover:underline">0771-299-4005</a></p>
                  <p><strong className="text-slate-900">Headquarters:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001, Chhattisgarh, India</p>
                </div>
              </section>

              {/* Bottom Card */}
              <div className="p-4 bg-[#7ED321]/10 rounded-2xl border border-[#7ED321]/30 text-slate-800 text-sm font-semibold text-center">
                By using Ghumakkadh, you confirm that you have read and agreed to this Privacy Policy.
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
