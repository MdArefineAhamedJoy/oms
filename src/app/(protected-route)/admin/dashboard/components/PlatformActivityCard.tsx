import { Activity, CheckCircle, AlertTriangle, UserCheck, LogIn, LogOut, Clock } from "lucide-react";
import { PlatformActivity as PlatformActivityType } from "@/types/admin";

interface PlatformActivityCardProps {
  activities: PlatformActivityType[];
}

const activityIcons: Record<string, any> = {
  shift_created: Clock,
  officer_checkin: LogIn,
  officer_checkout: LogOut,
  incident_reported: AlertTriangle,
  user_login: UserCheck,
  patrol_completed: CheckCircle,
  shift_updated: Activity,
  tenant_created: CheckCircle,
};

export default function PlatformActivityCard({ activities }: PlatformActivityCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Platform Activity
          </h3>
        </div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Last {activities.length} activities
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.activityType] || Activity;

          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-900/50"
            >
              <div className="flex-shrink-0">
                <div className="rounded-md bg-indigo-100 p-2 dark:bg-indigo-900">
                  <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {activity.description}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {activity.user && (
                    <>
                      <span className="font-medium">{activity.user}</span>
                      <span>·</span>
                    </>
                  )}
                  {activity.tenant && (
                    <>
                      <span>{activity.tenant}</span>
                      <span>·</span>
                    </>
                  )}
                  <span>
                    {new Date(activity.timestamp).toLocaleString()}
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
