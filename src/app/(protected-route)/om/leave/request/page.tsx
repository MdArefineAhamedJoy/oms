"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DataTable, { Column } from "@/components/common/DataTable";
import { cn } from "@/lib/utils";
import rawData from "@/data/leave-requests.json";
import { Plus } from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";

type LeaveRow = {
  id: string;
  name: string;        // e.g., "Eaint Hannipec"
  type: string;        // e.g., "Annual Leave"
  dates: string;       // e.g., "20 Dec 2025 (0.5 day | Half-day)"
  status: LeaveStatus; // "Pending" | "Approved" | "Rejected" | "Cancelled"
  reason: string;      // e.g., "Go to clinic"
};

const DATA = rawData as LeaveRow[];
const STATUS_ORDER: LeaveStatus[] = ["Pending", "Approved", "Rejected", "Cancelled"];

const countByStatus: Record<LeaveStatus, number> = DATA.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] ?? 0) + 1;
  return acc;
}, { Pending: 0, Approved: 0, Rejected: 0, Cancelled: 0 } as Record<LeaveStatus, number>);

function StatusBadge({ status }: { status: LeaveStatus }) {
  const color =
    status === "Approved"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : status === "Pending"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : status === "Rejected"
      ? "bg-rose-100 text-rose-700 border-rose-200"
      : "bg-zinc-100 text-zinc-700 border-zinc-200";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium uppercase", color)}>
      {status}
    </span>
  );
}

function DatesCell({ value }: { value: string }) {
  // Render "20 Dec 2025 (0.5 day | Half-day)" as:
  // 20 Dec 2025
  // 0.5 day(s)  Half-day
  const match = value.match(/^(.+?)\s*\((.+)\)\s*$/);
  if (!match) return <span>{value}</span>;
  const main = match[1];
  const extra = match[2].replace(/\s*\|\s*/, "  ").replace(/\b0\.5 day\b/, "0.5 day(s)");
  return (
    <div className="flex flex-col">
      <span>{main}</span>
      <span className="text-xs text-zinc-500">{extra}</span>
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<"All" | LeaveStatus>("All");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const base = tab === "All" ? DATA : DATA.filter((r) => r.status === tab);
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter((r) =>
      [r.id, r.name, r.type, r.dates, r.status, r.reason]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [tab, q]);

  const columns: Column<LeaveRow>[] = [
    {
      key: "user",
      header: "User",
      accessor: (r) => (
        <div className="flex flex-col">
          <span className="font-medium text-zinc-900">{r.name}</span>
          <span className="text-xs text-zinc-500">ID: {r.id}</span>
        </div>
      ),
    },
    { key: "type", header: "Type", accessor: (r) => r.type },
    { key: "dates", header: "Dates", accessor: (r) => <DatesCell value={r.dates} /> },
    { key: "status", header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
    { key: "reason", header: "Reason", accessor: (r) => r.reason },
  ];

  const tabs = [
    { label: `All requests (${DATA.length})`, value: "All" as const },
    ...STATUS_ORDER.map((s) => ({ label: `${s} (${countByStatus[s]})`, value: s })),
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Leave Requests</h2>
            <p className="mt-1 text-sm text-zinc-600">View and filter leave requests by status.</p>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search requests"
              className="w-full sm:w-64 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              New Leave Request
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-white p-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                t.value === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-200"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <DataTable<LeaveRow> columns={columns} data={filtered} stickyHeader />
    </div>
  );
}
