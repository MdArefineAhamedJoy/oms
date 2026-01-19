import { LucideIcon, TrendingUp, TrendingDown, DollarSign, Users, Building, Activity, Shield, MapPin } from "lucide-react";

interface Metric {
  label: string;
  value: string | number;
  trend: number;
  icon: "dollar" | "users" | "building" | "activity" | "shield" | "mapPin";
  color?: "emerald" | "indigo" | "amber" | "rose";
}

interface MetricsCardsProps {
  metrics: Metric[];
}

const iconMap: Record<Metric["icon"], LucideIcon> = {
  dollar: DollarSign,
  users: Users,
  building: Building,
  activity: Activity,
  shield: Shield,
  mapPin: MapPin,
};

const colorClasses = {
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
};

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon];
        const colors = metric.color ? colorClasses[metric.color] : colorClasses.indigo;
        const isPositive = metric.trend >= 0;

        return (
          <div
            key={index}
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
                {Math.abs(metric.trend)}%
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                {typeof metric.value === "number"
                  ? metric.value.toLocaleString()
                  : metric.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
