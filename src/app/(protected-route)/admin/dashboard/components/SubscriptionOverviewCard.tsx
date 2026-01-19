import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { SubscriptionDataPoint } from "@/types/admin";

interface SubscriptionOverviewCardProps {
  subscriptions: SubscriptionDataPoint[];
}

const COLORS = {
  Basic: "#71717a",
  Standard: "#3b82f6",
  Premium: "#a855f7",
};

export default function SubscriptionOverviewCard({
  subscriptions,
}: SubscriptionOverviewCardProps) {
  const chartData = subscriptions.map((sub) => ({
    name: sub.plan,
    value: sub.count,
    percentage: sub.percentage,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {payload[0].name}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Count: {payload[0].value}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {payload[0].payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Subscription Overview
      </h3>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS] || "#71717a"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {subscriptions.map((sub) => {
          const color = COLORS[sub.plan as keyof typeof COLORS];
          return (
            <div
              key={sub.plan}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {sub.plan}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {sub.count}
                </span>
                <span className="ml-1 text-sm text-zinc-600 dark:text-zinc-400">
                  ({sub.percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
