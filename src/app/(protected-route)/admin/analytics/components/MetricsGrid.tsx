import { LucideIcon, TrendingUp, TrendingDown, DollarSign, Users, Building, Shield, MapPin, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { AnalyticsMetrics } from "@/types/admin";

interface MetricsGridProps {
  metrics: AnalyticsMetrics;
}

const metricConfig = [
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: DollarSign,
    format: (value: number) => `$${value.toLocaleString()}`,
    color: "emerald",
  },
  {
    key: "activeTenants",
    label: "Active Tenants",
    icon: Building,
    format: (value: number) => value.toLocaleString(),
    color: "indigo",
  },
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    format: (value: number) => value.toLocaleString(),
    color: "blue",
  },
  {
    key: "activeGuards",
    label: "Active Guards",
    icon: Shield,
    format: (value: number) => value.toLocaleString(),
    color: "purple",
  },
  {
    key: "sitesMonitored",
    label: "Sites Monitored",
    icon: MapPin,
    format: (value: number) => value.toLocaleString(),
    color: "amber",
  },
  {
    key: "incidentsToday",
    label: "Incidents Today",
    icon: AlertTriangle,
    format: (value: number) => value.toLocaleString(),
    color: "rose",
  },
  {
    key: "slaCompliance",
    label: "SLA Compliance",
    icon: CheckCircle2,
    format: (value: number) => `${value}%`,
    color: "green",
  },
  {
    key: "systemUptime",
    label: "System Uptime",
    icon: Clock,
    format: (value: number) => `${value}%`,
    color: "cyan",
  },
];

const colorClasses: Record<string, any> = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950",
    text: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-100 dark:bg-indigo-900",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950",
    text: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950",
    text: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950",
    text: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-100 dark:bg-cyan-900",
  },
};

const changeKeys: Record<string, string> = {
  totalRevenue: "revenueChange",
  activeTenants: "tenantChange",
  totalUsers: "userChange",
  activeGuards: "guardChange",
  sitesMonitored: "siteChange",
  incidentsToday: "incidentChange",
  slaCompliance: "slaChange",
  systemUptime: "uptimeChange",
};

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metricConfig.map((config) => {
        const Icon = config.icon;
        const colors = colorClasses[config.color] || colorClasses.indigo;
        const value = metrics[config.key as keyof AnalyticsMetrics] as number;
        const change = metrics[changeKeys[config.key] as keyof AnalyticsMetrics] as number;
        const isPositive = change >= 0;

        return (
          <div
            key={config.key}
            className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-900/50"
          >
            <div className="flex items-center justify-between">
              <div className={colors.iconBg + " rounded-md p-3"}>
                <Icon className={`h-6 w-6 ${colors.text}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {isPositive ? "+" : ""}
                {change}%
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {config.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                {config.format(value)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
