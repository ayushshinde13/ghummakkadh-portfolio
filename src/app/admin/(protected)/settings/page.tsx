"use client";

import React, { useState } from "react";
import { Globe, Shield, Key, Bell, Save } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedText, setSavedText] = useState("Save Changes");

  const handleSave = () => {
    setIsSaving(true);
    setSavedText("Saving...");
    setTimeout(() => {
      setIsSaving(false);
      setSavedText("Saved Successfully!");
      setTimeout(() => setSavedText("Save Changes"), 2000);
    }, 1000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "security", label: "Security & Auth", icon: Shield },
    { id: "api", label: "API Keys & Gateways", icon: Key },
    { id: "alerts", label: "System Alerts", icon: Bell },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">System Settings</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Configure global platform behaviors, security policies, API credentials, and notifications.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-[#0A0E1A] text-sm font-bold shadow transition-colors gap-2 shrink-0 ${
            isSaving ? "bg-[var(--admin-primary)]/70 cursor-not-allowed" : "bg-[var(--admin-primary)] hover:bg-[var(--admin-primary)]/90"
          }`}
        >
          <Save size={16} className={isSaving ? "animate-pulse" : ""} />
          {savedText}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--admin-border)] flex gap-6 overflow-x-auto custom-scrollbar pb-[-1px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-[var(--admin-primary)] text-[var(--admin-primary)]"
                  : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="space-y-6">
          {/* Platform Identity Card */}
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] backdrop-blur-sm shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="font-semibold leading-none tracking-tight text-lg text-[var(--admin-text)]">Platform Identity</h3>
              <p className="text-sm text-[var(--admin-muted)]">
                Basic platform branding and contact endpoints.
              </p>
            </div>
            
            <div className="p-6 pt-0 space-y-6">
              {/* 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-gray-200">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Ghumakkadh"
                    className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-border)] px-3 py-2 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-primary)]/40 focus:border-[var(--admin-primary)] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-gray-200">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="support@ghumakkadh.com"
                    className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-border)] px-3 py-2 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-primary)]/40 focus:border-[var(--admin-primary)] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-gray-200">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 12345 67890"
                    className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-border)] px-3 py-2 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-primary)]/40 focus:border-[var(--admin-primary)] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-gray-200">
                    Default Currency
                  </label>
                  <input
                    type="text"
                    defaultValue="INR (₹)"
                    className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-border)] px-3 py-2 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-primary)]/40 focus:border-[var(--admin-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Separator */}
              <div className="h-px w-full bg-white/10" />

              {/* Maintenance Mode Row */}
              <div className="flex flex-row items-center justify-between rounded-lg border border-[var(--admin-border)] p-4 bg-[var(--admin-border)]">
                <div className="space-y-0.5">
                  <label className="text-base font-semibold text-[var(--admin-text)]">
                    Maintenance Mode
                  </label>
                  <p className="text-sm text-[var(--admin-muted)]">
                    Disable public access to the application for upgrades.
                  </p>
                </div>
                
                {/* Custom Switch Mimicking Shadcn */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={maintenanceMode}
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E1A] ${
                    maintenanceMode ? "bg-[var(--admin-primary)]" : "bg-[var(--admin-border)]"
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      maintenanceMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholders for other tabs */}
      {activeTab !== "general" && (
        <div className="rounded-xl border border-dashed border-[var(--admin-border)] h-64 flex items-center justify-center">
          <p className="text-[var(--admin-muted)]">
            This settings page is currently under construction.
          </p>
        </div>
      )}
    </div>
  );
}
