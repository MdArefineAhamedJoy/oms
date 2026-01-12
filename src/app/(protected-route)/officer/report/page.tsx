'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Camera,
} from 'lucide-react';
import { useState } from 'react';

// Fake data
const stats = {
  total: 12,
  resolved: 8,
  open: 4,
  critical: 1,
};

const incidents = [
  {
    documentId: 'inc-001',
    title: 'Suspicious activity near loading bay',
    incidentType: 'Security',
    severity: 'HIGH',
    status: 'OPEN',
    location: 'Loading Bay - Rear Entrance',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Unknown individual observed attempting to access secure area',
  },
  {
    documentId: 'inc-002',
    title: 'Fire alarm malfunction',
    incidentType: 'Safety',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    location: 'Main Building - 2nd Floor',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'Fire alarm triggered falsely, maintenance team notified',
  },
  {
    documentId: 'inc-003',
    title: 'Vehicle parking violation',
    incidentType: 'Traffic',
    severity: 'LOW',
    status: 'RESOLVED',
    location: 'Parking Lot A - Section 3',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    description: 'Unauthorised vehicle parked in reserved space',
  },
  {
    documentId: 'inc-004',
    title: 'Broken window in storage area',
    incidentType: 'Security',
    severity: 'MEDIUM',
    status: 'OPEN',
    location: 'Storage Building - East Wing',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    description: 'Window discovered broken during patrol, possible forced entry attempt',
  },
];

const INCIDENT_TYPES = [
  { id: 'security', label: 'Security Breach', subType: 'security' },
  { id: 'theft', label: 'Theft', subType: 'theft' },
  { id: 'accident', label: 'Accident', subType: 'accident' },
  { id: 'fire', label: 'Fire', subType: 'fire' },
  { id: 'medical', label: 'Medical Emergency', subType: 'medical' },
  { id: 'damage', label: 'Property Damage', subType: 'damage' },
  { id: 'suspicious', label: 'Suspicious Activity', subType: 'suspicious' },
  { id: 'other', label: 'Other', subType: 'other' },
];

const SEVERITY_LEVELS = [
  { value: 'LOW', label: 'Low', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { value: 'MEDIUM', label: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { value: 'HIGH', label: 'High', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { value: 'CRITICAL', label: 'Critical', color: 'text-red-600 bg-red-50 border-red-200' },
];

export default function ReportPage() {
  const [showNewReport, setShowNewReport] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = async () => {
    if (!selectedIncidentId || !selectedSeverity || !location.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Report submitted:', {
        incidentType: selectedIncidentId,
        severity: selectedSeverity,
        title,
        location,
        description,
      });
      setIsSubmitting(false);
      setShowNewReport(false);
      setSelectedIncidentId('');
      setSelectedSeverity('');
      setTitle('');
      setLocation('');
      setDescription('');
    }, 1500);
  };

  const getSeverityColor = (severity: string) => {
    const level = SEVERITY_LEVELS.find((l) => l.value === severity);
    return level?.color || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'OPEN':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-2">
      {/* Mobile FAB */}
      <div className="fixed right-4 z-40 md:hidden bottom-[calc(64px+env(safe-area-inset-bottom))]">
        <Button
          size="icon"
          className="rounded-full bg-black text-white hover:bg-black/90 w-12 h-12"
          onClick={() => setShowNewReport(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Open</p>
          <p className="text-2xl font-semibold text-amber-600">{stats.open}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Resolved</p>
          <p className="text-2xl font-semibold text-green-600">{stats.resolved}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Critical</p>
          <p className="text-2xl font-semibold text-red-600">{stats.critical}</p>
        </div>
      </div>

      {/* Quick Report Form (Mobile/Inline) */}
      {showNewReport && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Report Incident</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNewReport(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Incident Type</label>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              value={selectedIncidentId}
              onChange={(e) => setSelectedIncidentId(e.target.value)}
            >
              <option value="">Select type...</option>
              {INCIDENT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Severity</label>
            <div className="flex flex-wrap gap-2">
              {SEVERITY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                    selectedSeverity === level.value
                      ? level.color
                      : 'text-gray-600 bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedSeverity(level.value)}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Brief description of the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Where did this happen?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm min-h-[80px]"
              placeholder="Provide detailed description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" disabled={isSubmitting}>
              <Camera className="h-4 w-4 mr-1" />
              Add Photo
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmitReport}
              disabled={!selectedIncidentId || !selectedSeverity || !location.trim() || !description.trim() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      )}

      {/* Recent Reports Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Reports</h3>
          <Button
            className="hidden md:inline-flex"
            onClick={() => setShowNewReport(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
        </div>

        {incidents.length === 0 ? (
          <div className="py-6 text-sm text-gray-600 text-center">
            No reports submitted yet.
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.documentId}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge
                        variant="outline"
                        className={getStatusColor(incident.status)}
                      >
                        {incident.status === 'RESOLVED' ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Resolved
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Open
                          </>
                        )}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(incident.severity)}
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {incident.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {formatRelativeTime(incident.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                  {incident.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{incident.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
