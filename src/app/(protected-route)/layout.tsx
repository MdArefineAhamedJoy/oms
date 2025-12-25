"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

const KEY = "oms-role";

type Role = "super_admin" | "operation_manager" | "employee";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<Role>("employee");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem(KEY) as Role) || "employee";
    setRole(saved);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) setRole(e.newValue as Role);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const allowed = useMemo(() => {
    const map: Record<Role, string[]> = {
      super_admin: [
        "/admin",
        "/admin/users",
        "/admin/roster",
        "/admin/shifts",
        "/admin/salary",
        "/admin/attendance",
        "/admin/leave",
        "/admin/reports",
        "/admin/settings",
      ],
      operation_manager: [
        "/om",
        "/om/users",
        "/om/roster",
        "/om/shifts",
        "/om/attendance",
        "/om/leave",
        "/om/reports",
      ],
      employee: [
        "/employee",
        "/employee/attendance",
        "/employee/leave",
      ],
    };
    return map[role];
  }, [role]);

  // Temporarily allow access to all routes without login/role restrictions
  const isAllowed = true;

  const hideHeader = useMemo(
    () =>
      pathname.startsWith("/admin") ||
      pathname.startsWith("/om") ||
      pathname.startsWith("/employee"),
    [pathname]
  );

  return (
    <div>
      {!hideHeader && <Nav />}
      <main className="container-section py-6">
        {isAllowed ? (
          children
        ) : (
          <div className="glass rounded-lg p-6">
            <div className="text-lg font-semibold">403 • Not authorized</div>
            <p className="mt-2 text-sm text-zinc-600 text-zinc-600">
              You don’t have access to this page with the current role. Use the role selector in the top right to switch roles.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

