import { UserPlus, Building, Settings, FileText, Download, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickActionsCardProps {
  onActionClick?: (action: string) => void;
}

export default function QuickActionsCard({ onActionClick }: QuickActionsCardProps) {
  const router = useRouter();

  const actions = [
    {
      label: "Add New User",
      icon: UserPlus,
      href: "/admin/users",
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-900",
    },
    {
      label: "Add New Tenant",
      icon: Building,
      href: "/admin/tenants",
      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900",
    },
    {
      label: "View Reports",
      icon: FileText,
      href: "/admin/analytics",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:hover:bg-amber-900",
    },
    {
      label: "System Settings",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:hover:bg-rose-900",
    },
    {
      label: "Export Data",
      icon: Download,
      href: "#",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "#",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:hover:bg-purple-900",
    },
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    if (onActionClick) {
      onActionClick(action.label);
    }
    if (action.href !== "#") {
      router.push(action.href);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => handleActionClick(action)}
              className={`flex flex-col items-center gap-2 rounded-lg border border-zinc-200 p-4 transition-all hover:scale-105 hover:shadow-md dark:border-zinc-700 ${action.color}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
