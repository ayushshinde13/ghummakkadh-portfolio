import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  ShieldCheck,
  Smartphone,
  Sliders,
  Database,
  Lock,
  Mail,
  Building,
} from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] pt-32 pb-24 font-sans text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group text-sm font-medium"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Cookie &amp; Tracking Technologies Policy
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • Effective Immediately
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 space-y-10 shadow-2xl border border-slate-100 leading-relaxed">

          {/* Section 1 */}
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">6.</span> Updates to This Policy
            </h2>
            <p>
              As we introduce new mobility features or integrate updated mapping and diagnostic SDKs, we may update this Cookie Policy. Material modifications will be accompanied by an updated &quot;Last Updated&quot; date and posted on our website.
            </p>
          </section>

          {/* Section 7 */}
          <section>
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
    </main>
  );
}
