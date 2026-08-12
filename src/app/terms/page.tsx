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
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">6. Terms for Riders</h2>
            <p className="mb-3">
              <strong>Ride Booking:</strong> By booking a ride, riders agree to be at the pickup location at the specified time. Riders must verify the driver's details and vehicle information before entering the vehicle.
            </p>
            <p className="mb-3">
              <strong>Ride Etiquette:</strong> Riders are expected to maintain cleanliness inside the vehicle. Smoking, drinking alcohol, or consuming illegal substances during the ride is strictly prohibited.
            </p>
            <p>
              <strong>Luggage & Passengers:</strong> Riders must adhere to the vehicle's seating and luggage capacity. Drivers reserve the right to refuse the ride if the capacity is exceeded.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">7. Terms for Drivers</h2>
            <p className="mb-3">
              <strong>Vehicle Maintenance & Insurance:</strong> Driver partners must ensure their vehicles are in excellent working condition, regularly serviced, and hold valid commercial insurance, registration, and a driving license as per local laws.
            </p>
            <p className="mb-3">
              <strong>Professional Conduct:</strong> Drivers represent the Ghumakkadh brand and must maintain a polite and professional demeanor at all times. Discrimination of any kind against riders is strictly prohibited.
            </p>
            <p className="mb-3">
              <strong>Payouts & Commissions:</strong> Ghumakkadh processes driver earnings daily or weekly, minus the applicable platform commission fees. Earnings are subject to applicable taxes as required by law.
            </p>
            <p>
              <strong>Safety Compliance:</strong> Drivers must not drive under the influence of drugs or alcohol, and must adhere to all traffic rules and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">8. Limitation of Liability</h2>
            <p>
              While Ghumakkadh takes safety seriously and conducts background checks on driver partners, we act solely as a technology intermediary. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the services, including but not limited to lost items, ride delays, or accidents occurring during transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">9. Amendments to Terms</h2>
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
