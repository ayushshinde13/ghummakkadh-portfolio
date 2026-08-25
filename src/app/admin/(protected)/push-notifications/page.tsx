"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Send, MoreHorizontal, BellRing, X, AlertCircle, CheckCircle2, Loader2, Users } from "lucide-react";
import { api } from "@/lib/api";

export default function PushNotificationsPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/notifications");
      if (res.success) {
        setHistory(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notification history", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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

    try {
      await api.post("/admin/notifications/send", {
        audience,
        userId: audience === "SPECIFIC" ? userId : undefined,
        title,
        body,
        type,
      });

      setStatusMessage({ type: "success", text: "Push notification broadcasted successfully!" });
      setTimeout(() => {
        setIsModalOpen(false);
        setStatusMessage(null);
        fetchHistory();
      }, 2000);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Failed to send notification.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const [selectedAudience, setSelectedAudience] = useState("ALL");

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
            View notification history and broadcast new messages to users.
          </p>
        </div>
        <button 
          onClick={() => { setIsModalOpen(true); setSelectedAudience("ALL"); setStatusMessage(null); }}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0 cursor-pointer"
        >
          <BellRing size={16} />
          Broadcast Notification
        </button>
      </div>

      {/* Main Table Section */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium">Title & Message</th>
                <th className="px-4 py-3 font-medium">Audience</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status (Sent/Fail)</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
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

      {/* Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <Send size={18} className="text-[var(--admin-primary)]" />
                Broadcast Notification
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSendNotification}>
              <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-4">
                {statusMessage && (
                  <div className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
                    statusMessage.type === "success"
                      ? "bg-green-500/10 border-green-500/20 text-green-500"
                      : "bg-red-500/10 border-red-500/20 text-red-500"
                  }`}>
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium">{statusMessage.text}</span>
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
                      <option value="UPDATE">App Update</option>
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
              
              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3">
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
                  {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {isSending ? "Sending..." : "Broadcast"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
