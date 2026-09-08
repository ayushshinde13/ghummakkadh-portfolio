"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useThemeContext } from "@/providers/ThemeProvider";
import { api } from "@/lib/api";
import {
  LayoutGrid,
  ClipboardCheck,
  Users,
  MapPin,
  Package,
  IndianRupee,
  Percent,
  Wallet,
  ShieldAlert,
  Siren,
  MessageSquare,
  Ticket,
  Star,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  User,
  Car,
  LogOut,
  Megaphone,
  Cpu,
  HeartPulse,
  Sun,
  Moon,
  CheckCheck,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Clock,
  Loader2
} from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { name: "Approvals", href: "/admin/approvals", icon: ClipboardCheck },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Trip Monitoring", href: "/admin/trips", icon: MapPin },
  { name: "Parcel Monitoring", href: "/admin/parcels", icon: Package },
  { name: "Pricing", href: "/admin/pricing", icon: IndianRupee },
  { name: "Promotions", href: "/admin/promotions", icon: Percent },
  { name: "Payouts", href: "/admin/payouts", icon: Wallet },
  { name: "Safety Monitoring", href: "/admin/safety-monitoring", icon: ShieldAlert },
  { name: "Safety (SOS)", href: "/admin/sos", icon: Siren, urgent: true },
  { name: "Complaints", href: "/admin/complaints", icon: MessageSquare },
  { name: "Support Tickets", href: "/admin/support-tickets", icon: Ticket },
  { name: "Feedback", href: "/admin/feedback", icon: Star },
  { name: "Push Notifications", href: "/admin/push-notifications", icon: Megaphone },
  { name: "Job Monitoring", href: "/admin/job-monitoring", icon: Cpu },
  { name: "System Health", href: "/admin/health-monitoring", icon: HeartPulse },
];

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "approval" | "complaint" | "payout" | "info";
  time: string;
  link: string;
  read?: boolean;
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useThemeContext();
  const isDarkMode = theme === "dark";

  // Notification State
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const fetchLiveNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const [sosRes, driversRes, complaintsRes, payoutsRes] = await Promise.allSettled([
        api.get("/admin/sos/alerts"),
        api.get("/admin/approve/drivers"),
        api.get("/admin/complaints"),
        api.get("/admin/payouts"),
      ]);

      const items: AdminNotification[] = [];

      // 1. SOS Alerts
      if (sosRes.status === "fulfilled" && sosRes.value?.success && Array.isArray(sosRes.value?.data?.alerts)) {
        const activeSos = sosRes.value.data.alerts.filter((a: any) => a.status === "TRIGGERED" || a.status === "ACKNOWLEDGED");
        activeSos.slice(0, 3).forEach((sos: any) => {
          items.push({
            id: `sos-${sos.id}`,
            title: `SOS Alert: ${sos.user?.name || "Passenger"}`,
            description: `Emergency triggered on Trip #${sos.tripId || sos.id.slice(0, 8)}`,
            type: "urgent",
            time: new Date(sos.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            link: "/admin/sos",
          });
        });
      }

      // 2. Pending Driver Approvals
      if (driversRes.status === "fulfilled" && driversRes.value?.success && Array.isArray(driversRes.value?.data)) {
        const pendingDrivers = driversRes.value.data.filter((d: any) => d.status === "PENDING" || d.verificationStatus === "PENDING");
        if (pendingDrivers.length > 0) {
          items.push({
            id: "approvals-pending",
            title: `${pendingDrivers.length} Pending Driver ${pendingDrivers.length === 1 ? "Approval" : "Approvals"}`,
            description: `${pendingDrivers[0]?.name || "New driver"} & others awaiting document review`,
            type: "approval",
            time: "Action required",
            link: "/admin/approvals",
          });
        }
      }

      // 3. Open Complaints
      if (complaintsRes.status === "fulfilled" && complaintsRes.value?.success && Array.isArray(complaintsRes.value?.data?.complaints)) {
        const openComplaints = complaintsRes.value.data.complaints.filter((c: any) => c.status === "OPEN" || c.status === "IN_PROGRESS");
        if (openComplaints.length > 0) {
          items.push({
            id: `complaint-${openComplaints[0].id}`,
            title: `${openComplaints.length} Open Customer ${openComplaints.length === 1 ? "Complaint" : "Complaints"}`,
            description: openComplaints[0].subject || openComplaints[0].category || "Customer complaint awaiting resolution",
            type: "complaint",
            time: new Date(openComplaints[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            link: "/admin/complaints",
          });
        }
      }

      // 4. Pending Payouts
      if (payoutsRes.status === "fulfilled" && Array.isArray(payoutsRes.value?.data?.payouts)) {
        const pendingPayouts = payoutsRes.value.data.payouts.filter((p: any) => p.status === "PENDING");
        if (pendingPayouts.length > 0) {
          items.push({
            id: "payouts-pending",
            title: `${pendingPayouts.length} Driver Payout ${pendingPayouts.length === 1 ? "Request" : "Requests"}`,
            description: `Total ₹${pendingPayouts.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)} ready for processing`,
            type: "payout",
            time: "Pending bank transfer",
            link: "/admin/payouts",
          });
        }
      }

      setNotifications(items);
    } catch (err) {
      console.error("Failed to fetch admin notifications", err);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchLiveNotifications();
    const interval = setInterval(fetchLiveNotifications, 30000); // 30s polling
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen]);

  const currentNavItem = navItems.find((item) => pathname.startsWith(item.href)) || { name: "Dashboard" };

  return (
    <div className="min-h-screen bg-[var(--admin-background)] text-[var(--admin-text)] flex font-sans transition-colors duration-300">
      
      {/* Sidebar (Desktop) */}
      <aside className="relative z-20 w-64 bg-[var(--admin-sidebar-bg)] border-r border-[var(--admin-border)] flex flex-col shrink-0 hidden md:flex shadow-xl transition-colors duration-300">
        {/* Sidebar Header */}
        <div className="h-14 flex items-center px-4 border-b border-[var(--admin-border)] bg-[var(--admin-sidebar-bg)] transition-colors duration-300">
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight leading-none">
              <span className="bg-gradient-to-r from-[var(--admin-primary)] to-orange-500 text-transparent bg-clip-text">Ghumakkadh</span> <span className={isDarkMode ? "text-white animate-fade-in" : "text-gray-900"}>Admin</span>
            </span>
            <span className="text-[10px] text-[var(--admin-muted)] mt-0.5">
              Management Dashboard
            </span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? `bg-[var(--admin-border)] border-l-4 rounded-r-md ${item.urgent ? "border-red-500 text-red-500" : "border-[var(--admin-primary)] text-[var(--admin-text)]"}`
                    : `hover:bg-[var(--admin-border)] hover:text-[var(--admin-text)] border-l-4 border-transparent rounded-r-md ${
                        item.urgent ? "text-red-500" : "text-[var(--admin-muted)]"
                      }`
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={
                    isActive && !item.urgent ? "text-[var(--admin-primary)]" : ""
                  } />
                  {item.name}
                </div>
                {item.urgent && (
                  <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse shrink-0 ml-2"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[var(--admin-border)] mt-auto bg-[var(--admin-sidebar-bg)] transition-colors duration-300">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--admin-muted)] hover:bg-[var(--admin-border)] hover:text-[var(--admin-text)] border-l-4 border-transparent rounded-r-md transition-all"
          >
            <Settings size={16} />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--admin-background)] transition-colors duration-300">
        
        {/* Top Bar */}
        <header className="h-14 bg-[var(--admin-topbar-bg)] border-b border-[var(--admin-border)] flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm relative z-20 transition-colors duration-300">
          {/* Mobile menu + Breadcrumb */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-[var(--admin-muted)] hover:text-[var(--admin-text)] p-2 -ml-2 rounded-md hover:bg-[var(--admin-border)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="hidden sm:flex items-center text-sm font-medium text-[var(--admin-muted)]">
              <span>Admin</span>
              <span className="mx-2 opacity-20">/</span>
              <span className="text-[var(--admin-text)]">{currentNavItem.name}</span>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-100 dark:bg-[#0B101D] text-slate-700 dark:text-[#FBBF24] hover:bg-slate-200 dark:hover:bg-[#131B2E] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-95 shrink-0"
              aria-label={mounted ? (theme === "dark" ? "Switch to Light Mode" : "Switch to Night Mode") : "Toggle theme"}
              title={mounted ? (theme === "dark" ? "Switch to Light Mode" : "Switch to Night Mode") : "Toggle theme"}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[#FBBF24] stroke-[2.2] transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 stroke-[2.2] transition-transform duration-300 hover:-rotate-12" />
                )
              ) : (
                <span className="w-4 h-4 block" />
              )}
            </button>

            {/* Bell Icon with Interactive Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isNotificationOpen
                    ? "bg-[var(--admin-primary)]/15 border-[var(--admin-primary)] text-[var(--admin-primary)]"
                    : "bg-slate-100 dark:bg-[#0B101D] border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-slate-200 dark:hover:bg-[#131B2E]"
                }`}
                aria-label="Notifications"
                title="System Notifications"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold text-white ring-2 ring-[var(--admin-topbar-bg)] animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Dropdown Popover */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl bg-[var(--admin-card)] border border-[var(--admin-border)] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-[var(--admin-border)] bg-[var(--admin-card)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--admin-text)]">Notifications</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--admin-primary)]/10 text-[var(--admin-primary)] font-bold">
                        {notifications.length} new
                      </span>
                    </div>
                    <button
                      onClick={fetchLiveNotifications}
                      disabled={isLoadingNotifications}
                      className="p-1 rounded-md text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-border)] transition-colors cursor-pointer"
                      title="Refresh"
                    >
                      <RefreshCw size={13} className={isLoadingNotifications ? "animate-spin text-[var(--admin-primary)]" : ""} />
                    </button>
                  </div>

                  {/* Notification Items List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-[var(--admin-border)] custom-scrollbar">
                    {isLoadingNotifications && notifications.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[var(--admin-muted)]">
                        <Loader2 className="w-5 h-5 mx-auto mb-2 animate-spin text-[var(--admin-primary)]" />
                        Fetching live alerts...
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[var(--admin-muted)]">
                        <CheckCheck className="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60" />
                        <p className="font-semibold text-[var(--admin-text)]">All clear!</p>
                        <p className="mt-0.5">No pending emergencies or urgent action items.</p>
                      </div>
                    ) : (
                      notifications.map((item) => {
                        let iconBg = "bg-blue-500/10 text-blue-400";
                        let IconComponent = Bell;

                        if (item.type === "urgent") {
                          iconBg = "bg-red-500/15 text-red-400";
                          IconComponent = Siren;
                        } else if (item.type === "approval") {
                          iconBg = "bg-emerald-500/15 text-emerald-400";
                          IconComponent = ClipboardCheck;
                        } else if (item.type === "complaint") {
                          iconBg = "bg-amber-500/15 text-amber-400";
                          IconComponent = MessageSquare;
                        } else if (item.type === "payout") {
                          iconBg = "bg-purple-500/15 text-purple-400";
                          IconComponent = Wallet;
                        }

                        return (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => setIsNotificationOpen(false)}
                            className="p-3.5 hover:bg-[var(--admin-border)]/50 transition-colors flex items-start gap-3 group cursor-pointer block"
                          >
                            <div className={`p-2 rounded-xl ${iconBg} shrink-0 mt-0.5`}>
                              <IconComponent size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-[var(--admin-text)] truncate group-hover:text-[var(--admin-primary)] transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-[var(--admin-muted)] shrink-0 font-medium">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--admin-muted)] mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight size={13} className="text-[var(--admin-muted)] group-hover:text-[var(--admin-primary)] self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-2.5 border-t border-[var(--admin-border)] bg-[var(--admin-card)] text-center">
                    <Link
                      href="/admin/safety-monitoring"
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-xs font-bold text-[var(--admin-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Safety Center <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-medium leading-none">
                  <span className="bg-gradient-to-r from-[var(--admin-primary)] to-orange-500 text-transparent bg-clip-text">Ghumakkadh</span> <span className={isDarkMode ? "text-white" : "text-gray-900"}>Admin</span>
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--admin-primary)] to-emerald-400 flex items-center justify-center text-[#0A0E1A] font-bold text-sm shadow-sm ring-2 ring-white/10">
                GA
              </div>
            </div>

            <div className="w-px h-6 bg-[var(--admin-border)] mx-1 hidden sm:block" />

            <button
              onClick={() => {
                document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                localStorage.removeItem("admin_access_token");
                localStorage.removeItem("admin_refresh_token");
                localStorage.removeItem("admin_user");
                router.push("/admin");
              }}
              className="text-[var(--admin-muted)] hover:text-red-400 transition-colors p-2 rounded-md hover:bg-[var(--admin-border)]"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-[var(--admin-topbar-bg)]/95 backdrop-blur-xl border-t border-[var(--admin-border)] z-40 overflow-y-auto transition-colors duration-300">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? item.urgent ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-[var(--admin-primary)]/10 text-[var(--admin-primary)] border border-[var(--admin-primary)]/20"
                        : "text-[var(--admin-muted)] hover:bg-[var(--admin-border)] border border-transparent hover:border-[var(--admin-border)]"
                    }`}
                  >
                    <Icon size={18} className={item.urgent ? "text-red-500" : ""} />
                    {item.name}
                    {item.urgent && (
                      <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse ml-auto"></span>
                    )}
                  </Link>
                );
              })}
              
              <Link
                href="/admin/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--admin-muted)] hover:bg-[var(--admin-border)] border border-transparent hover:border-[var(--admin-border)] transition-colors mt-4"
              >
                <Settings size={18} />
                Settings
              </Link>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[var(--admin-background)] relative z-10 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
