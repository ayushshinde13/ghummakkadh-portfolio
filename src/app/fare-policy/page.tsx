import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  IndianRupee,
  Calculator,
  Clock,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Receipt,
  Mail,
  Building,
} from "lucide-react";

export default function FarePolicyPage() {
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
              <IndianRupee className="w-4 h-4" />
            </span>
            Pricing &amp; Cancellation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Fare, Cancellation &amp; Refund Policy
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • 100% Transparent Pricing Guarantee
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 space-y-10 shadow-2xl border border-slate-100 leading-relaxed">

          {/* Section 1 */}
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
    </main>
  );
}
