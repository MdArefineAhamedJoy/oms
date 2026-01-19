import { Users, Shield, UserCheck, UserX } from "lucide-react";

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  officers: number;
}

export default function UserStats({ totalUsers, activeUsers, admins, officers }: UserStatsProps) {
  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "indigo",
    },
    {
      label: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "emerald",
    },
    {
      label: "Admins",
      value: admins,
      icon: Shield,
      color: "purple",
    },
    {
      label: "Officers",
      value: officers,
      icon: UserX,
      color: "blue",
    },
  ];

  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
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
            <div className={`rounded-md p-3 ${colors}`}>
              <Icon className="h-6 w-6" />
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
