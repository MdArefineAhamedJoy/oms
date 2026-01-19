"use client";

import { Search, Filter } from "lucide-react";
import { TenantFilters as TenantFiltersType, TenantStatus, SubscriptionPlan } from "@/types/admin";

interface TenantFiltersProps {
  filters: TenantFiltersType;
  onFiltersChange: (filters: TenantFiltersType) => void;
}

export default function TenantFilters({ filters, onFiltersChange }: TenantFiltersProps) {
  const statuses: Array<{ value: TenantStatus; label: string }> = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "SUSPENDED", label: "Suspended" },
  ];

  const plans: Array<{ value: SubscriptionPlan; label: string }> = [
    { value: "BASIC", label: "Basic" },
    { value: "STANDARD", label: "Standard" },
    { value: "PREMIUM", label: "Premium" },
  ];

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search, page: 1 });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status === "all" ? undefined : (status as TenantStatus),
      page: 1,
    });
  };

  const handlePlanChange = (plan: string) => {
    onFiltersChange({
      ...filters,
      plan: plan === "all" ? undefined : (plan as SubscriptionPlan),
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search tenants..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="h-10 w-full rounded-md border border-zinc-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <select
            value={filters.status || "all"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <select
          value={filters.plan || "all"}
          onChange={(e) => handlePlanChange(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="all">All Plans</option>
          {plans.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
