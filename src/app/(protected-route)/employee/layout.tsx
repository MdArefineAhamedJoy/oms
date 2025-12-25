"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const items = [
  { href: "/employee", label: "Dashboard" },
  { href: "/employee/attendance", label: "Attendance" },
  { href: "/employee/leave", label: "Leave" },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-6" style={{ ["--accent" as any]: "#059669" }}>
      <div className="hidden md:block">
        <Sidebar items={items} title="Employee" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="md:hidden mb-3">
          <button className="glass px-3 py-2 rounded-md text-sm" onClick={() => setOpen(true)}>Menu</button>
        </div>
        {children}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-black p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Employee Menu</div>
              <button className="glass px-2 py-1 rounded-md text-xs" onClick={() => setOpen(false)}>Close</button>
            </div>
            <Sidebar items={items} />
          </div>
        </div>
      )}
    </div>
  );
}
