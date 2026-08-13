"use client";

import React, { useState } from "react";
import { Siren, PhoneCall, ShieldAlert, CheckCircle, Search, MapPin, X, FileText } from "lucide-react";

export default function SOSPage() {
  const [alerts, setAlerts] = useState([
    { id: "SOS-590", tripId: "TRP-84729", triggeredBy: "Customer", name: "Priya Sharma", location: "Marine Drive, Raipur", time: "Just now", status: "Active" },
    { id: "SOS-589", tripId: "TRP-84610", triggeredBy: "Driver", name: "Ramesh Kumar", location: "Highway 43, Bhilai", time: "2 hrs ago", status: "Resolved" },
    { id: "SOS-588", tripId: "TRP-84592", triggeredBy: "Customer", name: "Sneha Gupta", location: "City Center, Bilaspur", time: "1 day ago", status: "Resolved" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAlerts = alerts.filter(a => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = a.id.toLowerCase().includes(query) || a.name.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || a.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResolve = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Resolved" } : a));
  };

  const activeAlertsCount = alerts.filter(a => a.status === "Active").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Safety (SOS)</span>
          </nav>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">Emergency SOS Alerts</h2>
            {activeAlertsCount > 0 && (
              <span className="flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            )}
          </div>
          <p className="text-gray-400 mt-1">
            Immediate attention required for active panic button triggers.
          </p>
        </div>
      </div>

      {/* Prominent Stat Card */}
      <div className={`rounded-xl border p-6 flex items-center justify-between shadow-sm transition-all ${
        activeAlertsCount > 0 
          ? "bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
          : "bg-[#111827]/50 border-white/10"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${activeAlertsCount > 0 ? "bg-red-500/20 text-red-500" : "bg-white/5 text-gray-400"}`}>
            <Siren size={32} className={activeAlertsCount > 0 ? "animate-pulse" : ""} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${activeAlertsCount > 0 ? "text-red-400" : "text-gray-400"}`}>
              Active SOS Alerts
            </h3>
            <span className={`text-4xl font-bold ${activeAlertsCount > 0 ? "text-red-500" : "text-white"}`}>
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
      <div className="rounded-xl border border-white/10 bg-[#111827]/50 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Row */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts by ID or name..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-red-500/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
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
                <tr key={row.id} className={`transition-colors group ${row.status === "Active" ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-white/5"}`}>
                  <td className="px-4 py-4">
                    <div className={`font-medium ${row.status === "Active" ? "text-red-400" : "text-white"}`}>{row.id}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5 cursor-pointer hover:underline">{row.tripId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-200">{row.name}</span>
                      <span className="text-xs text-gray-500">{row.triggeredBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <MapPin size={14} className="text-gray-500 shrink-0" />
                      <span className="line-clamp-1">{row.location}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 font-medium ${row.status === "Active" ? "text-red-400" : "text-gray-400"}`}>
                    {row.time}
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "Active" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/30 bg-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        {row.status}
                      </span>
                    )}
                    {row.status === "Resolved" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-green-500">
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.status === "Active" ? (
                        <>
                          <button 
                            onClick={() => alert(`Calling ${row.name}...`)}
                            className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white text-[#0A0E1A] text-xs font-bold shadow hover:bg-gray-200 shrink-0 transition-colors"
                          >
                            <PhoneCall size={14} />
                            Call
                          </button>
                          <button 
                            onClick={() => alert(`Dispatching emergency services to ${row.location}...`)}
                            className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-red-600 text-white text-xs font-bold shadow hover:bg-red-700 shrink-0 transition-colors"
                          >
                            <ShieldAlert size={14} />
                            Dispatch
                          </button>
                          <button 
                            onClick={() => handleResolve(row.id)}
                            className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-green-500 transition-colors ml-2" 
                            title="Mark Resolved"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => { setSelectedReport(row); setIsModalOpen(true); }}
                          className="text-xs font-medium text-gray-500 hover:text-white transition-colors"
                        >
                          View Report
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
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
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <FileText size={18} className="text-gray-400" />
                Incident Report
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400">Triggered By</div>
                  <div className="text-lg font-bold text-white">{selectedReport.name} ({selectedReport.triggeredBy})</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">SOS ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedReport.id}</div>
                </div>
              </div>

              <div className="space-y-4 pb-4 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Incident Location</div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin size={16} className="text-red-500" />
                    <span>{selectedReport.location}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Time of Incident</div>
                    <div className="text-sm font-medium text-white">{selectedReport.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Associated Trip</div>
                    <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedReport.tripId}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Final Status</div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-green-500">
                  {selectedReport.status}
                </span>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-md bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
