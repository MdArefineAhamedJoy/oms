"use client";

import { Calendar, Download } from "lucide-react";
import { useState } from "react";

interface AnalyticsHeaderProps {
  onExport?: () => void;
  onDateRangeChange?: (range: string) => void;
}

export default function AnalyticsHeader({
  onExport,
  onDateRangeChange,
}: AnalyticsHeaderProps) {
  const [dateRange, setDateRange] = useState("7d");

  const dateRanges = [
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 30 Days", value: "30d" },
    { label: "Last 90 Days", value: "90d" },
    { label: "This Year", value: "1y" },
  ];

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Analytics
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Platform performance metrics and insights
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Range Selector */}
        <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
          {dateRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleDateRangeChange(range.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                dateRange === range.value
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
}
