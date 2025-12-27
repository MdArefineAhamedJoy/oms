"use client";
import Sidebar from "@/components/common/Sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function OmLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse state

  // In case Sidebar dispatches events, keep in sync
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ collapsed: boolean }>).detail;
      if (typeof detail?.collapsed === "boolean") setCollapsed(!!detail.collapsed);
    };
    window.addEventListener("sidebar:toggle", handler as EventListener);
    return () => window.removeEventListener("sidebar:toggle", handler as EventListener);
  }, []);

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          role="om" 
          title="Operation Manager" 
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />
      </div>
      <div 
        className={cn(
          "min-h-screen overflow-x-hidden transition-all duration-300 ease-in-out flex-1"
        )}
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          <button 
            className="glass px-3 py-2 rounded-md text-sm" 
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>

        {/* Page Content with padding */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-50 md:hidden" 
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar 
              role="om" 
              title="Operation Manager"
              collapsed={false}
              onCollapse={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
