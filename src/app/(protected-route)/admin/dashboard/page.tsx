"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import MetricsCards from "./components/MetricsCards";
import AlertsSection from "./components/AlertsSection";
import PlatformActivityCard from "./components/PlatformActivityCard";
import SystemStatusCard from "./components/SystemStatusCard";
import QuickActionsCard from "./components/QuickActionsCard";
import RecentTenantsCard from "./components/RecentTenantsCard";
import SubscriptionOverviewCard from "./components/SubscriptionOverviewCard";
import mockAdminService from "@/services/adminMockService";
import { SystemMetrics, Alert, PlatformActivity, SystemHealth, Tenant } from "@/types/admin";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activities, setActivities] = useState<PlatformActivity[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [recentTenants, setRecentTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [metricsRes, alertsRes, activityRes, healthRes, tenantsRes] = await Promise.all([
        mockAdminService.getSystemMetrics(),
        mockAdminService.getActiveAlerts(),
        mockAdminService.getPlatformActivity(),
        mockAdminService.getSystemHealth(),
        mockAdminService.getTenants({ pageSize: 5 }),
      ]);

      if (metricsRes.success) setSystemMetrics(metricsRes.data);
      if (alertsRes.success) setAlerts(alertsRes.data);
      if (activityRes.success) setActivities(activityRes.data);
      if (healthRes.success) setSystemHealth(healthRes.data);
      if (tenantsRes.success) setRecentTenants(tenantsRes.data.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      await mockAdminService.resolveAlert(alertId);
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleExport = () => {
    console.log("Exporting dashboard data...");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent dark:border-indigo-400"></div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const metricsData = systemMetrics
    ? [
        {
          label: "Total Revenue",
          value: `$${systemMetrics.totalRevenue.toLocaleString()}`,
          trend: systemMetrics.revenueGrowth,
          icon: "dollar" as const,
          color: "emerald" as const,
        },
        {
          label: "Active Tenants",
          value: systemMetrics.activeTenants,
          trend: systemMetrics.tenantGrowth,
          icon: "building" as const,
          color: "indigo" as const,
        },
        {
          label: "Total Users",
          value: systemMetrics.totalUsers,
          trend: systemMetrics.userGrowth,
          icon: "users" as const,
          color: "amber" as const,
        },
        {
          label: "System Health",
          value: `${systemMetrics.systemHealth}%`,
          trend: systemMetrics.incidentDelta,
          icon: "activity" as const,
          color: "rose" as const,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* Metrics Cards */}
      <MetricsCards metrics={metricsData} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* System Status */}
        {systemHealth && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <SystemStatusCard systemHealth={systemHealth} />
          </div>
        )}

        {/* Alerts Section */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Active Alerts
          </h3>
          <AlertsSection alerts={alerts} onResolveAlert={handleResolveAlert} />
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Platform Activity - Takes 2 columns */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 lg:col-span-2">
          <PlatformActivityCard activities={activities} />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <QuickActionsCard />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Tenants */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <RecentTenantsCard tenants={recentTenants} />
        </div>

        {/* Subscription Overview */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <SubscriptionOverviewCard
            subscriptions={[
              { plan: "Basic", count: 12, percentage: 42.9 },
              { plan: "Standard", count: 10, percentage: 35.7 },
              { plan: "Premium", count: 6, percentage: 21.4 },
            ]}
          />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemMetrics && (
          <>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Active Guards
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {systemMetrics.activeGuards}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Utilization: {systemMetrics.guardUtilization}%
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Active Shifts
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {systemMetrics.activeShifts}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Coverage: {systemMetrics.shiftCoverage}%
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Sites Covered
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {systemMetrics.sitesCovered}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {systemMetrics.siteCoveragePercent}% coverage
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Incidents Today
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {systemMetrics.incidentsToday}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {systemMetrics.incidentDelta > 0 ? "+" : ""}
                {systemMetrics.incidentDelta}% from yesterday
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
