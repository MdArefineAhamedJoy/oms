/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

const KEY = "oms-role";

type Role = "super_admin" | "operation_manager" | "employee";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      const saved = (localStorage.getItem(KEY) as Role) || "employee";
      return saved;
    }
    return "employee";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) setRole(e.newValue as Role);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);


  // Temporarily allow access to all routes without login/role restrictions
  const isAllowed = true;

  const hideHeader = useMemo(
    () =>
      pathname.startsWith("/admin") ||
      pathname.startsWith("/om") ||
      pathname.startsWith("/employee") ||
      pathname.startsWith("/officer"),
    [pathname]
  );

  return (
    <div>
      {!hideHeader && <Nav />}
      <main className="container-section">
        {isAllowed ? (
          children
        ) : (
          <div className="glass rounded-lg p-6">
            <div className="text-lg font-semibold">403 • Not authorized</div>
            <p className="mt-2 text-sm text-zinc-600 ">
              You don’t have access to this page with the current role. Use the role selector in the top right to switch roles.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

