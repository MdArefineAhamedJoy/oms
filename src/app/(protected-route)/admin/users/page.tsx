"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";
import UserStats from "./components/UserStats";
import UserDialog from "./components/UserDialog";
import mockAdminService, { mockTenants } from "@/services/adminMockService";
import { User, UserFilters as UserFiltersType, Pagination } from "@/types/admin";

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<UserFiltersType>({
    page: 1,
    pageSize: 10,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await mockAdminService.getUsers(filters);
      if (response.success) {
        setUsers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      const response = await mockAdminService.createUser(userData);
      if (response.success) {
        setDialogOpen(false);
        loadUsers();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;
    try {
      const response = await mockAdminService.updateUser(selectedUser.documentId, userData);
      if (response.success) {
        setDialogOpen(false);
        setSelectedUser(undefined);
        loadUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await mockAdminService.deleteUser(userId);
      if (response.success) {
        loadUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await mockAdminService.suspendUser(userId);
      if (response.success) {
        loadUsers();
      }
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      const response = await mockAdminService.activateUser(userId);
      if (response.success) {
        loadUsers();
      }
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleViewUser = (user: User) => {
    console.log("View user:", user);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const stats = {
    totalUsers: pagination.total,
    activeUsers: users.filter((u) => u.userStatus === "ACTIVE").length,
    admins: users.filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length,
    officers: users.filter((u) => u.role === "OFFICER").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Users
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage platform users
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedUser(undefined);
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <UserStats
        totalUsers={stats.totalUsers}
        activeUsers={stats.activeUsers}
        admins={stats.admins}
        officers={stats.officers}
      />

      <UserFilters
        filters={filters}
        onFiltersChange={setFilters}
        tenants={mockTenants}
      />

      <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent dark:border-indigo-400"></div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading users...</p>
            </div>
          </div>
        ) : (
          <UserTable
            users={users}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onSuspend={handleSuspendUser}
            onActivate={handleActivateUser}
          />
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} users
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

      <UserDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedUser(undefined);
        }}
        onSave={selectedUser ? handleUpdateUser : handleCreateUser}
        user={selectedUser}
        tenants={mockTenants}
      />
    </div>
  );
}
