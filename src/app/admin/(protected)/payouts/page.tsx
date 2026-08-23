"use client";

import React, { useState, useEffect } from "react";
import { Search, IndianRupee, Clock, AlertCircle, CheckCircle, ChevronRight, X, FileText } from "lucide-react";
import { api } from "@/lib/api";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  
  const [referenceNumber, setReferenceNumber] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPayouts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/payouts");
      const fetchedPayouts = res.data?.payouts || [];
      
      const formatted = fetchedPayouts.map((p: any) => ({
        id: p.id,
        driver: p.driver?.name || "Unknown",
        totalEarnings: `₹${p.amount}`, 
        pending: p.status === "PENDING" ? `₹${p.amount}` : "₹0",
        lastPayout: new Date(p.createdAt).toLocaleDateString(),
        status: p.status === "PROCESSED" ? "Paid" : (p.status === "REJECTED" ? "Failed" : "Pending"),
        raw: p, // keep raw data for modal
      }));
      setPayouts(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.driver.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          payout.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payout.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProcessSubmit = async () => {
    if (!selectedPayout || !referenceNumber) return;
    try {
      setActionLoading(true);
      await api.put(`/admin/payouts/${selectedPayout.id}/process`, { referenceNumber });
      setProcessModalOpen(false);
      setReferenceNumber("");
      fetchPayouts();
    } catch (err) {
      console.error("Failed to process payout", err);
      alert("Failed to process payout");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectSubmit = async () => {
    if (!selectedPayout || !rejectionReason) return;
    try {
      setActionLoading(true);
      await api.put(`/admin/payouts/${selectedPayout.id}/reject`, { rejectionReason });
      setRejectModalOpen(false);
      setRejectionReason("");
      fetchPayouts();
    } catch (err) {
      console.error("Failed to reject payout", err);
      alert("Failed to reject payout");
    } finally {
      setActionLoading(false);
    }
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
                        <>
                          <button 
                            onClick={() => { setSelectedPayout(row); setProcessModalOpen(true); }}
                            className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-xs font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0"
                          >
                            <IndianRupee size={12} />
                            Process
                          </button>
                          <button 
                            onClick={() => { setSelectedPayout(row); setRejectModalOpen(true); }}
                            className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors shrink-0"
                          >
                            Reject
                          </button>
                        </>
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

      {/* Process Payout Modal */}
      {processModalOpen && selectedPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 bg-[#05070A] flex flex-col space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Process Payout</h3>
              <p className="text-sm text-gray-400">
                Enter the UTR or Bank Reference Number to confirm the transfer of <strong>{selectedPayout.pending}</strong> to <strong>{selectedPayout.driver}</strong>.
              </p>
              <input
                type="text"
                placeholder="UTR / Reference Number"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full h-10 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md px-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
              />
            </div>
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setProcessModalOpen(false)}
                className="px-4 py-2 rounded-md bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleProcessSubmit}
                disabled={!referenceNumber || actionLoading}
                className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[var(--admin-primary)]/90 transition-colors text-sm disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Confirm Payout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Payout Modal */}
      {rejectModalOpen && selectedPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 bg-[#05070A] flex flex-col space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Reject Payout</h3>
              <p className="text-sm text-gray-400">
                Provide a reason for rejecting this payout. The funds will be refunded to the driver's wallet.
              </p>
              <input
                type="text"
                placeholder="Rejection Reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full h-10 bg-[#0A0E1A] border border-white/10 focus:border-red-500/50 rounded-md px-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
              />
            </div>
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-md bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleRejectSubmit}
                disabled={!rejectionReason || actionLoading}
                className="px-4 py-2 rounded-md bg-red-500 text-white font-bold hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
              >
                {actionLoading ? "Rejecting..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
