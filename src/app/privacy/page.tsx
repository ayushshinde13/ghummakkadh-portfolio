import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Privacy Policy
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <p>
              Your privacy is important to us. This Privacy Policy outlines how Ghumakkadh collects, uses, and safeguards your data.
            </p>
            <p className="mt-4">
              We collect information to provide you better services, including location data for seamless ride connections, payment details, and user profiles. We do not sell your personal data to third parties.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
