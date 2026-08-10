import React from 'react';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 font-medium">
            Last updated: August 2026
          </p>
        </div>
        
        {/* Content */}
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">1. Introduction</h2>
            <p>
              Welcome to Ghumakkadh. These Terms and Conditions govern your use of the Ghumakkadh mobile application, website, and related services. By accessing or using our platform, you agree to be bound by these terms. Ghumakkadh is your trusted travel partner, dedicated to providing reliable bike, auto, and cab rides across India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">2. Description of Services</h2>
            <p>
              The Ghumakkadh app operates as a technology platform that connects users (riders) with independent third-party transportation providers (drivers). We facilitate the booking of point-to-point transportation. Ghumakkadh itself does not provide transportation services, and all drivers are independent contractors, not employees of Ghumakkadh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">3. User Accounts</h2>
            <p>
              To use the Ghumakkadh app, you must register for an active user account. You must be at least 18 years old to register. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">4. Fares, Payments & Cancellations</h2>
            <p className="mb-3">
              <strong>Fares:</strong> Fares are calculated based on a combination of base rate, time, distance, and current market demand (dynamic pricing). An estimated fare is presented before you confirm your booking, but the final charge may vary based on route changes or extended waiting times.
            </p>
            <p className="mb-3">
              <strong>Payments:</strong> All ride payments must be processed through the approved payment methods integrated within the Ghumakkadh app. Cash payments are only allowed if explicitly selected prior to the ride.
            </p>
            <p>
              <strong>Cancellations:</strong> You may cancel a ride request at any time; however, cancellation fees may apply if the driver has already been dispatched and is en route to your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">5. User Conduct and Safety</h2>
            <p>
              While using our platform, you agree to comply with all applicable laws and to treat drivers and their vehicles with respect. Any behavior that compromises safety—including harassment, damage to property, or illegal activities—will result in the immediate suspension or termination of your Ghumakkadh account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">6. Limitation of Liability</h2>
            <p>
              While Ghumakkadh takes safety seriously and conducts background checks on driver partners, we act solely as a technology intermediary. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the services, including but not limited to lost items, ride delays, or accidents occurring during transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">7. Amendments to Terms</h2>
            <p>
              We reserve the right to modify or update these Terms and Conditions at any time to reflect changes in our services or legal obligations. Any updates will be posted directly in the Ghumakkadh app and website. Your continued use of the platform after changes have been published constitutes your acceptance of the revised terms.
            </p>
          </section>

          <div className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you have any questions regarding these Terms and Conditions, please contact us through the Support section of the Ghumakkadh app.
            </p>
          </div>
          
        </div>
      </div>
    </main>
  );
}
