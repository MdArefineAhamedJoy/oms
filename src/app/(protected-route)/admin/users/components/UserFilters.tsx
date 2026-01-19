"use client";

import { Search, Filter } from "lucide-react";
import { UserFilters as UserFiltersType, UserRole, UserStatus } from "@/types/admin";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  tenants: Array<{ documentId: string; name: string; tenantCode: string }>;
}

export default function UserFilters({ filters, onFiltersChange, tenants }: UserFiltersProps) {
  const roles: Array<{ value: UserRole; label: string }> = [
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "ADMIN", label: "Admin" },
    { value: "OPERATIONS_MANAGER", label: "Operations Manager" },
    { value: "OFFICER", label: "Officer" },
  ];

  const statuses: Array<{ value: UserStatus; label: string }> = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "SUSPENDED", label: "Suspended" },
  ];

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search, page: 1 });
  };

  const handleRoleChange = (role: string) => {
    onFiltersChange({
      ...filters,
      role: role === "all" ? undefined : (role as UserRole),
      page: 1,
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status === "all" ? undefined : (status as UserStatus),
      page: 1,
    });
  };

  const handleTenantChange = (tenant: string) => {
    onFiltersChange({
      ...filters,
      tenant: tenant === "all" ? undefined : tenant,
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="h-10 w-full rounded-md border border-zinc-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <select
            value={filters.role || "all"}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

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

        <select
          value={filters.tenant || "all"}
          onChange={(e) => handleTenantChange(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="all">All Tenants</option>
          {tenants.map((tenant) => (
            <option key={tenant.documentId} value={tenant.documentId}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
