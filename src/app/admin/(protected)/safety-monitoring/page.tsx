"use client";

import React, { useState } from "react";
import { Search, ShieldAlert, AlertTriangle, AlertCircle, Eye, ShieldCheck, X } from "lucide-react";

import { mockSafetyEvents } from "../../constants/dummy_data";

export default function SafetyMonitoringPage() {
  const [events, setEvents] = useState(mockSafetyEvents);

  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = events.filter(evt => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = evt.id.toLowerCase().includes(query) || 
                          evt.tripId.toLowerCase().includes(query) ||
                          evt.driver.toLowerCase().includes(query) ||
                          evt.customer.toLowerCase().includes(query);
    const matchesSeverity = severityFilter === "all" || evt.severity.toLowerCase() === severityFilter;
    const matchesStatus = statusFilter === "all" || evt.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleMarkReviewed = () => {
    if (selectedEvent) {
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? { ...e, status: "Reviewed" } : e));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Safety Monitoring</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Safety Monitoring</h2>
          <p className="text-gray-400 mt-1">
            Monitor auto-flagged trip anomalies like speeding, unexpected stops, and route deviations.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Flags Today</span>
            <div className="p-2 rounded-md bg-white/5"><ShieldAlert size={16} className="text-gray-400" /></div>
          </div>
          <span className="text-3xl font-bold text-white">42</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">High Severity</span>
            <div className="p-2 rounded-md bg-red-500/10"><AlertTriangle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">5</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Unreviewed</span>
            <div className="p-2 rounded-md bg-amber-500/10"><AlertCircle size={16} className="text-amber-500" /></div>
          </div>
          <span className="text-3xl font-bold text-amber-500">12</span>
        </div>
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
              placeholder="Search by Trip ID, Driver, Customer..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Severity: All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="unreviewed">Unreviewed</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-medium">Event ID / Trip ID</th>
                <th className="px-4 py-3 font-medium">Participants</th>
                <th className="px-4 py-3 font-medium">Event Type</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredEvents.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.id}</div>
                    <div className="text-xs text-[var(--admin-primary)] font-mono mt-0.5 cursor-pointer hover:underline">{row.tripId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-gray-500 text-[10px]">C:</span>
                        <span className="text-gray-300">{row.customer}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-gray-500 text-[10px]">D:</span>
                        <span className="text-gray-300">{row.driver}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-white">{row.type}</td>
                  <td className="px-4 py-4">
                    {row.severity === "High" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500">
                        High
                      </span>
                    )}
                    {row.severity === "Medium" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        Medium
                      </span>
                    )}
                    {row.severity === "Low" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                        Low
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-400">{row.time}</td>
                  <td className="px-4 py-4">
                    {row.status === "Reviewed" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-500">
                        <ShieldCheck size={14} />
                        Reviewed
                      </span>
                    )}
                    {row.status === "Unreviewed" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                        <AlertCircle size={14} />
                        Unreviewed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedEvent(row); setIsModalOpen(true); }}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors shrink-0"
                      >
                        <Eye size={14} />
                        Investigate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No events found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigate Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500" />
                Investigate Safety Event
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400">Event ID</div>
                  <div className="text-lg font-bold text-white">{selectedEvent.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Trip ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedEvent.tripId}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Customer</div>
                  <div className="text-sm font-medium text-white">{selectedEvent.customer}</div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Driver</div>
                  <div className="text-sm font-medium text-white">{selectedEvent.driver}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-400 mb-2">Event Details</div>
                <div className="p-4 rounded-xl border border-white/10 bg-[#111827] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Type</span>
                    <span className="text-sm text-white font-medium">{selectedEvent.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Severity</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                      selectedEvent.severity === "High" ? "border-red-500/20 bg-red-500/10 text-red-500" :
                      selectedEvent.severity === "Medium" ? "border-amber-500/20 bg-amber-500/10 text-amber-500" :
                      "border-blue-500/20 bg-blue-500/10 text-blue-400"
                    }`}>
                      {selectedEvent.severity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Reported</span>
                    <span className="text-sm text-white">{selectedEvent.time}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              {selectedEvent.status === "Unreviewed" && (
                <button 
                  onClick={handleMarkReviewed}
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5"
                >
                  <ShieldCheck size={16} />
                  Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
