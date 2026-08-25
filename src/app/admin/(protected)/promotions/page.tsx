"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Percent, MoreHorizontal, Edit2, Ban, X, Save, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPromotions = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);
      
      const res = await api.get(`/admin/promotions?${params.toString()}`);
      if (res.success) {
        setPromotions(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch promotions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [searchQuery, statusFilter]);

  const handleDisable = async (id: string) => {
    if (confirm("Are you sure you want to disable/expire this promotion?")) {
      try {
        const res = await api.put(`/admin/promotions/${id}/disable`, {});
        if (res.success) {
          await fetchPromotions();
        }
      } catch (error) {
        console.error(error);
        alert("Failed to disable promotion");
      }
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;

    const formData = new FormData(e.currentTarget);
    const code = (formData.get("code") as string).trim().toUpperCase();
    const discountType = formData.get("type") as string;
    const value = parseFloat(formData.get("value") as string);
    const limitVal = formData.get("limit") as string;
    const usageLimit = limitVal ? parseInt(limitVal) : null;
    const validFrom = formData.get("validFrom") as string;
    const validTo = formData.get("validTo") as string;

    setIsSaving(true);
    try {
      if (editingPromo) {
        const res = await api.put(`/admin/promotions/${editingPromo.id}`, {
          code,
          discountType,
          value,
          usageLimit,
          validFrom,
          validTo
        });
        if (res.success) {
          setIsModalOpen(false);
          await fetchPromotions();
        }
      } else {
        const res = await api.post("/admin/promotions", {
          code,
          discountType,
          value,
          usageLimit,
          validFrom,
          validTo
        });
        if (res.success) {
          setIsModalOpen(false);
          await fetchPromotions();
        }
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to save promotion");
    } finally {
      setIsSaving(false);
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
            <span className="text-gray-200">Promotions</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Promotions & Campaigns</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Manage discount codes, track usage, and create new marketing campaigns.
          </p>
        </div>
        <button 
          onClick={() => { setEditingPromo(null); setIsModalOpen(true); }}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          Create Promotion
        </button>
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
              placeholder="Search by promo code..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium">Promo Code</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Validity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
                    Fetching promotions...
                  </td>
                </tr>
              ) : promotions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No promotions found matching your criteria.
                  </td>
                </tr>
              ) : (
                promotions.map((row) => (
                  <tr key={row.id} className="hover:bg-[var(--admin-border)] transition-colors group">
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] font-mono text-sm text-[var(--admin-primary)] font-bold tracking-wider">
                        <Percent size={14} className="text-[var(--admin-muted)]" />
                        {row.code}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[var(--admin-muted)]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[var(--admin-text)]">
                          {row.type === "FLAT" ? `₹${row.value}` : `${row.value}%`}
                        </span>
                        <span className="text-xs text-[var(--admin-muted)]">{row.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs max-w-[120px]">
                          <span className="text-[var(--admin-text)] font-medium">{row.used}</span>
                          <span className="text-[var(--admin-muted)]">/ {row.limit ? row.limit : "∞"}</span>
                        </div>
                        <div className="h-1.5 w-full max-w-[120px] bg-[var(--admin-background)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--admin-primary)] rounded-full" 
                            style={{ width: `${row.limit ? (row.used / row.limit) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[var(--admin-muted)] text-xs space-y-0.5">
                      <div><span className="text-[var(--admin-muted)] w-10 inline-block">From:</span> {row.validFrom}</div>
                      <div><span className="text-[var(--admin-muted)] w-10 inline-block">To:</span> {row.validTo}</div>
                    </td>
                    <td className="px-4 py-4">
                      {row.status === "Active" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]">
                          {row.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-[var(--admin-muted)]">
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setEditingPromo(row); setIsModalOpen(true); }}
                          className="p-1.5 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer" 
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        {row.status === "Active" && (
                          <button 
                            onClick={() => handleDisable(row.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/20 text-[var(--admin-muted)] hover:text-red-500 transition-colors cursor-pointer" 
                            title="Disable"
                          >
                            <Ban size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <Percent size={18} className="text-[var(--admin-primary)]" />
                {editingPromo ? "Edit Promotion" : "Create New Promotion"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Promo Code</label>
                  <input 
                    name="code"
                    type="text" 
                    required
                    defaultValue={editingPromo?.code || ""}
                    placeholder="e.g. SUMMER50" 
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none placeholder:text-gray-600 focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all uppercase" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Type</label>
                    <select 
                      name="type"
                      defaultValue={editingPromo?.type || "PERCENTAGE"}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                    >
                      <option value="PERCENTAGE">Percentage (%)</option>
                      <option value="FLAT">Flat Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Value</label>
                    <input 
                      name="value"
                      type="number" 
                      step="any"
                      required
                      defaultValue={editingPromo?.value || ""}
                      placeholder="e.g. 50"
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Usage Limit (Max Uses)</label>
                  <input 
                    name="limit"
                    type="number" 
                    defaultValue={editingPromo?.limit || ""}
                    placeholder="e.g. 1000 (leave blank for unlimited)"
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Valid From</label>
                    <input 
                      name="validFrom"
                      type="date" 
                      required
                      defaultValue={editingPromo?.validFrom || ""}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Valid To</label>
                    <input 
                      name="validTo"
                      type="date" 
                      required
                      defaultValue={editingPromo?.validTo || ""}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
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
                  disabled={isSaving}
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(126,211,33,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSaving ? "Saving..." : "Save Promotion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
