type Props = {
  label: string;
  value: string | number;
  trend?: string;
  icon?: "users" | "check" | "clock" | "dollar";
  accent?: "indigo" | "emerald" | "amber" | "cyan" | "rose";
};

export default function KpiCard({ label, value, trend, icon = "users", accent = "indigo" }: Props) {
  const color = {
    indigo: "from-indigo-500/20 text-indigo-600",
    emerald: "from-emerald-500/20 text-emerald-600",
    amber: "from-amber-500/20 text-amber-600",
    cyan: "from-cyan-500/20 text-cyan-600",
    rose: "from-rose-500/20 text-rose-600",
  }[accent];

  const Icon = () => {
    switch (icon) {
      case "check":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        );
      case "clock":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        );
      case "dollar":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        );
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${color} blur-xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-sm text-zinc-500">{label}</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
          {trend ? (
            <div className="mt-1 text-xs text-zinc-500">{trend}</div>
          ) : null}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <Icon />
        </div>
      </div>
    </div>
  );
}

