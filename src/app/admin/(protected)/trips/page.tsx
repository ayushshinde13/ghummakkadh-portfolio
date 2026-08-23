"use client";

import React, { useState, useEffect } from "react";
import { Search, Map, SlidersHorizontal, MapPin, Activity, CheckCircle, XCircle, Clock, X, Navigation } from "lucide-react";
import { api } from "@/lib/api";

type TripStatus = "Ongoing" | "Completed" | "Cancelled";

interface TripData {
  id: string;
  customer: string;
  driver: string;
  pickup: string;
  drop: string;
  status: TripStatus;
  fare: string;
  startedAt: string;
}

export default function TripMonitoringPage() {
  const [selectedMapTrip, setSelectedMapTrip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [trips, setTrips] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTripsAndStats = async () => {
      try {
        setIsLoading(true);
        const [tripsRes, statsRes] = await Promise.all([
          api.get("/admin/trips"),
          api.get("/admin/trips/stats")
        ]);
        
        const fetchedTrips = tripsRes.data?.trips || [];
        const formatted = fetchedTrips.map((t: any) => ({
          id: t.id,
          customer: t.rider?.name || "Unknown",
          driver: t.driver?.name || "Unassigned",
          pickup: t.pickupAddress,
          drop: t.dropAddress,
          status: t.status === "COMPLETED" ? "Completed" : (t.status === "CANCELLED" ? "Cancelled" : "Ongoing"),
          fare: t.payment?.amount ? `₹${t.payment.amount}` : (t.fareEstimate ? `Est. ₹${t.fareEstimate}` : "N/A"),
          startedAt: new Date(t.requestedAt).toLocaleString(),
          raw: t
        }));
        
        setTrips(formatted);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTripsAndStats();
  }, []);

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trip.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || trip.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Trip Monitoring</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Live Trips & History</h2>
          <p className="text-gray-400 mt-1">
            Monitor active rides in real-time and review trip histories.
          </p>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Trips</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><Activity size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-white">{stats?.activeOngoing || 0}</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Completed Today</span>
            <div className="p-2 rounded-md bg-green-500/10"><CheckCircle size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">{stats?.completedToday || 0}</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cancelled Today</span>
            <div className="p-2 rounded-md bg-red-500/10"><XCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">{stats?.cancelledToday || 0}</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Avg Trip Time</span>
            <div className="p-2 rounded-md bg-white/5"><Clock size={16} className="text-gray-400" /></div>
          </div>
          <span className="text-3xl font-bold text-white">{stats?.avgTripDurationMins || 0} mins</span>
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
              placeholder="Search by Trip ID, Customer, or Driver..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
                <th className="px-4 py-3 font-medium">Trip ID</th>
                <th className="px-4 py-3 font-medium">Participants</th>
                <th className="px-4 py-3 font-medium">Locations</th>
                <th className="px-4 py-3 font-medium">Started At</th>
                <th className="px-4 py-3 font-medium">Fare</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTrips.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4 font-mono text-xs text-white">{row.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-gray-500 text-[10px]">C:</span>
                        <span className="font-medium text-gray-200">{row.customer}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-gray-500 text-[10px]">D:</span>
                        <span className="text-gray-400">{row.driver}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 text-xs text-gray-300">
                      <div className="flex items-start gap-1.5">
                        <div className="mt-0.5 h-2 w-2 rounded-full border-2 border-green-500 shrink-0" />
                        <span className="line-clamp-1">{row.pickup}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <div className="mt-0.5 h-2 w-2 rounded-full border-2 border-red-500 shrink-0" />
                        <span className="line-clamp-1">{row.drop}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.startedAt}</td>
                  <td className="px-4 py-4 font-medium text-white">{row.fare}</td>
                  <td className="px-4 py-4">
                    {row.status === "Ongoing" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-[var(--admin-primary)]/30 bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-primary)] animate-pulse" />
                        {row.status}
                      </span>
                    )}
                    {row.status === "Completed" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-gray-400">
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
                    <button 
                      onClick={() => setSelectedMapTrip(row.id)}
                      className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
                    >
                      <MapPin size={14} className="text-gray-400" />
                      View Map
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTrips.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No trips found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Modal Overlay */}
      {selectedMapTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
            {/* Modal Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--admin-primary)]/10 flex items-center justify-center">
                  <MapPin size={20} className="text-[var(--admin-primary)]" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">Live Trip Map</h3>
                  <p className="text-xs text-gray-400">Tracking Trip ID: {selectedMapTrip}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMapTrip(null)}
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
                  In a production environment, an interactive Google Map or Mapbox instance will render here, showing real-time GPS coordinates of the driver.
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
