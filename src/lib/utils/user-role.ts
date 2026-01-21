import { ROLE_LABELS, type Role } from '@/lib/roles';

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  OM: 'operation_manager',
  OFFICER: 'employee',
} as const;

export type UserRole = Role;

export function normalizeUserRole(role: string | undefined): UserRole {
  if (!role) return USER_ROLES.OFFICER;
  const normalized = role.toLowerCase();
  if (normalized.includes('super') || normalized.includes('admin')) {
    return USER_ROLES.SUPER_ADMIN;
  }
  if (normalized.includes('om') || normalized.includes('operation') || normalized.includes('manager')) {
    return USER_ROLES.OM;
  }
  return USER_ROLES.OFFICER;
}

export function formatUserRole(role: string | undefined): string {
  const normalized = normalizeUserRole(role);
  return ROLE_LABELS[normalized] || 'Officer';
}
