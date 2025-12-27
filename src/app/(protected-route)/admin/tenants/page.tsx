export default function TenantsPage() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Tenants</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage tenant organizations and settings.</p>
      <div className="mt-4 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="text-zinc-500">No tenants yet. Add or import to get started.</div>
      </div>
    </div>
  );
}

