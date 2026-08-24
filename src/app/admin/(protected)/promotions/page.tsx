"use client";

import React, { useState } from "react";
import { Search, Plus, Percent, MoreHorizontal, Edit2, Ban, X, Save } from "lucide-react";

import { mockPromotions } from "../../constants/dummy_data";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any>(null);

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || promo.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDisable = (id: string) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, status: "Expired" } : p));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPromo = {
      id: editingPromo ? editingPromo.id : `PRM-${Date.now().toString().slice(-4)}`,
      code: formData.get("code") as string,
      type: formData.get("type") as string,
      value: formData.get("value") as string,
      limit: parseInt(formData.get("limit") as string) || 0,
      used: editingPromo ? editingPromo.used : 0,
      validFrom: formData.get("validFrom") as string,
      validTo: formData.get("validTo") as string,
      status: "Active"
    };

    if (editingPromo) {
      setPromotions(prev => prev.map(p => p.id === editingPromo.id ? { ...p, ...newPromo } : p));
    } else {
      setPromotions(prev => [newPromo, ...prev]);
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
            <span className="text-gray-200">Promotions</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Promotions & Campaigns</h2>
          <p className="text-gray-400 mt-1">
            Manage discount codes, track usage, and create new marketing campaigns.
          </p>
        </div>
        <button 
          onClick={() => { setEditingPromo(null); setIsModalOpen(true); }}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0"
        >
          <Plus size={16} />
          Create Promotion
        </button>
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
                placeholder="Search by promo code..."
                className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
              />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
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
              {filteredPromotions.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-sm text-[var(--admin-primary)] font-bold tracking-wider">
                      <Percent size={14} className="text-gray-400" />
                      {row.code}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{row.value}</span>
                      <span className="text-xs text-gray-500">{row.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs max-w-[120px]">
                        <span className="text-white font-medium">{row.used}</span>
                        <span className="text-gray-500">/ {row.limit}</span>
                      </div>
                      <div className="h-1.5 w-full max-w-[120px] bg-[#0A0E1A] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--admin-primary)] rounded-full" 
                          style={{ width: `${(row.used / row.limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300 text-xs space-y-0.5">
                    <div><span className="text-gray-500 w-10 inline-block">From:</span> {row.validFrom}</div>
                    <div><span className="text-gray-500 w-10 inline-block">To:</span> {row.validTo}</div>
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "Active" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]">
                        {row.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-gray-400">
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setEditingPromo(row); setIsModalOpen(true); }}
                        className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors" 
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      {row.status === "Active" && (
                        <button 
                          onClick={() => handleDisable(row.id)}
                          className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors" 
                          title="Disable"
                        >
                          <Ban size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredPromotions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No promotions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <Percent size={18} className="text-[var(--admin-primary)]" />
                {editingPromo ? "Edit Promotion" : "Create New Promotion"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="p-6 bg-[#05070A] flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Promo Code</label>
                  <input 
                    name="code"
                    type="text" 
                    required
                    defaultValue={editingPromo?.code || ""}
                    placeholder="e.g. SUMMER50" 
                    className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all uppercase" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Type</label>
                    <select 
                      name="type"
                      defaultValue={editingPromo?.type || "Percentage"}
                      className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="Flat">Flat Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Value</label>
                    <input 
                      name="value"
                      type="text" 
                      required
                      defaultValue={editingPromo?.value || ""}
                      placeholder="e.g. 50% or ₹100"
                      className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Usage Limit (Max Uses)</label>
                  <input 
                    name="limit"
                    type="number" 
                    required
                    defaultValue={editingPromo?.limit || 1000}
                    className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Valid From</label>
                    <input 
                      name="validFrom"
                      type="text" 
                      required
                      defaultValue={editingPromo?.validFrom || ""}
                      placeholder="e.g. 01 Aug 2026"
                      className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Valid To</label>
                    <input 
                      name="validTo"
                      type="text" 
                      required
                      defaultValue={editingPromo?.validTo || ""}
                      placeholder="e.g. 31 Aug 2026"
                      className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(126,211,33,0.3)]"
                >
                  <Save size={16} />
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
