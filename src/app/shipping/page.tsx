import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  AlertOctagon,
  ShieldCheck,
  Truck,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Mail,
  Building,
} from "lucide-react";

export default function ShippingPolicyPage() {
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
              <Package className="w-4 h-4" />
            </span>
            Logistics &amp; Courier Rules
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Parcel Shipping &amp; Logistics Policy
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2">
            Last Updated: August 26, 2026 • Guidelines for Senders, Drivers &amp; Recipients
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 text-slate-700 space-y-10 shadow-2xl border border-slate-100 leading-relaxed">

          {/* Section 1 */}
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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
    </main>
  );
}
