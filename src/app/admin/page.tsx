"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "admin_token=true; path=/";
    router.push("/admin/dashboard");
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setIsResetMode(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0E1A] font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-[#0A0E1A] to-[#0A0E1A]">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow inside the card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7ED321]/20 rounded-full blur-3xl" />
        
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isResetMode ? "Reset Password" : "Admin Login"}
          </h1>
          <p className="text-sm text-gray-400">
            {isResetMode 
              ? "Enter your email to receive reset instructions" 
              : "Enter your credentials to access the dashboard"
            }
          </p>
        </div>

        {isResetMode ? (
          <form onSubmit={handleReset} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7ED321]/50 focus:border-[#7ED321] transition-all"
                placeholder="admin@ghumakkadh.com"
                required
              />
            </div>

            {resetSent ? (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-sm text-green-400 font-medium">Reset link sent to your email!</p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-[#7ED321] text-black text-sm font-bold shadow-lg shadow-[#7ED321]/20 transition-all hover:bg-[#8AE02D] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7ED321]/50 mt-4"
              >
                Send Reset Link
              </button>
            )}

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsResetMode(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7ED321]/50 focus:border-[#7ED321] transition-all"
                placeholder="admin@ghumakkadh.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => setIsResetMode(true)}
                  className="text-xs text-[#7ED321] hover:text-[#8AE02D] hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7ED321]/50 focus:border-[#7ED321] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#7ED321] text-black text-sm font-bold shadow-lg shadow-[#7ED321]/20 transition-all hover:bg-[#8AE02D] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7ED321]/50 mt-4"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
