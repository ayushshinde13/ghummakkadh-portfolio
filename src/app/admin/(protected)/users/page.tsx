"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Search, SlidersHorizontal, ChevronDown, Eye, Ban, ShieldOff, X, User } from "lucide-react";

type Role = "Rider" | "Driver";
type Status = "Active" | "Suspended" | "Banned";

interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  city: string;
  status: Status;
  joinedOn: string;
}

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<"riders" | "drivers">("riders");
  const [selectedUserModal, setSelectedUserModal] = useState<string | null>(null);

  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const [ridersRes, driversRes] = await Promise.all([
        api.get("/admin/users?role=RIDER"),
        api.get("/admin/users?role=DRIVER")
      ]);

      const formatUser = (u: any, role: Role): UserData => ({
        id: u.id,
        name: u.name || "Unknown",
        phone: u.phone || "Unknown",
        email: u.email || "Unknown",
        role,
        city: "Unknown",
        status: u.status === "BLOCKED" ? "Banned" : (u.status === "SUSPENDED" ? "Suspended" : "Active"),
        joinedOn: new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      });

      const riders = (ridersRes.data?.users || []).map((u: any) => formatUser(u, "Rider"));
      const drivers = (driversRes.data?.users || []).map((u: any) => formatUser(u, "Driver"));

      setData([...riders, ...drivers]);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status: "SUSPENDED", reason: "Suspended via dashboard" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to suspend", error);
    }
  };
  
  const handleBan = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status: "BLOCKED", reason: "Banned via dashboard" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to ban", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const filteredData = data.filter(u => {
    const isRoleMatch = activeTab === "riders" ? u.role === "Rider" : u.role === "Driver";
    const query = searchQuery.toLowerCase();
    const isSearchMatch = u.name.toLowerCase().includes(query) || u.phone.includes(query) || u.email.toLowerCase().includes(query) || u.id.toLowerCase().includes(query);
    const isStatusMatch = statusFilter === "all" || u.status.toLowerCase() === statusFilter.toLowerCase();
    const isCityMatch = cityFilter === "all" || u.city.toLowerCase() === cityFilter.toLowerCase();
    
    return isRoleMatch && isSearchMatch && isStatusMatch && isCityMatch;
  });

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-[var(--admin-primary)] border-green-500/20";
      case "Suspended": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Banned": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
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
            <span className="text-gray-200">User Management</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">User Management</h2>
          <p className="text-gray-400 mt-1">
            Manage existing riders and drivers across the platform.
          </p>
        </div>
        
        {/* Pill-style Tabs */}
        <div className="inline-flex items-center rounded-full border border-white/10 bg-[#111827]/50 p-1">
          <button
            onClick={() => setActiveTab("riders")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeTab === "riders" 
                ? "bg-[#0A0E1A] text-white shadow-sm" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Riders
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeTab === "drivers" 
                ? "bg-[#0A0E1A] text-white shadow-sm" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Drivers
          </button>
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
              placeholder={`Search ${activeTab}...`}
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
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
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Name <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Contact <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Role <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">City <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Status <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Joined On <ChevronDown size={14} /></div>
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{row.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 font-mono">{row.id}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    <div className="flex flex-col">
                      <span>{row.phone}</span>
                      <span className="text-xs text-gray-500">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.city}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{row.joinedOn}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedUserModal(row.id)}
                        className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors" 
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleSuspend(row.id)}
                        className="p-1.5 rounded-md hover:bg-amber-500/20 text-gray-400 hover:text-amber-500 transition-colors" 
                        title="Suspend User"
                      >
                        <ShieldOff size={16} />
                      </button>
                      <button 
                        onClick={() => handleBan(row.id)}
                        className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors" 
                        title="Ban User"
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
      </div>

      {/* User Profile Modal Overlay */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
              <h3 className="text-white font-bold tracking-tight">User Profile Details</h3>
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-[#05070A] flex flex-col items-center">
              <div className="w-24 h-24 bg-[var(--admin-primary)]/10 rounded-full flex items-center justify-center mb-6">
                <User size={40} className="text-[var(--admin-primary)]" />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">
                {data.find(u => u.id === selectedUserModal)?.name}
              </h4>
              <p className="text-sm text-gray-400 mb-6">
                {data.find(u => u.id === selectedUserModal)?.email} • {data.find(u => u.id === selectedUserModal)?.phone}
              </p>

              <div className="w-full bg-[#111827] rounded-xl border border-white/5 p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Role</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">City</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Joined On</span>
                  <span className="text-white text-sm font-medium">{data.find(u => u.id === selectedUserModal)?.joinedOn}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 rounded-md hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm"
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
