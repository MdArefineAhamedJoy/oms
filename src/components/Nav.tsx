"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RoleSwitcher from "./RoleSwitcher";

type Role = "super_admin" | "operation_manager" | "employee";

function linksFor(role: Role) {
  const base = role === "super_admin" ? "/admin" : role === "operation_manager" ? "/om" : "/employee";
  const common = [{ href: "/", label: "Home" }, { href: base, label: "Dashboard" }];
  if (role === "super_admin") {
    return [
      ...common,
      { href: `${base}/users`, label: "Users" },
      { href: `${base}/roster`, label: "Roster" },
      { href: `${base}/shifts`, label: "Shifts" },
      { href: `${base}/salary`, label: "Salary" },
      { href: `${base}/attendance`, label: "Attendance" },
      { href: `${base}/leave`, label: "Leave" },
      { href: `${base}/reports`, label: "Reports" },
      { href: `${base}/settings`, label: "Settings" },
    ];
  }
  if (role === "operation_manager") {
    return [
      ...common,
      { href: `${base}/users`, label: "Users" },
      { href: `${base}/roster`, label: "Roster" },
      { href: `${base}/shifts`, label: "Shifts" },
      { href: `${base}/attendance`, label: "Attendance" },
      { href: `${base}/leave`, label: "Leave" },
      { href: `${base}/reports`, label: "Reports" },
    ];
  }
  return [
    ...common,
    { href: `${base}/attendance`, label: "Attendance" },
    { href: `${base}/leave`, label: "Leave" },
  ];
}

export default function Nav() {
  const [role, setRole] = useState<Role>("employee");
  useEffect(() => {
    const saved = (localStorage.getItem("oms-role") as Role) || "employee";
    setRole(saved);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "oms-role" && e.newValue) setRole(e.newValue as Role);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const links = linksFor(role);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="container-section flex h-14 items-center justify-between">
        <nav className="flex gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-700 hover:text-zinc-900">
              {l.label}
            </Link>
          ))}
        </nav>
        <RoleSwitcher />
      </div>
    </header>
  );
}
