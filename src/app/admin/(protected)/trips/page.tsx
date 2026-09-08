"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Map, 
  SlidersHorizontal, 
  MapPin, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  X, 
  Navigation, 
  User, 
  Car, 
  CreditCard, 
  Key, 
  Phone, 
  Check, 
  AlertCircle,
  Package,
  Calendar,
  Sparkles
} from "lucide-react";
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
  raw?: any;
}

export default function TripMonitoringPage() {
  const [selectedMapTrip, setSelectedMapTrip] = useState<string | null>(null);
  const [detailedTrip, setDetailedTrip] = useState<any | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
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
          api.get("/admin/trips?limit=100"),
          api.get("/admin/trips/stats")
        ]);
        
        const fetchedTrips = tripsRes.data?.trips || [];
        const formatted = fetchedTrips.map((t: any) => ({
          id: t.id,
          customer: t.rider?.name || "Unknown",
          driver: t.driver?.name || "Unassigned",
          pickup: t.pickupAddress || "",
          drop: t.dropAddress || "",
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

  // Fetch full details when a map trip is selected
  useEffect(() => {
    if (!selectedMapTrip) {
      setDetailedTrip(null);
      return;
    }
    const currentRaw = trips.find(t => t.id === selectedMapTrip)?.raw;
    if (currentRaw) {
      setDetailedTrip(currentRaw);
    }
    const loadDetails = async () => {
      try {
        setLoadingDetails(true);
        const res = await api.get(`/admin/trips/${selectedMapTrip}`);
        if (res.data) {
          setDetailedTrip(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch trip details", err);
      } finally {
        setLoadingDetails(false);
      }
    };
    loadDetails();
  }, [selectedMapTrip, trips]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTrips = trips.filter(trip => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
                          trip.id.toLowerCase().includes(q) || 
                          trip.customer.toLowerCase().includes(q) ||
                          trip.driver.toLowerCase().includes(q) ||
                          trip.pickup.toLowerCase().includes(q) ||
                          trip.drop.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || trip.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
  const paginatedTrips = filteredTrips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const getStepProgress = (trip: any) => {
    const rawStatus = (trip?.status || "").toUpperCase();
    const isCancelled = rawStatus === "CANCELLED";
    
    let currentStepIndex = 0;
    if (rawStatus === "COMPLETED") currentStepIndex = 4;
    else if (rawStatus === "STARTED") currentStepIndex = 3;
    else if (rawStatus === "ARRIVED") currentStepIndex = 2;
    else if (rawStatus === "ACCEPTED" || rawStatus === "ON_THE_WAY") currentStepIndex = 1;
    else if (rawStatus === "REQUESTED" || rawStatus === "SCHEDULED") currentStepIndex = 0;

    const steps = [
      {
        id: "requested",
        title: "Requested",
        desc: trip?.requestedAt ? new Date(trip.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Booking created",
        icon: Clock,
      },
      {
        id: "accepted",
        title: "Accepted",
        desc: trip?.acceptedAt ? new Date(trip.acceptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 1 ? "Driver assigned" : "Pending driver"),
        icon: User,
      },
      {
        id: "arrived",
        title: "Arrived",
        desc: currentStepIndex >= 2 ? "Driver at pickup" : "Heading to pickup",
        icon: MapPin,
      },
      {
        id: "started",
        title: "Started",
        desc: trip?.startedAt ? new Date(trip.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 3 ? "Ride in progress" : "OTP verification"),
        icon: Navigation,
      },
      {
        id: "completed",
        title: "Completed",
        desc: trip?.completedAt ? new Date(trip.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 4 ? "Dropped off" : "Destination drop"),
        icon: CheckCircle,
      },
    ];

    return { currentStepIndex, isCancelled, steps };
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Live Trips & History</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Monitor active rides in real-time and review trip histories.
          </p>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Active Trips</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><Activity size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-text)]">{stats?.activeOngoing || 0}</span>
        </div>
        
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Completed Today</span>
            <div className="p-2 rounded-md bg-green-500/10"><CheckCircle size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">{stats?.completedToday || 0}</span>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Cancelled Today</span>
            <div className="p-2 rounded-md bg-red-500/10"><XCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">{stats?.cancelledToday || 0}</span>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Avg Trip Time</span>
            <div className="p-2 rounded-md bg-[var(--admin-border)]"><Clock size={16} className="text-[var(--admin-muted)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-text)]">{stats?.avgTripDurationMins || 0} mins</span>
        </div>
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
              placeholder="Search by Trip ID, Customer, or Driver..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button 
            onClick={() => setShowAdvancedFilters(true)}
            className="ml-auto flex items-center gap-2 h-9 px-3 rounded-md border border-[var(--admin-border)] bg-[var(--admin-border)] text-sm font-medium text-[var(--admin-text)] hover:bg-[var(--admin-border)] transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
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
              {paginatedTrips.map((row, idx) => (
                <tr key={`${row.id || "trip"}-${idx}`} className="hover:bg-[var(--admin-border)] transition-colors group">
                  <td className="px-4 py-4 font-mono text-xs text-[var(--admin-text)]">{row.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-[var(--admin-muted)] text-[10px]">C:</span>
                        <span className="font-medium text-gray-200">{row.customer}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 text-[var(--admin-muted)] text-[10px]">D:</span>
                        <span className="text-[var(--admin-muted)]">{row.driver}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 text-xs text-[var(--admin-muted)]">
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
                  <td className="px-4 py-4 text-[var(--admin-muted)]">{row.startedAt}</td>
                  <td className="px-4 py-4 font-medium text-[var(--admin-text)]">{row.fare}</td>
                  <td className="px-4 py-4">
                    {row.status === "Ongoing" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-[var(--admin-primary)]/30 bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-primary)] animate-pulse" />
                        {row.status}
                      </span>
                    )}
                    {row.status === "Completed" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-[var(--admin-muted)]">
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
                      className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-border)] border border-[var(--admin-border)] hover:bg-[var(--admin-primary)]/10 hover:text-[var(--admin-primary)] hover:border-[var(--admin-primary)]/30 text-[var(--admin-text)] text-xs font-medium transition-colors"
                    >
                      <Navigation size={13} className="text-[var(--admin-primary)]" />
                      View Tracker
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedTrips.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No trips found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--admin-muted)]">
          <span>
            Showing <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + (paginatedTrips.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + paginatedTrips.length}</span> of <span className="font-medium text-[var(--admin-text)]">{filteredTrips.length}</span> trips
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-background)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium"
            >
              Previous
            </button>
            <span className="text-xs text-[var(--admin-muted)] px-1">
              Page <span className="font-semibold text-[var(--admin-text)]">{currentPage}</span> of <span className="font-semibold text-[var(--admin-text)]">{totalPages || 1}</span>
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-background)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Map & Progress Tracker Modal Overlay */}
      {selectedMapTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-5xl bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
            
            {/* Modal Header */}
            {(() => {
              const activeTrip = detailedTrip || trips.find(t => t.id === selectedMapTrip)?.raw || {};
              const progress = getStepProgress(activeTrip);
              const tripStatus = (activeTrip.status || "REQUESTED").toUpperCase();
              
              const statusBadgeColor = 
                tripStatus === "COMPLETED" ? "bg-green-500/10 text-[var(--admin-primary)] border-green-500/20" :
                tripStatus === "CANCELLED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                "bg-blue-500/10 text-blue-400 border-blue-500/20";

              return (
                <>
                  <div className="p-4 sm:p-5 border-b border-[var(--admin-border)] bg-[var(--admin-card)] flex items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--admin-primary)]/10 border border-[var(--admin-primary)]/20 flex items-center justify-center text-[var(--admin-primary)] shadow-sm">
                        <Navigation size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-[var(--admin-text)]">Live Trip Tracking</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadgeColor}`}>
                            {tripStatus}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--admin-border)] text-[var(--admin-muted)]">
                            {activeTrip.type || "RIDE"}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--admin-muted)] mt-0.5 font-mono">
                          ID: <span className="text-[var(--admin-text)]">{selectedMapTrip}</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedMapTrip(null);
                        setDetailedTrip(null);
                      }}
                      className="p-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
                      title="Close Modal"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Modal Scrollable Body */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[var(--admin-background)]">
                    
                    {/* Progress Tracker Section */}
                    <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-[var(--admin-primary)]" />
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--admin-text)]">Trip Progress Tracker</h4>
                        </div>
                        {loadingDetails && (
                          <span className="text-xs text-[var(--admin-muted)] flex items-center gap-1.5 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-[var(--admin-primary)] animate-ping"></span>
                            Syncing live status...
                          </span>
                        )}
                      </div>

                      {/* Stepper Timeline */}
                      <div className="relative">
                        {/* Progress Bar Line */}
                        <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-[var(--admin-border)] z-0">
                          <div 
                            className={`h-full transition-all duration-500 ${progress.isCancelled ? 'bg-red-500/60' : 'bg-[var(--admin-primary)]'}`}
                            style={{ 
                              width: progress.isCancelled 
                                ? '100%' 
                                : `${(progress.currentStepIndex / (progress.steps.length - 1)) * 100}%` 
                            }}
                          />
                        </div>

                        {/* Steps Items */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                          {progress.steps.map((step, idx) => {
                            const isCompleted = !progress.isCancelled && idx < progress.currentStepIndex;
                            const isCurrent = !progress.isCancelled && idx === progress.currentStepIndex;
                            const isUpcoming = !progress.isCancelled && idx > progress.currentStepIndex;
                            const StepIcon = step.icon;

                            let circleStyle = "bg-[var(--admin-background)] border-[var(--admin-border)] text-[var(--admin-muted)]";
                            if (progress.isCancelled) {
                              if (idx <= progress.currentStepIndex) {
                                circleStyle = "bg-red-500/20 border-red-500 text-red-400";
                              }
                            } else if (isCompleted) {
                              circleStyle = "bg-[var(--admin-primary)] text-[#0A0E1A] border-[var(--admin-primary)] shadow-[0_0_15px_rgba(126,211,33,0.3)]";
                            } else if (isCurrent) {
                              circleStyle = "bg-[var(--admin-background)] border-[var(--admin-primary)] text-[var(--admin-primary)] ring-4 ring-[var(--admin-primary)]/20";
                            }

                            return (
                              <div key={step.id} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${circleStyle}`}>
                                  {isCompleted ? (
                                    <Check size={18} strokeWidth={3} />
                                  ) : isCurrent ? (
                                    <StepIcon size={18} className="animate-pulse" />
                                  ) : progress.isCancelled && idx === progress.currentStepIndex ? (
                                    <XCircle size={18} />
                                  ) : (
                                    <StepIcon size={16} />
                                  )}
                                </div>
                                <div className="flex-1 md:flex-initial">
                                  <p className={`text-xs font-bold ${isCurrent ? 'text-[var(--admin-primary)]' : (isCompleted ? 'text-[var(--admin-text)]' : 'text-[var(--admin-muted)]')}`}>
                                    {step.title}
                                  </p>
                                  <p className="text-[11px] text-[var(--admin-muted)] mt-0.5">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Cancelled Info Notice if applicable */}
                      {progress.isCancelled && (
                        <div className="mt-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400">
                          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                          <div className="text-xs space-y-0.5">
                            <p className="font-semibold text-red-300">
                              Trip Cancelled {activeTrip.cancelledBy ? `by ${activeTrip.cancelledBy}` : ""}
                              {activeTrip.cancelledAt ? ` at ${new Date(activeTrip.cancelledAt).toLocaleString()}` : ""}
                            </p>
                            <p className="text-red-300/80">
                              Reason: {activeTrip.cancelReason || "No specific reason provided."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live Tracking Visual Map Simulation */}
                    <div className="relative rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] overflow-hidden shadow-inner min-h-[220px] flex flex-col justify-between p-5">
                      {/* Simulated Dark Mode Map Grid */}
                      <div 
                        className="absolute inset-0 opacity-15 pointer-events-none" 
                        style={{ 
                          backgroundImage: 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)', 
                          backgroundSize: '32px 32px' 
                        }} 
                      />

                      {/* Map Header Status Badges */}
                      <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 bg-[var(--admin-background)]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--admin-border)] text-xs font-medium">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-primary)] animate-ping"></span>
                          <span className="text-[var(--admin-text)]">Live Route Tracking Simulation</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium">
                          {activeTrip.distanceKm && (
                            <span className="bg-[var(--admin-background)]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--admin-border)] text-[var(--admin-text)]">
                              📏 {activeTrip.distanceKm} km
                            </span>
                          )}
                          {activeTrip.durationMin && (
                            <span className="bg-[var(--admin-background)]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--admin-border)] text-[var(--admin-text)]">
                              ⏱️ {activeTrip.durationMin} mins
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visual Route Path */}
                      <div className="relative z-10 my-6 max-w-2xl mx-auto w-full px-4">
                        <div className="flex items-center justify-between relative">
                          {/* Dotted connecting line */}
                          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-[var(--admin-border)]">
                            <div 
                              className={`h-full transition-all duration-700 ${progress.isCancelled ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 via-[var(--admin-primary)] to-red-500'}`}
                              style={{ 
                                width: progress.isCancelled ? '100%' : `${Math.max(15, (progress.currentStepIndex / 4) * 100)}%` 
                              }}
                            />
                          </div>

                          {/* Pickup Node */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-9 h-9 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-md">
                              <MapPin size={16} />
                            </div>
                            <span className="text-[11px] font-bold text-blue-400">Pickup</span>
                          </div>

                          {/* Moving Driver Marker */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-10 h-10 rounded-full bg-[var(--admin-primary)]/20 border-2 border-[var(--admin-primary)] flex items-center justify-center text-[var(--admin-primary)] shadow-[0_0_20px_rgba(126,211,33,0.4)] animate-bounce">
                              <Car size={18} />
                            </div>
                            <span className="text-[11px] font-bold text-[var(--admin-primary)]">
                              {tripStatus === "COMPLETED" ? "Arrived" : (tripStatus === "STARTED" ? "Moving" : "Driver")}
                            </span>
                          </div>

                          {/* Destination Node */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-9 h-9 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-md">
                              <MapPin size={16} />
                            </div>
                            <span className="text-[11px] font-bold text-red-400">Destination</span>
                          </div>
                        </div>
                      </div>

                      {/* Route Addresses */}
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[var(--admin-border)]">
                        <div className="bg-[var(--admin-background)]/80 backdrop-blur-sm p-3 rounded-lg border border-[var(--admin-border)] flex items-start gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                          <div className="text-xs">
                            <p className="font-semibold text-[var(--admin-text)]">Pickup Address</p>
                            <p className="text-[var(--admin-muted)] mt-0.5 line-clamp-2">
                              {activeTrip.pickup?.address || activeTrip.pickupAddress || "Pickup location not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[var(--admin-background)]/80 backdrop-blur-sm p-3 rounded-lg border border-[var(--admin-border)] flex items-start gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 shrink-0"></span>
                          <div className="text-xs">
                            <p className="font-semibold text-[var(--admin-text)]">Destination Address</p>
                            <p className="text-[var(--admin-muted)] mt-0.5 line-clamp-2">
                              {activeTrip.drop?.address || activeTrip.dropAddress || "Drop location not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trip Details 3-Column Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Customer / Rider Box */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5">
                              <User size={14} className="text-[var(--admin-primary)]" /> Rider Details
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-[var(--admin-text)]">
                            {activeTrip.rider?.name || activeTrip.customer || "Unknown Customer"}
                          </h5>
                          {activeTrip.rider?.phone && (
                            <p className="text-xs text-[var(--admin-muted)] mt-1 flex items-center gap-1">
                              <Phone size={12} /> {activeTrip.rider.phone}
                            </p>
                          )}
                          {activeTrip.rider?.email && (
                            <p className="text-xs text-[var(--admin-muted)] mt-0.5 truncate">
                              {activeTrip.rider.email}
                            </p>
                          )}
                        </div>
                        {activeTrip.rideDetail?.otpForStart && (
                          <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] flex items-center justify-between text-xs">
                            <span className="text-[var(--admin-muted)] flex items-center gap-1">
                              <Key size={12} className="text-amber-400" /> Start OTP
                            </span>
                            <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                              {activeTrip.rideDetail.otpForStart}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Driver & Vehicle Box */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5">
                              <Car size={14} className="text-blue-400" /> Driver & Vehicle
                            </span>
                            {activeTrip.driver?.rating && (
                              <span className="text-xs text-amber-400 font-semibold">
                                ★ {activeTrip.driver.rating}
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm font-bold text-[var(--admin-text)]">
                            {activeTrip.driver?.name || activeTrip.driver || "Unassigned"}
                          </h5>
                          {activeTrip.driver?.phone && (
                            <p className="text-xs text-[var(--admin-muted)] mt-1 flex items-center gap-1">
                              <Phone size={12} /> {activeTrip.driver.phone}
                            </p>
                          )}
                          {activeTrip.driver?.vehicle && (
                            <div className="mt-2 text-xs text-[var(--admin-muted)]">
                              <span className="text-[var(--admin-text)] font-semibold">
                                {activeTrip.driver.vehicle.model}
                              </span>{" "}
                              • <span className="font-mono">{activeTrip.driver.vehicle.registrationNumber}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] text-xs text-[var(--admin-muted)] flex items-center justify-between">
                          <span>Vehicle Category:</span>
                          <span className="text-[var(--admin-text)] font-medium">
                            {activeTrip.vehicleType?.name || activeTrip.raw?.vehicleType?.name || "Standard"}
                          </span>
                        </div>
                      </div>

                      {/* Financials & Summary Box */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5">
                              <CreditCard size={14} className="text-[var(--admin-primary)]" /> Fare & Billing
                            </span>
                            <span className="text-base font-bold text-[var(--admin-primary)]">
                              {activeTrip.finalFare ? `₹${activeTrip.finalFare}` : (activeTrip.fare || `₹${activeTrip.fareEstimate || 0}`)}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Estimate Fare:</span>
                              <span className="text-[var(--admin-text)]">₹{activeTrip.fareEstimate || activeTrip.fare || 0}</span>
                            </div>
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Payment Status:</span>
                              <span className="text-green-400 font-medium">
                                {activeTrip.payments?.[0]?.status || (tripStatus === "COMPLETED" ? "Paid" : "Pending")}
                              </span>
                            </div>
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Payment Method:</span>
                              <span className="text-[var(--admin-text)] uppercase font-medium">
                                {activeTrip.payments?.[0]?.method || "UPI / Cash"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] flex items-center justify-between text-xs text-[var(--admin-muted)]">
                          <span className="flex items-center gap-1"><Calendar size={12} /> Booked:</span>
                          <span className="text-[var(--admin-text)]">
                            {activeTrip.requestedAt ? new Date(activeTrip.requestedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : "N/A"}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Advanced Filters Modal Overlay */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[var(--admin-primary)]" />
                Advanced Filters
              </h3>
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--admin-muted)] mb-2">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="date" className="flex-1 h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none [color-scheme:dark]" />
                  <span className="text-[var(--admin-muted)] text-sm">to</span>
                  <input type="date" className="flex-1 h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none [color-scheme:dark]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--admin-muted)] mb-2">Fare Range (₹)</label>
                <div className="flex items-center gap-4">
                  <input type="number" placeholder="Min" className="flex-1 h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none placeholder:text-gray-600" />
                  <span className="text-[var(--admin-muted)] text-sm">-</span>
                  <input type="number" placeholder="Max" className="flex-1 h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none placeholder:text-gray-600" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--admin-muted)] mb-2">Payment Method</label>
                <select className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none">
                  <option value="all">Any Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="online">Online / UPI</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3">
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm"
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
