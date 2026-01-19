"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TenantFilters from "./components/TenantFilters";
import TenantTable from "./components/TenantTable";
import TenantStats from "./components/TenantStats";
import TenantDialog from "./components/TenantDialog";
import mockAdminService from "@/services/adminMockService";
import { Tenant, TenantFilters as TenantFiltersType, Pagination } from "@/types/admin";

export default function TenantsPage() {
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<TenantFiltersType>({
    page: 1,
    pageSize: 10,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | undefined>();

  useEffect(() => {
    loadTenants();
  }, [filters]);

  const loadTenants = async () => {
    setLoading(true);
    try {
      const response = await mockAdminService.getTenants(filters);
      if (response.success) {
        setTenants(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error loading tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async (tenantData: Partial<Tenant>) => {
    try {
      const response = await mockAdminService.createTenant(tenantData);
      if (response.success) {
        setDialogOpen(false);
        loadTenants();
      }
    } catch (error) {
      console.error("Error creating tenant:", error);
    }
  };

  const handleUpdateTenant = async (tenantData: Partial<Tenant>) => {
    if (!selectedTenant) return;
    try {
      const response = await mockAdminService.updateTenant(selectedTenant.documentId, tenantData);
      if (response.success) {
        setDialogOpen(false);
        setSelectedTenant(undefined);
        loadTenants();
      }
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  const handleDeleteTenant = async (tenantId: string) => {
    if (!confirm("Are you sure you want to delete this tenant?")) return;
    try {
      const response = await mockAdminService.deleteTenant(tenantId);
      if (response.success) {
        loadTenants();
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  const handleSuspendTenant = async (tenantId: string) => {
    try {
      const response = await mockAdminService.suspendTenant(tenantId);
      if (response.success) {
        loadTenants();
      }
    } catch (error) {
      console.error("Error suspending tenant:", error);
    }
  };

  const handleActivateTenant = async (tenantId: string) => {
    try {
      const response = await mockAdminService.activateTenant(tenantId);
      if (response.success) {
        loadTenants();
      }
    } catch (error) {
      console.error("Error activating tenant:", error);
    }
  };

  const handleViewTenant = (tenant: Tenant) => {
    console.log("View tenant:", tenant);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setDialogOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const stats = {
    totalTenants: pagination.total,
    activeTenants: tenants.filter((t) => t.tenantStatus === "ACTIVE").length,
    totalUsers: tenants.reduce((sum, t) => sum + (t._count?.users || 0), 0),
    totalSites: tenants.reduce((sum, t) => sum + (t._count?.sites || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Tenants
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage your platform tenants
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTenant(undefined);
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Tenant
        </button>
      </div>

      {/* Stats */}
      <TenantStats
        totalTenants={stats.totalTenants}
        activeTenants={stats.activeTenants}
        totalUsers={stats.totalUsers}
        totalSites={stats.totalSites}
      />

      {/* Filters */}
      <TenantFilters filters={filters} onFiltersChange={setFilters} />

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent dark:border-indigo-400"></div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading tenants...</p>
            </div>
          </div>
        ) : (
          <TenantTable
            tenants={tenants}
            onView={handleViewTenant}
            onEdit={handleEditTenant}
            onDelete={handleDeleteTenant}
            onSuspend={handleSuspendTenant}
            onActivate={handleActivateTenant}
          />
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} tenants
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      pagination.page === pageNum
                        ? "bg-indigo-600 text-white"
                        : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Dialog */}
      <TenantDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTenant(undefined);
        }}
        onSave={selectedTenant ? handleUpdateTenant : handleCreateTenant}
        tenant={selectedTenant}
      />
    </div>
  );
}
