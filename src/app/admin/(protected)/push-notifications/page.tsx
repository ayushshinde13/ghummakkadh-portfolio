"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Send,
  BellRing,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Users,
  Calendar,
  Clock,
  Repeat,
  Zap,
  Trash2,
  CalendarClock,
  History,
  Sparkles,
  Smartphone,
  Tag,
  Car,
  User,
  ShieldCheck,
  Percent,
  Gift,
  Search,
} from "lucide-react";
import { api } from "@/lib/api";

const ALL_DAYS = [
  { id: "MON", label: "Mon" },
  { id: "TUE", label: "Tue" },
  { id: "WED", label: "Wed" },
  { id: "THU", label: "Thu" },
  { id: "FRI", label: "Fri" },
  { id: "SAT", label: "Sat" },
  { id: "SUN", label: "Sun" },
];

export interface NotificationTemplate {
  id: string;
  category: "ALL" | "RIDERS" | "DRIVERS" | "SPECIFIC";
  type: "SYSTEM" | "PROMOTION" | "TRIP_UPDATE" | "PAYMENT" | "SUPPORT";
  title: string;
  body: string;
  badge: string;
  iconName: string;
  description: string;
}

export const PREDEFINED_TEMPLATES: NotificationTemplate[] = [
  // --- DRIVERS TEMPLATES ---
  {
    id: "drv_surge_alert",
    category: "DRIVERS",
    type: "SYSTEM",
    badge: "Peak Demand",
    iconName: "Zap",
    title: "⚡ Surge Alert: High Demand in Your Area!",
    body: "Rider demand is surging in high-traffic commercial zones. Go online now to maximize your earnings with up to 1.5x - 2.0x surge rates!",
    description: "Encourage offline or roaming drivers to go online during rush hours or rain.",
  },
  {
    id: "drv_weekend_target",
    category: "DRIVERS",
    type: "PROMOTION",
    badge: "Bonus Target",
    iconName: "Gift",
    title: "💰 Weekend Cash Bonus: Complete 15 Rides!",
    body: "Hit your weekend target of 15 completed rides before Sunday midnight and get an instant ₹500 bonus credited straight to your Ghumkkadh Wallet.",
    description: "Incentivize driver completion rates and weekend driver availability.",
  },
  {
    id: "drv_doc_reminder",
    category: "DRIVERS",
    type: "SUPPORT",
    badge: "Compliance",
    iconName: "ShieldCheck",
    title: "📄 Document Renewal Reminder",
    body: "Please verify and update your driving license or vehicle insurance in the driver app to avoid any suspension of your ride assignment privileges.",
    description: "Remind drivers with expiring documents to upload renewals.",
  },
  {
    id: "drv_payout_processed",
    category: "DRIVERS",
    type: "PAYMENT",
    badge: "Earnings",
    iconName: "Gift",
    title: "💳 Weekly Payout Processed Successfully",
    body: "Your weekly net ride earnings have been calculated and dispatched to your registered bank account. Check your wallet ledger for details.",
    description: "Broadcast to drivers when payout cycle is triggered.",
  },
  {
    id: "drv_safe_driving",
    category: "DRIVERS",
    type: "SYSTEM",
    badge: "Safety Tip",
    iconName: "ShieldCheck",
    title: "🛡️ Safe Driving & Fuel Saver Tip",
    body: "Maintain smooth acceleration and check tire pressure daily to save up to 12% on fuel costs and ensure 5-star passenger ratings.",
    description: "Best practices tips for platform driver partners.",
  },

  // --- RIDERS TEMPLATES ---
  {
    id: "rdr_weekend_discount",
    category: "RIDERS",
    type: "PROMOTION",
    badge: "Promo Offer",
    iconName: "Percent",
    title: "🎟️ 20% Off Your Weekend Rides!",
    body: "Heading out this weekend? Use promo code WEEKEND20 at checkout to enjoy 20% discount (up to ₹50) on your next 3 city rides.",
    description: "Drive rider booking volume on weekends and holidays.",
  },
  {
    id: "rdr_rain_advisory",
    category: "RIDERS",
    type: "SYSTEM",
    badge: "Weather Alert",
    iconName: "Zap",
    title: "🌧️ Weather Advisory: Plan Your Ride Ahead",
    body: "Rain is forecasted in your city today. Extra drivers are on standby—book 5-10 minutes early to ensure on-time arrival and smooth pickup.",
    description: "Helpful prompt for riders during monsoons or heavy weather.",
  },
  {
    id: "rdr_parcel_feature",
    category: "RIDERS",
    type: "PROMOTION",
    badge: "Feature Spotlight",
    iconName: "Gift",
    title: "📦 Need to Send a Package? Try Ghumkkadh Parcel",
    body: "Send documents, keys, lunchboxes, or gifts across town with instant pickup, live OTP verification, and doorstep delivery at flat low fares!",
    description: "Cross-promote on-demand parcel courier service to riders.",
  },
  {
    id: "rdr_wallet_cashback",
    category: "RIDERS",
    type: "PAYMENT",
    badge: "Cashback",
    iconName: "Percent",
    title: "🎁 Add ₹500 to Wallet & Get ₹50 Free Credits",
    body: "Enjoy 1-tap seamless payments with zero cash hassle! Top up your Ghumkkadh Wallet today with ₹500 or more to get ₹50 extra bonus ride credits.",
    description: "Boost in-app wallet adoption and rider retention.",
  },
  {
    id: "rdr_safety_features",
    category: "RIDERS",
    type: "SYSTEM",
    badge: "Safety",
    iconName: "ShieldCheck",
    title: "🔒 Safety First: Share Your Live Trip",
    body: "Did you know you can share your live vehicle GPS location and driver details with family members with 1 tap from the ongoing ride screen?",
    description: "Educate riders on platform safety & emergency contact tools.",
  },

  // --- ALL USERS TEMPLATES ---
  {
    id: "all_maintenance",
    category: "ALL",
    type: "SYSTEM",
    badge: "Maintenance",
    iconName: "Clock",
    title: "⚙️ Scheduled System Maintenance Notice",
    body: "Ghumkkadh will undergo brief backend maintenance tonight from 02:00 AM to 02:30 AM IST. Ride bookings may experience minor delays.",
    description: "Notify all users in advance of planned technical maintenance windows.",
  },
  {
    id: "all_festival_wishes",
    category: "ALL",
    type: "PROMOTION",
    badge: "Festival Greeting",
    iconName: "Gift",
    title: "✨ Festive Greetings from Team Ghumkkadh!",
    body: "Wishing you and your family a joyous festival! Celebrate safely with reliable 24/7 rides and special holiday travel perks across your city.",
    description: "Engage the whole user base during major festivals and holidays.",
  },
  {
    id: "all_app_update",
    category: "ALL",
    type: "SYSTEM",
    badge: "App Upgrade",
    iconName: "Sparkles",
    title: "🚀 Exciting New Features Live: Update Your App!",
    body: "A brand new version of Ghumkkadh is now available with faster cab discovery, multi-stop routes, and enhanced live tracking. Update today!",
    description: "Encourage users to upgrade to the latest app release.",
  },

  // --- SPECIFIC USER TEMPLATES ---
  {
    id: "spec_miss_you",
    category: "SPECIFIC",
    type: "PROMOTION",
    badge: "Win-Back",
    iconName: "Gift",
    title: "👋 We Miss You! Here is a Special 25% Off",
    body: "It's been a while since your last trip with Ghumkkadh. We've added a special 25% discount voucher to your account for your next ride!",
    description: "Re-engage dormant riders or drivers with personalized win-back offers.",
  },
  {
    id: "spec_kyc_action",
    category: "SPECIFIC",
    type: "SUPPORT",
    badge: "Action Required",
    iconName: "ShieldCheck",
    title: "⚠️ Profile Action Required: Document Re-Upload",
    body: "Your submitted verification document could not be approved due to low clarity. Please re-upload a clear photo in your profile to complete verification.",
    description: "Targeted alert for individual drivers/users with onboarding issues.",
  },
  {
    id: "spec_referral_credited",
    category: "SPECIFIC",
    type: "PAYMENT",
    badge: "Referral Reward",
    iconName: "Gift",
    title: "🎉 Referral Reward Added to Your Wallet!",
    body: "Your invited friend has completed their first trip! Your referral reward has been credited directly to your Ghumkkadh wallet balance.",
    description: "Reward notification for individual user referrals.",
  },
];

export default function PushNotificationsPage() {
  const [activeTab, setActiveTab] = useState<"history" | "scheduled" | "templates">("history");
  const [history, setHistory] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [selectedAudience, setSelectedAudience] = useState<string>("ALL");
  const [notificationType, setNotificationType] = useState<string>("SYSTEM");
  const [titleInput, setTitleInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");
  const [userIdInput, setUserIdInput] = useState<string>("");

  const [scheduleType, setScheduleType] = useState<"IMMEDIATE" | "ONE_TIME" | "RECURRING">("IMMEDIATE");
  const [scheduledAt, setScheduledAt] = useState("");
  const [recurringDays, setRecurringDays] = useState<string[]>(["MON", "WED", "FRI"]);
  const [recurringTime, setRecurringTime] = useState("09:00");

  // Template filter on modal & template tab
  const [templateFilter, setTemplateFilter] = useState<string>("ALL");
  const [templateSearch, setTemplateSearch] = useState<string>("");
  const [showTemplateDrawer, setShowTemplateDrawer] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/notifications");
      if (res.success) {
        setHistory(res.data?.history || res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch notification history", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/notifications/schedules");
      if (res.success) {
        setSchedules(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    } else if (activeTab === "scheduled") {
      fetchSchedules();
    }
  }, [activeTab, fetchHistory, fetchSchedules]);

  const toggleDay = (dayId: string) => {
    setRecurringDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  // 1-Click apply predefined template to form
  const applyTemplate = (template: NotificationTemplate, openModal: boolean = false) => {
    setSelectedAudience(template.category);
    setNotificationType(template.type);
    setTitleInput(template.title);
    setBodyInput(template.body);
    setStatusMessage(null);
    setShowTemplateDrawer(false);

    if (openModal) {
      setIsModalOpen(true);
    }
  };

  const handleSendNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage(null);

    if (scheduleType === "ONE_TIME" && !scheduledAt) {
      setStatusMessage({ type: "error", text: "Please choose a date and time for the one-time schedule." });
      setIsSending(false);
      return;
    }

    if (scheduleType === "RECURRING" && recurringDays.length === 0) {
      setStatusMessage({ type: "error", text: "Please select at least one day for the recurring schedule." });
      setIsSending(false);
      return;
    }

    try {
      const payload: any = {
        audience: selectedAudience,
        userId: selectedAudience === "SPECIFIC" ? userIdInput : undefined,
        title: titleInput,
        body: bodyInput,
        type: notificationType,
        scheduleType,
      };

      if (scheduleType === "ONE_TIME") {
        payload.scheduledAt = new Date(scheduledAt).toISOString();
      } else if (scheduleType === "RECURRING") {
        payload.recurringDays = recurringDays;
        payload.recurringTime = recurringTime;
      }

      const res = await api.post("/admin/notifications/send", payload);

      const msg =
        res.message ||
        (scheduleType === "IMMEDIATE"
          ? "Push notification broadcasted successfully!"
          : "Notification schedule registered successfully!");
      setStatusMessage({ type: "success", text: msg });

      setTimeout(() => {
        setIsModalOpen(false);
        setStatusMessage(null);
        if (scheduleType === "IMMEDIATE") {
          setActiveTab("history");
          fetchHistory();
        } else {
          setActiveTab("scheduled");
          fetchSchedules();
        }
      }, 1500);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Failed to process notification.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCancelSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to cancel this scheduled notification?")) return;

    try {
      const res = await api.delete(`/admin/notifications/schedules/${scheduleId}`);
      if (res.success) {
        fetchSchedules();
      }
    } catch (err) {
      console.error("Failed to cancel schedule", err);
    }
  };

  // Filtered templates for drawer/tab
  const filteredTemplates = useMemo(() => {
    return PREDEFINED_TEMPLATES.filter((tpl) => {
      const matchesCategory = templateFilter === "ALL" || tpl.category === templateFilter;
      const matchesQuery =
        tpl.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
        tpl.body.toLowerCase().includes(templateSearch.toLowerCase()) ||
        tpl.badge.toLowerCase().includes(templateSearch.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [templateFilter, templateSearch]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">Push Notifications</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Push Notifications</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Broadcast targeted notifications, use audience-specific templates, or set automated recurring schedules.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab("templates");
            }}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-card)] border border-[var(--admin-border)] hover:border-[var(--admin-primary)]/50 text-[var(--admin-text)] text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles size={16} className="text-[var(--admin-primary)]" />
            Template Library
          </button>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setStatusMessage(null);
            }}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[#66E000] cursor-pointer"
          >
            <BellRing size={16} />
            Create Broadcast
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--admin-border)] pb-2 flex-wrap">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "history"
              ? "bg-[var(--admin-border)] text-[var(--admin-text)] font-semibold border-b-2 border-[var(--admin-primary)]"
              : "text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <History size={16} />
          Broadcast History
        </button>

        <button
          onClick={() => setActiveTab("scheduled")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "scheduled"
              ? "bg-[var(--admin-border)] text-[var(--admin-text)] font-semibold border-b-2 border-[var(--admin-primary)]"
              : "text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <CalendarClock size={16} />
          Scheduled Broadcasts
          {schedules.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[var(--admin-primary)]/20 text-[var(--admin-primary)] font-bold">
              {schedules.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "templates"
              ? "bg-[var(--admin-border)] text-[var(--admin-text)] font-semibold border-b-2 border-[var(--admin-primary)]"
              : "text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <Sparkles size={16} className="text-[var(--admin-primary)]" />
          Audience Templates
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-white/10 text-[var(--admin-text)] font-bold">
            {PREDEFINED_TEMPLATES.length}
          </span>
        </button>
      </div>

      {/* Tab Content: Broadcast History */}
      {activeTab === "history" && (
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Title & Message</th>
                  <th className="px-4 py-3 font-medium">Audience</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status (Sent/Fail)</th>
                  <th className="px-4 py-3 font-medium">Date Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                      <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2 text-[var(--admin-primary)]" />
                      Fetching broadcast history...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                      No broadcast history found.
                    </td>
                  </tr>
                ) : (
                  history.map((row) => (
                    <tr key={row.id} className="hover:bg-[var(--admin-border)] transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[var(--admin-text)]">{row.title}</span>
                          <span className="text-xs text-[var(--admin-muted)] max-w-sm truncate">{row.body}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] text-xs text-[var(--admin-text)] font-medium">
                          <Users size={12} className="text-[var(--admin-primary)]" />
                          {row.audience}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-semibold px-2 py-1 bg-gray-500/10 text-gray-300 rounded border border-gray-500/20">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 size={12} /> {row.successCount || 0}
                          </span>
                          {row.failCount > 0 && (
                            <span className="text-red-500 text-xs font-semibold flex items-center gap-1">
                              <AlertCircle size={12} /> {row.failCount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[var(--admin-muted)] text-xs">
                        {new Date(row.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Scheduled Broadcasts */}
      {activeTab === "scheduled" && (
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Title & Message</th>
                  <th className="px-4 py-3 font-medium">Audience</th>
                  <th className="px-4 py-3 font-medium">Schedule Details</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                      <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2 text-[var(--admin-primary)]" />
                      Loading scheduled broadcasts...
                    </td>
                  </tr>
                ) : schedules.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                      <CalendarClock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="font-medium text-[var(--admin-text)]">No scheduled broadcasts configured</p>
                      <p className="text-xs text-[var(--admin-muted)] mt-1">
                        Use the "Create Broadcast" button above to schedule a notification.
                      </p>
                    </td>
                  </tr>
                ) : (
                  schedules.map((row) => (
                    <tr key={row.id} className="hover:bg-[var(--admin-border)] transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[var(--admin-text)]">{row.title}</span>
                          <span className="text-xs text-[var(--admin-muted)] max-w-sm truncate">{row.body}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] text-xs text-[var(--admin-text)] font-medium">
                          <Users size={12} className="text-[var(--admin-primary)]" />
                          {row.audience}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {row.scheduleType === "ONE_TIME" ? (
                          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                            <Calendar size={13} />
                            <span>{new Date(row.scheduledAt).toLocaleString()}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                              <Repeat size={13} />
                              <span>Recurring at {row.recurringTime}</span>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                              {row.recurringDays?.map((d: string) => (
                                <span
                                  key={d}
                                  className="px-1.5 py-0.5 bg-[var(--admin-border)] rounded text-[10px] text-[var(--admin-muted)] font-mono"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            row.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                          }`}
                        >
                          <Clock size={11} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => handleCancelSchedule(row.id)}
                          title="Cancel Schedule"
                          className="p-1.5 rounded-md hover:bg-red-500/10 text-[var(--admin-muted)] hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Pre-defined Audience Templates Gallery */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--admin-card)] p-4 rounded-xl border border-[var(--admin-border)]">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: "ALL", label: "All Templates", icon: Users },
                { id: "DRIVERS", label: "Driver Alerts", icon: Car },
                { id: "RIDERS", label: "Rider Offers", icon: User },
                { id: "SPECIFIC", label: "1-on-1 User", icon: Tag },
              ].map((filter) => {
                const Icon = filter.icon;
                const active = templateFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setTemplateFilter(filter.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-[var(--admin-primary)] text-[#0A0E1A]"
                        : "bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
                    }`}
                  >
                    <Icon size={13} />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
              <input
                type="text"
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                placeholder="Search templates by keyword..."
                className="w-full sm:w-64 h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md pl-8 pr-3 text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)] transition-all"
              />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 flex flex-col justify-between hover:border-[var(--admin-primary)]/50 transition-all shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        template.category === "DRIVERS"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : template.category === "RIDERS"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : template.category === "SPECIFIC"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {template.badge} • {template.category}
                    </span>

                    <span className="text-[11px] font-mono text-[var(--admin-muted)]">{template.type}</span>
                  </div>

                  <h4 className="text-base font-bold text-[var(--admin-text)] group-hover:text-[var(--admin-primary)] transition-colors leading-snug">
                    {template.title}
                  </h4>

                  <p className="text-xs text-[var(--admin-muted)] mt-2 leading-relaxed line-clamp-3">
                    {template.body}
                  </p>

                  <p className="text-[11px] text-[var(--admin-muted)]/70 italic mt-3 pt-2 border-t border-white/5">
                    💡 {template.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--admin-border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--admin-muted)]">Target: {template.category}</span>
                  <button
                    onClick={() => applyTemplate(template, true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--admin-primary)]/10 hover:bg-[var(--admin-primary)] text-[var(--admin-primary)] hover:text-[#0A0E1A] text-xs font-bold transition-all cursor-pointer"
                  >
                    <Send size={12} />
                    Use & Broadcast
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broadcast & Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <div className="flex items-center gap-2">
                <Send size={18} className="text-[var(--admin-primary)]" />
                <h3 className="text-[var(--admin-text)] font-bold tracking-tight text-base">
                  Compose Broadcast / Schedule
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowTemplateDrawer(!showTemplateDrawer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--admin-card)] border border-[var(--admin-primary)]/40 text-[var(--admin-primary)] text-xs font-bold hover:bg-[var(--admin-primary)]/10 transition-colors cursor-pointer"
                >
                  <Sparkles size={14} />
                  {showTemplateDrawer ? "Hide Templates" : "Predefined Templates"}
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Quick Templates Drawer (Slide Down) */}
            {showTemplateDrawer && (
              <div className="p-4 bg-[var(--admin-card)] border-b border-[var(--admin-border)] max-h-60 overflow-y-auto space-y-3 animate-in slide-in-from-top-2 duration-150 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--admin-text)] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[var(--admin-primary)]" />
                    Click a predefined template to auto-fill:
                  </span>
                  <div className="flex gap-1.5">
                    {["ALL", "DRIVERS", "RIDERS", "SPECIFIC"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setTemplateFilter(cat)}
                        className={`px-2 py-0.5 text-[10px] rounded font-bold cursor-pointer transition-colors ${
                          templateFilter === cat
                            ? "bg-[var(--admin-primary)] text-[#0A0E1A]"
                            : "bg-[var(--admin-border)] text-[var(--admin-muted)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {filteredTemplates.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyTemplate(t, false)}
                      className="text-left p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)] hover:border-[var(--admin-primary)]/60 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[var(--admin-primary)]/10 text-[var(--admin-primary)] uppercase">
                            {t.category}
                          </span>
                          <span className="text-[9px] text-[var(--admin-muted)]">{t.badge}</span>
                        </div>
                        <p className="text-xs font-bold text-[var(--admin-text)] truncate">{t.title}</p>
                        <p className="text-[11px] text-[var(--admin-muted)] line-clamp-1 mt-0.5">{t.body}</p>
                      </div>
                      <span className="text-[10px] text-[var(--admin-primary)] font-semibold mt-1">
                        + Apply Template
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSendNotification} className="flex-1 overflow-y-auto">
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Form Inputs */}
                <div className="lg:col-span-2 space-y-4">
                  {statusMessage && (
                    <div
                      className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
                        statusMessage.type === "success"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {statusMessage.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span className="font-medium">{statusMessage.text}</span>
                    </div>
                  )}

                  {/* Delivery Timing Options */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider mb-2">
                      Delivery Timing
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "IMMEDIATE", label: "Immediate", icon: Zap },
                        { id: "ONE_TIME", label: "One-Time", icon: CalendarClock },
                        { id: "RECURRING", label: "Recurring", icon: Repeat },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = scheduleType === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setScheduleType(opt.id as any)}
                            className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[var(--admin-primary)]/10 border-[var(--admin-primary)] text-[var(--admin-primary)] shadow-sm"
                                : "bg-[var(--admin-card)] border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-border)]"
                            }`}
                          >
                            <Icon size={14} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* One-Time Date & Time Picker */}
                  {scheduleType === "ONE_TIME" && (
                    <div className="p-3.5 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl space-y-2">
                      <label className="block text-xs font-semibold text-[var(--admin-text)]">
                        Select Date & Time (Future)
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        required={scheduleType === "ONE_TIME"}
                        className="w-full h-10 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                      />
                    </div>
                  )}

                  {/* Recurring Days & Time Picker */}
                  {scheduleType === "RECURRING" && (
                    <div className="p-3.5 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--admin-text)] mb-1.5">
                          Active Days of Week
                        </label>
                        <div className="flex gap-1.5 flex-wrap">
                          {ALL_DAYS.map((day) => {
                            const isActive = recurringDays.includes(day.id);
                            return (
                              <button
                                type="button"
                                key={day.id}
                                onClick={() => toggleDay(day.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                  isActive
                                    ? "bg-[var(--admin-primary)] text-[#0A0E1A]"
                                    : "bg-[var(--admin-background)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
                                }`}
                              >
                                {day.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--admin-text)] mb-1.5">
                          Daily Execution Time (24h)
                        </label>
                        <input
                          type="time"
                          value={recurringTime}
                          onChange={(e) => setRecurringTime(e.target.value)}
                          required={scheduleType === "RECURRING"}
                          className="w-full h-10 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Audience & Type Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">
                        Target Audience
                      </label>
                      <select
                        name="audience"
                        value={selectedAudience}
                        onChange={(e) => setSelectedAudience(e.target.value)}
                        className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                      >
                        <option value="ALL">All Active Users</option>
                        <option value="RIDERS">Only Riders</option>
                        <option value="DRIVERS">Only Drivers</option>
                        <option value="SPECIFIC">Specific User ID</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">
                        Notification Type
                      </label>
                      <select
                        name="type"
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                        className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                      >
                        <option value="SYSTEM">System Alert</option>
                        <option value="PROMOTION">Promotion</option>
                        <option value="TRIP_UPDATE">Trip Update</option>
                        <option value="PAYMENT">Payment Alert</option>
                        <option value="SUPPORT">Support Message</option>
                      </select>
                    </div>
                  </div>

                  {selectedAudience === "SPECIFIC" && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">User ID</label>
                      <input
                        name="userId"
                        type="text"
                        required
                        value={userIdInput}
                        onChange={(e) => setUserIdInput(e.target.value)}
                        placeholder="Enter the target user's UUID"
                        className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                      />
                    </div>
                  )}

                  {/* Title & Body */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Notification Title</label>
                    <input
                      name="title"
                      type="text"
                      required
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="e.g. ⚡ Surge Alert: High Demand in Your Area!"
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Message Content</label>
                    <textarea
                      name="body"
                      required
                      rows={4}
                      value={bodyInput}
                      onChange={(e) => setBodyInput(e.target.value)}
                      placeholder="Enter the push message text..."
                      className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 py-2 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Right Col: Live Mobile Lockscreen Preview */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Smartphone size={14} className="text-[var(--admin-primary)]" />
                    Mobile Push Preview
                  </span>

                  <div className="p-4 rounded-2xl bg-[#0F1420] border border-[var(--admin-border)] space-y-4 flex-1 flex flex-col justify-start">
                    <div className="flex items-center justify-between text-[10px] text-[var(--admin-muted)] border-b border-white/5 pb-2">
                      <span>Ghumkkadh • Push Simulation</span>
                      <span>Just now</span>
                    </div>

                    {/* Simulated Notification Card */}
                    <div className="p-3.5 rounded-xl bg-[var(--admin-card)] border border-white/10 shadow-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[var(--admin-primary)] flex items-center justify-center text-[#0A0E1A] font-black text-[10px]">
                            G
                          </div>
                          <span className="text-xs font-bold text-[var(--admin-text)]">GHUMKKADH</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--admin-border)] text-[var(--admin-muted)] font-mono">
                          {notificationType}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-[var(--admin-text)] leading-snug">
                          {titleInput || "Notification Title Appears Here"}
                        </h5>
                        <p className="text-[11px] text-[var(--admin-muted)] mt-1 leading-relaxed">
                          {bodyInput || "Your notification body content will be displayed on the user's mobile screen here."}
                        </p>
                      </div>

                      <div className="pt-1.5 flex items-center justify-between text-[10px] text-[var(--admin-primary)] border-t border-white/5">
                        <span>Target: {selectedAudience}</span>
                        <span>1-Tap to Open →</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 text-center">
                      <span className="text-[11px] text-[var(--admin-muted)] block">
                        Estimated Delivery: {scheduleType === "IMMEDIATE" ? "Instant (Live FCM/APNS)" : scheduleType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(126,211,33,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : scheduleType === "IMMEDIATE" ? (
                    <Send size={16} />
                  ) : (
                    <CalendarClock size={16} />
                  )}
                  {isSending
                    ? "Processing..."
                    : scheduleType === "IMMEDIATE"
                    ? "Broadcast Now"
                    : "Save Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
