"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ==== Roles Available ====
type Role = "admin" | "om" | "employee" | "officer";

// ==== Icons ====
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ListChecks,
  CalendarRange,
  FileChartColumn,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  AlertCircle,
  Clock,
  MapPin,
  AlertTriangle,
  BookOpen,
  Car,
  Phone,
  Bell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ==== Types ====
type NavItem = {
  label: string;
  href?: string; // optional for parents that only toggle children
  icon: LucideIcon;
  roles: Role[];
  children?: NavItem[];
};

// ==== All Items in Single Structure ====
const ALL_ITEMS: NavItem[] = [
  // OM
  { label: "Dashboard", href: "/om", icon: LayoutDashboard, roles: ["om"] },
  { label: "Users", href: "/om/users", icon: Users, roles: ["om"] },
  { label: "Tenants", href: "/om/tenants", icon: Building2, roles: ["om"] },
  { label: "Roster", href: "/om/roster", icon: CalendarCheck, roles: ["om"] },
  { label: "Shifts", href: "/om/shifts", icon: ListChecks, roles: ["om"] },
  { label: "Attendance", href: "/om/attendance", icon: UserCheck, roles: ["om"] },
  {
    label: "Leaves",
    icon: CalendarRange,
    roles: ["om"],
    children: [
      { label: "Leave Requests", href: "/om/leave/request", icon: CalendarRange, roles: ["om"] },
      { label: "Leave Overview", href: "/om/leave/overview", icon: CalendarRange, roles: ["om"] },
    ],
  },
  { label: "Incidents", href: "/om/incidents", icon: AlertCircle, roles: ["om"] },
  { label: "Reports", href: "/om/reports", icon: FileChartColumn, roles: ["om"] },

  // Employee/Officer
  { label: "Dashboard", href: "/employee", icon: LayoutDashboard, roles: ["employee"] },
  { label: "Attendance", href: "/employee/attendance", icon: UserCheck, roles: ["employee"] },
  { label: "Leave", href: "/employee/leave", icon: CalendarRange, roles: ["employee"] },

  // Officer
  { label: "Dashboard", href: "/officer/dashboard", icon: LayoutDashboard, roles: ["officer"] },
  { label: "Check In/Out", href: "/officer/checkin", icon: Clock, roles: ["officer"] },
  { label: "Patrol", href: "/officer/patrol", icon: MapPin, roles: ["officer"] },
  { label: "Report", href: "/officer/report", icon: AlertTriangle, roles: ["officer"] },
  { label: "Occurrence Book", href: "/officer/occurrence", icon: BookOpen, roles: ["officer"] },
  { label: "Visitors", href: "/officer/visitors", icon: Users, roles: ["officer"] },
  { label: "Vehicles", href: "/officer/vehicles", icon: Car, roles: ["officer"] },
  { label: "Emergency", href: "/officer/emergency", icon: Phone, roles: ["officer"] },
  { label: "Leave", href: "/officer/leave", icon: CalendarRange, roles: ["officer"] },
  { label: "Announcements", href: "/officer/announcement", icon: Bell, roles: ["officer"] },
];

// ==== Role Based Active Styles ====
const ACTIVE_STYLE: Record<Role, string> = {
  admin: "bg-black text-white shadow-lg",
  om: "bg-blue-600 text-white shadow-lg shadow-blue-200",
  employee: "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-200",
  officer: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-200",
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
          {items.map((item) => (
            <NavNode
              key={item.href ?? item.label}
              item={item}
              role={role}
              pathname={pathname}
              collapsed={current}
            />
          ))}
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

// ================= Helper Components =================
function NavNode({ item, role, pathname, collapsed }: { item: NavItem; role: Role; pathname: string; collapsed: boolean }) {
  const Icon = item.icon;

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const childActive = hasChildren ? item.children!.some((c) => pathname === c.href) : false;
  const isActive = (item.href ? pathname === item.href : false) || childActive;

  // Track only user-toggle intent; actual open state is derived to avoid setState in effects
  const [userOpen, setUserOpen] = useState(false);
  const open = !collapsed && (userOpen || childActive);

  if (!hasChildren) {
    return (
      <Link
        href={item.href!}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
          collapsed ? "justify-center px-2" : "px-3",
          isActive ? ACTIVE_STYLE[role] : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        <div className="flex-none w-5 h-5 flex items-center justify-center">
          <Icon size={20} className="flex-none" />
        </div>
        <span className={cn("whitespace-nowrap transition-all duration-300 overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>{item.label}</span>
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            {item.label}
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => !collapsed && setUserOpen((v) => !v)}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
          collapsed ? "justify-center px-2" : "px-3 w-full text-left",
          isActive ? ACTIVE_STYLE[role] : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        )}
        aria-expanded={!collapsed && open}
        aria-haspopup="true"
      >
        <div className="flex-none w-5 h-5 flex items-center justify-center">
          <Icon size={20} className="flex-none" />
        </div>
        <span className={cn("whitespace-nowrap transition-all duration-300 overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100 flex-1")}>{item.label}</span>
        {!collapsed && (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            {item.label}
          </div>
        )}
      </button>

      {!collapsed && open && (
        <div className="ml-9 mt-1 flex flex-col gap-1">
          {item.children!.map((child) => {
            const CIcon = child.icon;
            const cActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href!}
                className={cn(
                  "group relative flex items-center gap-2 rounded-md py-2 pl-2 pr-3 text-sm transition-colors",
                  cActive ? ACTIVE_STYLE[role] : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex-none w-4 h-4 flex items-center justify-center">
                  <CIcon size={16} className="flex-none" />
                </div>
                <span className="whitespace-nowrap">{child.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
