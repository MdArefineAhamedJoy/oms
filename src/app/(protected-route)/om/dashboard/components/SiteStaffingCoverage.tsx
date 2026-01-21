'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DataTable, { Column } from '@/components/common/DataTable';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SiteStaffing {
  documentId: string;
  name: string;
  siteCode?: string;
  requiredStaff: number;
  currentStaff: number;
  shortage: number;
  status: 'fully-staffed' | 'understaffed' | 'overstaffed';
  shifts: {
    [key: string]: {
      required: number;
      assigned: number;
      status: 'filled' | 'partial' | 'unfilled';
    };
  };
}

interface SiteStaffingCoverageProps {
  siteStaffing: SiteStaffing[];
  loading?: boolean;
}

const STATUS_STYLES: Record<
  SiteStaffing['status'],
  { badge: string; helper: string }
> = {
  'fully-staffed': {
    badge: 'bg-emerald-100 text-emerald-700 border-none px-3 py-1 font-semibold text-xs rounded-md',
    helper: 'All required posts are filled.',
  },
  understaffed: {
    badge: 'bg-amber-100 text-amber-700 border-none px-3 py-1 font-semibold text-xs rounded-md',
    helper: 'Assign additional officers as soon as possible.',
  },
  overstaffed: {
    badge: 'bg-blue-100 text-blue-700 border-none px-3 py-1 font-semibold text-xs rounded-md',
    helper: 'Consider redeploying surplus officers.',
  },
};

function formatCoverageMessage(site: SiteStaffing) {
  if (site.status === 'fully-staffed') {
    return 'Fully staffed';
  }

  const delta = Math.abs(site.shortage || 0);
  if (site.status === 'understaffed') {
    return delta === 1 ? '1 officer short' : `${delta} officers short`;
  }

  return delta === 1 ? '1 officer extra' : `${delta} officers extra`;
}

function renderShiftBadges(site: SiteStaffing) {
  if (!site.shifts || Object.keys(site.shifts).length === 0) {
    return (
      <Badge variant="outline" className="text-xs text-zinc-500">
        No shifts scheduled
      </Badge>
    );
  }

  return Object.entries(site.shifts)
    .filter(([, s]) => (s.assigned ?? 0) > 0)
    .map(([shiftCode, shift]) => {
      const code = String(shiftCode).toUpperCase();
      const label = code;
      const assigned = shift.assigned ?? 0;
      return (
        <Badge key={shiftCode} className={cn('text-xs bg-blue-50 text-blue-700 border-none')}>
          {label}: {assigned}
        </Badge>
      );
    });
}

export default function SiteStaffingCoverage({
  siteStaffing,
  loading,
}: SiteStaffingCoverageProps) {
  if (loading) {
    return (
      <Card className="bg-white p-4 h-full flex flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Site Staffing & Shift Coverage
            </h2>
            <p className="text-sm text-gray-600">
              Quick view of today's staffing levels across active sites.
            </p>
          </div>
        </div>

        <div className="">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 h-4 bg-gray-100 rounded"></div>
                  <div className="col-span-2 h-4 bg-gray-100 rounded"></div>
                  <div className="col-span-2 h-4 bg-gray-100 rounded"></div>
                  <div className="col-span-4 h-4 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!siteStaffing || siteStaffing.length === 0) {
    return (
      <Card className="bg-white p-4 h-full flex flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Site Staffing & Shift Coverage
            </h2>
            <p className="text-sm text-gray-600">
              Quick view of today's staffing levels across active sites.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="self-start text-blue-600 hover:text-blue-700 cursor-pointer"
            onClick={() => (window.location.href = '/om/sites')}
          >
            Manage Sites
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="text-center py-6 text-sm text-zinc-500 flex-1 flex items-center justify-center">
          No site staffing data available.
        </div>
      </Card>
    );
  }

  const columns: Column<SiteStaffing>[] = [
    {
      key: 'site',
      header: 'Site',
      className: 'min-w-[200px]',
      cell: (row) => (
        <div className="space-y-0.5">
          <p className="font-medium text-zinc-900">{row.name}</p>
          {row.siteCode && (
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Code: {row.siteCode}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'guards',
      header: 'Assigned Guards',
      className: 'min-w-[120px]',
      cell: (row) => (
        <p className="text-base font-semibold text-zinc-900">{row.currentStaff ?? 0}</p>
      ),
    },
    {
      key: 'coverage',
      header: 'Coverage',
      className: 'min-w-[180px]',
      cell: (row) => {
        const statusStyle = STATUS_STYLES[row.status] ?? STATUS_STYLES['fully-staffed'];
        return (
          <div className="space-y-1">
            <Badge className={statusStyle.badge}>{formatCoverageMessage(row)}</Badge>
            <p className="text-xs text-zinc-500">{statusStyle.helper}</p>
          </div>
        );
      },
    },
    {
      key: 'shifts',
      header: 'Shifts',
      className: 'min-w-[200px]',
      cell: (row) => <div className="flex flex-wrap gap-2">{renderShiftBadges(row)}</div>,
    },
  ];

  return (
    <Card className="bg-white p-4 h-full flex flex-col">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Site Staffing & Shift Coverage
          </h2>
          <p className="text-sm text-gray-600">
            Quick view of today&apos;s staffing levels across active sites.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="self-start text-blue-600 hover:text-blue-700 cursor-pointer"
          onClick={() => (window.location.href = '/om/sites')}
        >
          Manage Sites
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} data={siteStaffing} />
      </div>
    </Card>
  );
}
