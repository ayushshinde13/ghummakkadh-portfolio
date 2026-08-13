"use client";

import React, { useState } from "react";
import { 
  FileText, Clock, CheckCircle, XCircle, Search, 
  SlidersHorizontal, ChevronDown, ChevronUp, MoreHorizontal,
  X, User, Mail
} from "lucide-react";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";
type VerificationStatus = "Verified" | "Pending" | "Rejected";

interface Application {
  id: string;
  name: string;
  phone: string;
  city: string;
  appliedOn: string;
  verification: VerificationStatus;
  approval: ApprovalStatus;
  role: "Rider" | "Driver";
  vehicle?: string;
}

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<"customers" | "drivers">("customers");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedViewDetailsId, setSelectedViewDetailsId] = useState<string | null>(null);
  const [selectedContactUserId, setSelectedContactUserId] = useState<string | null>(null);

  // Mock Data
  const initialData: Application[] = [
    {
      id: "usr-492a-8b1c-3f9d",
      name: "Ramesh Kumar",
      phone: "+91 9876543210",
      city: "Raipur",
      appliedOn: "12 Aug 2026, 14:30",
      verification: "Verified",
      approval: "Approved",
      role: "Driver",
      vehicle: "Maruti Swift Dzire"
    },
    {
      id: "usr-183d-9f4c-2a7e",
      name: "Priya Sharma",
      phone: "+91 9123456789",
      city: "Bhilai",
      appliedOn: "13 Aug 2026, 09:15",
      verification: "Pending",
      approval: "Pending",
      role: "Rider"
    },
    {
      id: "usr-771b-3c2d-9a8f",
      name: "Amit Verma",
      phone: "+91 9988776655",
      city: "Bilaspur",
      appliedOn: "11 Aug 2026, 11:45",
      verification: "Rejected",
      approval: "Rejected",
      role: "Driver",
      vehicle: "Bajaj RE Auto"
    },
    {
      id: "usr-554c-1d8e-7b6a",
      name: "Sneha Gupta",
      phone: "+91 9811223344",
      city: "Raipur",
      appliedOn: "13 Aug 2026, 10:20",
      verification: "Verified",
      approval: "Pending",
      role: "Rider"
    }
  ];

  const [data, setData] = useState<Application[]>(initialData);

  const handleApprove = (id: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, approval: "Approved", verification: "Verified" } : item));
  };

  const handleReject = (id: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, approval: "Rejected", verification: "Rejected" } : item));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const filteredData = data.filter(d => {
    const matchesTab = activeTab === "customers" ? d.role === "Rider" : d.role === "Driver";
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.approval.toLowerCase() === statusFilter;
    const matchesCity = cityFilter === "all" || d.city.toLowerCase() === cityFilter;
    const matchesVerification = verificationFilter === "all" || d.verification.toLowerCase() === verificationFilter;
    
    return matchesTab && matchesSearch && matchesStatus && matchesCity && matchesVerification;
  });
  
  // Pagination logic (Mock)
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getBadgeColors = (status: string) => {
    switch (status) {
      case "Verified":
      case "Approved":
        return "bg-green-500/10 text-[var(--admin-primary)] border-green-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Approvals</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Driver & Rider Registrations</h2>
          <p className="text-gray-400 mt-1">
            Review and manage driver and rider onboarding applications.
          </p>
        </div>
        
        {/* Pill-style Tabs */}
        <div className="inline-flex items-center rounded-full border border-white/10 bg-[#111827]/50 p-1">
          <button 
            onClick={() => { setActiveTab("customers"); setCurrentPage(1); }}
            className={`py-3 px-4 rounded-full font-medium text-sm transition-colors ${
              activeTab === "customers"
                ? "bg-[#0A0E1A] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Customers (Riders)
          </button>
          <button 
            onClick={() => { setActiveTab("drivers"); setCurrentPage(1); }}
            className={`py-3 px-4 rounded-full font-medium text-sm transition-colors ${
              activeTab === "drivers"
                ? "bg-[#0A0E1A] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >          Drivers
          </button>
        </div>
      </div>

      {/* 2. Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Applications</span>
            <div className="p-2 rounded-md bg-white/5"><FileText size={16} className="text-gray-400" /></div>
          </div>
          <span className="text-3xl font-bold text-white">1,284</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pending Review</span>
            <div className="p-2 rounded-md bg-amber-500/10"><Clock size={16} className="text-amber-500" /></div>
          </div>
          <span className="text-3xl font-bold text-amber-500">42</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Approved</span>
            <div className="p-2 rounded-md bg-[var(--admin-primary)]/10"><CheckCircle size={16} className="text-[var(--admin-primary)]" /></div>
          </div>
          <span className="text-3xl font-bold text-[var(--admin-primary)]">1,104</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rejected</span>
            <div className="p-2 rounded-md bg-red-500/10"><XCircle size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">138</span>
        </div>
      </div>

      {/* 3. All Applications Section */}
      <div className="rounded-xl border border-white/10 bg-[#111827]/50 shadow-sm overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">All Applications</h3>
          <span className="text-sm font-medium text-gray-400">{filteredData.length} results</span>
        </div>

        {/* Filter Row */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer or driver..."
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select 
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">City: All</option>
            <option value="raipur">Raipur</option>
            <option value="bhilai">Bhilai</option>
            <option value="bilaspur">Bilaspur</option>
          </select>

          <select 
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Verification: All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="flex items-center gap-2">
            <input type="date" className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none [color-scheme:dark]" />
            <span className="text-gray-500 text-sm">to</span>
            <input type="date" className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none [color-scheme:dark]" />
          </div>

          <button className="ml-auto flex items-center gap-2 h-9 px-3 rounded-md border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <SlidersHorizontal size={14} />
            Columns
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-white/20 bg-[#0A0E1A] text-[var(--admin-primary)] focus:ring-[var(--admin-primary)]" />
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Name <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Role <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">City <ChevronDown size={14} /></div>
                </th>
                {activeTab === "drivers" && (
                  <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">Vehicle <ChevronDown size={14} /></div>
                  </th>
                )}
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Applied On <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Verification <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Approval <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-white/20 bg-[#0A0E1A] text-[var(--admin-primary)] focus:ring-[var(--admin-primary)]" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 font-mono">{row.id}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.role}</td>
                  <td className="px-4 py-4 text-gray-300">{row.city}</td>
                  {activeTab === "drivers" && (
                    <td className="px-4 py-4 text-gray-300">{row.vehicle}</td>
                  )}
                  <td className="px-4 py-4 text-gray-300">{row.appliedOn}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getBadgeColors(row.verification)}`}>
                      {row.verification}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getBadgeColors(row.approval)}`}>
                      {row.approval}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.approval === "Pending" && (
                        <>
                          <button 
                            onClick={() => handleApprove(row.id)}
                            className="p-1.5 rounded-md hover:bg-green-500/20 text-green-500 transition-colors" 
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleReject(row.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/20 text-red-500 transition-colors" 
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      
                      {/* More Menu Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                          className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors ml-2" 
                          title="More Actions"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {openMenuId === row.id && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setOpenMenuId(null)}></div>
                            <div className="absolute right-0 top-full mt-1 w-32 bg-[#1A1A1A] border border-white/10 rounded-md shadow-lg z-40 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                              <button 
                                onClick={() => { setOpenMenuId(null); setSelectedViewDetailsId(row.id); }}
                                className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                View Details
                              </button>
                              <button 
                                onClick={() => { setOpenMenuId(null); setSelectedContactUserId(row.id); }}
                                className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                Contact User
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between text-sm text-gray-400">
          <span>Showing {(currentPage - 1) * itemsPerPage + (paginatedData.length > 0 ? 1 : 0)} to {(currentPage - 1) * itemsPerPage + paginatedData.length} of {filteredData.length} entries</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border border-white/10 bg-[#0A0E1A] hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-[#0A0E1A] transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded-md border border-white/10 bg-[#0A0E1A] hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-[#0A0E1A] transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* View Details Modal Overlay */}
      {selectedViewDetailsId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight">Application Details</h3>
              <button 
                onClick={() => setSelectedViewDetailsId(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col items-center">
              <div className="w-24 h-24 bg-[var(--admin-primary)]/10 rounded-full flex items-center justify-center mb-6">
                <FileText size={40} className="text-[var(--admin-primary)]" />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">
                {data.find(u => u.id === selectedViewDetailsId)?.name}
              </h4>
              <p className="text-sm text-gray-400 mb-6">
                ID: {selectedViewDetailsId}
              </p>

              <div className="w-full bg-[#111827] rounded-xl border border-white/5 p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Role</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedViewDetailsId)?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">City</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedViewDetailsId)?.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Phone</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedViewDetailsId)?.phone}</span>
                </div>
                {data.find(u => u.id === selectedViewDetailsId)?.vehicle && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Vehicle</span>
                    <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedViewDetailsId)?.vehicle}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Applied On</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedViewDetailsId)?.appliedOn}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedViewDetailsId(null)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact User Modal Overlay */}
      {selectedContactUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight">Contact User</h3>
              <button 
                onClick={() => setSelectedContactUserId(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                  <User size={24} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-none">
                    {data.find(u => u.id === selectedContactUserId)?.name}
                  </h4>
                  <span className="text-sm text-gray-400 mt-1 block">
                    {data.find(u => u.id === selectedContactUserId)?.phone}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Send a Message (Mock)</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-[#111827] border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all resize-none"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <button 
                  onClick={() => setSelectedContactUserId(null)}
                  className="w-full bg-[var(--admin-primary)] hover:bg-[#66E000] text-[#0A0E1A] font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(126,211,33,0.3)]"
                >
                  <Mail size={16} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
