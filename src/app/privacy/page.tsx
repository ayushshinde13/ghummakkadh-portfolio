import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  MapPin,
  Smartphone,
  CreditCard,
  Bell,
  Trash2,
  FileText,
  Building,
  Mail,
  Phone,
  Scale,
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-4 h-4" />
            </span>
            Privacy &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Privacy Policy
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">12.</span> Children&apos;s Privacy
            </h2>
            <p>
              Ghumakkadh services are strictly intended for individuals aged 18 and above. We do not knowingly collect personal data from minors. If we discover that a minor under 18 has created an independent account, we will immediately terminate the profile and erase all associated records.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">13.</span> Policy Updates &amp; Notifications
            </h2>
            <p>
              We may revise this Privacy Policy periodically to accommodate new features, security protocols, or legislative updates. Whenever material revisions occur, we will notify you through in-app notifications or email and update the &quot;Last Updated&quot; date at the top of this document. Continued use of Ghumakkadh after changes take effect constitutes acceptance.
            </p>
          </section>

          {/* Section 14 */}
          <section>
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
    </main>
  );
}
