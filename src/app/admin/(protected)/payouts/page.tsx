"use client";

import React, { useState } from "react";
import { Search, IndianRupee, Clock, AlertCircle, CheckCircle, ChevronRight, X, FileText } from "lucide-react";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState([
    { id: "PAY-992", driver: "Ramesh Kumar", totalEarnings: "₹12,450", pending: "₹2,100", lastPayout: "10 Aug 2026", status: "Pending" },
    { id: "PAY-991", driver: "Suresh Singh", totalEarnings: "₹8,900", pending: "₹0", lastPayout: "12 Aug 2026", status: "Paid" },
    { id: "PAY-990", driver: "Amit Verma", totalEarnings: "₹15,200", pending: "₹4,500", lastPayout: "01 Aug 2026", status: "Failed" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.driver.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          payout.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payout.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePay = (id: string) => {
    setPayouts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: "Paid", pending: "₹0", lastPayout: "Just now" };
      }
      return p;
    }));
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Payouts</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Driver Payouts</h2>
          <p className="text-gray-400 mt-1">
            Manage settlements, review driver earnings, and process pending payments.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Paid (This Month)</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><CheckCircle size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-white">₹1.42L</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pending Amount</span>
            <div className="p-2 rounded-md bg-amber-500/10"><Clock size={16} className="text-amber-500" /></div>
          </div>
          <span className="text-3xl font-bold text-amber-500">₹45,200</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Failed Payouts</span>
            <div className="p-2 rounded-md bg-red-500/10"><AlertCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">3</span>
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
              placeholder="Search driver name or ID..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-medium">Driver</th>
                <th className="px-4 py-3 font-medium">Total Earnings</th>
                <th className="px-4 py-3 font-medium">Pending Payout</th>
                <th className="px-4 py-3 font-medium">Last Payout Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPayouts.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.driver}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{row.id}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.totalEarnings}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold ${row.pending !== "₹0" ? "text-amber-400" : "text-gray-400"}`}>
                      {row.pending}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{row.lastPayout}</td>
                  <td className="px-4 py-4">
                    {row.status === "Paid" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]">
                        {row.status}
                      </span>
                    )}
                    {row.status === "Pending" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        {row.status}
                      </span>
                    )}
                    {row.status === "Failed" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500">
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.status === "Pending" && (
                        <button 
                          onClick={() => handlePay(row.id)}
                          className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-xs font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0"
                        >
                          <IndianRupee size={12} />
                          Pay Now
                        </button>
                      )}
                      {row.status === "Failed" && (
                        <button 
                          onClick={() => handlePay(row.id)}
                          className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-red-500 text-white text-xs font-bold shadow transition-colors hover:bg-red-600 shrink-0"
                        >
                          Retry
                        </button>
                      )}
                      <button 
                        onClick={() => { setSelectedPayout(row); setIsModalOpen(true); }}
                        className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors ml-2" 
                        title="View Details"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredPayouts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No payouts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <FileText size={18} className="text-[var(--admin-primary)]" />
                Payout Details
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
                  <div className="text-sm text-gray-400">Driver Name</div>
                  <div className="text-lg font-bold text-white">{selectedPayout.driver}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Payout ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedPayout.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400">Total Earnings</div>
                  <div className="text-xl font-bold text-white">{selectedPayout.totalEarnings}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Pending Amount</div>
                  <div className={`text-xl font-bold ${selectedPayout.pending !== "₹0" ? "text-amber-400" : "text-gray-400"}`}>
                    {selectedPayout.pending}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Last Payout</div>
                <div className="text-sm text-white">{selectedPayout.lastPayout}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Status</div>
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                    selectedPayout.status === "Paid" ? "border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]" :
                    selectedPayout.status === "Pending" ? "border-amber-500/20 bg-amber-500/10 text-amber-500" :
                    "border-red-500/20 bg-red-500/10 text-red-500"
                  }`}>
                    {selectedPayout.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-md bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
