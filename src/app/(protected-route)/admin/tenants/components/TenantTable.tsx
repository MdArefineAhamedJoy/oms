"use client";

import { Tenant, TenantStatus, SubscriptionPlan } from "@/types/admin";
import {
  Building2,
  Mail,
  Phone,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface TenantTableProps {
  tenants: Tenant[];
  onView: (tenant: Tenant) => void;
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenantId: string) => void;
  onSuspend: (tenantId: string) => void;
  onActivate: (tenantId: string) => void;
}

export default function TenantTable({
  tenants,
  onView,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
}: TenantTableProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const getStatusColor = (status: TenantStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "INACTIVE":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
      case "SUSPENDED":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
    }
  };

  const getPlanColor = (plan: SubscriptionPlan) => {
    switch (plan) {
      case "PREMIUM":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "STANDARD":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "BASIC":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 font-semibold">Tenant</th>
            <th className="px-4 py-3 font-semibold">Contact</th>
            <th className="px-4 py-3 font-semibold">Plan</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Users</th>
            <th className="px-4 py-3 font-semibold">Sites</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {tenants.map((tenant) => (
            <tr
              key={tenant.documentId}
              className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {tenant.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {tenant.tenantCode}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{tenant.phone}</span>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPlanColor(tenant.subscriptionPlan)}`}
                >
                  {tenant.subscriptionPlan}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(tenant.tenantStatus)}`}
                >
                  {tenant.tenantStatus}
                </span>
              </td>

              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                {tenant._count?.users || 0}
              </td>

              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                {tenant._count?.sites || 0}
              </td>

              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                {new Date(tenant.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === tenant.documentId ? null : tenant.documentId)}
                    className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {menuOpen === tenant.documentId && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMenuOpen(null)}
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                        <button
                          onClick={() => {
                            onView(tenant);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            onEdit(tenant);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        {tenant.tenantStatus === "ACTIVE" ? (
                          <button
                            onClick={() => {
                              onSuspend(tenant.documentId);
                              setMenuOpen(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950"
                          >
                            <Ban className="h-4 w-4" />
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onActivate(tenant.documentId);
                              setMenuOpen(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Activate
                          </button>
                        )}
                        <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
                        <button
                          onClick={() => {
                            onDelete(tenant.documentId);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tenants.length === 0 && (
        <div className="py-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-zinc-400" />
          <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            No tenants found
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your filters or add a new tenant
          </p>
        </div>
      )}
    </div>
  );
}
