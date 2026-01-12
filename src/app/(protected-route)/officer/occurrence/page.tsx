'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Plus,
  Clock,
  Edit,
  Eye,
  Calendar,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

// Fake data
const occurrences = [
  {
    documentId: 'occ-001',
    shiftType: 'Morning',
    shiftDate: new Date().toISOString(),
    officerName: 'John Smith',
    officerId: 'OFF-2024-001',
    handoverNotes: 'Shift completed without major incidents. All checkpoints scanned successfully.',
    keyEvents: [
      { time: '06:00', event: 'Shift started, all systems operational' },
      { time: '08:30', event: 'Delivery arrived at loading bay - verified and cleared' },
      { time: '10:15', event: 'Fire alarm test conducted - all systems passed' },
      { time: '12:00', event: 'Patrol completed - 5/5 checkpoints scanned' },
    ],
    pendingTasks: [],
    incidents: [],
    status: 'submitted',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    documentId: 'occ-002',
    shiftType: 'Night',
    shiftDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    officerName: 'Mike Johnson',
    officerId: 'OFF-2024-002',
    handoverNotes: 'Quiet shift overnight. One minor incident with unauthorized parking resolved.',
    keyEvents: [
      { time: '22:00', event: 'Shift started - took over from evening team' },
      { time: '01:30', event: 'Unauthorized vehicle in restricted area - driver issued warning' },
      { time: '04:00', event: 'Perimeter check - all secure' },
      { time: '06:00', event: 'Shift ended - handover to morning team' },
    ],
    pendingTasks: [
      'Follow up on parking violation warning',
      'Check CCTV footage of entrance',
    ],
    incidents: [
      { type: 'Parking Violation', severity: 'LOW', status: 'RESOLVED' },
    ],
    status: 'reviewed',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
];

export default function OccurrencePage() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [viewingEntry, setViewingEntry] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Occurrence Book</h1>
          <p className="text-sm text-slate-600">Shift handover and activity log</p>
        </div>
        <Button onClick={() => setShowNewEntry(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Occurrence Entries */}
      <div className="space-y-4">
        {occurrences.map((occurrence) => (
          <div
            key={occurrence.documentId}
            className="rounded-lg border border-slate-200 bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {occurrence.shiftType} Shift
                    </h3>
                    <Badge
                      variant="outline"
                      className={
                        occurrence.status === 'submitted'
                          ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : 'bg-green-100 text-green-700 border-green-200'
                      }
                    >
                      {occurrence.status === 'submitted' ? 'Submitted' : 'Reviewed'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(occurrence.shiftDate), 'dd MMM yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {occurrence.officerName} ({occurrence.officerId})
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setViewingEntry(occurrence.documentId)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Handover Notes */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-slate-700 mb-1">Handover Notes</h4>
                <p className="text-sm text-slate-600">{occurrence.handoverNotes}</p>
              </div>

              {/* Key Events */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">Key Events</h4>
                <div className="space-y-1.5">
                  {occurrence.keyEvents.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-slate-500 font-mono">{event.time}</span>
                      <span className="text-slate-700 flex-1">{event.event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Tasks */}
              {occurrence.pendingTasks.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-slate-700 mb-1">Pending Tasks</h4>
                  <ul className="text-xs text-amber-700 space-y-0.5">
                    {occurrence.pendingTasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Incidents */}
              {occurrence.incidents.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-700 mb-1">Related Incidents</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {occurrence.incidents.map((incident, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-red-50 text-red-700 border-red-200"
                      >
                        {incident.type} ({incident.severity})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Entry Modal */}
      {showNewEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Occurrence Entry</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewEntry(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Shift Type</label>
                <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Night</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Handover Notes</label>
                <textarea
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm min-h-[100px]"
                  placeholder="Summary of the shift..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Key Events</label>
                <div className="space-y-2" id="events-container">
                  <div className="flex gap-2">
                    <input type="time" className="rounded-md border border-slate-300 px-2 py-1 text-sm" />
                    <input
                      type="text"
                      className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder="Event description..."
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const container = document.getElementById('events-container');
                    if (container) {
                      const row = document.createElement('div');
                      row.className = 'flex gap-2';
                      row.innerHTML = `
                        <input type="time" class="rounded-md border border-slate-300 px-2 py-1 text-sm" />
                        <input type="text" class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Event description..." />
                      `;
                      container.appendChild(row);
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Pending Tasks (one per line)</label>
                <textarea
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm min-h-[80px]"
                  placeholder="Tasks for next shift..."
                />
              </div>
            </div>

            <Button className="w-full" onClick={() => setShowNewEntry(false)}>
              Submit Entry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
