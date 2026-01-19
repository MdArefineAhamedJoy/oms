import { AlertCircle, AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { Alert as AlertType } from "@/types/admin";

interface AlertsSectionProps {
  alerts: AlertType[];
  onResolveAlert: (alertId: string) => void;
}

export default function AlertsSection({ alerts, onResolveAlert }: AlertsSectionProps) {
  const getAlertIcon = (type: AlertType["type"]) => {
    switch (type) {
      case "error":
        return XCircle;
      case "warning":
        return AlertTriangle;
      case "info":
        return Info;
      default:
        return AlertCircle;
    }
  };

  const getSeverityColor = (severity: AlertType["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-rose-500 bg-rose-50 dark:bg-rose-950/20";
      case "high":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "medium":
        return "border-amber-500 bg-amber-50 dark:bg-amber-950/20";
      case "low":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/20";
      default:
        return "border-zinc-300 bg-zinc-50 dark:bg-zinc-900";
    }
  };

  const getSeverityBadgeColor = (severity: AlertType["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "low":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-12 dark:border-zinc-700 dark:bg-zinc-900/50">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
          <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            No active alerts
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            System is running smoothly
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const Icon = getAlertIcon(alert.type);

        return (
          <div
            key={alert.id}
            className={`flex items-start gap-3 rounded-lg border-l-4 p-4 ${getSeverityColor(alert.severity)}`}
          >
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-600 dark:text-zinc-400" />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {alert.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getSeverityBadgeColor(alert.severity)}`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {alert.message}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                    Source: {alert.source} ·{" "}
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onResolveAlert(alert.id)}
              className="flex-shrink-0 rounded-md p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
              title="Resolve alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
