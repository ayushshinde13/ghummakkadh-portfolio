"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  HeartPulse,
  Database,
  Bell,
  CreditCard,
  Sparkles,
  Cloud,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Clock,
  Cpu,
  Activity,
  Layers,
  ShieldCheck,
  Loader2,
  Terminal,
  Trash2,
  Eye,
  Copy,
  Check,
  Search,
  X,
  Flame,
  Globe,
  HelpCircle,
  Wrench,
  Key,
} from "lucide-react";
import { api } from "@/lib/api";

interface ServiceHealth {
  name: string;
  key: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number | null;
  message: string;
  details?: string;
  impact?: string;
  envRequired?: string[];
  fixAction?: string;
  lastChecked: string;
}

interface SystemMetrics {
  nodeVersion: string;
  platform: string;
  cpuCores: number;
  uptimeSeconds: number;
  memory: {
    heapUsedMB: number;
    heapTotalMB: number;
    rssMB: number;
    totalMemGB: number;
    freeMemGB: number;
    heapUsagePercent: number;
  };
}

interface HealthSummary {
  overallStatus: "healthy" | "degraded" | "outage";
  timestamp: string;
  probeDurationMs: number;
  services: ServiceHealth[];
  system: SystemMetrics;
}

interface FailedRequestLog {
  id: string;
  method: string;
  url: string;
  path: string;
  statusCode: number;
  message: string;
  stack: string[];
  rawErrorName: string;
  ip: string;
  userAgent: string;
  query: any;
  body: any;
  timestamp: string;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  database: Database,
  firebase: Bell,
  payment_gateway: CreditCard,
  ai_engine: Sparkles,
  media_storage: Cloud,
};

export default function SystemHealthMonitoringPage() {
  const [health, setHealth] = useState<HealthSummary | null>(null);
  const [errorLogs, setErrorLogs] = useState<FailedRequestLog[]>([]);
  const [errorStats, setErrorStats] = useState<{ total: number; serverErrors: number; clientErrors: number }>({
    total: 0,
    serverErrors: 0,
    clientErrors: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isProbing, setIsProbing] = useState(false);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastProbedTime, setLastProbedTime] = useState<Date | null>(null);

  // Filters for Failed Endpoint Logs
  const [statusFilter, setStatusFilter] = useState<"all" | "5xx" | "4xx">("all");
  const [searchLogTerm, setSearchLogTerm] = useState("");

  // Modals
  const [selectedService, setSelectedService] = useState<ServiceHealth | null>(null);
  const [selectedError, setSelectedError] = useState<FailedRequestLog | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Fetch current health
  const fetchHealth = useCallback(async () => {
    try {
      const res = await api.get("/admin/health");
      if (res.success) {
        setHealth(res.data);
        setLastProbedTime(new Date());
      }
    } catch (err) {
      console.warn("Failed to fetch system health:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch failed endpoint error logs
  const fetchErrorLogs = useCallback(async () => {
    try {
      setIsLoadingLogs(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("statusFilter", statusFilter);
      if (searchLogTerm.trim()) params.append("search", searchLogTerm.trim());

      const res = await api.get(`/admin/health/error-logs?${params.toString()}`);
      if (res.success) {
        setErrorLogs(res.data.logs || []);
        setErrorStats({
          total: res.data.totalRecorded || 0,
          serverErrors: res.data.serverErrorsCount || 0,
          clientErrors: res.data.clientErrorsCount || 0,
        });
      }
    } catch (err) {
      console.warn("Failed to fetch error logs:", err);
    } finally {
      setIsLoadingLogs(false);
    }
  }, [statusFilter, searchLogTerm]);

  // Run on-demand diagnostic probe
  const handleRunProbe = async () => {
    try {
      setIsProbing(true);
      const res = await api.post("/admin/health/probe", {});
      if (res.success) {
        setHealth(res.data);
        setLastProbedTime(new Date());
        if (selectedService) {
          const updated = res.data.services.find((s: ServiceHealth) => s.key === selectedService.key);
          if (updated) setSelectedService(updated);
        }
      }
    } catch (err) {
      console.error("Failed to run diagnostic probe:", err);
    } finally {
      setIsProbing(false);
    }
  };

  // Clear Error Logs
  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to clear all recorded failed endpoint logs?")) return;
    try {
      const res = await api.delete("/admin/health/error-logs");
      if (res.success) {
        fetchErrorLogs();
      }
    } catch (err) {
      console.error("Failed to clear error logs:", err);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchErrorLogs();
  }, [fetchHealth, fetchErrorLogs]);

  // Auto-refresh interval (15s)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchHealth();
      fetchErrorLogs();
    }, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchHealth, fetchErrorLogs]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatUptime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const getStatusBadge = (status: "healthy" | "degraded" | "down") => {
    switch (status) {
      case "healthy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} />
            Operational
          </span>
        );
      case "degraded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle size={12} />
            Degraded
          </span>
        );
      case "down":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
            <AlertOctagon size={12} />
            Service Down
          </span>
        );
      default:
        return null;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">GET</span>;
      case "POST":
        return <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">POST</span>;
      case "PUT":
        return <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">PUT</span>;
      case "DELETE":
        return <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">DELETE</span>;
      default:
        return <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">{method}</span>;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">System Health</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)] flex items-center gap-2">
            <HeartPulse className="text-[var(--admin-primary)]" size={28} />
            API & System Health
          </h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Real-time infrastructure probes, database latencies, third-party gateways, and failed endpoint tracebacks.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              autoRefresh
                ? "bg-[var(--admin-primary)]/10 text-[var(--admin-primary)] border-[var(--admin-primary)]/30"
                : "bg-[var(--admin-card)] text-[var(--admin-muted)] border-[var(--admin-border)] hover:text-[var(--admin-text)]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-[var(--admin-primary)] animate-ping" : "bg-gray-500"}`} />
            Live Polling (15s)
          </button>

          <button
            onClick={handleRunProbe}
            disabled={isProbing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] text-sm font-bold shadow transition-all hover:bg-[var(--admin-primary)]/90 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={isProbing ? "animate-spin" : ""} />
            {isProbing ? "Probing..." : "Run Diagnostic Probe"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 text-center text-[var(--admin-muted)]">
          <Loader2 className="animate-spin w-8 h-8 mx-auto mb-3 text-[var(--admin-primary)]" />
          Running initial system diagnostic probe...
        </div>
      ) : (
        <>
          {/* Overall System Banner */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md ${
              health?.overallStatus === "healthy"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : health?.overallStatus === "degraded"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  health?.overallStatus === "healthy"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : health?.overallStatus === "degraded"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {health?.overallStatus === "healthy" ? (
                  <ShieldCheck size={26} />
                ) : health?.overallStatus === "degraded" ? (
                  <AlertTriangle size={26} />
                ) : (
                  <AlertOctagon size={26} />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {health?.overallStatus === "healthy"
                    ? "All Systems Operational"
                    : health?.overallStatus === "degraded"
                    ? "Partial Degradation Detected"
                    : "Major System Outage Detected"}
                </h3>
                <p className="text-xs opacity-80 mt-0.5">
                  Diagnostic probe completed in {health?.probeDurationMs}ms • Last checked:{" "}
                  {lastProbedTime ? lastProbedTime.toLocaleTimeString() : "Just now"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right text-xs">
                <span className="opacity-70 block">Uptime</span>
                <span className="font-semibold">{formatUptime(health?.system.uptimeSeconds || 0)}</span>
              </div>
              <div className="w-px h-8 bg-current opacity-20" />
              <div className="text-right text-xs">
                <span className="opacity-70 block">Heap Memory</span>
                <span className="font-semibold">{health?.system.memory.heapUsagePercent}%</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
                <span>Services Tracked</span>
                <Layers size={16} className="text-[var(--admin-primary)]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--admin-text)]">{health?.services.length ?? 5}</span>
                <span className="text-xs text-emerald-400 font-medium">Active</span>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
                <span>DB Query Latency</span>
                <Database size={16} className="text-blue-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--admin-text)]">
                  {health?.services.find((s) => s.key === "database")?.latencyMs ?? 0}ms
                </span>
                <span className="text-xs text-emerald-400 font-medium">Fast</span>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
                <span>Heap Allocated</span>
                <Server size={16} className="text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--admin-text)]">
                  {health?.system.memory.heapUsedMB} MB
                </span>
                <span className="text-xs text-[var(--admin-muted)]">/ {health?.system.memory.heapTotalMB} MB</span>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
                <span>Node.js Runtime</span>
                <Cpu size={16} className="text-purple-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--admin-text)]">{health?.system.nodeVersion}</span>
                <span className="text-xs text-[var(--admin-muted)]">{health?.system.cpuCores} Cores</span>
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--admin-text)] flex items-center gap-2">
                <Activity size={18} className="text-[var(--admin-primary)]" />
                Infrastructure & API Services
              </h3>
              <span className="text-xs text-[var(--admin-muted)]">
                Click any card for full diagnosis & fix guide
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {health?.services.map((srv) => {
                const IconComponent = SERVICE_ICONS[srv.key] || Server;
                return (
                  <div
                    key={srv.key}
                    onClick={() => setSelectedService(srv)}
                    className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--admin-primary)]/50 hover:bg-[var(--admin-border)]/20 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-[var(--admin-border)] text-[var(--admin-primary)] group-hover:scale-105 transition-transform">
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-[var(--admin-text)] group-hover:text-[var(--admin-primary)] transition-colors">
                            {srv.name}
                          </h4>
                          <span className="text-xs text-[var(--admin-muted)] font-mono">
                            {srv.latencyMs !== null ? `${srv.latencyMs}ms response` : "No response metric"}
                          </span>
                        </div>
                      </div>

                      <div>{getStatusBadge(srv.status)}</div>
                    </div>

                    <div className="pt-3 border-t border-[var(--admin-border)] text-xs text-[var(--admin-muted)] flex items-center justify-between">
                      <span className="truncate max-w-[200px]" title={srv.message}>
                        {srv.message}
                      </span>
                      <span className={`text-[11px] font-semibold group-hover:underline flex items-center gap-1 shrink-0 ${
                        srv.status === "healthy" ? "text-emerald-400" : "text-[var(--admin-primary)]"
                      }`}>
                        {srv.status === "healthy" ? "Details →" : "Details & Fix →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Failed API Endpoints & Traceback Section */}
          <div className="space-y-4 pt-4 border-t border-[var(--admin-border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--admin-text)] flex items-center gap-2">
                  <Terminal size={18} className="text-red-400" />
                  Failed API Endpoints & Error Tracebacks
                  {errorStats.total > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                      {errorStats.total} Errors
                    </span>
                  )}
                </h3>
                <p className="text-xs text-[var(--admin-muted)] mt-0.5">
                  Live log of 4xx and 5xx failures with backend terminal stack traces.
                </p>
              </div>

              {errorStats.total > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Trash2 size={13} />
                  Clear Error Logs
                </button>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                {[
                  { id: "all", label: `All (${errorStats.total})` },
                  { id: "5xx", label: `5xx Server Errors (${errorStats.serverErrors})` },
                  { id: "4xx", label: `4xx Client Errors (${errorStats.clientErrors})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      statusFilter === tab.id
                        ? "bg-[var(--admin-primary)] text-[#0A0E1A] font-bold shadow-sm"
                        : "text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-border)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[220px]">
                <Search className="absolute left-2.5 top-2.5 text-[var(--admin-muted)]" size={13} />
                <input
                  type="text"
                  value={searchLogTerm}
                  onChange={(e) => setSearchLogTerm(e.target.value)}
                  placeholder="Filter endpoint, error, method..."
                  className="w-full h-8 pl-8 pr-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all placeholder:text-[var(--admin-muted)]"
                />
              </div>
            </div>

            {/* Failed Endpoints Table */}
            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)] text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-4 py-3">Method & Endpoint</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Error Reason</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoadingLogs ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                          <Loader2 className="animate-spin w-5 h-5 mx-auto mb-2 text-[var(--admin-primary)]" />
                          Fetching failed endpoint logs...
                        </td>
                      </tr>
                    ) : errorLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-[var(--admin-muted)]">
                          <CheckCircle2 className="w-7 h-7 mx-auto mb-2 text-emerald-400 opacity-60" />
                          <p className="font-semibold text-sm text-[var(--admin-text)]">No failing endpoints recorded</p>
                          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
                            {searchLogTerm || statusFilter !== "all"
                              ? "No error logs matched your filter."
                              : "All recent API requests completed successfully."}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      errorLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[var(--admin-border)]/50 transition-colors group">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              {getMethodBadge(log.method)}
                              <span className="font-mono text-xs font-semibold text-[var(--admin-text)] truncate max-w-xs sm:max-w-sm">
                                {log.url}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                log.statusCode >= 500
                                  ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {log.statusCode}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs font-medium text-red-300 truncate max-w-sm block" title={log.message}>
                              {log.message}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-[var(--admin-muted)]">
                            <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                            <div className="text-[10px] opacity-70">{new Date(log.timestamp).toLocaleDateString()}</div>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => setSelectedError(log)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[var(--admin-border)] hover:bg-[var(--admin-border)]/80 text-xs font-medium text-[var(--admin-text)] transition-colors cursor-pointer"
                            >
                              <Eye size={13} />
                              Traceback
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Host & Resource Telemetry */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[var(--admin-text)] flex items-center gap-2">
              <Server size={18} className="text-[var(--admin-primary)]" />
              Server & Environment Telemetry
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg">
                <span className="text-[var(--admin-muted)] block">Host Platform</span>
                <span className="font-semibold text-[var(--admin-text)] mt-1 block">
                  {health?.system.platform}
                </span>
              </div>
              <div className="p-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg">
                <span className="text-[var(--admin-muted)] block">Total System RAM</span>
                <span className="font-semibold text-[var(--admin-text)] mt-1 block">
                  {health?.system.memory.freeMemGB} GB Free / {health?.system.memory.totalMemGB} GB
                </span>
              </div>
              <div className="p-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg">
                <span className="text-[var(--admin-muted)] block">Process RSS</span>
                <span className="font-semibold text-[var(--admin-text)] mt-1 block">
                  {health?.system.memory.rssMB} MB
                </span>
              </div>
              <div className="p-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg">
                <span className="text-[var(--admin-muted)] block">Heartbeat Diagnostic</span>
                <span className="font-semibold text-emerald-400 mt-1 block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Continuous (60s)
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Service Diagnosis & Fix Guide Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[85vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)]/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--admin-border)] text-[var(--admin-primary)]">
                  {React.createElement(SERVICE_ICONS[selectedService.key] || Server, { size: 20 })}
                </div>
                <div>
                  <h3 className="text-[var(--admin-text)] font-bold text-base flex items-center gap-2">
                    {selectedService.name}
                    {getStatusBadge(selectedService.status)}
                  </h3>
                  <span className="text-xs text-[var(--admin-muted)]">
                    Response time: {selectedService.latencyMs !== null ? `${selectedService.latencyMs}ms` : "N/A"} • Key: {selectedService.key}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 bg-[var(--admin-background)]">
              {/* Diagnosis / Reason */}
              <div className="p-4 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-[var(--admin-primary)] flex items-center gap-1.5 uppercase tracking-wider">
                  <HelpCircle size={14} /> Diagnostic Reason
                </span>
                <p className="text-sm text-[var(--admin-text)] font-medium">{selectedService.details || selectedService.message}</p>
              </div>

              {/* Feature Impact */}
              {selectedService.impact && (
                <div className="p-4 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle size={14} /> Business & Feature Impact
                  </span>
                  <p className="text-sm text-[var(--admin-muted)]">{selectedService.impact}</p>
                </div>
              )}

              {/* Operational Status / Fix Guide */}
              {selectedService.status === "healthy" ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Service Operational</h4>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      This service is active, properly connected, and operating with zero issues. No configuration or action required.
                    </p>
                  </div>
                </div>
              ) : (
                selectedService.envRequired && selectedService.envRequired.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--admin-text)]">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Wrench size={14} /> How to make it Operational (.env)
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            selectedService.envRequired?.map((k) => `${k}=your_${k.toLowerCase()}_here`).join("\n") || "",
                            "env"
                          )
                        }
                        className="flex items-center gap-1 text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-text)] cursor-pointer"
                      >
                        {copiedKey === "env" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        Copy Template
                      </button>
                    </div>

                    {selectedService.fixAction && (
                      <p className="text-xs text-[var(--admin-muted)]">{selectedService.fixAction}</p>
                    )}

                    <div className="bg-[#0A0E1A] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-emerald-400 space-y-1">
                      {selectedService.envRequired.map((k) => (
                        <div key={k} className="flex items-center gap-2">
                          <Key size={12} className="text-gray-500" />
                          <span className="text-gray-400">{k}</span>
                          <span className="text-gray-600">=</span>
                          <span className="text-emerald-400">your_{k.toLowerCase()}_here</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)]/30 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-lg bg-[var(--admin-border)] hover:bg-[var(--admin-border)]/80 text-[var(--admin-text)] font-medium text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Error Traceback Modal */}
      {selectedError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[85vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)]/50 shrink-0">
              <div className="flex items-center gap-3">
                <Flame size={20} className="text-red-400" />
                <div>
                  <h3 className="text-[var(--admin-text)] font-bold text-base flex items-center gap-2">
                    {getMethodBadge(selectedError.method)}
                    <span className="font-mono">{selectedError.url}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      {selectedError.statusCode}
                    </span>
                  </h3>
                  <span className="text-xs text-[var(--admin-muted)]">
                    Occurred at {new Date(selectedError.timestamp).toLocaleString()} • Client IP: {selectedError.ip}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedError(null)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 bg-[var(--admin-background)]">
              {/* Error Reason Message */}
              <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                  Error Message & Reason
                </span>
                <p className="text-sm font-mono font-semibold text-red-200">{selectedError.message}</p>
              </div>

              {/* Stack Trace (Terminal Style) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--admin-muted)]">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <Terminal size={14} /> Backend Terminal Stack Trace
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${selectedError.message}\n\n${selectedError.stack.join("\n")}`,
                        "stack"
                      )
                    }
                    className="flex items-center gap-1 text-[11px] hover:text-[var(--admin-text)] cursor-pointer"
                  >
                    {copiedKey === "stack" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    Copy Stack Trace
                  </button>
                </div>
                <div className="bg-[#0A0E1A] border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 max-h-64 overflow-y-auto space-y-1">
                  {selectedError.stack.length > 0 ? (
                    selectedError.stack.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          idx === 0
                            ? "text-red-400 font-bold"
                            : line.includes("src/") || line.includes("modules/")
                            ? "text-yellow-300/90 pl-3 font-semibold"
                            : "text-gray-500 pl-3"
                        }
                      >
                        {line}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No stack trace available for this error.</p>
                  )}
                </div>
              </div>

              {/* Request Metadata (Query & Body) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-[var(--admin-muted)] font-sans font-semibold">Query Parameters</span>
                  <pre className="p-3 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg overflow-x-auto text-[var(--admin-text)]">
                    {Object.keys(selectedError.query).length > 0
                      ? JSON.stringify(selectedError.query, null, 2)
                      : "None"}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-[var(--admin-muted)] font-sans font-semibold">Request Body (Sanitized)</span>
                  <pre className="p-3 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg overflow-x-auto text-[var(--admin-text)]">
                    {Object.keys(selectedError.body).length > 0
                      ? JSON.stringify(selectedError.body, null, 2)
                      : "None"}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)]/30 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedError(null)}
                className="px-4 py-2 rounded-lg bg-[var(--admin-border)] hover:bg-[var(--admin-border)]/80 text-[var(--admin-text)] font-medium text-xs transition-colors cursor-pointer"
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
