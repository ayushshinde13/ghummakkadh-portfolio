"use client";

import React, { useState, useEffect } from "react";
import { Search, ShieldAlert, AlertTriangle, AlertCircle, Eye, ShieldCheck, X, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function SafetyMonitoringPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActioning, setIsActioning] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/safety-monitoring/dashboard");
      if (res.success) {
        setDashboardStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch safety dashboard", error);
    }
  };

  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter.toUpperCase());

      const res = await api.get(`/admin/safety-monitoring/alerts?${params.toString()}`);
      if (res.success) {
        setEvents(res.data.alerts || []);
      }
    } catch (error) {
      console.error("Failed to fetch safety alerts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [searchQuery, statusFilter]);

  const handleAcknowledge = async () => {
    if (!selectedEvent || isActioning) return;
    setIsActioning(true);
    try {
      const res = await api.put(`/admin/safety-monitoring/alerts/${selectedEvent.id}/acknowledge`, {});
      if (res.success) {
        setIsModalOpen(false);
        await Promise.all([fetchAlerts(), fetchDashboard()]);
      }
    } catch (error: any) {
      alert(error.message || "Failed to acknowledge alert");
    } finally {
      setIsActioning(false);
    }
  };

  const handleResolve = async (resolveStatus: string) => {
    if (!selectedEvent || isActioning) return;
    setIsActioning(true);
    try {
      const res = await api.put(`/admin/safety-monitoring/alerts/${selectedEvent.id}/resolve`, {
        status: resolveStatus,
        notes: `Resolved by admin at ${new Date().toLocaleString()}`
      });
      if (res.success) {
        setIsModalOpen(false);
        await Promise.all([fetchAlerts(), fetchDashboard()]);
      }
    } catch (error: any) {
      alert(error.message || "Failed to resolve alert");
    } finally {
      setIsActioning(false);
    }
  };

  const handleInvestigate = async (alertId: string) => {
    try {
      const res = await api.get(`/admin/safety-monitoring/alerts/${alertId}`);
      if (res.success) {
        setSelectedEvent(res.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch alert details", error);
    }
  };

  const getSeverityFromStatus = (status: string) => {
    if (status === "TRIGGERED") return "High";
    if (status === "ACKNOWLEDGED") return "Medium";
    return "Low";
  };

  const getDisplayStatus = (status: string) => {
    if (["RESOLVED", "FALSE_ALARM"].includes(status)) return "Reviewed";
    return "Unreviewed";
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">Safety Monitoring</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Safety Monitoring</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Monitor SOS alerts, acknowledge emergencies, and resolve safety incidents in real-time.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Active Alerts</span>
            <div className="p-2 rounded-md bg-[var(--admin-border)]"><ShieldAlert size={16} className="text-[var(--admin-muted)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-text)]">
            {dashboardStats ? dashboardStats.totalActiveAlerts : "—"}
          </span>
        </div>
        
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Triggered (SOS)</span>
            <div className="p-2 rounded-md bg-red-500/10"><AlertTriangle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">
            {dashboardStats ? dashboardStats.triggeredAlertsCount : "—"}
          </span>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Resolved Today</span>
            <div className="p-2 rounded-md bg-green-500/10"><ShieldCheck size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">
            {dashboardStats ? dashboardStats.resolvedTodayCount : "—"}
          </span>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
        {/* Filter Row */}
        <div className="p-4 border-b border-[var(--admin-border)] bg-[var(--admin-border)] flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--admin-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Alert ID, Trip ID..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="triggered">Triggered</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="false_alarm">False Alarm</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium">Alert ID / Trip ID</th>
                <th className="px-4 py-3 font-medium">Triggered By</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
                    Fetching safety alerts...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No safety alerts found. All clear.
                  </td>
                </tr>
              ) : (
                events.map((row) => {
                  const severity = getSeverityFromStatus(row.status);
                  const displayStatus = getDisplayStatus(row.status);
                  return (
                    <tr key={row.id} className="hover:bg-[var(--admin-border)] transition-colors group">
                      <td className="px-4 py-4">
                        <div className="font-medium text-[var(--admin-text)] text-xs truncate max-w-[140px]" title={row.id}>{row.id.slice(-8)}</div>
                        <div className="text-xs text-[var(--admin-primary)] font-mono mt-0.5 truncate max-w-[140px]" title={row.tripId}>{row.tripId?.slice(-8) || "—"}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[var(--admin-text)] text-sm">{row.triggeredUser?.name || "Unknown"}</span>
                          <span className="text-[var(--admin-muted)] text-xs">{row.triggeredUser?.phone || ""}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[var(--admin-muted)] text-xs">
                        {row.lat && row.lng ? `${parseFloat(row.lat).toFixed(4)}, ${parseFloat(row.lng).toFixed(4)}` : "—"}
                      </td>
                      <td className="px-4 py-4">
                        {severity === "High" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500">
                            High
                          </span>
                        )}
                        {severity === "Medium" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                            Medium
                          </span>
                        )}
                        {severity === "Low" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                            Low
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-[var(--admin-muted)]">{formatTime(row.createdAt)}</td>
                      <td className="px-4 py-4">
                        {displayStatus === "Reviewed" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-500">
                            <ShieldCheck size={14} />
                            {row.status === "FALSE_ALARM" ? "False Alarm" : "Resolved"}
                          </span>
                        ) : row.status === "ACKNOWLEDGED" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400">
                            <Eye size={14} />
                            Acknowledged
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                            <AlertCircle size={14} />
                            Triggered
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleInvestigate(row.id)}
                            className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-border)] border border-[var(--admin-border)] hover:bg-[var(--admin-background)] text-[var(--admin-text)] text-xs font-medium transition-colors shrink-0 cursor-pointer"
                          >
                            <Eye size={14} />
                            Investigate
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigate Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500" />
                Investigate Safety Alert
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between items-start pb-4 border-b border-[var(--admin-border)]">
                <div>
                  <div className="text-sm text-[var(--admin-muted)]">Alert ID</div>
                  <div className="text-lg font-bold text-[var(--admin-text)] break-all">{selectedEvent.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[var(--admin-muted)]">Trip ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)] break-all">{selectedEvent.tripId}</div>
                </div>
              </div>

              {/* Triggered User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-border)]">
                  <div className="text-xs text-[var(--admin-muted)] mb-1">Triggered By</div>
                  <div className="text-sm font-medium text-[var(--admin-text)]">{selectedEvent.triggeredUser?.name || "Unknown"}</div>
                  <div className="text-xs text-[var(--admin-muted)] mt-0.5">{selectedEvent.triggeredUser?.phone || ""}</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-border)]">
                  <div className="text-xs text-[var(--admin-muted)] mb-1">Role</div>
                  <div className="text-sm font-medium text-[var(--admin-text)]">
                    {selectedEvent.triggeredUser?.roles?.join(", ") || "—"}
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              {selectedEvent.trip && (
                <div>
                  <div className="text-sm font-medium text-[var(--admin-muted)] mb-2">Trip Details</div>
                  <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] space-y-2">
                    {selectedEvent.trip.rider && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--admin-muted)]">Rider</span>
                        <span className="text-sm text-[var(--admin-text)]">{selectedEvent.trip.rider.name} ({selectedEvent.trip.rider.phone})</span>
                      </div>
                    )}
                    {selectedEvent.trip.driver && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--admin-muted)]">Driver</span>
                        <span className="text-sm text-[var(--admin-text)]">{selectedEvent.trip.driver.name} ({selectedEvent.trip.driver.phone})</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--admin-muted)]">Pickup</span>
                      <span className="text-sm text-[var(--admin-text)] text-right max-w-[60%] truncate">{selectedEvent.trip.pickupAddress || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--admin-muted)]">Drop</span>
                      <span className="text-sm text-[var(--admin-text)] text-right max-w-[60%] truncate">{selectedEvent.trip.dropAddress || "—"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Alert Details */}
              <div>
                <div className="text-sm font-medium text-[var(--admin-muted)] mb-2">Alert Details</div>
                <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--admin-muted)]">Status</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                      selectedEvent.status === "TRIGGERED" ? "border-red-500/20 bg-red-500/10 text-red-500" :
                      selectedEvent.status === "ACKNOWLEDGED" ? "border-amber-500/20 bg-amber-500/10 text-amber-500" :
                      "border-green-500/20 bg-green-500/10 text-green-500"
                    }`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--admin-muted)]">Location</span>
                    <span className="text-sm text-[var(--admin-text)]">
                      {selectedEvent.lat && selectedEvent.lng
                        ? `${parseFloat(selectedEvent.lat).toFixed(5)}, ${parseFloat(selectedEvent.lng).toFixed(5)}`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--admin-muted)]">Reported At</span>
                    <span className="text-sm text-[var(--admin-text)]">{formatTime(selectedEvent.createdAt)}</span>
                  </div>
                  {selectedEvent.notes && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-[var(--admin-muted)]">Notes</span>
                      <span className="text-sm text-[var(--admin-text)] text-right max-w-[60%]">{selectedEvent.notes}</span>
                    </div>
                  )}
                  {selectedEvent.resolvedAdmin && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--admin-muted)]">Resolved By</span>
                      <span className="text-sm text-[var(--admin-text)]">{selectedEvent.resolvedAdmin.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Contacts */}
              {selectedEvent.emergencyContacts && selectedEvent.emergencyContacts.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-[var(--admin-muted)] mb-2">Emergency Contacts</div>
                  <div className="space-y-2">
                    {selectedEvent.emergencyContacts.map((c: any) => (
                      <div key={c.id} className="p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] flex justify-between">
                        <span className="text-sm text-[var(--admin-text)]">{c.name}</span>
                        <span className="text-sm text-[var(--admin-muted)]">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm cursor-pointer"
              >
                Close
              </button>
              {selectedEvent.status === "TRIGGERED" && (
                <button 
                  onClick={handleAcknowledge}
                  disabled={isActioning}
                  className="px-4 py-2 rounded-md bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isActioning ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                  Acknowledge
                </button>
              )}
              {["TRIGGERED", "ACKNOWLEDGED"].includes(selectedEvent.status) && (
                <>
                  <button 
                    onClick={() => handleResolve("FALSE_ALARM")}
                    disabled={isActioning}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white font-bold hover:bg-gray-600 transition-colors text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    False Alarm
                  </button>
                  <button 
                    onClick={() => handleResolve("RESOLVED")}
                    disabled={isActioning}
                    className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isActioning ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                    Resolve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
