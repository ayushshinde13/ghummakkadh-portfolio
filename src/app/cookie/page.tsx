import React from 'react';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Cookie & Tracking Technologies Policy
          </h1>
          <p className="text-gray-500 font-medium">
            Last updated: August 2026
          </p>
        </div>
        
        {/* Content */}
        <div className="space-y-6 text-[15px] text-[#64748B] leading-relaxed bg-white p-8 md:p-10 rounded-[28px] shadow-sm border border-gray-100/80">
          
          <p>
            Ghumakkadh's Rider and Partner apps do not use traditional browser cookies. Instead, we use similar technologies — such as device identifiers, local app storage, and software development kits (SDKs) — to keep the app running smoothly, remember your preferences, and understand how the app is used.
          </p>
          
          <p>
            We use essential local storage to keep you logged in, remember your session, and maintain your saved preferences such as language or saved addresses, so you don't have to re-enter them each time you open the app.
          </p>
          
          <p>
            We use push notification services (such as Firebase Cloud Messaging) to deliver ride updates, OTPs, payment confirmations, and safety alerts to your device. This requires a unique device token that identifies your device for notification delivery — it does not track your activity outside the app.
          </p>
          
          <p>
            We collect app usage and diagnostic data — such as screens viewed, features used, crash logs, and device information — to fix bugs, understand performance issues, and improve the app experience. This data is used in aggregated, anonymized form for analytics and reporting, and is not used to build advertising profiles.
          </p>
          
          <p>
            We do not use third-party advertising trackers, and we do not share device identifiers with advertisers for cross-app tracking.
          </p>
          
          <p>
            You can manage app permissions — including notifications, location, and storage — at any time through your device settings. Disabling certain permissions may limit core features such as ride booking, live tracking, or receiving important alerts.
          </p>
          
          <p>
            This policy may be updated to reflect changes in the technologies we use. Please check back periodically for updates.
          </p>
          
          <p>
            If you have questions about how tracking technologies are used in the app, contact us at <a href="mailto:support@hindustaan.in" className="text-green-600 hover:underline">support@hindustaan.in</a>.
          </p>

        </div>
      </div>
    </main>
  );
}
