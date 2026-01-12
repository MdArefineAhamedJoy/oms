'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Play,
  StopCircle,
  QrCode,
  Camera,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

// Fake data
const activePatrol = {
  documentId: 'patrol-001',
  routeName: 'Main Building - Morning Route',
  siteName: 'Main Building',
  startTime: new Date().toISOString(),
  patrolStatus: 'IN_PROGRESS',
  progressPercentage: 60,
  completedCheckpoints: 3,
  totalCheckpoints: 5,
};

const checkpoints = [
  {
    documentId: 'cp-001',
    name: 'Main Entrance',
    code: 'ME-001',
    status: 'completed',
    scannedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    notes: 'All clear',
  },
  {
    documentId: 'cp-002',
    name: 'Parking Lot A',
    code: 'PA-001',
    status: 'completed',
    scannedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    notes: '5 vehicles parked',
  },
  {
    documentId: 'cp-003',
    name: 'Loading Bay',
    code: 'LB-001',
    status: 'completed',
    scannedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    notes: 'No activity',
  },
  {
    documentId: 'cp-004',
    name: 'Rear Exit',
    code: 'RE-001',
    status: 'pending',
    scannedAt: null,
    notes: null,
  },
  {
    documentId: 'cp-005',
    name: 'Server Room',
    code: 'SR-001',
    status: 'pending',
    scannedAt: null,
    notes: null,
  },
];

const upcomingPatrols = [
  {
    id: 'patrol-002',
    name: 'North Gate - Afternoon',
    time: '14:00',
    checkpoints: 4,
    priority: 'high',
    status: 'SCHEDULED',
  },
  {
    id: 'patrol-003',
    name: 'Perimeter Check - Evening',
    time: '18:00',
    checkpoints: 8,
    priority: 'medium',
    status: 'SCHEDULED',
  },
];

const todayStats = {
  totalPatrols: 3,
  completedPatrols: 1,
  totalCheckpoints: 15,
  completedCheckpoints: 8,
};

export default function PatrolPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const handleEndPatrol = () => {
    setIsEnding(true);
    setTimeout(() => {
      setIsEnding(false);
      console.log('Patrol ended');
    }, 1500);
  };

  const handleScanQr = () => {
    setScannerOpen(true);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Active Patrol Card */}
      <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-sm">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-green-500 text-white border-green-600">
                  IN PROGRESS
                </Badge>
                <span className="text-xs text-green-700 font-medium">
                  Started at {formatTime(activePatrol.startTime)}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                {activePatrol.routeName}
              </h2>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {activePatrol.siteName}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Progress</span>
              <span className="font-medium">
                {activePatrol.completedCheckpoints} of {activePatrol.totalCheckpoints} checkpoints
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                style={{ width: `${activePatrol.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Refresh clicked')}
            className="flex-1"
          >
            Refresh
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndPatrol}
            disabled={isEnding}
            className="flex-1"
          >
            {isEnding ? (
              <>
                <Clock className="h-4 w-4 mr-1 animate-spin" />
                Ending...
              </>
            ) : (
              <>
                <StopCircle className="h-4 w-4 mr-1" />
                End Patrol
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Checkpoints Panel */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900">Checkpoints</h3>
          <Badge variant="outline" className="text-xs">
            {activePatrol.completedCheckpoints}/{activePatrol.totalCheckpoints}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.documentId}
              className={`rounded-lg border p-3 ${
                checkpoint.status === 'completed'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  {checkpoint.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {checkpoint.name}
                    </p>
                    <p className="text-xs text-slate-500">{checkpoint.code}</p>
                    {checkpoint.status === 'completed' && (
                      <>
                        <p className="text-xs text-slate-600 mt-1">
                          Scanned at {formatTime(checkpoint.scannedAt!)}
                        </p>
                        {checkpoint.notes && (
                          <p className="text-xs text-slate-500 mt-0.5 italic">
                            &quot;{checkpoint.notes}&quot;
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {checkpoint.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={handleScanQr}
                  >
                    <QrCode className="h-4 w-4 mr-1" />
                    Scan
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-slate-200 pt-3">
          <p className="text-xs text-slate-500 mb-2">Quick Actions</p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('photo')}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <Camera className="h-4 w-4" />
              <span className="text-xs">Photo</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('note')}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs">Note</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('issue')}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Issue</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Patrols */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Upcoming Patrols</h3>
        <div className="space-y-2">
          {upcomingPatrols.map((patrol) => (
            <div
              key={patrol.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={
                        patrol.priority === 'high'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }
                    >
                      {patrol.priority}
                    </Badge>
                    <span className="text-xs text-slate-500">{patrol.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">{patrol.name}</p>
                  <p className="text-xs text-slate-500">
                    {patrol.checkpoints} checkpoints
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Today&apos;s Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs text-blue-600 font-medium">Patrols</p>
            <p className="text-2xl font-semibold text-blue-900">
              {todayStats.completedPatrols}/{todayStats.totalPatrols}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-3">
            <p className="text-xs text-green-600 font-medium">Checkpoints</p>
            <p className="text-2xl font-semibold text-green-900">
              {todayStats.completedCheckpoints}/{todayStats.totalCheckpoints}
            </p>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {scannerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
            <p className="text-sm text-slate-600 mb-4">
              Point your camera at the checkpoint QR code
            </p>
            <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="h-16 w-16 text-slate-400" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setScannerOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1">Simulate Scan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
