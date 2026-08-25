"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useThemeContext } from "@/providers/ThemeProvider";
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
  Megaphone
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
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark";

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
          <div className="flex items-center gap-4 ml-auto">
            {/* Bell Icon with Badge */}
            <button className="relative text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--admin-primary)] rounded-full border border-[var(--admin-topbar-bg)]" />
            </button>

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

            <Link href="/" className="text-[var(--admin-muted)] hover:text-red-400 transition-colors p-2 rounded-md hover:bg-[var(--admin-border)]" title="Logout">
              <LogOut size={18} />
            </Link>
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
