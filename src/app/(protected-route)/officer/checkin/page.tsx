'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Fake data
const monthlyStats = {
  total: 22,
  completed: 20,
  late: 2,
  onTimeRate: 91,
};

const currentShift = {
  documentId: 'shift-001',
  shiftStatus: 'ONGOING',
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  checkInTime: new Date().toISOString(),
  checkOutTime: null,
  date: new Date().toISOString(),
  shiftType: 'Morning',
};

const upcomingShifts = [
  {
    documentId: 'shift-002',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '06:00',
    endTime: '14:00',
    shiftType: 'Morning',
    shiftStatus: 'SCHEDULED',
    location: 'Main Building',
  },
  {
    documentId: 'shift-003',
    date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '22:00',
    shiftType: 'Afternoon',
    shiftStatus: 'SCHEDULED',
    location: 'North Gate',
  },
];

const monthlyHistory = [
  {
    documentId: 'shift-hist-001',
    date: '2025-01-10',
    startTime: '06:00',
    endTime: '14:00',
    shiftType: 'Morning',
    shiftStatus: 'COMPLETED',
    checkInTime: '2025-01-10T06:02:00',
    checkOutTime: '2025-01-10T14:00:00',
    location: 'Main Building',
  },
  {
    documentId: 'shift-hist-002',
    date: '2025-01-09',
    startTime: '14:00',
    endTime: '22:00',
    shiftType: 'Afternoon',
    shiftStatus: 'COMPLETED',
    checkInTime: '2025-01-09T14:05:00',
    checkOutTime: '2025-01-09T22:00:00',
    location: 'North Gate',
  },
  {
    documentId: 'shift-hist-003',
    date: '2025-01-08',
    startTime: '06:00',
    endTime: '14:00',
    shiftType: 'Morning',
    shiftStatus: 'COMPLETED',
    checkInTime: '2025-01-08T05:55:00',
    checkOutTime: '2025-01-08T14:00:00',
    location: 'Main Building',
  },
];

const STATUS_BADGE_STYLES = {
  ONGOING: 'bg-green-100 text-green-700 border-green-200',
  COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200',
  SCHEDULED: 'bg-gray-100 text-gray-700 border-gray-200',
  MISSED: 'bg-red-100 text-red-700 border-red-200',
  CANCELLED: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function OfficerSchedulePage() {
  const monthlyLabel = format(new Date(), 'MMMM yyyy');

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2">
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">My Schedule</h1>
          {currentShift ? (
            <Badge className="w-fit bg-slate-900 px-3 py-1 text-sm text-white">Current shift</Badge>
          ) : null}
        </div>
        <div className="flex min-w-0 items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="View previous month"
            className="h-11 w-11 rounded-full border-slate-200 text-slate-700 shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-base font-semibold text-slate-900">{monthlyLabel}</span>
          <Button
            variant="outline"
            size="icon"
            aria-label="View next month"
            className="h-11 w-11 rounded-full border-slate-200 text-slate-700 shadow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Monthly snapshot
            </h2>
            <span className="text-xs text-muted-foreground">
              On time rate{' '}
              <span className="font-semibold text-slate-900">{monthlyStats.onTimeRate}%</span>
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="rounded-lg border px-2 py-1.5">
              <p className="text-xs text-muted-foreground leading-none">Shifts</p>
              <p className="mt-0.5 text-base font-semibold text-slate-900">
                {monthlyStats.total}
              </p>
            </div>
            <div className="rounded-lg border px-2 py-1.5">
              <p className="text-xs text-muted-foreground leading-none">Completed</p>
              <p className="mt-0.5 text-base font-semibold text-emerald-600">
                {monthlyStats.completed}
              </p>
            </div>
            <div className="rounded-lg border px-2 py-1.5">
              <p className="text-xs text-muted-foreground leading-none">Late</p>
              <p className="mt-0.5 text-base font-semibold text-rose-600">
                {monthlyStats.late}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Active Shift */}
      {currentShift && (
        <section className="rounded-xl border border-green-200 bg-green-50/50 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={STATUS_BADGE_STYLES[currentShift.shiftStatus as keyof typeof STATUS_BADGE_STYLES]}>
                  {currentShift.shiftStatus}
                </Badge>
                <span className="text-sm font-medium text-slate-700">{currentShift.shiftType} Shift</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Start</p>
                  <p className="font-medium">{format(parseISO(currentShift.startTime), 'HH:mm')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End</p>
                  <p className="font-medium">{format(parseISO(currentShift.endTime), 'HH:mm')}</p>
                </div>
              </div>
              {currentShift.checkInTime && (
                <div className="mt-2 text-sm">
                  <span className="text-xs text-muted-foreground">Checked in: </span>
                  <span className="font-medium">{format(parseISO(currentShift.checkInTime), 'HH:mm')}</span>
                </div>
              )}
            </div>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => console.log('Check out clicked')}
            >
              Check Out
            </Button>
          </div>
        </section>
      )}

      {/* Upcoming Shifts */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Upcoming shifts</h2>
        <div className="space-y-2">
          {upcomingShifts.map((shift) => (
            <div key={shift.documentId} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={STATUS_BADGE_STYLES[shift.shiftStatus as keyof typeof STATUS_BADGE_STYLES]}>
                      {shift.shiftStatus}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(shift.date), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">
                    {shift.startTime} - {shift.endTime} • {shift.shiftType}
                  </p>
                  <p className="text-xs text-muted-foreground">{shift.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shift History */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Shift history</h2>
        <div className="space-y-2">
          {monthlyHistory.map((shift) => (
            <div key={shift.documentId} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={STATUS_BADGE_STYLES[shift.shiftStatus as keyof typeof STATUS_BADGE_STYLES]}>
                      {shift.shiftStatus}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(shift.date), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">
                    {shift.startTime} - {shift.endTime} • {shift.shiftType}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    In: {format(parseISO(shift.checkInTime!), 'HH:mm')} • Out: {format(parseISO(shift.checkOutTime!), 'HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
