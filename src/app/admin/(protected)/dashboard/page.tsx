"use client";

import React, { useState } from "react";
import { Users, Car, CreditCard, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-white/10 rounded-lg shadow-lg p-3 z-50">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-[var(--admin-primary)] font-bold text-sm">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
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
    pendingApprovals: 0
  });
  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/admin/dashboard/stats");
        if (res.success) {
          setStats(res.stats);
          setOnboardings(res.recentOnboardings);
          // Only reverse if the chart needs chronological order (oldest first). 
          // The backend returns latest first, but actually backend returns `i=6` first which is oldest. So it's already chronological.
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

  const toggleVerification = async (id: string) => {
    try {
      // Optimistic update
      setOnboardings(prev => prev.map(o => o.id === id ? { ...o, verified: !o.verified } : o));
      // Typically we'd call an API here, but we can just leave it as UI toggle for now
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 min-h-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
        <p className="text-gray-400 mt-1">
          Here's what's happening with Ghumakkadh today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm p-6 relative z-10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-400">Total Riders</h3>
            <Users className="h-4 w-4 text-[var(--admin-primary)]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.totalRiders.toLocaleString()}</div>
            <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
              +19% from last month
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm p-6 relative z-10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-400">Active Orders</h3>
            <Car className="h-4 w-4 text-[var(--admin-primary)]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.activeOrders.toLocaleString()}</div>
            <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
              +4% since last hour
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm p-6 relative z-10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-400">Revenue (Today)</h3>
            <CreditCard className="h-4 w-4 text-[var(--admin-primary)]" />
          </div>
          <div>
            <div className="text-2xl font-bold">₹{stats.revenueToday.toLocaleString()}</div>
            <p className="text-xs text-[var(--admin-primary)] font-medium mt-1">
              +12% vs yesterday
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm p-6 relative z-10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-400">Pending Approvals</h3>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm col-span-4 p-6 relative z-10">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Revenue Overview</h3>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                  minTickGap={30}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                  tickFormatter={(value) => value >= 100000 ? `₹${value / 100000}L` : `₹${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
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
        
        <div className="rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm text-white shadow-sm col-span-3 p-6 relative z-10">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Onboardings</h3>
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : onboardings.length > 0 ? (
              onboardings.map((user) => (
                <div key={user.id} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-[#1F2937] flex items-center justify-center text-sm font-medium border border-white/10 text-white uppercase">
                    {user.name ? user.name.charAt(0) : "?"}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">
                      {user.role} • {user.city}
                    </p>
                  </div>
                  <button 
                    onClick={() => toggleVerification(user.id)}
                    className={`ml-auto font-medium text-sm px-2 py-1 rounded-md transition-colors ${
                      user.verified 
                        ? "bg-[var(--admin-primary)] text-[#0A0E1A] hover:bg-[#8ee82d]" 
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {user.verified ? "Verified" : "Verify"}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">No recent onboardings.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
