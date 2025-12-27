type Props = {
  status: "Present" | "Absent" | "Late" | "Pending" | "Approved" | "Rejected";
};

export default function StatusBadge({ status }: Props) {
  const tone = {
    Present: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    Absent: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    Late: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  }[status];

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${tone}`}>
      {status}
    </span>
  );
}

