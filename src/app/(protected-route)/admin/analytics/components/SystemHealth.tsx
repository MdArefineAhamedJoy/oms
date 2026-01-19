import { PerformanceMetric } from "@/types/admin";
import { Target, TrendingUp, TrendingDown } from "lucide-react";

interface SystemHealthProps {
  metrics: PerformanceMetric[];
}

export default function SystemHealth({ metrics }: SystemHealthProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Performance Metrics
      </h3>

      <div className="space-y-4">
        {metrics.map((metric) => {
          const isGood = metric.benchmark
            ? metric.value >= metric.benchmark
            : metric.value >= 80;
          const Icon = isGood ? TrendingUp : TrendingDown;

          return (
            <div key={metric.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {metric.category}
                </span>
                <div className="flex items-center gap-2">
                  {metric.benchmark && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Target: {metric.benchmark}%
                    </span>
                  )}
                  <Icon
                    className={`h-4 w-4 ${
                      isGood
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  />
                </div>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isGood
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      : "bg-gradient-to-r from-rose-500 to-rose-400"
                  }`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {metric.value}%
                </span>
                {metric.benchmark && (
                  <span
                    className={`font-medium ${
                      metric.value >= metric.benchmark
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {metric.value >= metric.benchmark ? "Above" : "Below"} target
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Status */}
      <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
              <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Overall Performance
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                System is performing well
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
              96%
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Above target
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
