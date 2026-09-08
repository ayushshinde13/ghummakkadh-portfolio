"use client";

import React, { useState, useEffect } from "react";
import { Users, Car, CreditCard, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";
import { useThemeContext } from "@/providers/ThemeProvider";

const CustomTooltip = ({ active, payload, label, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`border rounded-lg shadow-lg p-3 z-50 transition-colors duration-300 ${
        isDarkMode ? "bg-[var(--admin-card)] border-[var(--admin-border)]" : "bg-white border-gray-200"
      }`}>
        <p className={`text-xs mb-1 transition-colors duration-300 ${isDarkMode ? "text-[var(--admin-muted)]" : "text-[var(--admin-muted)]"}`}>{label}</p>
        <p className="text-[var(--admin-primary)] font-bold text-sm">
          Platform Earned: ₹{payload[0].value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
        {payload[0].payload.grossBooking !== undefined && (
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
            Gross Bookings: ₹{payload[0].payload.grossBooking.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRiders: 0,
    activeOrders: 0,
    revenueToday: 0,
    totalPlatformEarnings: 0,
    grossBookingsToday: 0,
    grossBookingsTotal: 0,
    pendingApprovals: 0
  });
  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/admin/dashboard/stats");
        if (res.success) {
          setStats(res.stats);
          setOnboardings(res.recentOnboardings);
          setRevenueData(res.revenueChartData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleVerify = async (id: string, role?: string) => {
    try {
      if (role === "Driver") {
        await api.put(`/admin/approve/drivers/${id}/verify`, { isVerified: true });
      } else if (role === "Customer" || role === "Rider") {
        await api.put(`/admin/users/${id}/status`, { status: "ACTIVE", reason: "Approved via dashboard" });
      }
      setOnboardings(prev => prev.map(o => o.id === id ? { ...o, verified: true } : o));
    } catch (e) {
      console.error("Verification failed", e);
      // Optimistically update UI
      setOnboardings(prev => prev.map(o => o.id === id ? { ...o, verified: true } : o));
    }
  };

  return (
    <div className="w-full min-h-full bg-[var(--admin-background)] text-[var(--admin-text)] transition-colors duration-300">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Overview</h2>
            <p className="text-[var(--admin-muted)] mt-1">
              Here's what's happening with Ghumakkadh today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] p-6 relative z-10 transition-colors duration-300 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-[var(--admin-muted)]">Total Riders</h3>
              <Users className="h-4 w-4 text-[var(--admin-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalRiders.toLocaleString()}</div>
              <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
                Active riders registered
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] p-6 relative z-10 transition-colors duration-300 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-[var(--admin-muted)]">Active Orders</h3>
              <Car className="h-4 w-4 text-[var(--admin-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.activeOrders.toLocaleString()}</div>
              <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
                Live in progress trips
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] p-6 relative z-10 transition-colors duration-300 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-[var(--admin-muted)]">Platform Earnings</h3>
              <CreditCard className="h-4 w-4 text-[var(--admin-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold">₹{(stats.totalPlatformEarnings || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
                ₹{(stats.revenueToday || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })} earned today
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] p-6 relative z-10 transition-colors duration-300 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-[var(--admin-muted)]">Pending Approvals</h3>
              <Clock className="h-4 w-4 text-[var(--admin-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.pendingApprovals.toLocaleString()}</div>
              <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
                Requires immediate action
              </p>
            </div>
          </div>
        </div>

        {/* Charts & Onboardings Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Revenue Chart Card */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] col-span-4 p-6 relative z-10 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold leading-none tracking-tight text-[var(--admin-text)]">Platform Revenue Overview</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                Net Commission (Last 7 Days)
              </span>
            </div>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7ED321" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7ED321" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 
                  />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} 
                    minTickGap={30}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} 
                    tickFormatter={(value) => value >= 100000 ? `₹${value / 100000}L` : `₹${value}`}
                  />
                  <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#7ED321" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Onboardings Card */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] col-span-3 p-6 relative z-10 transition-colors duration-300">
            <h3 className="font-semibold leading-none tracking-tight mb-4 text-[var(--admin-text)]">Recent Onboardings</h3>
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-sm text-[var(--admin-muted)]">Loading...</div>
              ) : onboardings.length > 0 ? (
                onboardings.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border border-[var(--admin-border)] bg-[var(--admin-border)] text-[var(--admin-text)] uppercase transition-colors duration-300">
                      {user.name ? user.name.charAt(0) : "?"}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-[var(--admin-text)]">{user.name}</p>
                      <p className="text-sm text-[var(--admin-muted)]">
                        {user.role} • {user.city}
                      </p>
                    </div>
                    {user.verified ? (
                      <span className="ml-auto font-medium text-xs px-2.5 py-1 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-semibold select-none">
                        Verified
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleVerify(user.id, user.role)}
                        className="ml-auto font-medium text-xs px-2.5 py-1 rounded-md bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-border)]/80 transition-colors cursor-pointer"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-[var(--admin-muted)]">No recent onboardings.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
