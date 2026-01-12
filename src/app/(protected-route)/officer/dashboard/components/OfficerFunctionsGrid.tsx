'use client';

import {
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  Car,
  ChevronRight,
  Clock,
  Phone,
  QrCode,
  Users,
} from 'lucide-react';

import type { ComponentType } from 'react';

interface OfficerModule {
  documentId: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  iconBg: string;
  href: string;
}

const MODULES: OfficerModule[] = [
  {
    documentId: 'patrol',
    title: 'Patrol Scan',
    description: 'Scan checkpoints',
    icon: QrCode,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    iconBg: 'bg-blue-100',
    href: '/officer/patrol',
  },
  {
    documentId: 'occurrence',
    title: 'Occurrence Book',
    description: 'Shift handover',
    icon: BookOpen,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    iconBg: 'bg-orange-100',
    href: '/officer/occurrence',
  },
  {
    documentId: 'schedule',
    title: 'My Schedule',
    description: 'Upcoming shifts',
    icon: Clock,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    iconBg: 'bg-indigo-100',
    href: '/officer/checkin',
  },
  {
    documentId: 'leave',
    title: 'Apply Leave',
    description: 'Balance & requests',
    icon: Calendar,
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    iconBg: 'bg-teal-100',
    href: '/officer/leave',
  },
  {
    documentId: 'report',
    title: 'Report Incident',
    description: 'Log security events',
    icon: AlertTriangle,
    color: 'bg-slate-50 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100',
    href: '/officer/report',
  },
  {
    documentId: 'visitors',
    title: 'Visitor',
    description: 'Manage site visitors',
    icon: Users,
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    iconBg: 'bg-amber-100',
    href: '/officer/visitors',
  },
  {
    documentId: 'vehicles',
    title: 'Vehicles',
    description: 'Track vehicle access',
    icon: Car,
    color: 'bg-lime-50 text-lime-600 border-lime-200',
    iconBg: 'bg-lime-100',
    href: '/officer/vehicles',
  },
  {
    documentId: 'emergency',
    title: 'Emergency',
    description: 'Contact numbers',
    icon: Phone,
    color: 'bg-red-50 text-red-600 border-red-200',
    iconBg: 'bg-red-100',
    href: '/officer/emergency',
  },
  {
    documentId: 'announcement',
    title: 'Announcements',
    description: 'Latest updates',
    icon: Bell,
    color: 'bg-purple-50 text-purple-600 border-rose-200',
    iconBg: 'bg-rose-100',
    href: '/officer/announcement',
  },
];

interface OfficerFunctionsGridProps {
  onNavigate: (href: string) => void;
}

export function OfficerFunctionsGrid({
  onNavigate,
}: OfficerFunctionsGridProps) {
  return (
    <div className="p-2">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
        {MODULES.map((module, index) => (
          <div
            key={module.documentId}
            onClick={() => onNavigate(module.href)}
            className="cursor-pointer h-full"
          >
            <div
              className={`h-full p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 border hover:shadow-md transition-all rounded-lg ${module.color}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 w-full">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${module.iconBg}`}>
                    <module.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-0 text-sm sm:text-base truncate">
                      {module.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{module.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 mt-4 opacity-60 hidden sm:block" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
