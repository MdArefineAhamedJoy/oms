'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable, { Column } from '@/components/common/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  Users,
  MapPin,
} from 'lucide-react';
import type { FakeShift } from '@/lib/data/fakeShifts';

interface ShiftTableProps {
  shifts: FakeShift[];
  loading: boolean;
}

const getStatusBadge = (status: FakeShift['status']) => {
  const variants: Record<FakeShift['status'], { bg: string; text: string }> = {
    ACTIVE: { bg: 'bg-green-100', text: 'text-green-700' },
    INACTIVE: { bg: 'bg-slate-100', text: 'text-slate-700' },
    SCHEDULED: { bg: 'bg-blue-100', text: 'text-blue-700' },
  };
  const variant = variants[status];
  return (
    <div className="flex items-center gap-2">
      <div className={`h-1.5 w-1.5 rounded-full ${variant.bg.replace('100', '600')}`} />
      <span className={`text-xs font-bold ${variant.text}`}>{status}</span>
    </div>
  );
};

const getTypeBadge = (type: FakeShift['shiftType']) => {
  const variants: Record<FakeShift['shiftType'], { bg: string; text: string }> = {
    MORNING: { bg: 'bg-orange-100', text: 'text-orange-700' },
    AFTERNOON: { bg: 'bg-purple-100', text: 'text-purple-700' },
    NIGHT: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    CUSTOM: { bg: 'bg-slate-100', text: 'text-slate-700' },
  };
  const variant = variants[type];
  return (
    <Badge className={`${variant.bg} ${variant.text} border-none px-3 py-1 font-semibold text-xs rounded-md hover:${variant.bg}`}>
      {type}
    </Badge>
  );
};

const getStaffingBadge = (assigned: number, required: number) => {
  const isFull = assigned >= required;
  if (isFull) {
    return (
      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md w-fit">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        <span className="text-xs font-bold">{assigned}/{required}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-md w-fit">
      <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
      <span className="text-xs font-bold">{assigned}/{required}</span>
    </div>
  );
};

export default function ShiftTable({ shifts, loading }: ShiftTableProps) {
  if (loading) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Loading shifts...
      </div>
    );
  }

  const columns: Column<FakeShift>[] = [
    {
      key: 'shift',
      header: 'Shift',
      className: 'min-w-[220px]',
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-sm text-zinc-900">{row.shiftName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-zinc-400" />
            <span className="text-xs text-zinc-500">{row.site}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">{row.siteCode}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      className: 'min-w-[120px]',
      cell: (row) => getTypeBadge(row.shiftType),
    },
    {
      key: 'time',
      header: 'Time',
      className: 'min-w-[140px]',
      cell: (row) => (
        <div className="text-sm text-zinc-700">
          <div>{row.startTime} - {row.endTime}</div>
          <div className="text-xs text-zinc-500 mt-1">
            {row.days.join(', ')}
          </div>
        </div>
      ),
    },
    {
      key: 'staffing',
      header: 'Staffing',
      className: 'min-w-[120px]',
      cell: (row) => getStaffingBadge(row.assignedStaff, row.requiredStaff),
    },
    {
      key: 'supervisor',
      header: 'Supervisor',
      className: 'min-w-[150px]',
      cell: (row) => (
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <Users className="h-4 w-4 text-zinc-400" />
          <span>{row.supervisor}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'min-w-[120px]',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'w-[60px] text-right',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('View', row.id)} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', row.id)} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              Edit Shift
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Assign', row.id)} className="cursor-pointer">
              <Users className="h-4 w-4 mr-2" />
              Assign Staff
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log('Delete', row.id)}
              className="text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Shift
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable columns={columns} data={shifts} />;
}
