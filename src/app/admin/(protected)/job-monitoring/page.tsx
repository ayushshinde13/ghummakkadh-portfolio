"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  Layers,
  X,
  Copy,
  Check,
  Cpu,
  Loader2,
  Flame,
  Terminal,
} from "lucide-react";
import { api } from "@/lib/api";

interface JobItem {
  id: string;
  name: string;
  queue: string;
  status: "active" | "completed" | "failed" | "waiting" | "delayed" | "paused";
  attemptsMade: number;
  timestamp: string;
  processedOn?: string | null;
  finishedOn?: string | null;
  durationMs?: number | null;
  failedReason?: string | null;
}

interface QueueStats {
  totalQueues: number;
  active: number;
  completed: number;
  failed: number;
  waiting: number;
  delayed: number;
  paused: number;
  queues: Array<{
    name: string;
    active: number;
    completed: number;
    failed: number;
    waiting: number;
    delayed: number;
    status?: string;
  }>;
}

export default function JobMonitoringPage() {
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [availableQueues, setAvailableQueues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Filters
  const [selectedQueue, setSelectedQueue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Detail Modal
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/admin/job-monitoring/stats");
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.warn("Could not fetch queue stats:", err);
    }
  }, []);

  // Fetch Jobs List
  const fetchJobs = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const params = new URLSearchParams();
      if (selectedQueue) params.append("queue", selectedQueue);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (searchTerm.trim()) params.append("search", searchTerm.trim());

      const res = await api.get(`/admin/job-monitoring?${params.toString()}`);
      if (res.success) {
        setJobs(res.data || []);
        if (res.availableQueues) {
          setAvailableQueues(res.availableQueues);
        }
      }
    } catch (err) {
      console.warn("Could not fetch jobs:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedQueue, selectedStatus, searchTerm]);

  // Initial Load
  useEffect(() => {
    fetchStats();
    fetchJobs();
  }, [fetchStats, fetchJobs]);

  // Auto-refresh interval (5s)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchStats();
      fetchJobs();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchStats, fetchJobs]);

  // Inspect Job Details
  const handleInspectJob = async (queue: string, id: string) => {
    try {
      setIsLoadingDetail(true);
      setDetailModalOpen(true);
      setFeedbackMessage(null);
      const res = await api.get(`/admin/job-monitoring/${queue}/${id}`);
      if (res.success) {
        setSelectedJob(res.data);
      }
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err.message || "Failed to load job details",
      });
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Retry Job
  const handleRetryJob = async (queue: string, id: string) => {
    try {
      setActionLoading(`retry-${id}`);
      setFeedbackMessage(null);
      const res = await api.post(`/admin/job-monitoring/${queue}/${id}/retry`, {});
      if (res.success) {
        setFeedbackMessage({ type: "success", text: `Job #${id} re-queued successfully.` });
        fetchStats();
        fetchJobs();
        if (selectedJob && selectedJob.id === id) {
          handleInspectJob(queue, id);
        }
      }
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "Failed to retry job." });
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Job
  const handleDeleteJob = async (queue: string, id: string) => {
    if (!confirm(`Are you sure you want to remove job #${id}?`)) return;

    try {
      setActionLoading(`delete-${id}`);
      setFeedbackMessage(null);
      const res = await api.delete(`/admin/job-monitoring/${queue}/${id}`);
      if (res.success) {
        setFeedbackMessage({ type: "success", text: `Job #${id} removed.` });
        if (selectedJob && selectedJob.id === id) {
          setDetailModalOpen(false);
        }
        fetchStats();
        fetchJobs();
      }
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "Failed to remove job." });
    } finally {
      setActionLoading(null);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatDuration = (ms?: number | null) => {
    if (ms === undefined || ms === null) return "—";
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Active
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} />
            Completed
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle size={12} />
            Failed
          </span>
        );
      case "waiting":
      case "delayed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={12} />
            {status === "delayed" ? "Delayed" : "Waiting"}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
            {status}
          </span>
        );
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
            <span className="text-gray-200">Job Monitoring</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)] flex items-center gap-2">
            <Cpu className="text-[var(--admin-primary)]" size={28} />
            Background Job Monitoring
          </h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Real-time telemetry, queue health, execution traces, and failed job retries.
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
            Auto-refresh (5s)
          </button>

          <button
            onClick={() => {
              fetchStats();
              fetchJobs();
            }}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] text-sm font-medium text-[var(--admin-text)] hover:bg-[var(--admin-border)] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={isRefreshing ? "animate-spin text-[var(--admin-primary)]" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Jobs */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
            <span>Active Workers</span>
            <Activity size={16} className="text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--admin-text)]">{stats?.active ?? 0}</span>
            {stats?.active ? (
              <span className="text-xs text-blue-400 font-medium animate-pulse">Running now</span>
            ) : (
              <span className="text-xs text-[var(--admin-muted)]">Idle</span>
            )}
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
            <span>Completed</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">{stats?.completed ?? 0}</span>
            <span className="text-xs text-[var(--admin-muted)]">Processed</span>
          </div>
        </div>

        {/* Failed Jobs */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
            <span>Failed Tasks</span>
            <AlertCircle size={16} className="text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-400">{stats?.failed ?? 0}</span>
            {stats?.failed ? (
              <span className="text-xs text-red-400 font-medium">Requires action</span>
            ) : (
              <span className="text-xs text-emerald-400">All clean</span>
            )}
          </div>
        </div>

        {/* Waiting / Queued */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
            <span>Queued / Waiting</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">{(stats?.waiting ?? 0) + (stats?.delayed ?? 0)}</span>
            <span className="text-xs text-[var(--admin-muted)]">In queue</span>
          </div>
        </div>

        {/* Registered Queues */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 flex flex-col justify-between shadow-sm col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-[var(--admin-muted)] text-xs font-medium">
            <span>Total Queues</span>
            <Layers size={16} className="text-[var(--admin-primary)]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--admin-text)]">{stats?.totalQueues ?? 5}</span>
            <span className="text-xs text-[var(--admin-muted)]">Monitored</span>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-4 shadow-sm">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Statuses" },
            { id: "active", label: "Active" },
            { id: "completed", label: "Completed" },
            { id: "failed", label: "Failed" },
            { id: "waiting", label: "Waiting" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                selectedStatus === tab.id
                  ? "bg-[var(--admin-primary)] text-[#0A0E1A] font-bold shadow-sm"
                  : "text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-border)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Queue Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={selectedQueue}
            onChange={(e) => setSelectedQueue(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg px-3 text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
          >
            <option value="">All Queues</option>
            {availableQueues.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>

          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 text-[var(--admin-muted)]" size={14} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, name, error..."
              className="w-full h-9 pl-8 pr-3 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all placeholder:text-[var(--admin-muted)]"
            />
          </div>
        </div>
      </div>

      {/* Main Jobs Table */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)] text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Job ID & Name</th>
                <th className="px-4 py-3">Queue</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Created / Processed</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-[var(--admin-muted)]">
                    <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2 text-[var(--admin-primary)]" />
                    Fetching background job telemetry...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-[var(--admin-muted)]">
                    <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-medium text-[var(--admin-text)]">No background jobs found</p>
                    <p className="text-xs text-[var(--admin-muted)] mt-1">
                      {selectedStatus !== "all" || selectedQueue || searchTerm
                        ? "Try adjusting your filters or search query."
                        : "Queues are currently idle."}
                    </p>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={`${job.queue}-${job.id}`} className="hover:bg-[var(--admin-border)]/50 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-semibold text-[var(--admin-text)]">#{job.id}</span>
                        <span className="text-xs text-[var(--admin-muted)] font-medium truncate max-w-[200px]">
                          {job.name}
                        </span>
                        {job.failedReason && (
                          <span className="text-[11px] text-red-400 mt-0.5 truncate max-w-[240px]">
                            {job.failedReason}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--admin-border)] border border-[var(--admin-border)] text-xs font-mono text-[var(--admin-muted)]">
                        <Layers size={11} />
                        {job.queue}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">{getStatusBadge(job.status)}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[var(--admin-muted)]">
                      {formatDuration(job.durationMs)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[var(--admin-muted)]">
                      <span className={job.attemptsMade > 1 ? "text-amber-400 font-semibold" : ""}>
                        {job.attemptsMade}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[var(--admin-muted)]">
                      <div>{new Date(job.timestamp).toLocaleTimeString()}</div>
                      <div className="text-[10px] opacity-70">{new Date(job.timestamp).toLocaleDateString()}</div>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleInspectJob(job.queue, job.id)}
                          title="Inspect Details"
                          className="p-1.5 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors cursor-pointer"
                        >
                          <Eye size={15} />
                        </button>

                        {job.status === "failed" && (
                          <button
                            onClick={() => handleRetryJob(job.queue, job.id)}
                            disabled={actionLoading === `retry-${job.id}`}
                            title="Retry Failed Job"
                            className="p-1.5 rounded-md hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <RotateCw size={15} className={actionLoading === `retry-${job.id}` ? "animate-spin" : ""} />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteJob(job.queue, job.id)}
                          disabled={actionLoading === `delete-${job.id}`}
                          title="Remove Job"
                          className="p-1.5 rounded-md hover:bg-red-500/10 text-[var(--admin-muted)] hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 size={15} />
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

      {/* Deep Inspection Modal */}
      {detailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[85vh] bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)]/50 shrink-0">
              <div className="flex items-center gap-3">
                <Cpu size={20} className="text-[var(--admin-primary)]" />
                <div>
                  <h3 className="text-[var(--admin-text)] font-bold text-base flex items-center gap-2">
                    Job #{selectedJob?.id || "..."}
                    {selectedJob && getStatusBadge(selectedJob.status)}
                  </h3>
                  <span className="text-xs text-[var(--admin-muted)] font-mono">
                    Queue: {selectedJob?.queue} • {selectedJob?.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 bg-[var(--admin-background)]">
              {isLoadingDetail ? (
                <div className="py-16 text-center text-[var(--admin-muted)]">
                  <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2 text-[var(--admin-primary)]" />
                  Loading execution metadata...
                </div>
              ) : selectedJob ? (
                <>
                  {feedbackMessage && (
                    <div
                      className={`p-3.5 rounded-lg flex items-center gap-2 text-xs font-medium border ${
                        feedbackMessage.type === "success"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {feedbackMessage.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                      {feedbackMessage.text}
                    </div>
                  )}

                  {/* Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-3.5 text-xs">
                    <div>
                      <span className="text-[var(--admin-muted)] block">Created At</span>
                      <span className="font-semibold text-[var(--admin-text)]">
                        {new Date(selectedJob.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--admin-muted)] block">Processed Duration</span>
                      <span className="font-semibold text-[var(--admin-text)]">
                        {formatDuration(selectedJob.durationMs)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--admin-muted)] block">Attempts Made</span>
                      <span className="font-semibold text-[var(--admin-text)]">{selectedJob.attemptsMade}</span>
                    </div>
                    <div>
                      <span className="text-[var(--admin-muted)] block">Delayed / Timeout</span>
                      <span className="font-semibold text-[var(--admin-text)]">
                        {selectedJob.opts?.delay ? `${selectedJob.opts.delay}ms` : "None"}
                      </span>
                    </div>
                  </div>

                  {/* Error & Stack Trace (If Failed) */}
                  {selectedJob.failedReason && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-red-400">
                        <span className="flex items-center gap-1.5">
                          <Flame size={14} /> Error & Failure Stack Trace
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `${selectedJob.failedReason}\n\n${(selectedJob.stacktrace || []).join("\n")}`,
                              "error"
                            )
                          }
                          className="flex items-center gap-1 text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-text)] cursor-pointer"
                        >
                          {copiedKey === "error" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          Copy Error
                        </button>
                      </div>
                      <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-3 text-xs font-mono text-red-300 max-h-48 overflow-y-auto space-y-1">
                        <p className="font-bold">{selectedJob.failedReason}</p>
                        {selectedJob.stacktrace && selectedJob.stacktrace.length > 0 && (
                          <pre className="text-[11px] text-red-400/80 whitespace-pre-wrap mt-2">
                            {selectedJob.stacktrace.join("\n")}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Input Data Payload (JSON) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--admin-muted)]">
                      <span>Input Payload (`data`)</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(selectedJob.data, null, 2), "payload")}
                        className="flex items-center gap-1 text-[11px] hover:text-[var(--admin-text)] cursor-pointer"
                      >
                        {copiedKey === "payload" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        Copy JSON
                      </button>
                    </div>
                    <pre className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-3.5 text-xs font-mono text-[var(--admin-text)] max-h-48 overflow-y-auto">
                      {JSON.stringify(selectedJob.data, null, 2)}
                    </pre>
                  </div>

                  {/* Return Value / Result (JSON) */}
                  {selectedJob.returnvalue && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-[var(--admin-muted)]">
                        <span>Output Result (`returnvalue`)</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(selectedJob.returnvalue, null, 2), "result")}
                          className="flex items-center gap-1 text-[11px] hover:text-[var(--admin-text)] cursor-pointer"
                        >
                          {copiedKey === "result" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          Copy JSON
                        </button>
                      </div>
                      <pre className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl p-3.5 text-xs font-mono text-[var(--admin-text)] max-h-40 overflow-y-auto">
                        {JSON.stringify(selectedJob.returnvalue, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)]/30 flex items-center justify-between shrink-0">
              {selectedJob ? (
                <button
                  onClick={() => handleDeleteJob(selectedJob.queue, selectedJob.id)}
                  disabled={actionLoading === `delete-${selectedJob.id}`}
                  className="px-3.5 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Delete Job
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>

                {selectedJob && selectedJob.status === "failed" && (
                  <button
                    onClick={() => handleRetryJob(selectedJob.queue, selectedJob.id)}
                    disabled={actionLoading === `retry-${selectedJob.id}`}
                    className="px-4 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(126,211,33,0.3)] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw size={14} className={actionLoading === `retry-${selectedJob.id}` ? "animate-spin" : ""} />
                    {actionLoading === `retry-${selectedJob.id}` ? "Retrying..." : "Retry Failed Job"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
