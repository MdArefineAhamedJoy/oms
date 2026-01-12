'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
  RefreshCw,
  Shield,
} from 'lucide-react';

interface OfficerInfo {
  name: string;
  documentId: string;
  shift: string;
  site: string;
  startTime: string;
  endTime: string;
  photoUrl: string | null;
}

interface Shift {
  shiftStatus: string;
  startTime: string;
  endTime: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

interface ShiftSummaryCardProps {
  officerInfo: OfficerInfo;
  currentShift: Shift;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onRefresh: () => void;
}

const STATUS_META = {
  ONGOING: {
    badge: 'ON DUTY',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
    icon: Activity,
    iconColor: 'text-green-500',
  },
  COMPLETED: {
    badge: 'COMPLETED',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Clock,
    iconColor: 'text-blue-500',
  },
  SCHEDULED: {
    badge: 'SCHEDULED',
    badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: Clock,
    iconColor: 'text-gray-400',
  },
} as const;

export function ShiftSummaryCard({
  officerInfo,
  currentShift,
  onCheckIn,
  onCheckOut,
  onRefresh,
}: ShiftSummaryCardProps) {
  const shiftStatus = currentShift.shiftStatus;
  const cardBackground =
    shiftStatus === 'ONGOING'
      ? 'bg-green-50/50 border-green-200'
      : shiftStatus === 'COMPLETED'
        ? 'bg-blue-50/50 border-blue-200'
        : 'bg-white border-gray-200';

  const statusConfig =
    STATUS_META[shiftStatus as keyof typeof STATUS_META] ?? STATUS_META.SCHEDULED;
  const StatusIcon = statusConfig.icon;

  const initials = officerInfo.name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className={`rounded-lg border gap-1.5 sm:gap-2 p-2.5 ${cardBackground} transition-all duration-200`}>
      {/* Header Row - User Info + Time Badge */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Avatar className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 truncate">
              {officerInfo.name}
            </h2>
            <p className="text-xs text-gray-600">
              {officerInfo.documentId} • {officerInfo.shift}
            </p>
          </div>
        </div>

        {/* Time Badge */}
        <div className="flex-shrink-0">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-900 text-xs px-2 py-1 font-medium"
          >
            {officerInfo.startTime} - {officerInfo.endTime}
          </Badge>
        </div>
      </div>

      {/* Location and Shift Info - Single Line */}
      <div className="flex items-center gap-2 mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-medium">{officerInfo.site}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.iconColor}`} />
          <span className="font-medium">{officerInfo.shift} Shift</span>
        </div>
      </div>

      {/* Status Row with Check-in/out Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className={`text-xs px-2 py-0.5 font-medium border ${statusConfig.badgeClass}`}
          >
            {statusConfig.badge}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            className={`h-9 px-4 rounded-lg text-xs font-semibold transition-all ${
              shiftStatus === 'ONGOING'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : shiftStatus === 'COMPLETED'
                  ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
                  : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            onClick={
              shiftStatus === 'ONGOING' ? onCheckOut : onCheckIn
            }
            disabled={shiftStatus === 'COMPLETED'}
          >
            <Activity className="h-3.5 w-3.5 mr-1.5" />
            {shiftStatus === 'ONGOING' ? 'CHECK OUT' : 'CHECK IN'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-gray-300"
            onClick={onRefresh}
            aria-label="Refresh shift data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Additional Info for Active/Completed Shifts */}
      {currentShift?.checkInTime && (
        <div className="mt-1.5 pt-1.5 border-t border-gray-200 flex items-center gap-3 text-xs text-gray-500">
          <span>
            In: {new Date(currentShift.checkInTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {shiftStatus === 'ONGOING' && (
            <span className="ml-auto font-medium text-gray-700">
              Ends:{' '}
              {currentShift?.endTime
                ? new Date(currentShift.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : officerInfo.endTime}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
