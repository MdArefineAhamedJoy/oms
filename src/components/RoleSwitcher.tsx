"use client";
import { useEffect, useState } from "react";
import { ALL_ROLES, ROLE_LABELS, type Role } from "@/lib/roles";

const KEY = "oms-role";

export default function RoleSwitcher() {
  const [role, setRole] = useState<Role>("employee");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem(KEY) as Role)) || null;
    if (saved) setRole(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, role);
  }, [role]);

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as Role)}
      className="glass rounded-md px-2 py-1 text-sm"
      aria-label="Select role"
    >
      {ALL_ROLES.map((r) => (
        <option key={r} value={r}>
          {ROLE_LABELS[r]}
        </option>
      ))}
    </select>
  );
}

