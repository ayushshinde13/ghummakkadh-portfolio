import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-[40px] md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
            Contact Us & Support
          </h1>
        </div>
        <div className="space-y-10 text-gray-600 leading-relaxed bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">We're here to help</h2>
            <p>If you have any questions, feedback, or issues, please reach out to our support team.</p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email:</strong> support@hindustaan.in</li>
              <li><strong>Phone:</strong> 0771- 299 - 4005</li>
              <li><strong>Website:</strong> <a href="https://hindustaan.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hindustaan.in</a></li>
              <li><strong>Address:</strong> CO: B-41, Sector-8A, Kamal-Vihar, Raipur (C.G.) - 492001</li>
              <li><strong>Support Hours:</strong> 24/7</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
