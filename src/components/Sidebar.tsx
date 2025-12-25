"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarItem = { href: string; label: string };

export default function Sidebar({ items, title, collapsed = false, className = "" }: { items: SidebarItem[]; title?: string; collapsed?: boolean; className?: string }) {
  const pathname = usePathname();
  return (
    <aside className={`w-56 shrink-0 ${className}`}>
      {title ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {title}
        </div>
      ) : null}
      <nav className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(`${it.href}/`);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-200/60"
              }`}
            >
              {collapsed ? <span className="truncate" title={it.label}>{it.label}</span> : it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
