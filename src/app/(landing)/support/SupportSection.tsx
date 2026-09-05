"use client";

import React, { useState } from "react";
import { Container } from "@/components/common";
import {
  Headphones, MessageCircle, ShieldCheck,
  MessagesSquare, Mail, Phone, CircleHelp,
  Car, IndianRupee, Clock, MapPin, Package, Smartphone, Leaf,
  Users, Star, Heart,
  CheckCircle2, AlertCircle, Loader2, Search, Copy, Check, RefreshCw, FileText, Send, ArrowRight
} from "lucide-react";
import { api } from "@/lib/api";

const Instagram = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const SupportSection: React.FC = () => {
  // Navigation tab between "Create Ticket" and "Track Ticket"
  const [supportTab, setSupportTab] = useState<"create" | "track">("create");

  // Create Ticket Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    status: string;
    subject: string;
    createdAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Track Ticket State
  const [trackTicketId, setTrackTicketId] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [trackResult, setTrackResult] = useState<any | null>(null);

  // Handle Create Ticket
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!formData.topic) {
      setSubmitError("Please select a topic for your issue.");
      return;
    }
    if (!formData.message.trim()) {
      setSubmitError("Please provide a description of your issue.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post("/support/public/tickets", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        topic: formData.topic,
        subject: formData.subject.trim() || `Support Request: ${formData.topic.toUpperCase()}`,
        message: formData.message.trim(),
      });

      if (res.success && res.data) {
        setSubmittedTicket(res.data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          topic: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitError(res.message || "Failed to create support ticket. Please try again.");
      }
    } catch (err: any) {
      console.error("Support ticket creation error:", err);
      setSubmitError(err.message || "Unable to submit your ticket. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Track Ticket
  const handleTrackTicket = async (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    setTrackError(null);

    const ticketIdToLookup = (customId || trackTicketId).trim();
    if (!ticketIdToLookup) {
      setTrackError("Please enter a valid Ticket ID.");
      return;
    }

    try {
      setIsTracking(true);
      setTrackResult(null);
      const queryParams = trackEmail.trim() ? `?email=${encodeURIComponent(trackEmail.trim())}` : "";
      const res = await api.get(`/support/public/tickets/${ticketIdToLookup}${queryParams}`);

      if (res.success && res.data) {
        setTrackResult(res.data);
      } else {
        setTrackError(res.message || "Ticket not found. Please verify the Ticket ID.");
      }
    } catch (err: any) {
      console.error("Support ticket tracking error:", err);
      setTrackError(err.message || "Ticket not found. Please verify your Ticket ID.");
    } finally {
      setIsTracking(false);
    }
  };

  const handleCopyTicketId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            OPEN (Under Review)
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            IN PROGRESS (Agent Assigned)
          </span>
        );
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            RESOLVED
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            CLOSED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400">
            {status}
          </span>
        );
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-gradient-to-b dark:from-[#0A0E1A] dark:to-[#0D1220] text-slate-900 dark:text-white pt-24 md:pt-8 pb-24 overflow-hidden relative transition-colors duration-300" id="support-features">
      <Container className="max-w-[1440px] mx-auto px-4 md:px-8">

        {/* HERO SECTION */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between mb-16 md:mb-24 mt-2 lg:mt-0 gap-12">

          {/* Left Content */}
          <div className="flex-1 w-full z-20 flex flex-col items-center lg:items-start text-center lg:text-left pt-10">
            <div className="hidden lg:inline-flex items-center gap-2 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm mb-6">
              <span className="text-[#3b9e02] dark:text-[#57E600]"><Headphones className="w-4 h-4" /></span>
              <span>SUPPORT CENTER</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
              How can we <span className="text-[#3b9e02] dark:text-[#57E600]">help you</span> today?
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Whether you need help with a recent ride, have questions about our services, or want to partner with us, our 24/7 support team is always here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="bg-[#4eb902] text-slate-950 font-bold py-3.5 px-8 rounded-full hover:bg-[#3d9400] transition-colors shadow-sm">
                Chat with us
              </button>
            </div>
          </div>

          {/* Right Image in Circle */}
          <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end pb-2 lg:pr-8">

            {/* Support Image */}
            <div className="relative w-full max-w-[600px] flex items-center justify-center">
              <img
                src="/images/support.png"
                alt="Ghumakkadh Support Representative"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Floating Badges */}
            <div className="hidden lg:block absolute left-4 sm:left-12 lg:left-10 top-16 z-20">
              <div className="bg-white dark:bg-[#151B2E] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 shadow-lg">
                <Headphones className="w-5 h-5 text-green-600" />
                <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">24/7 Support</span>
              </div>
            </div>

            <div className="hidden lg:block absolute right-0 sm:right-8 lg:right-4 bottom-32 z-20">
              <div className="bg-white dark:bg-[#151B2E] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 shadow-lg">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-[13px] whitespace-pre-line leading-[1.2]">Safe &{"\n"}Reliable</span>
              </div>
            </div>

            <div className="hidden lg:block absolute left-8 sm:left-16 lg:left-12 bottom-12 sm:bottom-20 z-20">
              <div className="bg-white dark:bg-[#151B2E] border border-slate-200 dark:border-white/10 rounded-2xl p-2 px-3 flex items-center gap-3 shadow-lg">
                <div className="bg-amber-500 p-1.5 rounded-full">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-[13px] whitespace-pre-line leading-[1.2]">Quick{"\n"}Responses</span>
              </div>
            </div>

          </div>
        </div>

        {/* SUPPORT OPTIONS & CONTACT CARD */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-16 items-stretch w-full">

          {/* Live Chat */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center justify-start text-center shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] h-full">
            <div className="h-10 flex items-center justify-center mb-4 sm:mb-5 text-[#3b9e02] dark:text-[#57E600] shrink-0">
              <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] sm:text-[15px] mb-2">Live Chat</h4>
            <p className="text-[11px] sm:text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed mb-3">Chat with our support team in real-time.</p>
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 w-full text-[10px] sm:text-[11px] font-bold text-[#3b9e02] dark:text-[#57E600]">
              Avg. Wait: &lt; 2 mins
            </div>
          </div>

          {/* Email Support */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center justify-start text-center shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] h-full">
            <div className="h-10 flex items-center justify-center mb-4 sm:mb-5 text-amber-500 shrink-0">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] sm:text-[15px] mb-2">Email Support</h4>
            <p className="text-[11px] sm:text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed mb-3">Drop us an email and we'll get back to you.</p>
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 w-full text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-[#f5a623] break-words">
              support@hindustaan.in<br />
              <span className="text-slate-500 dark:text-gray-500 font-normal">Response in 24 hrs</span>
            </div>
          </div>

          {/* Call Support */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center justify-start text-center shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] h-full">
            <div className="h-10 flex items-center justify-center mb-4 sm:mb-5 text-indigo-500 dark:text-[#7363ff] shrink-0">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] sm:text-[15px] mb-2">Call Support</h4>
            <p className="text-[11px] sm:text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed mb-3">Speak to our team for quick assistance.</p>
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 w-full text-[10px] sm:text-[11px] font-bold text-indigo-600 dark:text-[#7363ff]">
              0771- 299 - 4005<br />
              <span className="text-slate-500 dark:text-gray-500 font-normal">9:30 AM - 7:30 PM</span>
            </div>
          </div>

          {/* Help Center */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center justify-start text-center shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] h-full">
            <div className="h-10 flex items-center justify-center mb-4 sm:mb-5 text-[#3b9e02] dark:text-[#57E600] shrink-0">
              <CircleHelp className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] sm:text-[15px] mb-2">Help Center</h4>
            <p className="text-[11px] sm:text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed mb-3">Find answers to common questions and guides.</p>
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 w-full text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-gray-300">
              Browse 100+ Articles
            </div>
          </div>

          {/* Reach us anytime (Right) */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 lg:p-8 flex flex-col shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative overflow-hidden h-full col-span-2 lg:col-span-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 text-center lg:text-left">Reach us anytime</h3>
            <div className="w-12 h-[3px] bg-[#4eb902] rounded-full mb-6 lg:mb-8 mx-auto lg:mx-0"></div>

            <div className="flex flex-col md:flex-row xl:flex-row gap-6 h-full items-center md:items-start lg:items-start text-center md:text-left">
              {/* Left Contact */}
              <div className="flex flex-col justify-center md:justify-start gap-4 flex-1 z-10 whitespace-nowrap h-full pt-1">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-600 dark:text-gray-400 font-medium text-[13px]">support@hindustaan.in</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-600 dark:text-gray-400 font-medium text-[13px]">0771- 299 - 4005</span>
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="block md:hidden xl:hidden w-full h-[1px] bg-slate-200 dark:bg-white/10 my-1"></div>

              {/* Divider */}
              <div className="hidden xl:block w-[1px] bg-slate-200 dark:bg-white/10 h-[90%] self-center my-2"></div>

              {/* Right Clock */}
              <div className="flex flex-col justify-center md:justify-start gap-2 flex-1 z-10 xl:pl-2 h-full pt-2 items-center md:items-start">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Clock className="w-6 h-6 text-green-700 dark:text-[#7a8a68]" />
                  <span className="font-bold text-slate-900 dark:text-white text-[14px]">24/7 Support</span>
                </div>
                <p className="text-slate-600 dark:text-gray-400 text-[12px] font-medium leading-relaxed max-w-[140px]">
                  We're here for you,<br />round the clock.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 FEATURES STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-4 lg:gap-5 w-full mb-16 items-stretch justify-center">

          {/* 1. Safe & Secure */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 relative shrink-0">
              <div className="w-[80px] h-[40px] bg-slate-100 dark:bg-white/10 border-2 border-slate-200 dark:border-white/20 rounded-lg flex items-center justify-center relative shadow-sm mt-4">
                <Car className="w-8 h-8 text-slate-900 dark:text-white" />
                <div className="absolute -bottom-3 -right-3 bg-[#4eb902] rounded-md p-1.5 border-2 border-white dark:border-[#0A0E1A] shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Safe & Secure</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Verified drivers, live tracking<br />and safety features to<br />keep you protected.</p>
          </div>

          {/* 2. Affordable Pricing */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[48px] h-[48px] bg-[#ffba00] rounded-full border-[3px] border-[#ffca33] flex items-center justify-center shadow-inner relative">
                <div className="absolute inset-1 border border-[#ffca33] rounded-full opacity-50"></div>
                <IndianRupee className="w-5 h-5 text-white z-10" strokeWidth={3} />
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Affordable Pricing</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Transparent fares with no<br />hidden charges. Travel<br />more, spend less.</p>
          </div>

          {/* 3. Quick & Reliable */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[48px] h-[48px] rounded-full border-[4px] border-[#3b9e02] dark:border-[#57E600] flex items-center justify-center relative bg-white dark:bg-white/10 backdrop-blur-md shadow-sm">
                <Clock className="w-5 h-5 text-[#3b9e02] dark:text-[#57E600]" />
                <div className="absolute -left-4 top-2 w-3 h-[2px] bg-slate-300 dark:bg-gray-300 rounded-full"></div>
                <div className="absolute -left-3 top-5 w-2 h-[2px] bg-slate-300 dark:bg-gray-300 rounded-full"></div>
                <div className="absolute -left-4 top-8 w-3 h-[2px] bg-slate-300 dark:bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Quick & Reliable</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Quick pickups and on-time<br />drops, every time you<br />ride or send.</p>
          </div>

          {/* 4. Live Tracking */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex flex-col items-center justify-center mb-4 relative shrink-0">
              <MapPin className="w-7 h-7 text-[#3b9e02] dark:text-[#57E600] absolute -top-1 z-10 drop-shadow-md" fill="currentColor" color="white" />
              <div className="w-12 h-8 bg-amber-100 dark:bg-[#F2EBCA] mt-5 rounded-md transform rotate-[15deg] skew-x-12 shadow-sm border border-amber-200 dark:border-[#e0d6a4] flex justify-center items-center overflow-hidden">
                <div className="w-[2px] h-[200%] bg-white mx-1 transform -rotate-[15deg]"></div>
                <div className="w-[200%] h-[2px] bg-white absolute transform -rotate-[15deg]"></div>
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Live Tracking</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Track your ride or parcel<br />in real-time and share<br />with loved ones.</p>
          </div>

          {/* 5. Parcel Delivery */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[48px] h-[48px] bg-[#d9a362] rounded-md border-t-[8px] border-[#c08d50] flex flex-col justify-center items-center relative shadow-sm">
                <div className="w-full h-full absolute inset-0 opacity-10 flex flex-col justify-between p-1">
                  <div className="w-full h-[1px] bg-black"></div>
                  <div className="w-full h-[1px] bg-black"></div>
                </div>
                <div className="flex gap-1 z-10">
                  <div className="w-3 h-3 bg-[#b58348] rounded-full flex items-center justify-center">
                    <Leaf className="w-2 h-2 text-[#3b9e02] dark:text-[#57E600]" />
                  </div>
                  <div className="w-3 h-3 bg-[#b58348] rounded-full flex items-center justify-center">
                    <Leaf className="w-2 h-2 text-[#3b9e02] dark:text-[#57E600]" />
                  </div>
                </div>
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Parcel Delivery</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Send documents, gifts<br />or anything with safe<br />and fast delivery.</p>
          </div>

          {/* 6. Easy to Use */}
          <div className="flex flex-col items-center justify-start text-center w-full h-full px-2">
            <div className="h-[90px] flex items-center justify-center mb-4 shrink-0">
              <div className="w-[32px] h-[52px] bg-slate-100 dark:bg-white/10 backdrop-blur-md border-[3px] border-slate-300 dark:border-white/30 rounded-xl flex items-center justify-center shadow-sm relative">
                <div className="absolute top-1 w-3 h-0.5 bg-slate-400 dark:bg-white/30 rounded-full"></div>
                <div className="w-5 h-5 bg-slate-200 dark:bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-2.5 h-2.5 text-[#3b9e02] dark:text-[#57E600]" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2">Easy to Use</h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">Simple app, smooth<br />experience. Book rides<br />or parcels in a few taps.</p>
          </div>

        </div>

        {/* FAQ / HELP TOPICS SECTION */}
        <div className="w-full flex flex-col items-center pb-16 relative z-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
            <div className="w-6 h-[2px] bg-green-500/40 dark:bg-green-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {/* Booking & Rides */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Car className="w-5 h-5 text-[#3b9e02] dark:text-[#57E600]" /> Booking & Rides</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed"><strong className="text-slate-900 dark:text-white">How do I cancel a ride?</strong><br />You can cancel your ride from the active trip screen without any fee within the first 3 minutes of booking.</p>
            </div>
            {/* Payments & Refunds */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3"><IndianRupee className="w-5 h-5 text-amber-500 dark:text-[#ffba00]" /> Payments & Refunds</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed"><strong className="text-slate-900 dark:text-white">When will I get my refund?</strong><br />Refunds for cancelled rides or failed transactions are automatically processed within 3-5 business days to your original payment method.</p>
            </div>
            {/* Driver-Related Issues */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Users className="w-5 h-5 text-indigo-500 dark:text-[#7363ff]" /> Driver-Related Issues</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed"><strong className="text-slate-900 dark:text-white">Driver asked for extra cash?</strong><br />Ghumakkadh strictly prohibits offline payments over the estimated fare. Please report such incidents immediately via live chat or email.</p>
            </div>
            {/* Parcel Delivery */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Package className="w-5 h-5 text-amber-600 dark:text-[#d9a362]" /> Parcel Delivery</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed"><strong className="text-slate-900 dark:text-white">Is my parcel insured?</strong><br />Yes, all items sent via Ghumakkadh Parcel are insured up to ₹5,000 for loss or damage during transit.</p>
            </div>
            {/* Account & App Issues */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] md:col-span-2">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Smartphone className="w-5 h-5 text-[#3b9e02] dark:text-[#57E600]" /> Account & App Issues</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed"><strong className="text-slate-900 dark:text-white">I can't log in to my account.</strong><br />Ensure you are using the latest version of the app. If you changed your registered phone number, please contact us via email to securely update your profile details.</p>
            </div>
          </div>
        </div>

        {/* SUPPORT FORM & TICKET TRACKER SECTION */}
        <div className="w-full bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-6 sm:p-8 md:p-12 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] mb-16 max-w-4xl mx-auto transition-all" id="support-form-section">
          
          {/* Tab Switcher: Submit Ticket vs Track Status */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-100 dark:bg-white/10 p-1.5 rounded-2xl flex gap-1 border border-slate-200 dark:border-white/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSupportTab("create")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  supportTab === "create"
                    ? "bg-[#4eb902] text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Send className="w-4 h-4" />
                Submit a Ticket
              </button>
              <button
                type="button"
                onClick={() => setSupportTab("track")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  supportTab === "track"
                    ? "bg-[#4eb902] text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Search className="w-4 h-4" />
                Track Ticket Status
              </button>
            </div>
          </div>

          {/* TAB 1: CREATE SUPPORT TICKET */}
          {supportTab === "create" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">Still need help? Send us a message</h3>
                <p className="text-slate-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                  Fill out the form below and our dedicated support team will review and get back to you shortly.
                </p>
              </div>

              {/* Success Notification Card */}
              {submittedTicket && (
                <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col gap-4 animate-in fade-in duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-base">Support Ticket Created Successfully!</h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">Your ticket has been routed to our admin desk.</p>
                      </div>
                    </div>
                    {getStatusBadge(submittedTicket.status)}
                  </div>

                  <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">Your Ticket ID:</span>
                      <span className="font-mono font-black text-base text-[#3b9e02] dark:text-[#57E600]">{submittedTicket.id}</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleCopyTicketId(submittedTicket.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy ID"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTrackTicketId(submittedTicket.id);
                          setSupportTab("track");
                          handleTrackTicket(undefined, submittedTicket.id);
                        }}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4eb902] hover:bg-[#3d9400] text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
                      >
                        Track Live Status
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitTicket} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">
                      Topic / Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                    >
                      <option value="" disabled className="text-slate-400 dark:text-gray-400">Select a topic</option>
                      <option value="ride" className="text-slate-900 dark:text-gray-900">Ride Issue / Driver Experience</option>
                      <option value="drive" className="text-slate-900 dark:text-gray-900">Driver Onboarding & Verification</option>
                      <option value="parcel" className="text-slate-900 dark:text-gray-900">Parcel Delivery & Tracking</option>
                      <option value="payment" className="text-slate-900 dark:text-gray-900">Payment, Wallet & Refunds</option>
                      <option value="app_bug" className="text-slate-900 dark:text-gray-900">App Bug or Technical Error</option>
                      <option value="other" className="text-slate-900 dark:text-gray-900">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">Subject / Summary</label>
                  <input
                    type="text"
                    placeholder="Brief summary of your inquiry..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white font-bold text-sm mb-2">
                    Detailed Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    placeholder="Explain your issue or question in detail..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4eb902] hover:bg-[#3d9400] disabled:opacity-50 text-slate-950 font-bold py-3.5 px-8 rounded-xl transition-all mt-2 self-start shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: TRACK TICKET STATUS */}
          {supportTab === "track" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">Track Your Support Ticket</h3>
                <p className="text-slate-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                  Enter your unique Ticket ID below to check live status, agent updates, and resolutions.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={(e) => handleTrackTicket(e)} className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    placeholder="Enter Ticket ID (e.g. clx123abc...)"
                    value={trackTicketId}
                    onChange={(e) => setTrackTicketId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors font-mono"
                  />
                </div>
                <div className="flex-1 sm:max-w-xs">
                  <input
                    type="email"
                    placeholder="Verify Email (optional)"
                    value={trackEmail}
                    onChange={(e) => setTrackEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4eb902] focus:ring-1 focus:ring-[#4eb902] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTracking}
                  className="bg-[#4eb902] hover:bg-[#3d9400] disabled:opacity-50 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {isTracking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Check Status
                    </>
                  )}
                </button>
              </form>

              {trackError && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}

              {/* Status Display Card */}
              {trackResult && (
                <div className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col gap-6 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-slate-500 dark:text-gray-400 font-bold">TICKET #{trackResult.id}</span>
                        {getStatusBadge(trackResult.status)}
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">{trackResult.subject}</h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-slate-500 dark:text-gray-400 block font-medium">Submitted on</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-gray-300">
                        {new Date(trackResult.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Resolution banner if resolved */}
                  {trackResult.resolution && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <h5 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Admin Resolution Note:
                      </h5>
                      <p className="text-sm text-slate-800 dark:text-gray-200 font-medium">{trackResult.resolution}</p>
                    </div>
                  )}

                  {/* Message Thread */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">Conversation & Updates</h5>
                    <div className="space-y-3">
                      {trackResult.messages && trackResult.messages.length > 0 ? (
                        trackResult.messages.map((m: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl text-sm ${
                              m.senderType === "SUPPORT_TEAM"
                                ? "bg-[#4eb902]/10 border border-[#4eb902]/30 ml-4 sm:ml-8"
                                : "bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 mr-4 sm:mr-8"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className={`text-xs font-black ${m.senderType === "SUPPORT_TEAM" ? "text-[#3b9e02] dark:text-[#57E600]" : "text-slate-900 dark:text-white"}`}>
                                {m.senderType === "SUPPORT_TEAM" ? "🛡️ Ghumakkadh Support Team" : "👤 You (Submitted Message)"}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-gray-500">
                                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{m.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic">No messages recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Refresh Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleTrackTicket(undefined, trackResult.id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Refresh Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>


        {/* OFFICE ADDRESS */}
        <div className="w-full bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-8 md:p-12 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] mb-8 max-w-4xl mx-auto flex flex-col gap-8 items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4eb902]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex flex-col items-center z-10">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3"><MapPin className="w-5 h-5 text-[#3b9e02] dark:text-[#57E600]" /> Registered Office</h4>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
              Hindustaan Innovations Private Limited<br />
              CO: B-41, Sector-8A, Kamal-Vihar,<br />
              Raipur (C.G.) - 492001<br />
              Phone: 0771- 299 - 4005
            </p>
          </div>
        </div>

        {/* SOCIAL & COMMUNITY SUPPORT */}
        <div className="w-full flex flex-col items-center py-10 relative z-20 mb-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Connect with our Community</h3>
          <div className="flex gap-4">
            <a href="https://x.com/Hindustaan_in" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white rounded-full flex items-center justify-center transition-colors border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="font-bold text-lg">𝕏</span>
            </a>
            <a href="https://www.instagram.com/hindustaan_in?igsi=MXRzMDZpcnB4dWJsaA==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-[#E1306C] dark:text-gray-300 dark:hover:text-[#E1306C] rounded-full flex items-center justify-center transition-colors border border-slate-200 dark:border-white/10 shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 bg-slate-100 hover:bg-green-100 dark:bg-white/5 dark:hover:bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center transition-colors border border-slate-200 dark:border-white/10 shadow-sm">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* BOTTOM BRAND VALUES */}
        <div className="w-full bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] mb-8">

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0 mt-1">
              <Users className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1.5">Community First</h4>
              <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Building a community that<br />moves together and grows<br />together.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1.5">Trusted by Millions</h4>
              <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Millions of happy commuters<br />and customers across<br />India trust us.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start lg:pr-4">
            <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0 mt-1">
              <Star className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1.5">Always Improving</h4>
              <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">We keep innovating to bring<br />you better features and<br />experiences.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 items-start sm:flex-row sm:items-start">
            <div className="w-8 h-8 bg-[#4eb902] rounded-full flex items-center justify-center shrink-0 mt-1">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1.5">Made in India</h4>
              <p className="text-[12px] text-slate-600 dark:text-gray-400 font-medium leading-relaxed">Proudly made for India,<br />powering movement in<br />every city and town.</p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

