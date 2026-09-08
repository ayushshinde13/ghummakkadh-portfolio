"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, CheckCircle, Clock, FileText, ChevronRight, X, Send } from "lucide-react";
import { api } from "@/lib/api";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState<any>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [replyText, setReplyText] = useState("");

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/complaints");
      const fetchedComplaints = res.data?.complaints || [];
      const formatted = fetchedComplaints.map((c: any) => ({
        id: c.id,
        raisedBy: c.complainant?.roles?.[0] || "User",
        raisedByName: c.complainant?.name || "Unknown",
        against: c.tripId ? `Trip #${c.tripId}` : "N/A",
        category: c.category || "General",
        description: c.subject || c.lastMessage || "No description provided.",
        status: c.status === "RESOLVED" ? "Resolved" : (c.status === "IN_PROGRESS" ? "In Progress" : "Open"),
        date: new Date(c.createdAt).toLocaleDateString(),
        raw: c,
      }));
      setComplaints(formatted);
    } catch (error) {
      console.error("Failed to fetch complaints", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredComplaints = complaints.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = c.id.toLowerCase().includes(query) || c.raisedByName.toLowerCase().includes(query) || c.against.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || (statusFilter === "in_progress" ? c.status === "In Progress" : c.status.toLowerCase() === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleResolve = async (id: string) => {
    try {
      await api.put(`/admin/complaints/${id}/resolve`, { resolution: "Resolved via admin dashboard." });
      fetchComplaints();
    } catch (error) {
      console.error("Failed to resolve complaint", error);
      alert("Failed to resolve complaint");
    }
  };

  const fetchComplaintDetails = async (id: string) => {
    try {
      setIsDetailsLoading(true);
      const res = await api.get(`/admin/complaints/${id}`);
      setComplaintDetails(res.data);
    } catch (error) {
      console.error("Failed to fetch complaint details", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleOpenModal = (row: any) => {
    setSelectedComplaint(row);
    setIsModalOpen(true);
    fetchComplaintDetails(row.id);
  };

  const handleSendReply = async () => {
    if (selectedComplaint && replyText.trim()) {
      try {
        await api.post(`/admin/complaints/${selectedComplaint.id}/messages`, {
          message: replyText,
        });
        setReplyText("");
        fetchComplaintDetails(selectedComplaint.id);
        fetchComplaints();
      } catch (error) {
        console.error("Failed to send reply", error);
        alert("Failed to send reply");
      }
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Disputes & Complaints</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Review and resolve issues raised by customers and drivers.
          </p>
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
              placeholder="Search by ID or name..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium">Complaint ID</th>
                <th className="px-4 py-3 font-medium">Raised By</th>
                <th className="px-4 py-3 font-medium">Against</th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedComplaints.map((row, idx) => (
                <tr key={`${row.id || "complaint"}-${idx}`} className="hover:bg-[var(--admin-border)] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-[var(--admin-text)]">{row.id}</div>
                    <div className="text-xs text-[var(--admin-muted)] mt-0.5">{row.date}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-200">{row.raisedByName}</span>
                      <span className="text-xs text-[var(--admin-primary)]">{row.raisedBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[var(--admin-muted)]">{row.against}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5 max-w-xs">
                      <span className="font-semibold text-gray-200">{row.category}</span>
                      <span className="text-xs text-[var(--admin-muted)] line-clamp-1">{row.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "Open" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500">
                        <MessageSquare size={12} />
                        {row.status}
                      </span>
                    )}
                    {row.status === "In Progress" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        <Clock size={12} />
                        {row.status}
                      </span>
                    )}
                    {row.status === "Resolved" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]">
                        <CheckCircle size={12} />
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.status !== "Resolved" && (
                        <button 
                          onClick={() => handleResolve(row.id)}
                          className="p-1.5 rounded-md hover:bg-green-500/20 text-[var(--admin-muted)] hover:text-green-500 transition-colors" 
                          title="Mark Resolved"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenModal(row)}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-border)] border border-[var(--admin-border)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] text-xs font-medium transition-colors shrink-0"
                      >
                        <FileText size={14} className="text-[var(--admin-muted)]" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedComplaints.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--admin-muted)]">
          <span>
            Showing <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + (paginatedComplaints.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + paginatedComplaints.length}</span> of <span className="font-medium text-[var(--admin-text)]">{filteredComplaints.length}</span> complaints
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

      {/* View Complaint Modal (Rectangular Shape) */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-card)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-[var(--admin-text)] font-bold text-base tracking-tight">
                    Complaint Details
                  </h3>
                  <p className="text-xs text-[var(--admin-muted)]">
                    ID: <span className="font-mono text-[var(--admin-primary)]">{selectedComplaint.id}</span> • {selectedComplaint.date}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body - 2 Column Rectangular Grid */}
            <div className="p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-12 gap-6 bg-[var(--admin-background)]">
              {/* Left Column: Complaint Metadata & Description (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[var(--admin-muted)] uppercase tracking-wider font-semibold">Raised By</span>
                      <div className="text-base font-bold text-[var(--admin-text)] mt-0.5">
                        {selectedComplaint.raisedByName}
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[var(--admin-primary)]/10 text-[var(--admin-primary)] font-semibold">
                          {selectedComplaint.raisedBy}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[var(--admin-muted)] uppercase tracking-wider font-semibold">Status</span>
                      <div className="mt-0.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          selectedComplaint.status === "Open" ? "border-red-500/20 bg-red-500/10 text-red-500" :
                          selectedComplaint.status === "In Progress" ? "border-amber-500/20 bg-amber-500/10 text-amber-500" :
                          "border-green-500/20 bg-green-500/10 text-[var(--admin-primary)]"
                        }`}>
                          {selectedComplaint.status === "Open" && <MessageSquare size={12} />}
                          {selectedComplaint.status === "In Progress" && <Clock size={12} />}
                          {selectedComplaint.status === "Resolved" && <CheckCircle size={12} />}
                          {selectedComplaint.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--admin-border)]">
                    <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                      <span className="text-[11px] text-[var(--admin-muted)] font-medium block">Against</span>
                      <span className="text-sm font-semibold text-[var(--admin-text)]">{selectedComplaint.against}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                      <span className="text-[11px] text-[var(--admin-muted)] font-medium block">Category</span>
                      <span className="text-sm font-semibold text-[var(--admin-text)]">{selectedComplaint.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)] block mb-1.5">
                    Description / Complaint Issue
                  </label>
                  <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-sm text-[var(--admin-text)] leading-relaxed whitespace-pre-wrap min-h-[100px]">
                    {selectedComplaint.description}
                  </div>
                </div>
              </div>

              {/* Right Column: Message History & Reply Box (6 cols) */}
              <div className="md:col-span-6 flex flex-col space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)] block">
                  Communication History
                </label>

                <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 h-64 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
                  {isDetailsLoading ? (
                    <div className="text-[var(--admin-muted)] text-xs flex items-center justify-center h-full">Loading message history...</div>
                  ) : complaintDetails?.ticket?.messages?.length > 0 ? (
                    complaintDetails.ticket.messages.map((msg: any) => (
                      <div key={msg.id} className={`flex flex-col ${msg.senderRole === 'ADMIN' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-3.5 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                          msg.senderRole === 'ADMIN' 
                            ? 'bg-[var(--admin-primary)] text-[#0A0E1A] font-medium' 
                            : 'bg-[var(--admin-border)] text-[var(--admin-text)]'
                        }`}>
                          {msg.message}
                        </div>
                        <span className="text-[10px] text-[var(--admin-muted)] mt-1 px-1">{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[var(--admin-muted)] text-xs flex items-center justify-center h-full">
                      No message history recorded yet.
                    </div>
                  )}
                </div>

                {selectedComplaint.status !== "Resolved" && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-[var(--admin-muted)] font-medium">Send Reply</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                        placeholder="Type response to complainant..."
                        className="flex-1 h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)] rounded-lg px-3.5 text-xs text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
                      />
                      <button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="h-10 px-4 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] disabled:opacity-50 transition-colors text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Send size={14} />
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex items-center justify-between px-6 shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-background)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] font-semibold transition-colors text-xs cursor-pointer"
              >
                Close
              </button>
              {selectedComplaint.status !== "Resolved" && (
                <button 
                  onClick={() => { handleResolve(selectedComplaint.id); setIsModalOpen(false); }}
                  className="px-4 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <CheckCircle size={15} />
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
