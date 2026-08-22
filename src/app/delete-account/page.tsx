"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Phone, UserCog, AlertTriangle, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

export default function DeleteAccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] pt-32 pb-20 relative overflow-hidden font-sans">
      
      {/* Background glowing orbs for premium aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-10 group w-fit"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium text-sm tracking-wide">Back to Home</span>
        </Link>

        {isSuccess ? (
          <div className="bg-[#121217]/80 backdrop-blur-xl rounded-3xl p-10 sm:p-16 border border-white/5 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#57E600]/10 mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#57E600]" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Request Received</h2>
            <p className="text-zinc-400 text-lg mb-8">
              Your account deletion request has been successfully submitted and logged. Our team will process it shortly.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="mb-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Danger Zone</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Delete Account
              </h1>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                We're sorry to see you go. Please fill out the form below to request account deletion. This action cannot be undone.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#121217]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl">
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400 group-focus-within:text-zinc-200 transition-colors">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-red-400 transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 group-focus-within:text-zinc-200 transition-colors">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-red-400 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Mobile Field */}
                  <div className="space-y-2 group">
                    <label htmlFor="mobile" className="block text-sm font-medium text-zinc-400 group-focus-within:text-zinc-200 transition-colors">Mobile No.</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-red-400 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input 
                        type="tel" 
                        id="mobile" 
                        name="mobile" 
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  {/* Role Field */}
                  <div className="space-y-2 group">
                    <label htmlFor="role" className="block text-sm font-medium text-zinc-400 group-focus-within:text-zinc-200 transition-colors">Account Type</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-red-400 transition-colors">
                        <UserCog className="w-5 h-5" />
                      </div>
                      <select 
                        id="role" 
                        name="role" 
                        required
                        defaultValue=""
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all appearance-none cursor-pointer shadow-inner"
                      >
                        <option value="" disabled className="bg-[#121217] text-zinc-500">Select your role</option>
                        <option value="rider" className="bg-[#121217]">Rider</option>
                        <option value="partner" className="bg-[#121217]">Partner</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reason Field */}
                <div className="space-y-2 group">
                  <label htmlFor="reason" className="block text-sm font-medium text-zinc-400 group-focus-within:text-zinc-200 transition-colors">Reason for deleting</label>
                  <textarea 
                    id="reason" 
                    name="reason" 
                    rows={4}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none shadow-inner"
                    placeholder="Please tell us why you want to delete your account. Your feedback helps us improve."
                  />
                </div>

                {/* Action Area */}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-red-600 hover:bg-red-500 text-white font-semibold text-lg py-4 rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.6)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                      {isSubmitting ? 'Processing...' : 'Permanently Delete Account'}
                    </span>
                    {/* Button shine effect */}
                    {!isSubmitting && (
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                    )}
                  </button>
                  <p className="text-center text-zinc-500 text-sm mt-5 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-zinc-600" />
                    All your data, ride history, and rewards will be permanently deleted.
                  </p>
                </div>

              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
