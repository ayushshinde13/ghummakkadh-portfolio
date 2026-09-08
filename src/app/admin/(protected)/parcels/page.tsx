"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Package, 
  CheckCircle, 
  XCircle, 
  Clock, 
  SlidersHorizontal, 
  Eye, 
  X, 
  Navigation,
  User,
  Car,
  CreditCard,
  Key,
  Phone,
  Check,
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Truck
} from "lucide-react";
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
  raw?: any;
}

export default function ParcelMonitoringPage() {
  const [selectedMapParcel, setSelectedMapParcel] = useState<string | null>(null);
  const [detailedParcel, setDetailedParcel] = useState<any | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [parcels, setParcels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/admin/trips?type=PARCEL&limit=100");
        const fetchedTrips = res.data?.trips || [];
        const formatted = fetchedTrips.map((p: any) => ({
          id: p.id,
          sender: p.rider?.name || "Unknown",
          receiver: p.parcelDetail?.receiverName || p.parcelInfo?.receiverName || "Unknown",
          receiverPhone: p.parcelDetail?.receiverPhone || "N/A",
          driver: p.driver?.name || "Unassigned",
          pickup: p.pickupAddress || "",
          drop: p.dropAddress || "",
          type: p.parcelDetail?.packageSize || p.parcelInfo?.packageSize || "Small Package",
          status: p.status === "COMPLETED" ? "Delivered" : (p.status === "CANCELLED" ? "Cancelled" : (p.status === "STARTED" ? "In Transit" : (p.status === "ARRIVED" || p.status === "ON_THE_WAY" ? "Picked Up" : "In Transit"))),
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

  // Fetch full details when a parcel is selected
  useEffect(() => {
    if (!selectedMapParcel) {
      setDetailedParcel(null);
      return;
    }
    const currentRaw = parcels.find(p => p.id === selectedMapParcel)?.raw;
    if (currentRaw) {
      setDetailedParcel(currentRaw);
    }
    const loadDetails = async () => {
      try {
        setLoadingDetails(true);
        const res = await api.get(`/admin/trips/${selectedMapParcel}`);
        if (res.data) {
          setDetailedParcel(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch parcel details", err);
      } finally {
        setLoadingDetails(false);
      }
    };
    loadDetails();
  }, [selectedMapParcel, parcels]);

  const getParcelStepProgress = (item: any) => {
    const rawStatus = (item?.status || "").toUpperCase();
    const isCancelled = rawStatus === "CANCELLED";
    
    let currentStepIndex = 0;
    if (rawStatus === "COMPLETED") currentStepIndex = 4;
    else if (rawStatus === "STARTED") currentStepIndex = 3;
    else if (rawStatus === "ARRIVED" || rawStatus === "PICKED_UP") currentStepIndex = 2;
    else if (rawStatus === "ACCEPTED" || rawStatus === "ON_THE_WAY") currentStepIndex = 1;
    else if (rawStatus === "REQUESTED" || rawStatus === "SCHEDULED") currentStepIndex = 0;

    const steps = [
      {
        id: "requested",
        title: "Order Placed",
        desc: item?.requestedAt ? new Date(item.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Booking created",
        icon: Clock,
      },
      {
        id: "accepted",
        title: "Driver Assigned",
        desc: item?.acceptedAt ? new Date(item.acceptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 1 ? "Assigned" : "Waiting driver"),
        icon: User,
      },
      {
        id: "pickup",
        title: "Parcel Picked Up",
        desc: currentStepIndex >= 2 ? "Picked from sender" : "Heading to sender",
        icon: Package,
      },
      {
        id: "transit",
        title: "In Transit",
        desc: item?.startedAt ? new Date(item.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 3 ? "On way to drop" : "Out for delivery"),
        icon: Navigation,
      },
      {
        id: "delivered",
        title: "Delivered",
        desc: item?.completedAt ? new Date(item.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (currentStepIndex >= 4 ? "Delivered to receiver" : "Pending delivery"),
        icon: CheckCircle,
      },
    ];

    return { currentStepIndex, isCancelled, steps };
  };

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
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const paginatedParcels = filteredParcels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter]);

  const activeCount = parcels.filter(p => p.status === "Picked Up" || p.status === "In Transit").length;
  const deliveredCount = parcels.filter(p => p.status === "Delivered").length;
  const cancelledCount = parcels.filter(p => p.status === "Cancelled").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Parcel Monitoring</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Track and manage parcel deliveries across the platform.
          </p>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Active Deliveries</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><Package size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-text)]">{activeCount}</span>
        </div>
        
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Delivered Today</span>
            <div className="p-2 rounded-md bg-green-500/10"><CheckCircle size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">{deliveredCount}</span>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Cancelled Today</span>
            <div className="p-2 rounded-md bg-red-500/10"><XCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">{cancelledCount}</span>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">Avg Delivery Time</span>
            <div className="p-2 rounded-md bg-[var(--admin-border)]"><Clock size={16} className="text-[var(--admin-muted)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-text)]">42 mins</span>
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
              placeholder="Search by Parcel ID, Sender, Receiver, Driver..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
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
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Type: All</option>
            <option value="document">Document</option>
            <option value="small">Small Package</option>
            <option value="medium">Medium Package</option>
            <option value="large">Large Package</option>
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
              {paginatedParcels.map((row, idx) => (
                <tr key={`${row.id || "parcel"}-${idx}`} className="hover:bg-[var(--admin-border)] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-mono text-xs text-[var(--admin-text)]">{row.id}</div>
                    <div className="text-xs text-[var(--admin-muted)] mt-0.5">{row.bookedAt}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-200">{row.sender}</span>
                      <span className="text-[10px] text-[var(--admin-muted)] line-clamp-1 max-w-[120px]">{row.pickup}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-200">{row.receiver}</span>
                      <span className="text-[10px] text-[var(--admin-muted)] line-clamp-1 max-w-[120px]">{row.drop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[var(--admin-muted)]">{row.driver}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-[var(--admin-border)] bg-[var(--admin-border)] text-[var(--admin-muted)]">
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
                      <button 
                        onClick={() => setSelectedMapParcel(row.id)}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-border)] border border-[var(--admin-border)] hover:bg-[var(--admin-primary)]/10 hover:text-[var(--admin-primary)] hover:border-[var(--admin-primary)]/30 text-[var(--admin-text)] text-xs font-medium transition-colors" 
                        title="View Parcel Tracker"
                      >
                        <Navigation size={13} className="text-[var(--admin-primary)]" />
                        View Tracker
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedParcels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No parcels found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[var(--admin-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--admin-muted)]">
          <div>
            Showing {filteredParcels.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredParcels.length)} of {filteredParcels.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || filteredParcels.length === 0}
              className="px-3 py-1.5 rounded-md border border-[var(--admin-border)] bg-[var(--admin-background)] text-[var(--admin-text)] hover:bg-[var(--admin-border)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="font-medium text-[var(--admin-text)]">
              Page {filteredParcels.length > 0 ? currentPage : 0} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || filteredParcels.length === 0}
              className="px-3 py-1.5 rounded-md border border-[var(--admin-border)] bg-[var(--admin-background)] text-[var(--admin-text)] hover:bg-[var(--admin-border)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Parcel Progress Tracker & Map Modal Overlay */}
      {selectedMapParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-5xl bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
            
            {/* Modal Header */}
            {(() => {
              const activeParcel = detailedParcel || parcels.find(p => p.id === selectedMapParcel)?.raw || {};
              const progress = getParcelStepProgress(activeParcel);
              const parcelStatus = (activeParcel.status || "REQUESTED").toUpperCase();
              
              const statusBadgeColor = 
                parcelStatus === "COMPLETED" ? "bg-green-500/10 text-[var(--admin-primary)] border-green-500/20" :
                parcelStatus === "CANCELLED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                "bg-blue-500/10 text-blue-400 border-blue-500/20";

              return (
                <>
                  <div className="p-4 sm:p-5 border-b border-[var(--admin-border)] bg-[var(--admin-card)] flex items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--admin-primary)]/10 border border-[var(--admin-primary)]/20 flex items-center justify-center text-[var(--admin-primary)] shadow-sm">
                        <Package size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-[var(--admin-text)]">Live Parcel Delivery Tracking</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadgeColor}`}>
                            {parcelStatus === "COMPLETED" ? "DELIVERED" : parcelStatus}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--admin-border)] text-[var(--admin-muted)]">
                            {activeParcel.parcelDetail?.packageSize || activeParcel.parcelInfo?.packageSize || "Small Package"}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--admin-muted)] mt-0.5 font-mono">
                          ID: <span className="text-[var(--admin-text)]">{selectedMapParcel}</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedMapParcel(null);
                        setDetailedParcel(null);
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
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--admin-text)]">Delivery Progress Tracker</h4>
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
                              Parcel Delivery Cancelled {activeParcel.cancelledBy ? `by ${activeParcel.cancelledBy}` : ""}
                              {activeParcel.cancelledAt ? ` at ${new Date(activeParcel.cancelledAt).toLocaleString()}` : ""}
                            </p>
                            <p className="text-red-300/80">
                              Reason: {activeParcel.cancelReason || "No specific reason provided."}
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
                          <span className="text-[var(--admin-text)]">Live Parcel Dispatch Route</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium">
                          {activeParcel.distanceKm && (
                            <span className="bg-[var(--admin-background)]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--admin-border)] text-[var(--admin-text)]">
                              📏 {activeParcel.distanceKm} km
                            </span>
                          )}
                          {activeParcel.durationMin && (
                            <span className="bg-[var(--admin-background)]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--admin-border)] text-[var(--admin-text)]">
                              ⏱️ {activeParcel.durationMin} mins
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
                              className={`h-full transition-all duration-700 ${progress.isCancelled ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 via-[var(--admin-primary)] to-emerald-500'}`}
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
                            <span className="text-[11px] font-bold text-blue-400">Sender Pickup</span>
                          </div>

                          {/* Moving Driver Marker */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-10 h-10 rounded-full bg-[var(--admin-primary)]/20 border-2 border-[var(--admin-primary)] flex items-center justify-center text-[var(--admin-primary)] shadow-[0_0_20px_rgba(126,211,33,0.4)] animate-bounce">
                              <Truck size={18} />
                            </div>
                            <span className="text-[11px] font-bold text-[var(--admin-primary)]">
                              {parcelStatus === "COMPLETED" ? "Delivered" : (parcelStatus === "STARTED" ? "In Transit" : "Delivery Partner")}
                            </span>
                          </div>

                          {/* Destination Node */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-md">
                              <Package size={16} />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-400">Recipient Drop</span>
                          </div>
                        </div>
                      </div>

                      {/* Route Addresses */}
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[var(--admin-border)]">
                        <div className="bg-[var(--admin-background)]/80 backdrop-blur-sm p-3 rounded-lg border border-[var(--admin-border)] flex items-start gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                          <div className="text-xs">
                            <p className="font-semibold text-[var(--admin-text)]">Pickup / Sender Address</p>
                            <p className="text-[var(--admin-muted)] mt-0.5 line-clamp-2">
                              {activeParcel.pickup?.address || activeParcel.pickupAddress || "Pickup location not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[var(--admin-background)]/80 backdrop-blur-sm p-3 rounded-lg border border-[var(--admin-border)] flex items-start gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
                          <div className="text-xs">
                            <p className="font-semibold text-[var(--admin-text)]">Drop / Recipient Address</p>
                            <p className="text-[var(--admin-muted)] mt-0.5 line-clamp-2">
                              {activeParcel.drop?.address || activeParcel.dropAddress || "Drop location not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parcel Details 3-Column Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Sender & Receiver Info Card */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5 mb-1">
                              <User size={14} className="text-blue-400" /> Sender
                            </span>
                            <h5 className="text-sm font-bold text-[var(--admin-text)]">
                              {activeParcel.rider?.name || activeParcel.sender || "Unknown Sender"}
                            </h5>
                            {activeParcel.rider?.phone && (
                              <p className="text-xs text-[var(--admin-muted)] flex items-center gap-1 mt-0.5">
                                <Phone size={11} /> {activeParcel.rider.phone}
                              </p>
                            )}
                          </div>

                          <div className="pt-2 border-t border-[var(--admin-border)]">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5 mb-1">
                              <User size={14} className="text-emerald-400" /> Receiver
                            </span>
                            <h5 className="text-sm font-bold text-[var(--admin-text)]">
                              {activeParcel.parcelDetail?.receiverName || activeParcel.receiver || "Unknown Receiver"}
                            </h5>
                            {(activeParcel.parcelDetail?.receiverPhone || activeParcel.receiverPhone) && (
                              <p className="text-xs text-[var(--admin-muted)] flex items-center gap-1 mt-0.5">
                                <Phone size={11} /> {activeParcel.parcelDetail?.receiverPhone || activeParcel.receiverPhone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Pickup / Delivery OTPs */}
                        {(activeParcel.parcelDetail?.pickupOtp || activeParcel.parcelDetail?.deliveryOtp) && (
                          <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] flex items-center justify-between text-xs">
                            {activeParcel.parcelDetail?.pickupOtp && (
                              <div className="flex items-center gap-1">
                                <span className="text-[var(--admin-muted)]">Pickup OTP:</span>
                                <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                                  {activeParcel.parcelDetail.pickupOtp}
                                </span>
                              </div>
                            )}
                            {activeParcel.parcelDetail?.deliveryOtp && (
                              <div className="flex items-center gap-1">
                                <span className="text-[var(--admin-muted)]">Drop OTP:</span>
                                <span className="font-mono font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                                  {activeParcel.parcelDetail.deliveryOtp}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Driver & Delivery Partner Card */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5">
                              <Car size={14} className="text-[var(--admin-primary)]" /> Delivery Partner
                            </span>
                            {activeParcel.driver?.rating && (
                              <span className="text-xs text-amber-400 font-semibold">
                                ★ {activeParcel.driver.rating}
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm font-bold text-[var(--admin-text)]">
                            {activeParcel.driver?.name || activeParcel.driver || "Unassigned"}
                          </h5>
                          {activeParcel.driver?.phone && (
                            <p className="text-xs text-[var(--admin-muted)] mt-1 flex items-center gap-1">
                              <Phone size={12} /> {activeParcel.driver.phone}
                            </p>
                          )}
                          {activeParcel.driver?.vehicle && (
                            <div className="mt-2 text-xs text-[var(--admin-muted)]">
                              <span className="text-[var(--admin-text)] font-semibold">
                                {activeParcel.driver.vehicle.model}
                              </span>{" "}
                              • <span className="font-mono">{activeParcel.driver.vehicle.registrationNumber}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] text-xs text-[var(--admin-muted)] flex items-center justify-between">
                          <span>Package Type:</span>
                          <span className="text-[var(--admin-text)] font-medium">
                            {activeParcel.parcelDetail?.packageSize || activeParcel.type || "Standard"}
                          </span>
                        </div>
                      </div>

                      {/* Billing & Parcel Metadata Card */}
                      <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase text-[var(--admin-muted)] flex items-center gap-1.5">
                              <CreditCard size={14} className="text-[var(--admin-primary)]" /> Delivery Fare
                            </span>
                            <span className="text-base font-bold text-[var(--admin-primary)]">
                              {activeParcel.finalFare ? `₹${activeParcel.finalFare}` : (activeParcel.fare || `₹${activeParcel.fareEstimate || 0}`)}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Estimated Rate:</span>
                              <span className="text-[var(--admin-text)]">₹{activeParcel.fareEstimate || activeParcel.fare || 0}</span>
                            </div>
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Payment Status:</span>
                              <span className="text-green-400 font-medium">
                                {activeParcel.payments?.[0]?.status || (parcelStatus === "COMPLETED" ? "Paid" : "Pending")}
                              </span>
                            </div>
                            <div className="flex justify-between text-[var(--admin-muted)]">
                              <span>Package Details:</span>
                              <span className="text-[var(--admin-text)]">
                                {activeParcel.parcelDetail?.packageWeightKg ? `${activeParcel.parcelDetail.packageWeightKg} kg` : "Standard"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[var(--admin-border)] flex items-center justify-between text-xs text-[var(--admin-muted)]">
                          <span className="flex items-center gap-1"><Calendar size={12} /> Booked:</span>
                          <span className="text-[var(--admin-text)]">
                            {activeParcel.requestedAt ? new Date(activeParcel.requestedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : "N/A"}
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
