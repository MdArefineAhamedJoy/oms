"use client";

import { Calendar, Download, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onExport?: () => void;
  autoRefresh?: boolean;
  onToggleAutoRefresh?: () => void;
}

export default function DashboardHeader({
  onRefresh,
  onExport,
  autoRefresh = false,
  onToggleAutoRefresh,
}: DashboardHeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Admin Dashboard
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {today} · Platform Overview
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleAutoRefresh}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            autoRefresh
              ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-300"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          <RefreshCw className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
          Auto-refresh
        </button>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <Download className="h-4 w-4" />
          Export
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-56 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
            ⌘K
          </span>
        </div>
      </div>
    </div>
  );
}
