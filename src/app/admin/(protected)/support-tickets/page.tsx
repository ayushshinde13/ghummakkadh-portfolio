"use client";

import React, { useState, useEffect } from "react";
import { Search, Ticket, MessageCircle, XCircle, Clock, CheckCircle, X, Send } from "lucide-react";
import { api } from "@/lib/api";

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [ticketDetails, setTicketDetails] = useState<any>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/support/tickets");
      const fetchedTickets = res.data?.tickets || [];
      const formatted = fetchedTickets.map((t: any) => ({
        id: t.id,
        user: t.user?.name || "Unknown",
        subject: t.subject,
        priority: t.priority,
        status: t.status === "RESOLVED" ? "Closed" : (t.status === "IN_PROGRESS" ? "In Progress" : "Open"),
        createdOn: new Date(t.createdAt).toLocaleString(),
        assignedTo: t.assignedAdmin?.name || "Unassigned",
        raw: t,
      }));
      setTickets(formatted);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = t.id.toLowerCase().includes(query) || t.user.toLowerCase().includes(query) || t.subject.toLowerCase().includes(query);
    const matchesPriority = priorityFilter === "all" || t.priority.toLowerCase() === priorityFilter;
    const matchesStatus = statusFilter === "all" || (statusFilter === "in_progress" ? t.status === "In Progress" : t.status.toLowerCase() === statusFilter);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleCloseTicket = async (id: string) => {
    try {
      await api.put(`/admin/support/tickets/${id}/resolve`, { resolution: "Closed via admin dashboard." });
      fetchTickets();
    } catch (error) {
      console.error("Failed to resolve ticket", error);
      alert("Failed to resolve ticket");
    }
  };

  const fetchTicketDetails = async (id: string) => {
    try {
      setIsDetailsLoading(true);
      const res = await api.get(`/admin/support/tickets/${id}`);
      setTicketDetails(res.data);
    } catch (error) {
      console.error("Failed to fetch ticket details", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleOpenModal = (row: any) => {
    setSelectedTicket(row);
    setIsModalOpen(true);
    fetchTicketDetails(row.id);
  };

  const handleSendReply = async () => {
    if (selectedTicket && replyText.trim()) {
      try {
        await api.post(`/admin/support/tickets/${selectedTicket.id}/messages`, {
          message: replyText,
        });
        setReplyText("");
        // Refresh messages
        fetchTicketDetails(selectedTicket.id);
        fetchTickets();
      } catch (error) {
        console.error("Failed to send reply", error);
        alert("Failed to send reply");
      }
    }
  };

  const openTicketsCount = tickets.filter(t => t.status === "Open").length;
  const inProgressCount = tickets.filter(t => t.status === "In Progress").length;
  const closedCount = tickets.filter(t => t.status === "Closed").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Support Tickets</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">Support Tickets</h2>
          <p className="text-gray-400 mt-1">
            Manage and respond to user technical issues and general inquiries.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Open Tickets</span>
            <div className="p-2 rounded-md bg-red-500/10"><Ticket size={16} className="text-red-500" /></div>
          </div>
          <span className="text-3xl font-bold text-red-500">{openTicketsCount}</span>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">In Progress</span>
            <div className="p-2 rounded-md bg-amber-500/10"><Clock size={16} className="text-amber-500" /></div>
          </div>
          <span className="text-3xl font-bold text-amber-500">{inProgressCount}</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Closed Tickets</span>
            <div className="p-2 rounded-md bg-green-500/10"><CheckCircle size={16} className="text-green-500" /></div>
          </div>
          <span className="text-3xl font-bold text-green-500">{closedCount}</span>
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
              placeholder="Search tickets by ID, user, or subject..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Priority: All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-medium">Ticket ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTickets.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{row.createdOn}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-200">{row.user}</td>
                  <td className="px-4 py-4 text-gray-300">{row.subject}</td>
                  <td className="px-4 py-4">
                    {row.priority === "High" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-500">
                        High
                      </span>
                    )}
                    {row.priority === "Medium" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-500">
                        Medium
                      </span>
                    )}
                    {row.priority === "Low" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                        Low
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {row.status === "Open" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-red-500/30 bg-red-500/10 text-red-400">
                        {row.status}
                      </span>
                    )}
                    {row.status === "In Progress" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/30 bg-amber-500/10 text-amber-400">
                        {row.status}
                      </span>
                    )}
                    {row.status === "Closed" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-500/30 bg-gray-500/10 text-gray-400">
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-400">{row.assignedTo}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(row)}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors shrink-0"
                      >
                        <MessageCircle size={14} className="text-gray-400" />
                        Reply
                      </button>
                      {row.status !== "Closed" && (
                        <button 
                          onClick={() => handleCloseTicket(row.id)}
                          className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors ml-1" 
                          title="Close Ticket"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No tickets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                <Ticket size={18} className="text-[var(--admin-primary)]" />
                Ticket: {selectedTicket.id}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col space-y-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Subject</div>
                <div className="text-lg font-bold text-white">{selectedTicket.subject}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">User</div>
                  <div className="text-sm font-medium text-white">{selectedTicket.user}</div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="text-sm font-medium text-white">{selectedTicket.status}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-400 mb-2">Message History</div>
                <div className="bg-[#111827] border border-white/10 rounded-xl p-4 max-h-48 overflow-y-auto flex flex-col gap-3">
                  {isDetailsLoading ? (
                    <div className="text-gray-500 text-sm">Loading messages...</div>
                  ) : ticketDetails?.ticket?.messages?.length > 0 ? (
                    ticketDetails.ticket.messages.map((msg: any) => (
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

              <div>
                <div className="text-sm font-medium text-gray-400 mb-2">Your Reply</div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to the user here..."
                  className="w-full h-24 bg-[#111827] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-xl p-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center gap-1.5"
              >
                <Send size={16} />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
