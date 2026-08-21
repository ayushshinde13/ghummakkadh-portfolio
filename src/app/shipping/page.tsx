import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ShippingPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Parcel Shipping Policy</h1>
          <p className="text-zinc-400 text-lg">Prohibited Items & Shipment Limits</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-zinc-600 space-y-8 shadow-xl">
          
          <section>
            <p className="text-lg leading-relaxed text-[#1E293B] mb-4">
              To keep every delivery safe and legal, Ghumakkadh does not allow the following items to be booked for parcel delivery, regardless of packaging or declared value. Please review this list carefully before booking a parcel.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 font-medium">
                Maximum shipment weight: 500 kg per booking. Meeting the weight limit alone does not make an item eligible for delivery — all items must also comply with the category restrictions below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">1. Explosive & Flammable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fireworks and crackers</li>
              <li>Bombs, detonators, explosives</li>
              <li>Petrol, diesel, kerosene</li>
              <li>Highly flammable liquids</li>
              <li>Gas cylinders</li>
              <li>Hazardous butane and aerosol cans</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">2. Illegal Drugs & Narcotics</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Marijuana/THC products</li>
              <li>Cocaine, heroin, opium</li>
              <li>Any illegal narcotics or psychotropic substances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">3. Weapons & Ammunition</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Firearms and ammunition</li>
              <li>Explosive weapons</li>
              <li>Illegal weapons or dangerous weapon parts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">4. Hazardous Chemicals</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Poisonous substances</li>
              <li>Corrosive acids</li>
              <li>Toxic chemicals</li>
              <li>Radioactive materials</li>
              <li>Infectious or dangerous biological substances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">5. Illegal or Restricted Products</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Counterfeit or pirated products</li>
              <li>Stolen goods</li>
              <li>Items prohibited under Indian law</li>
              <li>Wildlife products without required authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">6. Cash & High-Value Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cash and currency notes</li>
              <li>Large quantities of gold, precious stones, or valuable jewelry</li>
              <li>Bearer securities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">7. Live Animals</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Live animals, insects, or any living creatures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">8. Obscene or Illegal Content</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pornographic or obscene material</li>
              <li>Any content that is illegal or unlawful to possess or distribute</li>
            </ul>
          </section>

          <hr className="my-8 border-gray-200" />

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">A Note on Enforcement</h2>
            <p className="leading-relaxed">
              Ghumakkadh reserves the right to inspect, refuse, or cancel any booking that appears to violate this policy, and to report suspected illegal shipments to the appropriate authorities. Attempting to ship a prohibited item may result in account suspension and forfeiture of any applicable refund.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
