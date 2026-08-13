"use client";

import React, { useState } from "react";
import { IndianRupee, Save, MapPin, Zap, Clock, Route, Edit2, X } from "lucide-react";

export default function PricingPage() {
  const [editingCity, setEditingCity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cityOverrides, setCityOverrides] = useState([
    { id: 1, city: "Raipur", baseFare: "₹50", perKm: "₹12", surgeCap: "1.5x" },
    { id: 2, city: "Bhilai", baseFare: "₹45", perKm: "₹11", surgeCap: "1.2x" },
    { id: 3, city: "Bilaspur", baseFare: "₹40", perKm: "₹10", surgeCap: "1.2x" },
    { id: 4, city: "Korba", baseFare: "₹40", perKm: "₹10", surgeCap: "1.0x" },
  ]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCity = {
      id: editingCity ? editingCity.id : Date.now(),
      city: formData.get("city") as string,
      baseFare: `₹${formData.get("baseFare")}`,
      perKm: `₹${formData.get("perKm")}`,
      surgeCap: `${formData.get("surgeCap")}x`,
    };

    if (editingCity) {
      setCityOverrides(prev => prev.map(c => c.id === editingCity.id ? newCity : c));
    } else {
      setCityOverrides(prev => [...prev, newCity]);
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
            <span className="text-gray-200">Pricing</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Pricing & Fare Rules</h2>
          <p className="text-gray-400 mt-1">
            Configure global default fares and manage city-specific overrides.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-colors hover:bg-[var(--admin-primary)]/90 shrink-0">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Global Default Fare Cards */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Global Default Fares</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-white/5"><IndianRupee size={16} className="text-gray-400" /></div>
              <span className="font-semibold text-gray-300">Base Fare</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">₹40</span>
              <span className="text-sm text-gray-500 mb-1">flat</span>
            </div>
          </div>
          
          <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-white/5"><Route size={16} className="text-gray-400" /></div>
              <span className="font-semibold text-gray-300">Per KM Rate</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">₹10</span>
              <span className="text-sm text-gray-500 mb-1">/ km</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-white/5"><Clock size={16} className="text-gray-400" /></div>
              <span className="font-semibold text-gray-300">Per Minute</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">₹1.5</span>
              <span className="text-sm text-gray-500 mb-1">/ min</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-500/10"><Zap size={16} className="text-amber-500" /></div>
              <span className="font-semibold text-gray-300">Surge Multiplier</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-amber-500">1.2x</span>
              <span className="text-sm text-gray-500 mb-1">current max</span>
            </div>
          </div>
        </div>
      </div>

      {/* City Overrides Table */}
      <div className="rounded-xl border border-white/10 bg-[#111827]/50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[var(--admin-primary)]" />
            <h3 className="text-lg font-bold text-white tracking-tight">City-wise Overrides</h3>
          </div>
          <button 
            onClick={() => { setEditingCity(null); setIsModalOpen(true); }}
            className="text-sm text-[var(--admin-primary)] hover:underline font-medium"
          >
            + Add City
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 font-medium">City</th>
                <th className="px-6 py-3 font-medium">Base Fare</th>
                <th className="px-6 py-3 font-medium">Per KM Rate</th>
                <th className="px-6 py-3 font-medium">Surge Cap</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {cityOverrides.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{row.city}</td>
                  <td className="px-6 py-4 text-gray-300">{row.baseFare}</td>
                  <td className="px-6 py-4 text-gray-300">{row.perKm}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-xs font-semibold">
                      {row.surgeCap}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => { setEditingCity(row); setIsModalOpen(true); }}
                      className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
                    >
                      <Edit2 size={14} className="text-gray-400" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit City Pricing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <MapPin size={18} className="text-[var(--admin-primary)]" />
                {editingCity ? `Edit ${editingCity.city} Pricing` : "Add New City Pricing"}
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
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">City Name</label>
                  <input 
                    name="city"
                    type="text" 
                    required
                    defaultValue={editingCity ? editingCity.city : ""}
                    placeholder="e.g. Durg" 
                    className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Base Fare (₹)</label>
                  <input 
                    name="baseFare"
                    type="number" 
                    required
                    defaultValue={editingCity ? editingCity.baseFare.replace('₹', '') : ""}
                    className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Per KM Rate (₹)</label>
                  <input 
                    name="perKm"
                    type="number" 
                    required
                    defaultValue={editingCity ? editingCity.perKm.replace('₹', '') : ""}
                    className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Surge Cap</label>
                <select 
                  name="surgeCap"
                  className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-white outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                  defaultValue={editingCity ? editingCity.surgeCap.replace('x', '') : "1.0"}
                >
                  <option value="1.0">1.0x (No Surge)</option>
                  <option value="1.2">1.2x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2.0">2.0x</option>
                </select>
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
