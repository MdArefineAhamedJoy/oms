export type Role = "super_admin" | "operation_manager" | "employee";

export const ALL_ROLES: Role[] = [
  "super_admin",
  "operation_manager",
  "employee",
];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  operation_manager: "Operation Manager",
  employee: "Employee",
};

