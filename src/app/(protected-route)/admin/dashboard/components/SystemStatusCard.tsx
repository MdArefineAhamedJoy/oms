import { Cpu, HardDrive, Clock, Database, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { SystemHealth } from "@/types/admin";

interface SystemStatusCardProps {
  systemHealth: SystemHealth;
}

export default function SystemStatusCard({ systemHealth }: SystemStatusCardProps) {
  const getStatusIcon = () => {
    switch (systemHealth.status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case "down":
        return <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />;
    }
  };

  const getStatusText = () => {
    switch (systemHealth.status) {
      case "healthy":
        return "All Systems Operational";
      case "degraded":
        return "System Performance Degraded";
      case "down":
        return "System Down";
    }
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return "bg-emerald-500 dark:bg-emerald-400";
    if (value < 75) return "bg-amber-500 dark:bg-amber-400";
    return "bg-rose-500 dark:bg-rose-400";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          System Status
        </h3>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* CPU Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                CPU Usage
              </span>
            </div>
            <span className="text-zinc-600 dark:text-zinc-400">
              {systemHealth.cpu}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full ${getProgressColor(systemHealth.cpu)} transition-all duration-300`}
              style={{ width: `${systemHealth.cpu}%` }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Memory Usage
              </span>
            </div>
            <span className="text-zinc-600 dark:text-zinc-400">
              {systemHealth.memory}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full ${getProgressColor(systemHealth.memory)} transition-all duration-300`}
              style={{ width: `${systemHealth.memory}%` }}
            />
          </div>
        </div>

        {/* Disk Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Disk Usage
              </span>
            </div>
            <span className="text-zinc-600 dark:text-zinc-400">
              {systemHealth.disk}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full ${getProgressColor(systemHealth.disk)} transition-all duration-300`}
              style={{ width: `${systemHealth.disk}%` }}
            />
          </div>
        </div>

        {/* System Uptime */}
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              System Uptime
            </span>
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {systemHealth.uptime}%
          </span>
        </div>

        {/* API Response Time */}
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              API Response Time
            </span>
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {systemHealth.apiResponseTime}ms
          </span>
        </div>
      </div>
    </div>
  );
}
