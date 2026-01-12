'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
} from 'lucide-react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

// Fake data
const leaveBalances = {
  annual: 15,
  sick: 10,
  personal: 3,
};

const leaveRequests = [
  {
    documentId: 'leave-001',
    leaveType: 'Annual',
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    days: 3,
    reason: 'Family vacation',
    status: 'PENDING',
    appliedDate: '2025-01-10',
  },
  {
    documentId: 'leave-002',
    leaveType: 'Sick',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    days: 1,
    reason: 'Medical appointment',
    status: 'APPROVED',
    appliedDate: '2025-01-04',
  },
  {
    documentId: 'leave-003',
    leaveType: 'Personal',
    startDate: '2024-12-28',
    endDate: '2024-12-28',
    days: 1,
    reason: 'Personal errands',
    status: 'APPROVED',
    appliedDate: '2024-12-27',
  },
  {
    documentId: 'leave-004',
    leaveType: 'Annual',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    days: 6,
    reason: 'Holiday break',
    status: 'REJECTED',
    appliedDate: '2024-12-15',
    rejectionReason: 'Insufficient staff coverage during holidays',
  },
];

export default function LeavePage() {
  const [showApply, setShowApply] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return CheckCircle2;
      case 'REJECTED':
        return XCircle;
      case 'PENDING':
        return Hourglass;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Leave Management</h1>
          <p className="text-sm text-slate-600">Apply for leave and view balance</p>
        </div>
        <Button onClick={() => setShowApply(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Leave
        </Button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-900">Annual Leave</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">{leaveBalances.annual}</p>
          <p className="text-xs text-blue-600 mt-1">days remaining</p>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-semibold text-green-900">Sick Leave</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">{leaveBalances.sick}</p>
          <p className="text-xs text-green-600 mt-1">days remaining</p>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-semibold text-purple-900">Personal Leave</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900">{leaveBalances.personal}</p>
          <p className="text-xs text-purple-600 mt-1">days remaining</p>
        </div>
      </div>

      {/* Leave Requests */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">Leave Requests</h2>
        <div className="space-y-2">
          {leaveRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);

            return (
              <div
                key={request.documentId}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {request.leaveType} Leave
                      </h3>
                      <Badge
                        variant="outline"
                        className={getStatusColor(request.status)}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {request.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                      <div>
                        <span className="font-medium">Duration:</span>{' '}
                        {format(parseISO(request.startDate), 'dd MMM')} - {format(parseISO(request.endDate), 'dd MMM yyyy')}
                      </div>
                      <div>
                        <span className="font-medium">Days:</span> {request.days}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Applied:</span>{' '}
                        {format(parseISO(request.appliedDate), 'dd MMM yyyy')}
                      </div>
                    </div>

                    {request.status === 'REJECTED' && request.rejectionReason && (
                      <div className="mt-2 p-2 rounded bg-red-50 border border-red-200">
                        <p className="text-xs text-red-700">
                          <span className="font-medium">Reason:</span> {request.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApply && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Apply for Leave</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApply(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Leave Type</label>
                <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                  <option>Annual</option>
                  <option>Sick</option>
                  <option>Personal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <input
                    type="date"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <input
                    type="date"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Reason</label>
                <textarea
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm min-h-[80px]"
                  placeholder="Provide reason for leave..."
                />
              </div>

              {/* Leave balance info */}
              <div className="p-3 rounded bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700">
                  <span className="font-medium">Your balances:</span> Annual: {leaveBalances.annual} days,
                  Sick: {leaveBalances.sick} days, Personal: {leaveBalances.personal} days
                </p>
              </div>
            </div>

            <Button className="w-full" onClick={() => setShowApply(false)}>
              Submit Request
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
