import { Building2, Users, MapPin, Activity } from "lucide-react";

interface TenantStatsProps {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  totalSites: number;
}

export default function TenantStats({
  totalTenants,
  activeTenants,
  totalUsers,
  totalSites,
}: TenantStatsProps) {
  const stats = [
    {
      label: "Total Tenants",
      value: totalTenants,
      icon: Building2,
      color: "indigo",
    },
    {
      label: "Active Tenants",
      value: activeTenants,
      icon: Activity,
      color: "emerald",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "blue",
    },
    {
      label: "Total Sites",
      value: totalSites,
      icon: MapPin,
      color: "amber",
    },
  ];

  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorClasses[stat.color];

        return (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-md p-3 ${colors}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                {stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
