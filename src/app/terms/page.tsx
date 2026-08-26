import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  MapPin,
  Car,
  Package,
  CreditCard,
  AlertTriangle,
  Scale,
  PhoneCall,
  Mail,
  Building,
} from "lucide-react";

export default function TermsAndConditions() {
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
              <FileText className="w-4 h-4" />
            </span>
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • Effective Immediately
          </p>
        </div>

        {/* Legal Document Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 space-y-10 shadow-2xl border border-slate-100 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">1.</span> Acceptance of Terms
            </h2>
            <p className="mb-3">
              These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding contract between you (&quot;User&quot;, &quot;Rider&quot;, &quot;Driver Partner&quot;, &quot;Sender&quot;, &quot;you&quot;, or &quot;your&quot;) and <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong>, operating the brand name <strong>Ghumakkadh</strong> (&quot;Company&quot;, &quot;Ghumakkadh&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p className="mb-3">
              These Terms govern your access to and use of the Ghumakkadh website (<a href="https://ghumakkadh.in" className="text-blue-600 hover:underline font-semibold">ghumakkadh.in</a>), our passenger applications, driver partner applications, parcel delivery interfaces, APIs, customer support systems, and related technology services (collectively referred to as the &quot;Platform&quot;).
            </p>
            <p className="mb-3">
              By downloading, registering for, accessing, browsing, or utilizing the Platform, you acknowledge that you have read, understood, and irrevocably agree to be bound by these Terms and our associated policies, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li><Link href="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link></li>
              <li><Link href="/fare-policy" className="text-blue-600 font-bold hover:underline">Fare, Cancellation &amp; Refund Policy</Link></li>
              <li><Link href="/safety" className="text-blue-600 font-bold hover:underline">Safety &amp; Community Guidelines</Link></li>
              <li><Link href="/shipping" className="text-blue-600 font-bold hover:underline">Parcel &amp; Courier Logistics Terms</Link></li>
            </ul>
            <p>
              If you do not agree to these Terms or any part thereof, you must immediately discontinue your use of the Platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">2.</span> About Ghumakkadh and Our Platform Ecosystem
            </h2>
            <p className="mb-3">
              Ghumakkadh operates a cutting-edge on-demand technology and marketplace platform designed to facilitate urban mobility, ride-hailing, and intra-city logistics across India. The ecosystem functions through distinct interfaces:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Ghumakkadh App (Rider &amp; Sender):</strong> For passengers seeking point-to-point bike taxi, auto-rickshaw, cab rides, outstation travel, and intra-city parcel delivery services.</li>
              <li><strong>Ghumakkadh Driver / Captain App:</strong> For verified independent commercial driver partners and vehicle owners offering mobility and parcel logistics services.</li>
              <li><strong>Ghumakkadh Web Platform (ghumakkadh.in):</strong> For web information, account support, and customer assistance.</li>
            </ul>
            <p className="mb-3">
              <strong className="text-slate-900">Intermediary Status:</strong> Ghumakkadh is a digital technology platform and electronic intermediary under the Information Technology Act, 2000. Ghumakkadh does not operate as a transportation carrier or logistics provider. Transportation and parcel delivery services are rendered directly by independent third-party Driver Partners who are not employees, agents, or joint-venturers of Ghumakkadh.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">3.</span> User Eligibility &amp; Registration
            </h2>
            <p className="mb-2">To access or create an account on the Ghumakkadh Platform, you represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li>You are at least 18 years of age and legally competent to enter into a binding contract under the Indian Contract Act, 1872;</li>
              <li>You possess a valid Indian mobile number and government-recognized identity verification (where required);</li>
              <li>You have not been previously suspended, blacklisted, or removed from the Ghumakkadh network;</li>
              <li>All information provided during onboarding and verification is truthful, accurate, complete, and up to date.</li>
            </ul>
            <p>
              Minors under the age of 18 may only utilize passenger rides when accompanied by an adult parent or legal guardian who assumes full legal responsibility.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">4.</span> User Accounts, Verification &amp; Security
            </h2>
            <p className="mb-3">
              Access to core features requires creating a verified profile via OTP (One-Time Password) authentication. You are strictly responsible for maintaining the confidentiality of your credentials and verification tokens.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li>You must not authorize third parties to access or book rides on your personal account in a manner that conceals user identity.</li>
              <li>You must immediately notify Ghumakkadh Customer Support in the event of unauthorized access, lost devices, or SIM card compromise.</li>
              <li>Ghumakkadh reserves the right to suspend or terminate any account suspected of impersonation, fraudulent OTP usage, or automated scraping.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">5.</span> Ride Booking &amp; Trip Services
            </h2>
            <p className="mb-3">
              When a Rider enters a pickup and destination point on the Platform, Ghumakkadh broadcasts the trip request to nearby verified Driver Partners. A ride booking is formally confirmed when an independent Driver Partner accepts the request through their driver interface.
            </p>
            <p className="mb-2"><strong>Vehicle Categories Available:</strong></p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li><strong>Bike Taxi:</strong> Quick single-passenger transit for urban commuting (helmet compliance mandatory).</li>
              <li><strong>Auto-Rickshaw:</strong> Economical 3-passenger transit for local commuting.</li>
              <li><strong>Cab Economy / Mini / Sedan:</strong> 4-passenger air-conditioned transit for city commutes.</li>
              <li><strong>Cab Premier / XL / SUV:</strong> 6-passenger vehicles for family travel, airport transit, or outstation journeys.</li>
            </ul>
            <p>
              Riders must verify vehicle registration numbers, driver identity, and the Start-Trip OTP with the driver before boarding the vehicle.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">6.</span> Parcel &amp; Intra-City Logistics Services
            </h2>
            <p className="mb-3">
              Ghumakkadh enables point-to-point courier and parcel dispatch for personal goods, documents, and merchandise. By utilizing parcel services, Senders agree:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Prohibited Items:</strong> You will NOT dispatch illegal contraband, weapons, ammunition, hazardous chemicals, explosives, live animals, perishable foods without packaging, stolen items, currency notes, bullion, or items prohibited under Indian law.</li>
              <li><strong>Weight &amp; Size Limits:</strong> Parcels must fit within the safe cargo bounds of the selected delivery vehicle (e.g. up to 10kg on two-wheelers).</li>
              <li><strong>Inspection:</strong> Driver partners reserve the right to inspect package exteriors or decline delivery if safety concerns or legal violations are suspected.</li>
              <li><strong>Recipient Availability:</strong> Senders must ensure the recipient is available with valid verification at the destination coordinates.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">7.</span> Pricing, Fares, Dynamic Surge &amp; Taxes
            </h2>
            <p className="mb-3">
              Fares on Ghumakkadh are transparently calculated using an algorithmic pricing engine combining base fares, distance traveled (per km), duration of transit (per minute), waiting charges, applicable toll fees, and government taxes (including GST).
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Upfront Estimated Fare:</strong> The fare displayed prior to confirming a ride represents an estimated amount based on the optimal GPS route.</li>
              <li><strong>Dynamic Pricing (Surge):</strong> During periods of high passenger demand, adverse weather, or driver supply constraints, dynamic pricing multipliers may apply to encourage driver availability.</li>
              <li><strong>Route Deviations &amp; Tolls:</strong> Any rider-requested route deviations, multiple stops, state border taxes, parking charges, or expressway tolls will be added to the final payable fare.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">8.</span> Payments, Wallets &amp; Transaction Aggregation
            </h2>
            <p className="mb-3">
              Ghumakkadh facilitates digital payments through authorized, RBI-licensed payment aggregators and gateways, including <strong className="text-slate-900">Razorpay</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li><strong>Payment Modes:</strong> UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), NetBanking, and In-App Digital Wallets.</li>
              <li><strong>Cash on Delivery (Cash Rides):</strong> Cash payments are permitted only when explicitly selected before ride confirmation. Riders must pay the exact fare shown on the driver app at trip completion.</li>
              <li><strong>Security:</strong> Ghumakkadh does not store complete debit/credit card CVVs, card PINs, or UPI security credentials on its internal servers.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">9.</span> Cancellations, Waiting Fees &amp; Refunds
            </h2>
            <p className="mb-3">
              To compensate Driver Partners for their fuel and transit time, cancellations are governed by clear thresholds:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Free Cancellation Window:</strong> Riders may cancel without fee within 2–3 minutes of driver booking acceptance.</li>
              <li><strong>Cancellation Fee:</strong> If a ride is cancelled after the driver has traveled towards the pickup point or has waited beyond the complimentary waiting time (3 minutes), a standard cancellation fee will be charged to your account.</li>
              <li><strong>Driver-Initiated Cancellations:</strong> If a driver cancels without justifiable cause before arrival, no cancellation fee will be levied against the rider.</li>
              <li><strong>Refund Timelines:</strong> Eligible digital refunds for failed rides or duplicate deductions are processed back to the original payment source within <strong className="text-slate-800">5–7 business days</strong>.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">10.</span> Driver Partner Obligations, Verification &amp; Compliance
            </h2>
            <p className="mb-3">
              Driver Partners operate as independent commercial entities and must comply with the Motor Vehicles Act, 1988 and local transport regulations:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Documentation:</strong> Driver partners must maintain valid commercial driving licenses, vehicle registration certificates (RC), commercial insurance, pollution under control (PUC) certificates, and relevant permits.</li>
              <li><strong>Background Checks:</strong> Driver partners must submit to police background verifications, KYC checks, and onboarding evaluations before being authorized on the platform.</li>
              <li><strong>Vehicle Fitness:</strong> Vehicles must be kept in clean, mechanically sound, roadworthy, and sanitized condition.</li>
              <li><strong>Zero Discrimination:</strong> Driver partners shall not refuse rides or discriminate against riders based on caste, gender, religion, sexual orientation, disability, or language.</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">11.</span> Passenger Conduct, Seating Capacity &amp; Luggage Rules
            </h2>
            <p className="mb-2">All riders and passengers using Ghumakkadh agree to abide by the following etiquette:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3 text-slate-600 font-medium">
              <li><strong>Capacity Limits:</strong> Passengers must adhere strictly to lawful seating capacity (Bike: 1 rider; Auto: 3 riders; Cab: 4 or 6 riders). Drivers are obligated to refuse overloading.</li>
              <li><strong>Prohibited Substances:</strong> Consuming alcohol, smoking, vaping, chewing tobacco, or using narcotics inside the vehicle is strictly forbidden.</li>
              <li><strong>Vehicle Damage:</strong> Riders will be billed for any intentional or negligent physical damage or bio-cleaning costs caused to the driver&apos;s vehicle.</li>
              <li><strong>Lost Property:</strong> While drivers are encouraged to return items left behind, Ghumakkadh is not responsible for personal belongings forgotten in vehicles.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">12.</span> Safety Protocols, Emergency SOS &amp; Ride Tracking
            </h2>
            <p className="mb-3">
              Safety is our core priority. The Ghumakkadh app integrates continuous telemetry and safety features:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li><strong>In-App SOS Button:</strong> Directly alerts local emergency services (112) and dispatches real-time trip telemetry to your designated emergency contacts.</li>
              <li><strong>Live GPS Sharing:</strong> Riders can share real-time trip location links with friends and family.</li>
              <li><strong>Masked Calling:</strong> Telephone calls between drivers and riders are routed through encrypted masked numbers to safeguard personal privacy.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">13.</span> Zero Tolerance Policy Against Harassment &amp; Abuse
            </h2>
            <p className="mb-3">
              Ghumakkadh maintains a strict Zero Tolerance Policy against verbal abuse, physical violence, sexual harassment, stalking, hate speech, intimidation, or brand defamation directed towards riders, drivers, or support staff.
            </p>
            <p>
              Any verified infraction will lead to immediate, irreversible account blacklisting, forfeiture of pending promotional benefits, and formal reporting to law enforcement authorities.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">14.</span> Promotions, Referral Rewards &amp; Discount Coupons
            </h2>
            <p className="mb-3">
              Ghumakkadh may distribute promotional codes, discounts, or referral credits from time to time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li>Promotions are non-transferable, cannot be redeemed for cash, and hold specific expiration dates.</li>
              <li>Only one coupon code or discount may be applied per trip booking unless expressly stated.</li>
              <li>Ghumakkadh reserves the right to invalidate coupons, deduct referral bonuses, or cancel accounts if coupon abuse, emulator scripts, or multi-accounting fraud is detected.</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">15.</span> Ratings, Feedback &amp; Community Accountability
            </h2>
            <p className="mb-3">
              At the end of each trip, riders and drivers can submit mutual 1-to-5 star ratings and reviews. Both parties agree that feedback must reflect genuine personal experiences.
            </p>
            <p>
              Driver partners or riders whose average rating falls persistently below community safety thresholds may be subjected to re-training or deactivation.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">16.</span> Intellectual Property Rights
            </h2>
            <p className="mb-3">
              All software, source code, logos, trademarks, visual brand assets, mapping algorithms, UI layouts, and proprietary content associated with Ghumakkadh are the exclusive property of <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong>
            </p>
            <p>
              Users are granted a limited, personal, non-exclusive, non-transferable license to access the Platform. You agree not to copy, decompile, reverse engineer, scrape, or commercially exploit any software or data without prior written authorization.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">17.</span> Third-Party Services &amp; Digital Integrations
            </h2>
            <p className="mb-3">
              The Platform relies on integrations with third-party software, including mapping APIs (Google Maps), SMS gateways, payment aggregators, and cloud infrastructure. Your use of these services is subject to the respective third-party provider terms and privacy policies.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">18.</span> Account Suspension &amp; Termination
            </h2>
            <p className="mb-2">We reserve the right to immediately suspend or terminate user or driver accounts without prior notice if:</p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3 text-slate-600 font-medium">
              <li>You breach any material condition of these Terms or applicable laws;</li>
              <li>Your account activities create financial, civil, or criminal liabilities for Ghumakkadh;</li>
              <li>A pattern of fraudulent payment chargebacks or trip cancellations is detected;</li>
              <li>We are mandated to do so by court orders or statutory government directives.</li>
            </ul>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">19.</span> Disclaimer of Warranties
            </h2>
            <p className="mb-3">
              The Platform is provided on an <strong className="text-slate-900">&quot;AS IS&quot;</strong> and <strong className="text-slate-900">&quot;AS AVAILABLE&quot;</strong> basis. Ghumakkadh expressly disclaims all warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular route, uninterrupted server uptime, or exact estimated time of arrival (ETA).
            </p>
            <p>
              ETAs, road routes, and vehicle arrivals are estimates influenced by traffic congestion, weather, road closures, and driver availability.
            </p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">20.</span> Limitation of Liability
            </h2>
            <p className="mb-3">
              To the maximum extent permitted under applicable law, <strong className="text-slate-900">Hindustaan Innovations Pvt. Ltd.</strong>, its directors, officers, employees, investors, and affiliates shall not be liable for any indirect, incidental, punitive, special, or consequential damages, including loss of profit, missed flights, train departures, or transit delays.
            </p>
            <p>
              Ghumakkadh&apos;s aggregate liability for any direct claim arising out of a trip or transaction shall not exceed the total fare amount paid by you for the specific trip in dispute.
            </p>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">21.</span> Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless Hindustaan Innovations Pvt. Ltd. and its directors, employees, driver partners, and agents from and against all claims, losses, damages, liabilities, costs, and legal expenses arising from your violation of these Terms, unlawful acts, vehicle damage, or violation of third-party rights.
            </p>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">22.</span> Electronic Communications &amp; Telecom Consent
            </h2>
            <p className="mb-3">
              By registering on Ghumakkadh, you provide explicit consent to receive transactional notifications, OTP codes, ride receipt summaries, emergency alerts, and driver arrival updates via SMS, Push Notifications, In-App Messages, WhatsApp, and Email.
            </p>
            <p>
              You may opt out of non-essential marketing communications via in-app preferences without affecting transactional transit notifications.
            </p>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">23.</span> Force Majeure
            </h2>
            <p>
              Ghumakkadh shall not be deemed in breach of this Agreement for failure or delay in performance caused by circumstances beyond its reasonable control, including natural catastrophes, floods, severe storms, earthquakes, civil unrest, strikes, internet blackouts, state shutdowns, or government-imposed curfews.
            </p>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">24.</span> Governing Law &amp; Dispute Resolution
            </h2>
            <p className="mb-3">
              These Terms of Service and any contractual disputes shall be governed by, interpreted, and construed exclusively in accordance with the laws of the Republic of India.
            </p>
            <p>
              All disputes, controversies, or claims arising out of or in connection with the Platform shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-slate-900">Raipur, Chhattisgarh, India</strong>.
            </p>
          </section>

          {/* Section 25 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">25.</span> Grievance Redressal Mechanism
            </h2>
            <p className="mb-3">
              In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, the contact details of the designated Grievance Redressal Officer for Ghumakkadh are provided below:
            </p>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
              <p><strong className="text-slate-900">Grievance Officer:</strong> Legal &amp; Compliance Team</p>
              <p><strong className="text-slate-900">Entity:</strong> Hindustaan Innovations Pvt. Ltd.</p>
              <p><strong className="text-slate-900">Email:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
              <p><strong className="text-slate-900">Phone:</strong> <a href="tel:0771-299-4005" className="text-blue-600 font-bold hover:underline">0771-299-4005</a></p>
              <p><strong className="text-slate-900">Address:</strong> CO: B-41, Sector-8A, Kamal Vihar, Raipur, Chhattisgarh – 492001, India</p>
            </div>
          </section>

          {/* Section 26 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">26.</span> Corporate Information &amp; Official Contact
            </h2>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
              <p><strong className="text-slate-900">Company Name:</strong> Hindustaan Innovations Pvt. Ltd.</p>
              <p><strong className="text-slate-900">Brand Name:</strong> Ghumakkadh</p>
              <p><strong className="text-slate-900">Official Website:</strong> <a href="https://ghumakkadh.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">https://ghumakkadh.in</a></p>
              <p><strong className="text-slate-900">Customer Support:</strong> <a href="mailto:support@hindustaan.in" className="text-blue-600 font-bold hover:underline">support@hindustaan.in</a></p>
              <p><strong className="text-slate-900">Corporate Headquarters:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001, India</p>
            </div>
          </section>

          {/* Section 27 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#7ED321]">27.</span> Entire Agreement &amp; Severability
            </h2>
            <p className="mb-4">
              These Terms, together with the Privacy Policy, Fare &amp; Refund Policy, Safety Guidelines, and any supplementary terms agreed during specific bookings, constitute the complete and exclusive agreement between you and Ghumakkadh. If any provision of these Terms is deemed unenforceable by a court of competent jurisdiction, the remaining clauses shall continue in full legal force and effect.
            </p>
            <div className="p-4 bg-[#7ED321]/10 rounded-2xl border border-[#7ED321]/30 text-slate-800 text-sm font-semibold text-center">
              By using Ghumakkadh, you confirm that you have read, understood, and agreed to all provisions set forth in these Terms of Service.
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
