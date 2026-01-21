'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    badge: 'bg-emerald-100 text-emerald-700',
    helper: 'All required posts are filled.',
  },
  understaffed: {
    badge: 'bg-amber-100 text-amber-700',
    helper: 'Assign additional officers as soon as possible.',
  },
  overstaffed: {
    badge: 'bg-blue-100 text-blue-700',
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
      <Badge variant="outline" className="text-xs text-muted-foreground">
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
        <Badge key={shiftCode} className={cn('text-xs bg-blue-50 text-blue-700')}>
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
            className="self-start text-blue-600 hover:text-blue-700"
            onClick={() => (window.location.href = '/om/sites')}
          >
            Manage Sites
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="text-center py-6 text-sm text-muted-foreground flex-1 flex items-center justify-center">
          No site staffing data available.
        </div>
      </Card>
    );
  }

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
          className="self-start text-blue-600 hover:text-blue-700"
          onClick={() => (window.location.href = '/om/sites')}
        >
          Manage Sites
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className=" overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-muted-foreground">
              <th className="py-3 pr-3 font-medium">Site</th>
              <th className="py-3 pr-3 font-medium">Assigned Guards</th>
              <th className="py-3 pr-3 font-medium">Coverage</th>
              <th className="py-3 pr-3 font-medium">Shifts</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {siteStaffing.map((site) => {
              const statusStyle = STATUS_STYLES[site.status] ?? STATUS_STYLES['fully-staffed'];
              const helperMessage = statusStyle.helper;
              const difference = (site.currentStaff ?? 0) - (site.requiredStaff ?? 0);
              const differenceLabel =
                difference === 0
                  ? 'On target'
                  : difference > 0
                    ? `+${difference} available`
                    : `${Math.abs(difference)} needed`;

              return (
                <tr key={site.documentId} className="border-b last:border-0">
                  <td className="py-4 pr-3 align-top">
                    <div className="space-y-0.5">
                      <p className="font-medium text-gray-900">{site.name}</p>
                      {site.siteCode && (
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          Code: {site.siteCode}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 pr-3 align-top">
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        {site.currentStaff ?? 0}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 pr-3 align-top">
                    <div className="space-y-1">
                      <Badge className={cn('text-xs', statusStyle.badge)}>
                        {formatCoverageMessage(site)}
                      </Badge>
                      <p className="text-xs text-gray-500">{helperMessage}</p>
                    </div>
                  </td>
                  <td className="py-4 pr-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      {renderShiftBadges(site)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
