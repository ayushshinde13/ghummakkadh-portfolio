"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Package, CheckCircle, XCircle, Clock, SlidersHorizontal, Eye, X, Navigation } from "lucide-react";
import { api } from "@/lib/api";

type ParcelType = "Document" | "Small Package" | "Large Package" | string;
type ParcelStatus = "Picked Up" | "In Transit" | "Delivered" | "Cancelled";

interface ParcelData {
  id: string;
  sender: string;
  receiver: string;
  receiverPhone: string;
  driver: string;
  pickup: string;
  drop: string;
  type: ParcelType;
  status: ParcelStatus;
  fare: string;
  bookedAt: string;
}

export default function ParcelMonitoringPage() {
  const [selectedMapParcel, setSelectedMapParcel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [parcels, setParcels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setIsLoading(true);
        // Using trip type PARCEL/DELIVERY or similar
        const res = await api.get("/admin/trips?type=PARCEL");
        const fetchedTrips = res.data?.trips || [];
        const formatted = fetchedTrips.map((p: any) => ({
          id: p.id,
          sender: p.rider?.name || "Unknown",
          receiver: p.parcelInfo?.receiverName || "Unknown",
          receiverPhone: "N/A", // Not exposed in list projection
          driver: p.driver?.name || "Unassigned",
          pickup: p.pickupAddress,
          drop: p.dropAddress,
          type: p.parcelInfo?.packageSize || "Small Package",
          status: p.status === "COMPLETED" ? "Delivered" : (p.status === "CANCELLED" ? "Cancelled" : (p.status === "ON_THE_WAY" || p.status === "ARRIVED" ? "Picked Up" : "In Transit")),
          fare: p.payment?.amount ? `₹${p.payment.amount}` : (p.fareEstimate ? `₹${p.fareEstimate}` : "N/A"),
          bookedAt: new Date(p.requestedAt).toLocaleString(),
          raw: p
        }));
        setParcels(formatted);
      } catch (error) {
        console.error("Failed to fetch parcels", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParcels();
  }, []);

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          parcel.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          parcel.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          parcel.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const statusVal = parcel.status.toLowerCase().replace(" ", "_");
    const matchesStatus = statusFilter === "all" || statusVal === statusFilter;
    
    let typeVal = parcel.type.toLowerCase();
    if (typeVal === "small package") typeVal = "small";
    if (typeVal === "large package") typeVal = "large";
    const matchesType = typeFilter === "all" || typeVal === typeFilter;
    
    const matchesCity = cityFilter === "all" || 
                        parcel.pickup.toLowerCase().includes(cityFilter) || 
                        parcel.drop.toLowerCase().includes(cityFilter);
                        
    return matchesSearch && matchesStatus && matchesType && matchesCity;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Parcel Monitoring</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Parcel Monitoring</h2>
          <p className="text-gray-400 mt-1">
            Track and manage parcel deliveries across the platform.
          </p>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Deliveries</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><Package size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-white">28</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Delivered Today</span>
            <div className="p-2 rounded-md bg-green-500/10"><CheckCircle size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">142</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cancelled Today</span>
            <div className="p-2 rounded-md bg-red-500/10"><XCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">4</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Avg Delivery Time</span>
            <div className="p-2 rounded-md bg-white/5"><Clock size={16} className="text-gray-400" /></div>
          </div>
          <span className="text-3xl font-bold text-white">35 mins</span>
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
              placeholder="Search by parcel ID, sender, or receiver..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Type: All</option>
            <option value="document">Document</option>
            <option value="small">Small Package</option>
            <option value="large">Large Package</option>
          </select>
          
          <select 
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">City: All</option>
            <option value="raipur">Raipur</option>
            <option value="bhilai">Bhilai</option>
          </select>

          <button 
            onClick={() => setShowAdvancedFilters(true)}
            className="ml-auto flex items-center gap-2 h-9 px-3 rounded-md border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-medium">Parcel ID</th>
                <th className="px-4 py-3 font-medium">Sender</th>
                <th className="px-4 py-3 font-medium">Receiver</th>
                <th className="px-4 py-3 font-medium">Driver</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredParcels.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-mono text-xs text-white">{row.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{row.bookedAt}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-200">{row.sender}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1 max-w-[120px]">{row.pickup}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-200">{row.receiver}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1 max-w-[120px]">{row.drop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.driver}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-white/10 bg-white/5 text-gray-300">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "In Transit" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-[var(--admin-primary)]/30 bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-primary)] animate-pulse" />
                        {row.status}
                      </span>
                    )}
                    {row.status === "Delivered" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-green-500">
                        {row.status}
                      </span>
                    )}
                    {row.status === "Picked Up" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        {row.status}
                      </span>
                    )}
                    {row.status === "Cancelled" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-400">
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <span className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs font-medium cursor-not-allowed shrink-0" title="Live tracking not available for this state">
                        <MapPin size={14} className="text-[var(--admin-primary)]" />
                        Map
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredParcels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No parcels found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Modal Overlay */}
      {selectedMapParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
            {/* Modal Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--admin-primary)]/10 flex items-center justify-center">
                  <Package size={20} className="text-[var(--admin-primary)]" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">Live Parcel Tracking</h3>
                  <p className="text-xs text-gray-400">Tracking Parcel ID: {selectedMapParcel}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMapParcel(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body / Map Placeholder */}
            <div className="flex-1 bg-[#05070A] relative flex items-center justify-center overflow-hidden">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              
              <div className="flex flex-col items-center justify-center text-center p-6 z-10">
                <div className="w-20 h-20 bg-[var(--admin-primary)]/10 rounded-full flex items-center justify-center mb-4 relative shadow-[0_0_30px_rgba(126,211,33,0.3)]">
                  <div className="absolute inset-0 rounded-full border border-[var(--admin-primary)]/30 animate-ping"></div>
                  <Navigation size={32} className="text-[var(--admin-primary)]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Live Tracking (Mock Map)</h4>
                <p className="text-sm text-gray-400 max-w-sm">
                  In a production environment, an interactive Google Map or Mapbox instance will render here, showing real-time GPS coordinates of the delivery partner.
                </p>
                <div className="mt-6 flex items-center gap-4 bg-[#111827] px-4 py-3 rounded-xl border border-white/5 shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span className="text-xs text-gray-300 font-medium">Pickup</span>
                  </div>
                  <div className="w-12 h-px border-t border-dashed border-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--admin-primary)]"></span>
                    <span className="text-xs text-gray-300 font-medium">Current</span>
                  </div>
                  <div className="w-12 h-px border-t border-dashed border-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="text-xs text-gray-300 font-medium">Drop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal Overlay */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[var(--admin-primary)]" />
                Advanced Filters
              </h3>
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="date" className="flex-1 h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none [color-scheme:dark]" />
                  <span className="text-gray-500 text-sm">to</span>
                  <input type="date" className="flex-1 h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none [color-scheme:dark]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Fare Range (₹)</label>
                <div className="flex items-center gap-4">
                  <input type="number" placeholder="Min" className="flex-1 h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none placeholder:text-gray-600" />
                  <span className="text-gray-500 text-sm">-</span>
                  <input type="number" placeholder="Max" className="flex-1 h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none placeholder:text-gray-600" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Payment Method</label>
                <select className="w-full h-10 bg-[#111827] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none">
                  <option value="all">Any Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="online">Online / UPI</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
