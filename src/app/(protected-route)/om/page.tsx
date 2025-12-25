import Card from "@/components/Card";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Team Size" description="64" />
      <Card title="Late Today" description="7" />
      <Card title="Pending Approvals" description="12" />
      <Card title="Roster Snapshot">
        <div className="h-24 rounded-md bg-zinc-200/50 bg-zinc-200/50" />
      </Card>
    </div>
  );
}


