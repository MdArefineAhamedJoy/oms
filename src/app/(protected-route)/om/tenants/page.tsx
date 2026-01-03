"use client";

import { useMemo, useState } from "react";
import DataTable, { Column } from "@/components/common/DataTable";
import { cn } from "@/lib/utils";
import rawTenants from "@/data/tenants-static.json";

type Tenant = {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Inactive";
  sites: number;
  users: number;
  contact: string;
  address: string;
  createdAt: string; // YYYY-MM-DD
};

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border bg-white p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

const TENANTS = rawTenants as Tenant[];

export default function Page() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");

  const filtered = useMemo(() => {
    const base = status === "All" ? TENANTS : TENANTS.filter((t) => t.status === status);
    const s = q.trim().toLowerCase();
    if (!s) return base;
    return base.filter((t) => [t.name, t.code, t.status, t.contact, t.address].join(" ").toLowerCase().includes(s));
  }, [q, status]);

  const total = TENANTS.length;
  const active = TENANTS.filter((t) => t.status === "Active").length;
  const inactive = total - active;
  const totalSites = TENANTS.reduce((s, t) => s + t.sites, 0);

  const columns: Column<Tenant>[] = [
    {
      key: "tenant",
      header: "Tenant",
      accessor: (t) => (
        <div className="flex flex-col">
          <span className="font-medium text-zinc-900">{t.name}</span>
          <span className="text-xs text-zinc-500">Code: {t.code}</span>
        </div>
      ),
    },
    { key: "status", header: "Status", accessor: (t) => (
      <span className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-medium",
        t.status === "Active" ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-zinc-200 bg-zinc-100 text-zinc-700"
      )}>{t.status}</span>
    ) },
    { key: "sites", header: "Sites", accessor: (t) => t.sites },
    { key: "users", header: "Users", accessor: (t) => t.users },
    { key: "contact", header: "Contact", accessor: (t) => t.contact },
    { key: "address", header: "Address", accessor: (t) => t.address },
    { key: "createdAt", header: "Created", accessor: (t) => t.createdAt },
  ];

  return (
    <main className="space-y-4">
      <div className="rounded-md border bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Tenants</h1>
            <p className="mt-1 text-sm text-zinc-600">Manage tenant profiles and sites (static UI).</p>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tenants"
              className="w-full sm:w-64 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-md border border-zinc-200 bg-white px-2 py-2 text-sm"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total Tenants" value={total} />
        <Kpi label="Active" value={active} />
        <Kpi label="Inactive" value={inactive} />
        <Kpi label="Total Sites" value={totalSites} />
      </div>

      <DataTable<Tenant>
        columns={columns}
        data={filtered}
        stickyHeader
      />
    </main>
  );
}
