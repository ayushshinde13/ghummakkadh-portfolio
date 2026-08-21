import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-zinc-400 text-lg">Last updated: August 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">

          
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">1. Introduction</h2>
            <p>Your privacy is important to us. This Privacy Policy outlines how Ghumakkadh collects, uses, and safeguards your data across the Rider app, the Partner (driver) app, and our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">2. Information We Collect</h2>
            <p>We collect information to provide you better services, including your name, mobile number, email, and profile photo when you sign up. Riders can also save home, work, and other addresses, along with trusted emergency contacts for safety features. Partners go through a verification process that requires a driving license, vehicle registration certificate, insurance details, a government ID, and a live photo for KYC approval.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">3. Location Data</h2>
            <p>We collect location data to enable seamless ride connections — this includes your real-time location while booking, during an active ride, and, for Partners, while online and available to accept rides. Location is used for accurate pickup detection, live tracking, fare calculation, and safety features like SOS and live ride sharing with trusted contacts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">4. Payment Details</h2>
            <p>We also collect payment details, including saved payment methods and UPI IDs for riders, and bank or UPI details for Partner earnings settlement. We use payment gateways to process transactions securely and do not store your full card or bank credentials ourselves.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">5. Ride Data</h2>
            <p>Ride data such as pickup and drop locations, route, distance, duration, and fare is collected for every trip to generate receipts, calculate earnings, and maintain a ride history you can access anytime. We also use OTP-based verification for account login and before every ride starts, to keep your account and trips secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">6. How We Use Your Information</h2>
            <p>Your information helps us match you with the nearest available driver, calculate transparent fares, process payments and refunds, send ride and safety notifications, provide customer support, and improve our services through aggregated, anonymized analytics. We use device and usage data, such as app version and crash logs, only to keep the app running smoothly and to fix issues faster.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">7. Data Sharing & Visibility</h2>
            <p>During an active or upcoming ride, riders and drivers can see limited details about each other — such as name, photo, vehicle number, rating, and live location — to help the trip go smoothly. We share data with trusted service providers where necessary, including mapping services, payment processors, SMS and notification providers, and KYC verification partners, all of whom are bound to protect your information. If you trigger the SOS feature, we share your live location and ride details with your saved emergency contacts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">8. Third-Party Sharing</h2>
            <p>We do not sell your personal data to third parties. We only share information with law enforcement or regulators where required by law, or in connection with a business transaction such as a merger or acquisition, in which case your data continues to be protected under this policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">9. Data Retention</h2>
            <p>We retain your data only as long as necessary — account details for as long as your account is active, KYC documents for Partners as required by law, and ride and payment records for accounting, tax, and dispute-resolution purposes. When data is no longer needed, we securely delete or anonymize it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">10. Data Security</h2>
            <p>We use encryption, role-based access controls, and OTP-based authentication to protect your data, and we restrict access to sensitive information like KYC documents and payment details on a need-to-know basis. While we work hard to keep your data safe, no system is completely secure, so please keep your account credentials and OTPs confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">11. Your Rights & Choices</h2>
            <p>You can request access to, correction of, or deletion of your personal data at any time, subject to legal retention requirements. You can also manage location and notification permissions through your device settings, and opt out of promotional messages while continuing to receive essential transactional alerts like OTPs and ride updates.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">12. Children's Privacy</h2>
            <p>Ghumakkadh is not intended for use by anyone under the age of 18, and we do not knowingly collect data from minors.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">13. Changes to this Policy</h2>
            <p>This Privacy Policy may be updated from time to time to reflect changes in our services or applicable law. We will notify you of any significant changes through the app or via email. Continued use of Ghumakkadh after such updates means you accept the revised policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">14. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how your data is handled, you can reach out to us at <a href="mailto:support@hindustaan.in" className="text-green-600 hover:underline">support@hindustaan.in</a>.</p>
          </section>

        
        </div>
      </div>
    </main>
  );
}
