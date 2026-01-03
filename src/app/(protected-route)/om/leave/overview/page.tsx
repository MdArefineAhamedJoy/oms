"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rawData from "@/data/leave-requests-static.json";

type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";
type DurationUnit = "FULL_DAY" | "HALF_DAY";

type RawLeave = {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  durationUnit: DurationUnit;
  status: LeaveStatus;
  reason: string;
};

const INCLUDED: LeaveStatus[] = ["Pending", "Approved"];

function parseISODate(iso: string) {
  return new Date(iso + "T00:00:00");
}

function formatRange(a: string, b: string) {
  const d1 = parseISODate(a);
  const d2 = parseISODate(b);
  const f = (d: Date) => `${d.getDate()} ${d.toLocaleString(undefined, { month: "short" })} ${d.getFullYear()}`;
  if (a === b) return f(d1);
  return `${f(d1)} – ${f(d2)}`;
}

function monthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function startOfGrid(d: Date) {
  const first = monthStart(d);
  const day = first.getDay();
  const shift = (day + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - shift);
  return gridStart;
}

function daysInGrid(d: Date) {
  const start = startOfGrid(d);
  return Array.from({ length: 42 }).map((_, i) => {
    const x = new Date(start);
    x.setDate(start.getDate() + i);
    return x;
  });
}

const PALETTE = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
];

function colorFor(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  const idx = Math.abs(h) % PALETTE.length;
  return PALETTE[idx];
}

const RAW = rawData as RawLeave[];

export default function Page() {
  const [activeMonth, setActiveMonth] = useState<Date>(() => monthStart(new Date()));

  const monthLabel = `${activeMonth.toLocaleString(undefined, { month: "long" })} ${activeMonth.getFullYear()}`;
  const gridDays = useMemo(() => daysInGrid(activeMonth), [activeMonth]);

  const monthlyRequests = useMemo(() => {
    const ms = monthStart(activeMonth);
    const me = new Date(ms.getFullYear(), ms.getMonth() + 1, 0);
    return RAW.filter((r) => {
      if (!INCLUDED.includes(r.status)) return false;
      const a = parseISODate(r.startDate);
      const b = parseISODate(r.endDate);
      return a <= me && b >= ms;
    });
  }, [activeMonth]);

  function requestsOnDay(day: Date) {
    return monthlyRequests.filter((r) => {
      const a = parseISODate(r.startDate);
      const b = parseISODate(r.endDate);
      return a <= day && b >= day;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Leave Overview</h1>
          <p className="text-sm text-muted-foreground">Static UI with hardcoded sample data.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-zinc-700"
            aria-label="Previous month"
            onClick={() => setActiveMonth((m) => addMonths(m, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[140px] text-center text-sm font-medium">{monthLabel}</div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-zinc-700"
            aria-label="Next month"
            onClick={() => setActiveMonth((m) => addMonths(m, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Simple KPI cards for this month */}
      <KpiRow requests={monthlyRequests} />

      <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        <div className="rounded-md border bg-white p-4">
          <div className="grid grid-cols-7 gap-1 text-xs font-semibold uppercase text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="px-2 py-1 text-center">{d}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-sm">
            {gridDays.map((date) => {
              const inMonth = date.getMonth() === activeMonth.getMonth();
              const day = date.getDate();
              const dayKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`;
              const list = requestsOnDay(date);
              const shown = list.slice(0, 3);
              const overflow = list.length - shown.length;
              return (
                <div key={dayKey} className="min-h-24 rounded-md border p-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${inMonth ? "text-foreground" : "text-zinc-400"}`}>{day}</span>
                    {list.length > 0 && (
                      <div className="flex items-center gap-1">
                        {shown.map((r) => {
                          const color = colorFor(r.id);
                          const label = r.durationUnit === "HALF_DAY" ? "0.5" : "1";
                          return (
                            <span key={r.id} className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.55rem] font-semibold text-white ${color}`}>
                              {label}
                            </span>
                          );
                        })}
                        {overflow > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[0.55rem] font-semibold text-muted-foreground">
                            +{overflow}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border bg-white">
          <div className="border-b p-4">
            <h3 className="text-sm font-semibold">This month</h3>
            <p className="text-xs text-muted-foreground">Approved and pending requests</p>
          </div>
          <div className="max-h-[520px] overflow-auto p-2">
            {monthlyRequests.length === 0 ? (
              <p className="p-2 text-xs text-muted-foreground">No approved or pending leave scheduled for this month.</p>
            ) : (
              <div className="space-y-2">
                {monthlyRequests.map((r) => {
                  const color = colorFor(r.id);
                  const range = formatRange(r.startDate, r.endDate);
                  const statusTone =
                    r.status === "Approved"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : r.status === "Pending"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : r.status === "Rejected"
                      ? "bg-rose-100 text-rose-700 border-rose-200"
                      : "bg-zinc-100 text-zinc-700 border-zinc-200";
                  const unit = r.durationUnit === "HALF_DAY" ? "0.5" : "1";
                  return (
                    <div key={r.id} className="flex items-center justify-between rounded-md border p-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.55rem] font-semibold text-white ${color}`}>{unit}</span>
                          <span className="text-xs font-medium text-foreground">{r.name}</span>
                          <span className="text-[0.65rem] text-muted-foreground">{r.type}</span>
                        </div>
                        <div className="pl-7 text-[0.65rem] font-medium text-foreground">{range}</div>
                      </div>
                      <span className={`ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6rem] font-medium uppercase ${statusTone}`}>{r.status}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiRow({ requests }: { requests: RawLeave[] }) {
  const total = requests.length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const users = new Set(requests.map((r) => r.name)).size;
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Kpi label="Total Leave" value={total} />
      <Kpi label="Users" value={users} />
      <Kpi label="Approved" value={approved} />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border bg-white p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-zinc-900">{value}</div>
    </div>
  );
}
