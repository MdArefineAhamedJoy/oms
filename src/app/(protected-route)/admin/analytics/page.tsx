"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AnalyticsHeader from "./components/AnalyticsHeader";
import MetricsGrid from "./components/MetricsGrid";
import SystemHealth from "./components/SystemHealth";
import ActivityFeed from "./components/ActivityFeed";
import mockAdminService from "@/services/adminMockService";
import {
  AnalyticsMetrics,
  RevenueDataPoint,
  UserGrowthDataPoint,
  OperationsDataPoint,
  SubscriptionDataPoint,
  PerformanceMetric,
  ActivityLog,
} from "@/types/admin";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthDataPoint[]>([]);
  const [operationsData, setOperationsData] = useState<OperationsDataPoint[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionDataPoint[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await mockAdminService.getAnalyticsData();
      if (response.success) {
        const data = response.data;
        setMetrics(data.metrics);
        setRevenueData(data.revenue);
        setUserGrowthData(data.userGrowth);
        setOperationsData(data.operations);
        setSubscriptionData(data.subscriptions);
        setPerformanceMetrics(data.performance);
        setActivityLogs(data.activity);
      }
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent dark:border-indigo-400"></div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnalyticsHeader
        onExport={handleExport}
        onDateRangeChange={setDateRange}
      />

      {/* Metrics Grid */}
      {metrics && <MetricsGrid metrics={metrics} />}

      {/* Revenue Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
            <XAxis
              dataKey="month"
              className="text-sm text-zinc-600 dark:text-zinc-400"
            />
            <YAxis
              className="text-sm text-zinc-600 dark:text-zinc-400"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(24 24 27)",
                border: "1px solid rgb(39 39 42)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "rgb(244 244 245)" }}
              itemStyle={{ color: "rgb(244 244 245)" }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          User Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
            <XAxis
              dataKey="month"
              className="text-sm text-zinc-600 dark:text-zinc-400"
            />
            <YAxis
              className="text-sm text-zinc-600 dark:text-zinc-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(24 24 27)",
                border: "1px solid rgb(39 39 42)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "rgb(244 244 245)" }}
              itemStyle={{ color: "rgb(244 244 245)" }}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Operations Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Operations Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={operationsData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
            <XAxis
              dataKey="category"
              className="text-sm text-zinc-600 dark:text-zinc-400"
            />
            <YAxis
              className="text-sm text-zinc-600 dark:text-zinc-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(24 24 27)",
                border: "1px solid rgb(39 39 42)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "rgb(244 244 245)" }}
              itemStyle={{ color: "rgb(244 244 245)" }}
              formatter={(value: number, name: string, props: any) => [
                value.toLocaleString(),
                props.payload.change ? `(${props.payload.change > 0 ? "+" : ""}${props.payload.change}%)` : "",
              ]}
            />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* System Health */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <SystemHealth metrics={performanceMetrics} />
        </div>

        {/* Activity Feed */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <ActivityFeed activities={activityLogs} />
        </div>
      </div>

      {/* Subscription Distribution */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Subscription Distribution
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {subscriptionData.map((sub) => (
            <div
              key={sub.plan}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {sub.plan}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {sub.percentage}%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
                  style={{ width: `${sub.percentage}%` }}
                />
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {sub.count}
                <span className="ml-1 text-sm font-normal text-zinc-600 dark:text-zinc-400">
                  tenants
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
