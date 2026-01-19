import { Building, Mail, Phone, Calendar } from "lucide-react";
import { Tenant } from "@/types/admin";
import { useRouter } from "next/navigation";

interface RecentTenantsCardProps {
  tenants: Tenant[];
}

export default function RecentTenantsCard({ tenants }: RecentTenantsCardProps) {
  const router = useRouter();

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "PREMIUM":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "STANDARD":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "BASIC":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "INACTIVE":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
      case "SUSPENDED":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Tenants
        </h3>
        <button
          onClick={() => router.push("/admin/tenants")}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {tenants.slice(0, 5).map((tenant) => (
          <div
            key={tenant.documentId}
            className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-900/50"
          >
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <Building className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {tenant.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {tenant.tenantCode}
                  </p>
                </div>

                <div className="flex flex-shrink-0 gap-1">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPlanBadgeColor(tenant.subscriptionPlan)}`}
                  >
                    {tenant.subscriptionPlan}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeColor(tenant.tenantStatus)}`}
                  >
                    {tenant.tenantStatus}
                  </span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span>
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Users:</span>
                  <span>{tenant._count?.users || 0}</span>
                  <span className="mx-1">·</span>
                  <span className="font-medium">Sites:</span>
                  <span>{tenant._count?.sites || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
