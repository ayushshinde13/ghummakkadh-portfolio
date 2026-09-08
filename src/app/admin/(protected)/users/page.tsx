"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Search, ChevronDown, Eye, Ban, ShieldOff, X, User } from "lucide-react";

type Role = "Rider" | "Driver";
type Status = "Active" | "Suspended" | "Banned";

interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  roles: string[];
  city: string;
  status: Status;
  joinedOn: string;
}

export default function UserManagementPage() {
  const [userFilter, setUserFilter] = useState<string>("all");
  const [selectedUserModal, setSelectedUserModal] = useState<string | null>(null);
  
  // Ban Modal States
  const [userToBan, setUserToBan] = useState<UserData | null>(null);
  const [banReason, setBanReason] = useState("");
  const [isSubmittingBan, setIsSubmittingBan] = useState(false);

  // Suspend Modal States
  const [userToSuspend, setUserToSuspend] = useState<UserData | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [isSubmittingSuspend, setIsSubmittingSuspend] = useState(false);

  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/users?limit=100");
      const usersList: any[] = res.data?.users || res.data || [];

      const formatUser = (u: any): UserData => {
        const rolesList: string[] = Array.isArray(u.roles) 
          ? u.roles.map((r: any) => typeof r === "string" ? r.toUpperCase() : r.role?.toUpperCase())
          : (u.role ? [String(u.role).toUpperCase()] : ["RIDER"]);

        const primaryRole: Role = rolesList.includes("DRIVER") ? "Driver" : "Rider";

        return {
          id: u.id,
          name: u.name || "Unknown",
          phone: u.phone || "Unknown",
          email: u.email || "Unknown",
          role: primaryRole,
          roles: rolesList,
          city: "Unknown",
          status: u.status === "BLOCKED" ? "Banned" : (u.status === "SUSPENDED" ? "Suspended" : "Active"),
          joinedOn: new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        };
      };

      const formatted = usersList.map(formatUser);
      // Ensure strict uniqueness by user ID
      const uniqueUsers = Array.from(new Map(formatted.map(u => [u.id, u])).values());

      setData(uniqueUsers);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleConfirmSuspend = async () => {
    if (!userToSuspend) return;
    try {
      setIsSubmittingSuspend(true);
      const reason = suspendReason.trim() || "Suspended by administrator";
      await api.put(`/admin/users/${userToSuspend.id}/status`, { status: "SUSPENDED", reason });
      await fetchUsers();
      setUserToSuspend(null);
      setSuspendReason("");
    } catch (error: any) {
      console.error("Failed to suspend user", error);
      alert(error.message || "Failed to suspend user. Please try again.");
    } finally {
      setIsSubmittingSuspend(false);
    }
  };

  const handleUnsuspend = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status: "ACTIVE", reason: "Reactivated by administrator" });
      await fetchUsers();
    } catch (error: any) {
      console.error("Failed to unsuspend user", error);
      alert(error.message || "Failed to unsuspend user");
    }
  };
  
  const handleConfirmBan = async () => {
    if (!userToBan) return;
    try {
      setIsSubmittingBan(true);
      const reason = banReason.trim() || "Banned by administrator";
      await api.put(`/admin/users/${userToBan.id}/status`, { status: "BLOCKED", reason });
      await fetchUsers();
      setUserToBan(null);
      setBanReason("");
    } catch (error: any) {
      console.error("Failed to ban user", error);
      alert(error.message || "Failed to ban user. Please try again.");
    } finally {
      setIsSubmittingBan(false);
    }
  };

  const handleUnban = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status: "ACTIVE", reason: "Unbanned by administrator" });
      await fetchUsers();
    } catch (error: any) {
      console.error("Failed to unban user", error);
      alert(error.message || "Failed to unban user");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = data.filter(u => {
    const isRoleMatch =
      userFilter === "all"
        ? true
        : userFilter === "rider"
        ? u.roles.includes("RIDER")
        : u.roles.includes("DRIVER");

    const query = searchQuery.toLowerCase();
    const isSearchMatch = u.name.toLowerCase().includes(query) || u.phone.includes(query) || u.email.toLowerCase().includes(query) || u.id.toLowerCase().includes(query);
    const isStatusMatch = statusFilter === "all" || u.status.toLowerCase() === statusFilter.toLowerCase();
    
    return isRoleMatch && isSearchMatch && isStatusMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, userFilter]);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-[var(--admin-primary)] border-green-500/20";
      case "Suspended": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Banned": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-[var(--admin-muted)] border-gray-500/20";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">User Management</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Manage existing riders and drivers across the platform.
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
              placeholder={userFilter === "all" ? "Search users..." : `Search ${userFilter}s...`}
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>

          <select 
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Users: All</option>
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">Name <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">Contact <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">Role <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">City <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">Status <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--admin-text)]">
                  <div className="flex items-center gap-1">Joined On <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={`${row.id || "user"}-${idx}`} className="hover:bg-[var(--admin-border)] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-[var(--admin-text)]">{row.name}</div>
                    <div className="text-xs text-[var(--admin-muted)] mt-0.5 font-mono">{row.id}</div>
                  </td>
                  <td className="px-4 py-4 text-[var(--admin-muted)]">
                    <div className="flex flex-col">
                      <span>{row.phone}</span>
                      <span className="text-xs text-[var(--admin-muted)]">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {row.roles && row.roles.length > 0 ? (
                        row.roles.map((r, rIdx) => (
                          <span
                            key={`${row.id}-${r}-${rIdx}`}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                              r === "DRIVER"
                                ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                                : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                          {row.role}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[var(--admin-muted)]">{row.city}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[var(--admin-muted)]">{row.joinedOn}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedUserModal(row.id)}
                        className="p-1.5 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors" 
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setUserToSuspend(row);
                          setSuspendReason("");
                        }}
                        className={`p-1.5 rounded-md transition-colors ${
                          row.status === "Suspended"
                            ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
                            : "hover:bg-amber-500/20 text-[var(--admin-muted)] hover:text-amber-500"
                        }`} 
                        title={row.status === "Suspended" ? "Manage Suspension / Reactivate" : "Suspend User"}
                      >
                        <ShieldOff size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setUserToBan(row);
                          setBanReason("");
                        }}
                        className={`p-1.5 rounded-md transition-colors ${
                          row.status === "Banned" 
                            ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" 
                            : "hover:bg-red-500/20 text-[var(--admin-muted)] hover:text-red-500"
                        }`}
                        title={row.status === "Banned" ? "Manage Ban / Unban" : "Ban User"}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--admin-muted)]">
          <span>
            Showing <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + (paginatedData.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-[var(--admin-text)]">{(currentPage - 1) * itemsPerPage + paginatedData.length}</span> of <span className="font-medium text-[var(--admin-text)]">{filteredData.length}</span> users
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

      {/* Suspend Confirmation Dialog Modal */}
      {userToSuspend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <ShieldOff size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--admin-text)]">
                  {userToSuspend.status === "Suspended" ? "Manage Suspended User" : "Suspend User Account"}
                </h3>
                <p className="text-xs text-[var(--admin-muted)] mt-1">
                  {userToSuspend.status === "Suspended" 
                    ? "This user is currently suspended. You can reactivate their account to restore access."
                    : "Temporarily pause and suspend access for this user."}
                </p>
              </div>
              <button 
                onClick={() => { setUserToSuspend(null); setSuspendReason(""); }}
                className="p-1 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Details Preview */}
            <div className="px-5 py-3 bg-[var(--admin-background)] border-y border-[var(--admin-border)] mx-6 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">User Name:</span>
                <span className="font-semibold text-[var(--admin-text)]">{userToSuspend.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Phone / Email:</span>
                <span className="text-[var(--admin-text)] font-mono">{userToSuspend.phone || userToSuspend.email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Role:</span>
                <span className="font-medium text-blue-400">{userToSuspend.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Current Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(userToSuspend.status)}`}>
                  {userToSuspend.status}
                </span>
              </div>
            </div>

            {/* Reason input for suspending */}
            {userToSuspend.status !== "Suspended" && (
              <div className="p-6 pt-4 space-y-2">
                <label className="block text-xs font-medium text-[var(--admin-text)]">
                  Reason for Suspension <span className="text-[var(--admin-muted)]">(optional)</span>
                </label>
                <textarea
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  placeholder="e.g. Investigation pending, repeated cancellations, document verification..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)] text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>
            )}

            {/* Modal Actions */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-background)] flex items-center justify-end gap-3 mt-auto">
              <button
                type="button"
                disabled={isSubmittingSuspend}
                onClick={() => { setUserToSuspend(null); setSuspendReason(""); }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--admin-text)] hover:bg-[var(--admin-border)] transition-colors"
              >
                Cancel
              </button>
              
              {userToSuspend.status === "Suspended" ? (
                <button
                  type="button"
                  disabled={isSubmittingSuspend}
                  onClick={async () => {
                    setIsSubmittingSuspend(true);
                    await handleUnsuspend(userToSuspend.id);
                    setUserToSuspend(null);
                    setIsSubmittingSuspend(false);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSubmittingSuspend ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Reactivating...
                    </>
                  ) : (
                    "Reactivate & Unsuspend"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmittingSuspend}
                  onClick={handleConfirmSuspend}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSubmittingSuspend ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Suspending...
                    </>
                  ) : (
                    <>
                      <ShieldOff size={14} />
                      Confirm Suspension
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ban Confirmation Dialog Modal */}
      {userToBan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <Ban size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--admin-text)]">
                  {userToBan.status === "Banned" ? "Manage Banned User" : "Ban User Account"}
                </h3>
                <p className="text-xs text-[var(--admin-muted)] mt-1">
                  {userToBan.status === "Banned" 
                    ? "This user is currently banned. You can unban them to restore access."
                    : "This will immediately block access to the platform for this user."}
                </p>
              </div>
              <button 
                onClick={() => { setUserToBan(null); setBanReason(""); }}
                className="p-1 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Details Preview */}
            <div className="px-5 py-3 bg-[var(--admin-background)] border-y border-[var(--admin-border)] mx-6 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">User Name:</span>
                <span className="font-semibold text-[var(--admin-text)]">{userToBan.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Phone / Email:</span>
                <span className="text-[var(--admin-text)] font-mono">{userToBan.phone || userToBan.email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Role:</span>
                <span className="font-medium text-blue-400">{userToBan.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--admin-muted)]">Current Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(userToBan.status)}`}>
                  {userToBan.status}
                </span>
              </div>
            </div>

            {/* Reason input for banning */}
            {userToBan.status !== "Banned" && (
              <div className="p-6 pt-4 space-y-2">
                <label className="block text-xs font-medium text-[var(--admin-text)]">
                  Reason for Banning <span className="text-[var(--admin-muted)]">(optional)</span>
                </label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="e.g. Terms violation, fraudulent activity, unsafe behavior..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)] text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>
            )}

            {/* Modal Actions */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-background)] flex items-center justify-end gap-3 mt-auto">
              <button
                type="button"
                disabled={isSubmittingBan}
                onClick={() => { setUserToBan(null); setBanReason(""); }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--admin-text)] hover:bg-[var(--admin-border)] transition-colors"
              >
                Cancel
              </button>
              
              {userToBan.status === "Banned" ? (
                <button
                  type="button"
                  disabled={isSubmittingBan}
                  onClick={async () => {
                    setIsSubmittingBan(true);
                    await handleUnban(userToBan.id);
                    setUserToBan(null);
                    setIsSubmittingBan(false);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSubmittingBan ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Restoring...
                    </>
                  ) : (
                    "Unban & Activate User"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmittingBan}
                  onClick={handleConfirmBan}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSubmittingBan ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Banning...
                    </>
                  ) : (
                    <>
                      <Ban size={14} />
                      Confirm Ban
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal Overlay */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight">User Profile Details</h3>
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[var(--admin-background)] flex flex-col items-center">
              <div className="w-24 h-24 bg-[var(--admin-primary)]/10 rounded-full flex items-center justify-center mb-6">
                <User size={40} className="text-[var(--admin-primary)]" />
              </div>
              <h4 className="text-xl font-bold text-[var(--admin-text)] mb-1">
                {data.find(u => u.id === selectedUserModal)?.name}
              </h4>
              <p className="text-sm text-[var(--admin-muted)] mb-6">
                {data.find(u => u.id === selectedUserModal)?.email} • {data.find(u => u.id === selectedUserModal)?.phone}
              </p>

              <div className="w-full bg-[var(--admin-card)] rounded-xl border border-[var(--admin-border)] p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[var(--admin-muted)] text-sm">Role</span>
                  <span className="text-[var(--admin-text)] text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--admin-muted)] text-sm">City</span>
                  <span className="text-[var(--admin-text)] text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--admin-muted)] text-sm">Status</span>
                  <span className="text-[var(--admin-text)] text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--admin-muted)] text-sm">Joined On</span>
                  <span className="text-[var(--admin-text)] text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.joinedOn}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3">
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
