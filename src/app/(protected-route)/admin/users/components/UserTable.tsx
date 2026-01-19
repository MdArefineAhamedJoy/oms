"use client";

import { User, UserRole, UserStatus } from "@/types/admin";
import {
  User as UserIcon,
  Mail,
  Phone,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onSuspend: (userId: string) => void;
  onActivate: (userId: string) => void;
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
}: UserTableProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      case "ADMIN":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "OPERATIONS_MANAGER":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "OFFICER":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "INACTIVE":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
      case "SUSPENDED":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.documentId)));
    }
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 font-semibold">
              <input
                type="checkbox"
                checked={selectedUsers.size === users.length && users.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
            </th>
            <th className="px-4 py-3 font-semibold">User</th>
            <th className="px-4 py-3 font-semibold">Contact</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Tenant</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Last Login</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {users.map((user) => (
            <tr
              key={user.documentId}
              className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user.documentId)}
                  onChange={() => handleSelectUser(user.documentId)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {user.firstName} {user.lastName}
                    </div>
                    {user.employeeId && (
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.employeeId}
                      </div>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate text-xs">{user.strapiUser?.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{user.phone}</span>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getRoleColor(user.role)}`}
                >
                  <Shield className="h-3 w-3" />
                  {user.role.replace("_", " ")}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {user.tenant?.name || "-"}
                </div>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.userStatus)}`}
                >
                  {user.userStatus}
                </span>
              </td>

              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
              </td>

              <td className="px-4 py-3">
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === user.documentId ? null : user.documentId)}
                    className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {menuOpen === user.documentId && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMenuOpen(null)}
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                        <button
                          onClick={() => {
                            onView(user);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            onEdit(user);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        {user.userStatus === "ACTIVE" ? (
                          <button
                            onClick={() => {
                              onSuspend(user.documentId);
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
                              onActivate(user.documentId);
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
                            onDelete(user.documentId);
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

      {users.length === 0 && (
        <div className="py-12 text-center">
          <UserIcon className="mx-auto h-12 w-12 text-zinc-400" />
          <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            No users found
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your filters or add a new user
          </p>
        </div>
      )}
    </div>
  );
}
