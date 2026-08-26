"use client";

import React, { useState, useEffect, useCallback } from "react";
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

export default function PushNotificationsPage() {
  const [activeTab, setActiveTab] = useState<"history" | "scheduled">("history");
  const [history, setHistory] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [selectedAudience, setSelectedAudience] = useState("ALL");
  const [scheduleType, setScheduleType] = useState<"IMMEDIATE" | "ONE_TIME" | "RECURRING">("IMMEDIATE");
  const [scheduledAt, setScheduledAt] = useState("");
  const [recurringDays, setRecurringDays] = useState<string[]>(["MON", "WED", "FRI"]);
  const [recurringTime, setRecurringTime] = useState("09:00");

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/notifications");
      if (res.success) {
        setHistory(res.data || []);
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
    } else {
      fetchSchedules();
    }
  }, [activeTab, fetchHistory, fetchSchedules]);

  const toggleDay = (dayId: string) => {
    setRecurringDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const handleSendNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const audience = formData.get("audience") as string;
    const userId = formData.get("userId") as string;
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

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
        audience,
        userId: audience === "SPECIFIC" ? userId : undefined,
        title,
        body,
        type,
        scheduleType,
      };

      if (scheduleType === "ONE_TIME") {
        payload.scheduledAt = new Date(scheduledAt).toISOString();
      } else if (scheduleType === "RECURRING") {
        payload.recurringDays = recurringDays;
        payload.recurringTime = recurringTime;
      }

      const res = await api.post("/admin/notifications/send", payload);

      const msg = res.message || (scheduleType === "IMMEDIATE" ? "Push notification broadcasted successfully!" : "Notification schedule registered successfully!");
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
            Broadcast immediate alerts or configure one-time and recurring notification schedules.
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedAudience("ALL");
            setScheduleType("IMMEDIATE");
            setStatusMessage(null);
          }}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0 cursor-pointer"
        >
          <BellRing size={16} />
          Create Broadcast
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--admin-border)] pb-2">
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
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] text-xs text-[var(--admin-muted)] font-medium">
                          <Users size={12} />
                          {row.audience}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-medium px-2 py-1 bg-gray-500/10 text-gray-400 rounded border border-gray-500/20">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 text-xs font-medium flex items-center gap-1">
                            <CheckCircle2 size={12} /> {row.successCount}
                          </span>
                          <span className="text-red-500 text-xs font-medium flex items-center gap-1">
                            <AlertCircle size={12} /> {row.failCount}
                          </span>
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
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] text-xs text-[var(--admin-muted)] font-medium">
                          <Users size={12} />
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
                                <span key={d} className="px-1.5 py-0.5 bg-[var(--admin-border)] rounded text-[10px] text-[var(--admin-muted)] font-mono">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                        }`}>
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

      {/* Broadcast & Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <Send size={18} className="text-[var(--admin-primary)]" />
                Create Broadcast / Schedule
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendNotification} className="flex-1 overflow-y-auto">
              <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-4">
                {statusMessage && (
                  <div
                    className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
                      statusMessage.type === "success"
                        ? "bg-green-500/10 border-green-500/20 text-green-500"
                        : "bg-red-500/10 border-red-500/20 text-red-500"
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
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-2">Delivery Timing</label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Target Audience</label>
                    <select
                      name="audience"
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                    >
                      <option value="ALL">All Users</option>
                      <option value="RIDERS">Only Riders</option>
                      <option value="DRIVERS">Only Drivers</option>
                      <option value="SPECIFIC">Specific User ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Notification Type</label>
                    <select
                      name="type"
                      defaultValue="SYSTEM"
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
                      placeholder="Enter the user's UUID"
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. 50% Off Your Next Ride!"
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Message Body</label>
                  <textarea
                    name="body"
                    required
                    rows={3}
                    placeholder="Enter the notification content..."
                    className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 py-2 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all resize-none"
                  />
                </div>
              </div>

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
