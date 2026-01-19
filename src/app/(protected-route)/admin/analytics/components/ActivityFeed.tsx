import { ActivityLog } from "@/types/admin";
import { Building, User, FileText, AlertCircle, Clock } from "lucide-react";

interface ActivityFeedProps {
  activities: ActivityLog[];
}

const actionIcons: Record<string, any> = {
  create: { icon: Building, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400" },
  update: { icon: FileText, color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" },
  delete: { icon: AlertCircle, color: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400" },
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Activity
        </h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Last {activities.length} actions
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const actionConfig = actionIcons[activity.action] || actionIcons.update;
          const Icon = actionConfig.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-900/50"
            >
              <div className="flex-shrink-0">
                <div className={`rounded-md p-2 ${actionConfig.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {activity.description}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{activity.user}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
