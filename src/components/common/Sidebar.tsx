"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ==== Roles Available ====
type Role = "admin" | "om" | "employee";

// ==== Icons ====
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ListChecks,
  Wallet,
  CalendarRange,
  FileChartColumn,
  Settings,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

// ==== All Items in Single Structure ====
const ALL_ITEMS = [
  // ───────── Admin ─────────
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["admin"] },
  { label: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
  { label: "Tenant", href: "/admin/tenants", icon: Building2, roles: ["admin"] },
  { label: "Analytics", href: "/admin/analytics", icon: FileChartColumn, roles: ["admin"] },
  { label: "Salary", href: "/admin/salary", icon: Wallet, roles: ["admin"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["admin"] },

  // ───────── OM ─────────
  { label: "Dashboard", href: "/om", icon: LayoutDashboard, roles: ["om"] },
  { label: "Users", href: "/om/users", icon: Users, roles: ["om"] },
  { label: "Roster", href: "/om/roster", icon: CalendarCheck, roles: ["om"] },
  { label: "Shifts", href: "/om/shifts", icon: ListChecks, roles: ["om"] },
  { label: "Attendance", href: "/om/attendance", icon: UserCheck, roles: ["om"] },
  { label: "Leave", href: "/om/leave", icon: CalendarRange, roles: ["om"] },
  { label: "Reports", href: "/om/reports", icon: FileChartColumn, roles: ["om"] },

  // ───────── Employee/Officer ─────────
  { label: "Dashboard", href: "/employee", icon: LayoutDashboard, roles: ["employee"] },
  { label: "Attendance", href: "/employee/attendance", icon: UserCheck, roles: ["employee"] },
  { label: "Leave", href: "/employee/leave", icon: CalendarRange, roles: ["employee"] },
];

// ==== Role Based Active Styles ====
const ACTIVE_STYLE: Record<Role, string> = {
  admin: "bg-black text-white shadow-lg",
  om: "bg-blue-600 text-white shadow-lg shadow-blue-200",
  employee: "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-200",
};

// ========================================================

interface SidebarProps {
  role: Role;
  title?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ role, title = "", collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const items = ALL_ITEMS.filter((item) => item.roles.includes(role));
  const [collapsedState, setCollapsedState] = useState(false);
  const current = typeof collapsed === "boolean" ? collapsed : collapsedState;
  const setCurrent = (val: boolean) => {
    if (typeof onCollapse === "function") onCollapse(val);
    else setCollapsedState(val);
  };

  // Broadcast collapse changes for any listeners
  useEffect(() => {
    try {
      const ev = new CustomEvent("sidebar:toggle", { detail: { collapsed: current } });
      window.dispatchEvent(ev);
    } catch {}
  }, [current]);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen flex flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out z-40",
        current ? "w-16" : "w-64"
      )}
    >
      {/* Header Section (Fixed - No Scroll) */}
      <div className="flex-none border-b bg-white">
        <div className={cn(
          "flex items-center h-16 px-4 transition-all duration-300",
          current ? "justify-center px-2" : "justify-between"
        )}>
          {/* Title with smooth fade */}
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            current ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <h2 className="text-lg font-semibold whitespace-nowrap">{title}</h2>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setCurrent(!current)}
            className={cn(
              "flex items-center justify-center rounded-lg border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:border-gray-300",
              current ? "h-10 w-10" : "h-8 w-8"
            )}
            aria-label={current ? "Expand sidebar" : "Collapse sidebar"}
          >
            {current ? (
              <ChevronRight size={18} className="text-gray-600" />
            ) : (
              <ChevronLeft size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Scrollable Menu Section */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 custom-scrollbar">
        <div className="flex flex-col gap-1.5">
          {items.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
                  current ? "justify-center px-2" : "px-3",
                  isActive 
                    ? ACTIVE_STYLE[role]
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {/* Icon with fixed size container */}
                <div className="flex-none w-5 h-5 flex items-center justify-center">
                  <Icon size={20} className="flex-none" />
                </div>

                {/* Label with smooth fade */}
                <span className={cn(
                  "whitespace-nowrap transition-all duration-300 overflow-hidden",
                  current ? "w-0 opacity-0" : "w-auto opacity-100"
                )}>
                  {label}
                </span>

                {/* Tooltip for collapsed state */}
                {current && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Scrollbar Styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </aside>
  );
}
