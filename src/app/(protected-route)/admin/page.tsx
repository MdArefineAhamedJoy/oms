import Card from "@/components/Card";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Total Employees" description="1,240" />
      <Card title="Present Today" description="1,102" />
      <Card title="On Leave" description="58" />
      <Card title="Attendance Trend">
        <div className="h-24 rounded-md bg-zinc-200/50 dark:bg-zinc-800" />
      </Card>
    </div>
  );
}

