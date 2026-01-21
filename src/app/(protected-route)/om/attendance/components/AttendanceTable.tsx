'use client';

import { Badge } from '@/components/ui/badge';
import DataTable, { Column } from '@/components/common/DataTable';
import { MapPin, Clock } from 'lucide-react';
import type { FakeAttendance } from '@/lib/data/fakeAttendance';

interface AttendanceTableProps {
  attendance: FakeAttendance[];
  loading: boolean;
}

const getStatusBadge = (status: FakeAttendance['status']) => {
  const variants: Record<FakeAttendance['status'], { bg: string; text: string; label: string }> = {
    PRESENT: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Present' },
    LATE: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Late' },
    ABSENT: { bg: 'bg-red-100', text: 'text-red-700', label: 'Absent' },
    EARLY_DEPARTURE: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Early Departure' },
  };
  const variant = variants[status];
  return (
    <Badge className={`${variant.bg} ${variant.text} border-none px-3 py-1 font-semibold text-xs rounded-md hover:${variant.bg}`}>
      {variant.label}
    </Badge>
  );
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default function AttendanceTable({ attendance, loading }: AttendanceTableProps) {
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading attendance records...
      </div>
    );
  }

  const columns: Column<FakeAttendance>[] = [
    {
      key: 'employee',
      header: 'Employee',
      className: 'min-w-[200px]',
      cell: (row) => (
        <div>
          <p className="font-medium text-zinc-900">{row.employeeName}</p>
          <p className="text-xs text-zinc-500">{row.employeeId}</p>
        </div>
      ),
    },
    {
      key: 'site',
      header: 'Site',
      className: 'min-w-[180px]',
      cell: (row) => (
        <div>
          <p className="font-medium text-zinc-900">{row.site}</p>
          <p className="text-xs text-zinc-500">{row.siteCode}</p>
        </div>
      ),
    },
    {
      key: 'shift',
      header: 'Shift',
      className: 'min-w-[100px]',
      cell: (row) => <span className="text-sm text-zinc-700">{row.shift}</span>,
    },
    {
      key: 'checkIn',
      header: 'Check In',
      className: 'min-w-[120px]',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-sm text-zinc-700">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />
          {formatTime(row.checkInTime)}
        </div>
      ),
    },
    {
      key: 'checkOut',
      header: 'Check Out',
      className: 'min-w-[120px]',
      cell: (row) =>
        row.checkOutTime ? (
          <div className="flex items-center gap-1.5 text-sm text-zinc-700">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            {formatTime(row.checkOutTime)}
          </div>
        ) : (
          <span className="text-sm text-zinc-400">Active</span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'min-w-[140px]',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      key: 'location',
      header: 'Location',
      className: 'min-w-[200px]',
      cell: (row) =>
        row.location ? (
          <div className="flex items-center gap-1.5 text-sm text-zinc-700">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            <span className="line-clamp-1">{row.location}</span>
          </div>
        ) : (
          <span className="text-sm text-zinc-400">-</span>
        ),
    },
  ];

  return <DataTable columns={columns} data={attendance} />;
}
