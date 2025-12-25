import Card from "@/components/Card";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Today Shift" description="09:00 - 17:00" />
      <Card title="Status" description="Checked-in 09:03" />
      <Card title="Worked Hours" description="142h (month)" />
      <Card title="Notifications">
        <ul className="list-disc pl-5 text-sm text-zinc-600 text-zinc-600">
          <li>Leave approved</li>
          <li>Payslip available</li>
        </ul>
      </Card>
    </div>
  );
}


