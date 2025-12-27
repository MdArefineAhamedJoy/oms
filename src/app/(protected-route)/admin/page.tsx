"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import KpiCard from "@/components/KpiCard";
import { AreaChart, BarChart, DonutChart, ProgressList } from "@/components/SimpleCharts";
import StatusBadge from "@/components/StatusBadge";
import Skeleton from "@/components/Skeleton";

type Employee = {
  id: string;
  name: string;
  department: string;
};

type AttendanceRecord = {
  employeeId: string;
  status: "Present" | "Absent" | "Late";
  checkIn: string; // ISO or time string
  department: string;
};

type LeaveRequest = {
  id: string;
  employeeName: string;
  type: "Sick" | "Casual" | "Annual";
  dates: string; // e.g. "Jun 12-14"
  status: "Pending" | "Approved" | "Rejected";
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }, []);

  // Mock data
  const totalEmployees = 1240;
  const presentToday = 1102;
  const pendingLeaves = 14;
  const payrollThisMonth = 235000; // in USD

  const attendanceTrend = [
    1020, 1098, 1076, 1112, 1104, 1128, 1102,
  ];

  const departmentDistribution = [
    { label: "HR", value: 120, color: "#4f46e5" },
    { label: "IT", value: 520, color: "#06b6d4" },
    { label: "Finance", value: 180, color: "#22c55e" },
    { label: "Operations", value: 300, color: "#f59e0b" },
    { label: "Sales", value: 120, color: "#ef4444" },
  ];

  const monthlySalaryExpense = [
    { label: "Jan", value: 210000 },
    { label: "Feb", value: 220000 },
    { label: "Mar", value: 215000 },
    { label: "Apr", value: 228000 },
    { label: "May", value: 232000 },
    { label: "Jun", value: 235000 },
  ];

  const tasksProgress = [
    { label: "Completed", percent: 64, color: "#22c55e" },
    { label: "In Progress", percent: 28, color: "#06b6d4" },
    { label: "Overdue", percent: 8, color: "#ef4444" },
  ];

  const recentAttendance: AttendanceRecord[] = [
    { employeeId: "E-1001", status: "Present", checkIn: "09:01 AM", department: "IT" },
    { employeeId: "E-1043", status: "Late", checkIn: "09:27 AM", department: "Finance" },
    { employeeId: "E-1098", status: "Absent", checkIn: "—", department: "Operations" },
    { employeeId: "E-1067", status: "Present", checkIn: "08:55 AM", department: "HR" },
    { employeeId: "E-1121", status: "Present", checkIn: "09:04 AM", department: "IT" },
  ];

  const latestLeaveRequests: LeaveRequest[] = [
    { id: "LR-3201", employeeName: "Ava Johnson", type: "Sick", dates: "Jun 12", status: "Pending" },
    { id: "LR-3199", employeeName: "Liam Brown", type: "Annual", dates: "Jun 20-24", status: "Approved" },
    { id: "LR-3197", employeeName: "Noah Smith", type: "Casual", dates: "Jun 13-14", status: "Rejected" },
    { id: "LR-3195", employeeName: "Emma Davis", type: "Annual", dates: "Jun 15-18", status: "Pending" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Admin Dashboard</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{today} · Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              className="h-9 w-56 sm:w-64 rounded-md border border-zinc-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Search..."
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400">⌘K</span>
          </div>
          <button
            aria-label="Notifications"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {/* bell icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-sm" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </>
        ) : (
          <>
            <KpiCard label="Total Employees" value={totalEmployees.toLocaleString()} trend="+8% vs last month" icon="users" />
            <KpiCard label="Present Today" value={presentToday.toLocaleString()} trend="+2% vs yesterday" icon="check" accent="indigo" />
            <KpiCard label="Pending Leave Requests" value={pendingLeaves.toString()} trend="-3% vs last week" icon="clock" accent="amber" />
            <KpiCard label="This Month's Payroll" value={`$${payrollThisMonth.toLocaleString()}`} trend="+1.5% vs last month" icon="dollar" accent="emerald" />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Attendance Overview">
          {loading ? (
            <Skeleton className="h-56" />
          ) : (
            <AreaChart data={attendanceTrend} height={200} className="mt-2" />
          )}
        </Card>
        <Card title="Department Distribution">
          {loading ? (
            <Skeleton className="h-56" />
          ) : (
            <DonutChart data={departmentDistribution} size={180} className="mx-auto" />
          )}
        </Card>
      </div>

      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Monthly Salary Expense">
          {loading ? (
            <Skeleton className="h-56" />
          ) : (
            <BarChart data={monthlySalaryExpense} height={220} className="mt-2" />
          )}
        </Card>

        <Card title="Task Completion">
          {loading ? (
            <Skeleton className="h-56" />
          ) : (
            <ProgressList items={tasksProgress} />
          )}
        </Card>
      </div>

      {/* Recent Activity & Tables */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Recent Attendance Events">
          {loading ? (
            <Skeleton className="h-48" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-zinc-500">
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="py-2">Employee</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Check-in</th>
                    <th className="py-2">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendance.map((r, i) => (
                    <tr key={i} className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50">
                      <td className="py-2 font-medium text-zinc-800 dark:text-zinc-200">{r.employeeId}</td>
                      <td className="py-2"><StatusBadge status={r.status} /></td>
                      <td className="py-2 text-zinc-600 dark:text-zinc-400">{r.checkIn}</td>
                      <td className="py-2 text-zinc-600 dark:text-zinc-400">{r.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Latest Leave Requests">
          {loading ? (
            <Skeleton className="h-48" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-zinc-500">
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="py-2">Employee</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Dates</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestLeaveRequests.map((lr) => (
                    <tr key={lr.id} className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50">
                      <td className="py-2 font-medium text-zinc-800 dark:text-zinc-200">{lr.employeeName}</td>
                      <td className="py-2 text-zinc-600 dark:text-zinc-400">{lr.type}</td>
                      <td className="py-2 text-zinc-600 dark:text-zinc-400">{lr.dates}</td>
                      <td className="py-2"><StatusBadge status={lr.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
