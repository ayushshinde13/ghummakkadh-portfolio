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

  const filteredComplaints = complaints.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = c.id.toLowerCase().includes(query) || c.raisedByName.toLowerCase().includes(query) || c.against.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || (statusFilter === "in_progress" ? c.status === "In Progress" : c.status.toLowerCase() === statusFilter);
    return matchesSearch && matchesStatus;
  });

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
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Complaints</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Disputes & Complaints</h2>
          <p className="text-gray-400 mt-1">
            Review and resolve issues raised by customers and drivers.
          </p>
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
              placeholder="Search by ID or name..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
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
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
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
              {filteredComplaints.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{row.date}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-200">{row.raisedByName}</span>
                      <span className="text-xs text-[var(--admin-primary)]">{row.raisedBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.against}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5 max-w-xs">
                      <span className="font-semibold text-gray-200">{row.category}</span>
                      <span className="text-xs text-gray-500 line-clamp-1">{row.description}</span>
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
                          className="p-1.5 rounded-md hover:bg-green-500/20 text-gray-400 hover:text-green-500 transition-colors" 
                          title="Mark Resolved"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenModal(row)}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors shrink-0"
                      >
                        <FileText size={14} className="text-gray-400" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Complaint Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <FileText size={18} className="text-[var(--admin-primary)]" />
                Complaint Details
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400">Raised By</div>
                  <div className="text-lg font-bold text-white">{selectedComplaint.raisedByName} <span className="text-sm font-normal text-gray-400">({selectedComplaint.raisedBy})</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Complaint ID</div>
                  <div className="text-sm font-mono text-[var(--admin-primary)]">{selectedComplaint.id}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedComplaint.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Against</div>
                  <div className="text-sm font-medium text-white">{selectedComplaint.against}</div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Category</div>
                  <div className="text-sm font-medium text-white">{selectedComplaint.category}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-400 mb-2">Description</div>
                <div className="p-4 rounded-xl border border-white/10 bg-[#111827] text-sm text-gray-300 leading-relaxed">
                  {selectedComplaint.description}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-400">Current Status</div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
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
              <div>
                <div className="text-sm font-medium text-gray-400 mb-2">Message History</div>
                <div className="bg-[#111827] border border-white/10 rounded-xl p-4 max-h-48 overflow-y-auto flex flex-col gap-3">
                  {isDetailsLoading ? (
                    <div className="text-gray-500 text-sm">Loading messages...</div>
                  ) : complaintDetails?.ticket?.messages?.length > 0 ? (
                    complaintDetails.ticket.messages.map((msg: any) => (
                      <div key={msg.id} className={`flex flex-col ${msg.senderRole === 'ADMIN' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.senderRole === 'ADMIN' ? 'bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]' : 'bg-white/10 text-white'}`}>
                          {msg.message}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No messages yet.</div>
                  )}
                </div>
              </div>

              {selectedComplaint.status !== "Resolved" && (
                <div>
                  <div className="text-sm font-medium text-gray-400 mb-2">Reply</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1 h-10 bg-[#111827] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-lg px-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
                    />
                    <button 
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="h-10 px-4 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] disabled:opacity-50 transition-colors text-sm flex items-center justify-center"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
              >
                Close
              </button>
              {selectedComplaint.status !== "Resolved" && (
                <button 
                  onClick={() => { handleResolve(selectedComplaint.id); setIsModalOpen(false); }}
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5"
                >
                  <CheckCircle size={16} />
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
