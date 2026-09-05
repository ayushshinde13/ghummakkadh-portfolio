"use client";

import React, { useState, useEffect } from "react";
import { Siren, PhoneCall, ShieldAlert, CheckCircle, Search, MapPin, X, FileText } from "lucide-react";
import { api } from "@/lib/api";
import io from "socket.io-client";

export default function SOSPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportDetails, setReportDetails] = useState<any>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/sos/alerts");
      const fetchedAlerts = res.data?.alerts || [];
      const formatted = fetchedAlerts.map((a: any) => ({
        id: a.id,
        tripId: a.tripId ? `Trip #${a.tripId}` : "N/A",
        triggeredBy: a.triggeredUser?.roles?.[0] || "User",
        name: a.triggeredUser?.name || "Unknown",
        location: a.trip?.pickupAddress || `${a.lat}, ${a.lng}`,
        time: new Date(a.createdAt).toLocaleString(),
        status: a.status === "TRIGGERED" ? "Active" : (a.status === "ACKNOWLEDGED" ? "Acknowledged" : "Resolved"),
        raw: a,
      }));
      setAlerts(formatted);
    } catch (error) {
      console.error("Failed to fetch SOS alerts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    
    // Connect to WebSocket for real-time SOS alerts
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://apighumkkad.allindiahub.com";
    const socket = io(backendUrl, { withCredentials: true });
    
    socket.on("SOS_ALERT_TRIGGERED", (payload) => {
      console.log("CRITICAL: SOS ALERT TRIGGERED", payload);
      alert(`🚨 NEW SOS ALERT TRIGGERED 🚨\nTrip: ${payload.tripId}`);
      fetchAlerts();
    });

    socket.on("SOS_ALERT_ACKNOWLEDGED", (payload) => {
      fetchAlerts();
    });
    
    socket.on("SOS_ALERT_RESOLVED", (payload) => {
      fetchAlerts();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredAlerts = alerts.filter(a => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = a.id.toLowerCase().includes(query) || a.name.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || a.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResolve = async (id: string) => {
    try {
      await api.put(`/admin/sos/alerts/${id}/resolve`, { status: "RESOLVED", notes: "Resolved by admin." });
      setIsModalOpen(false);
      fetchAlerts();
    } catch (error) {
      console.error("Failed to resolve SOS alert", error);
      alert("Failed to resolve SOS alert");
    }
  };

  const handleAcknowledge = async (id: string) => {
    try {
      await api.put(`/admin/sos/alerts/${id}/acknowledge`, {});
      fetchAlerts();
    } catch (error) {
      console.error("Failed to acknowledge SOS alert", error);
      alert("Failed to acknowledge SOS alert");
    }
  };

  const fetchAlertDetails = async (id: string) => {
    try {
      setIsDetailsLoading(true);
      const res = await api.get(`/admin/sos/alerts/${id}`);
      setReportDetails(res.data);
    } catch (error) {
      console.error("Failed to fetch SOS details", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleOpenModal = (row: any) => {
    setSelectedReport(row);
    setIsModalOpen(true);
    fetchAlertDetails(row.id);
  };

  const activeAlertsCount = alerts.filter(a => a.status === "Active").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">Safety (SOS)</span>
          </nav>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Emergency SOS Alerts</h2>
            {activeAlertsCount > 0 && (
              <span className="flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            )}
          </div>
          <p className="text-[var(--admin-muted)] mt-1">
            Immediate attention required for active panic button triggers.
          </p>
        </div>
      </div>

      {/* Prominent Stat Card */}
      <div className={`rounded-xl border p-6 flex items-center justify-between shadow-sm transition-all ${
        activeAlertsCount > 0 
          ? "bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
          : "bg-[var(--admin-card)] border-[var(--admin-border)]"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${activeAlertsCount > 0 ? "bg-red-500/20 text-red-500" : "bg-[var(--admin-border)] text-[var(--admin-muted)]"}`}>
            <Siren size={32} className={activeAlertsCount > 0 ? "animate-pulse" : ""} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${activeAlertsCount > 0 ? "text-red-400" : "text-[var(--admin-muted)]"}`}>
              Active SOS Alerts
            </h3>
            <span className={`text-4xl font-bold ${activeAlertsCount > 0 ? "text-red-500" : "text-[var(--admin-text)]"}`}>
              {activeAlertsCount}
            </span>
          </div>
        </div>
        
        {activeAlertsCount > 0 && (
          <div className="text-right">
            <span className="text-sm font-medium text-red-400 block mb-1">Status: CRITICAL</span>
            <span className="text-xs text-red-500/70">Immediate action required</span>
          </div>
        )}
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
              placeholder="Search alerts by ID or name..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-red-500/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-red-500/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium">SOS ID / Trip</th>
                <th className="px-4 py-3 font-medium">Triggered By</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Emergency Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredAlerts.map((row) => (
                <tr key={row.id} className={`transition-colors group ${row.status === "Active" ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-[var(--admin-border)]"}`}>
                  <td className="px-4 py-4">
                    <div className={`font-medium ${row.status === "Active" ? "text-red-400" : "text-[var(--admin-text)]"}`}>{row.id}</div>
                    <div className="text-xs text-[var(--admin-muted)] font-mono mt-0.5 cursor-pointer hover:underline">{row.tripId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-200">{row.name}</span>
                      <span className="text-xs text-[var(--admin-muted)]">{row.triggeredBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[var(--admin-muted)]">
                      <MapPin size={14} className="text-[var(--admin-muted)] shrink-0" />
                      <span className="line-clamp-1">{row.location}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 font-medium ${row.status === "Active" ? "text-red-400" : "text-[var(--admin-muted)]"}`}>
                    {row.time}
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "Active" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500 animate-pulse">
                        <Siren size={12} />
                        Active
                      </span>
                    )}
                    {row.status === "Acknowledged" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        <ShieldAlert size={12} />
                        Acknowledged
                      </span>
                    )}
                    {row.status === "Resolved" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]">
                        <CheckCircle size={12} />
                        Resolved
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.status === "Active" && (
                        <button 
                          onClick={() => handleAcknowledge(row.id)}
                          className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-amber-500 text-black text-xs font-bold shadow transition-colors hover:bg-amber-600 shrink-0 mr-2"
                        >
                          <ShieldAlert size={14} />
                          Acknowledge
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenModal(row)}
                        className="p-1.5 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors ml-2" 
                        title="View Incident Report"
                      >
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No SOS alerts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Report Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <FileText size={18} className="text-[var(--admin-muted)]" />
                Incident Report
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[var(--admin-border)]">
                <div>
                  <div className="text-sm text-[var(--admin-muted)]">Triggered By</div>
                  <div className="text-lg font-bold text-[var(--admin-text)]">{selectedReport.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[var(--admin-muted)]">SOS ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedReport.id}</div>
                </div>
              </div>

              <div className="space-y-4 pb-4 border-b border-[var(--admin-border)]">
                <div>
                  <div className="text-sm text-[var(--admin-muted)] mb-1">Incident Location</div>
                  <div className="flex items-center gap-2 text-[var(--admin-text)]">
                    <MapPin size={16} className="text-red-500" />
                    <span>{selectedReport.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[var(--admin-muted)]">Current Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    selectedReport.status === "Active" ? "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse" :
                    selectedReport.status === "Acknowledged" ? "bg-amber-500/20 text-amber-500 border-amber-500/30" :
                    "bg-green-500/20 text-[var(--admin-primary)] border-green-500/30"
                  }`}>
                    {selectedReport.status === "Active" && <Siren size={14} />}
                    {selectedReport.status === "Acknowledged" && <ShieldAlert size={14} />}
                    {selectedReport.status === "Resolved" && <CheckCircle size={14} />}
                    {selectedReport.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {isDetailsLoading && (
                <div className="text-center text-sm text-[var(--admin-muted)] py-4">Loading dossier...</div>
              )}
              {reportDetails && reportDetails.trip && (
                <div className="rounded-xl border border-[var(--admin-border)] overflow-hidden bg-[var(--admin-border)]">
                  <div className="p-3 bg-[var(--admin-border)] border-b border-[var(--admin-border)] text-sm font-semibold text-[var(--admin-text)]">Trip Involvement</div>
                  <div className="p-4 flex flex-col gap-2 text-sm text-[var(--admin-muted)]">
                    <p><span className="text-[var(--admin-muted)]">Rider:</span> {reportDetails.trip.rider?.name}</p>
                    <p><span className="text-[var(--admin-muted)]">Driver:</span> {reportDetails.trip.driver?.name || "N/A"}</p>
                    <p><span className="text-[var(--admin-muted)]">Status:</span> {reportDetails.trip.status}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm"
              >
                Close
              </button>
              {selectedReport.status === "Active" && (
                <button 
                  onClick={() => handleAcknowledge(selectedReport.id)}
                  className="px-4 py-2 rounded-md bg-amber-500 text-black font-bold hover:bg-amber-600 transition-colors text-sm flex items-center gap-1.5"
                >
                  <ShieldAlert size={16} />
                  Acknowledge Alert
                </button>
              )}
              {(selectedReport.status === "Active" || selectedReport.status === "Acknowledged") && (
                <button 
                  onClick={() => handleResolve(selectedReport.id)}
                  className="px-4 py-2 rounded-md bg-green-500 text-black font-bold hover:bg-green-600 transition-colors text-sm flex items-center gap-1.5"
                >
                  <CheckCircle size={16} />
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
