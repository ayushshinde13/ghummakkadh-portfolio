"use client";

import React, { useState } from "react";
import { Container } from "@/components/common";
import { X, ArrowRight } from "lucide-react";

export const AppDownloadSection = () => {
  const [activeModal, setActiveModal] = useState<"ride" | "drive" | null>(null);

  const apps = [
    {
      id: "ride",
      title: (
        <>
          <span className="text-[#77FF00]">Ghuma</span><span className="text-[#FF7700]">kkadh</span> Ride
        </>
      ),
      description: "Book cabs, auto, bikes and much more",
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-sm">
          {/* Simple custom steering/wheel icon for Ride */}
          <svg className="w-8 h-8 text-[#77FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
             <circle cx="12" cy="12" r="10" />
             <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </div>
      ),
      iosLink: "https://apps.apple.com/app/ghumakkadh-rider/id123456789",
      androidLink: "https://play.google.com/store/apps/details?id=com.ghumakkadh"
    },
    {
      id: "drive",
      title: (
        <>
          <span className="text-[#77FF00]">Ghuma</span><span className="text-[#FF7700]">kkadh</span> Drive
        </>
      ),
      description: "Register as a driver to take rides, see your earnings and incentives",
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-sm">
           {/* Simple custom key/driver icon for Drive */}
           <svg className="w-8 h-8 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
             <circle cx="8" cy="15" r="4" />
             <line x1="10.85" y1="12.15" x2="19" y2="4" />
             <line x1="18" y1="5" x2="20" y2="7" />
             <line x1="15" y1="8" x2="17" y2="10" />
           </svg>
        </div>
      ),
      iosLink: "https://apps.apple.com/app/ghumakkadh-driver/id123456789",
      androidLink: "https://play.google.com/store/apps/details?id=com.ghumakkadh.partner"
    }
  ];

  return (
    <section className="pt-4 pb-16 md:py-24 relative bg-transparent">
      <Container>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-10 max-w-2xl leading-[1.1] tracking-tight">
          Download our apps to<br />get the best experience
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <div 
              key={app.id}
              onClick={() => setActiveModal(app.id as "ride" | "drive")}
              className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-[32px] p-8 md:p-10 cursor-pointer group flex flex-col justify-between min-h-[280px]"
            >
              {app.icon}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{app.title}</h3>
                  <ArrowRight className="text-white opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </div>
                <p className="text-gray-400 text-base max-w-sm">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          {/* Modal Content */}
          <div className="bg-[#0A0E1A] border border-white/10 rounded-3xl p-8 md:p-10 max-w-[480px] w-full relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              Get <span className="text-[#77FF00]">Ghuma</span><span className="text-[#FF7700]">kkadh</span> {activeModal === "ride" ? "Ride" : "Drive"} app on
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Download the app today for a 100% mobile experience. Available on iOS and Android
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={apps.find(a => a.id === activeModal)?.iosLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-[1.03] transition-transform active:scale-95"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-[48px] w-auto" />
              </a>
              <a 
                href={apps.find(a => a.id === activeModal)?.androidLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-[1.03] transition-transform active:scale-95"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[48px] w-auto" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
