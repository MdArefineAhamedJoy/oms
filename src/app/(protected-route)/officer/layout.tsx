"use client";
import Sidebar from "@/components/common/Sidebar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  Shield,
  Bell,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pathname, setCurrentPath] = useState('/officer/dashboard');

  // Get current path
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Sync with Sidebar toggle events as a fallback
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ collapsed: boolean }>).detail;
      if (typeof detail?.collapsed === "boolean") setCollapsed(!!detail.collapsed);
    };
    window.addEventListener("sidebar:toggle", handler as EventListener);
    return () => window.removeEventListener("sidebar:toggle", handler as EventListener);
  }, []);

  const getPageTitle = () => {
    if (pathname === '/officer/dashboard') return 'Officer Portal';
    if (pathname === '/officer/checkin') return 'Check In/Out';
    if (pathname === '/officer/patrol') return 'Patrol';
    if (pathname === '/officer/report') return 'Report Incident';
    if (pathname === '/officer/visitors') return 'Visitors';
    if (pathname === '/officer/vehicles') return 'Vehicles';
    if (pathname === '/officer/occurrence') return 'Occurrence Book';
    if (pathname === '/officer/emergency') return 'Emergency';
    if (pathname === '/officer/leave') return 'Apply for Leave';
    if (pathname === '/officer/more') return 'More Options';
    if (pathname === '/officer/announcement') return 'Announcements';
    return 'Officer Portal';
  };

  const handleSignOut = () => {
    router.push('/login');
  };

  const handleGoToMore = () => {
    router.push('/officer/more');
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          role="officer"
          title="Officer Portal"
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-40 shadow-md">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden glass px-2 py-1 rounded-md"
                  onClick={() => setOpen(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <Shield className="h-7 w-7" />
                <div>
                  <h1 className="font-semibold text-xl">{getPageTitle()}</h1>
                  <p className="text-xs text-blue-100 hidden sm:block">
                    Security Operations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Open profile menu"
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden',
                        'bg-white/20 hover:bg-white/30',
                      )}
                    >
                      <User className="h-5 w-5 text-white" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(event) => {
                        event.preventDefault();
                        handleGoToMore();
                      }}
                    >
                      More
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onSelect={(event) => {
                        event.preventDefault();
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            {children}
          </main>
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
              role="officer"
              title="Officer Portal"
              collapsed={false}
              onCollapse={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
