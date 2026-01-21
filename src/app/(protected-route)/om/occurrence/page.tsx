'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Archive, Undo } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import StatsCard from '@/components/shared/StatsCard';
import { ClipboardList, AlertTriangle, Activity } from 'lucide-react';

// Fake data
const fakeEntries = [
  {
    documentId: '1',
    entryNumber: 'OCC-2025-001',
    entryType: 'INCIDENT_REPORT',
    subject: 'Unauthorized Parking Reported',
    content: 'Vehicle parked in reserved spot without permit. License plate: XYZ-1234. Driver contacted and vehicle moved.',
    priority: 'MEDIUM',
    followUpStatus: 'COMPLETED',
    acknowledgmentStatus: 'ACKNOWLEDGED',
    site: { documentId: 's1', name: 'Downtown Plaza' },
    user: { fullName: 'John Smith', documentId: 'u1' },
    assignedTo: { fullName: 'Mike Davis', documentId: 'u2' },
    createdAt: '2025-01-20T10:15:00Z',
    archived: false,
  },
  {
    documentId: '2',
    entryNumber: 'OCC-2025-002',
    entryType: 'ROUTINE_PATROL',
    subject: 'Perimeter Check Completed',
    content: 'Regular perimeter check completed. All access points secure. No breaches detected. All lighting systems functioning properly.',
    priority: 'LOW',
    followUpStatus: 'COMPLETED',
    acknowledgmentStatus: 'ACKNOWLEDGED',
    site: { documentId: 's2', name: 'Tech Park Complex' },
    user: { fullName: 'Sarah Johnson', documentId: 'u3' },
    assignedTo: null,
    createdAt: '2025-01-20T08:30:00Z',
    archived: false,
  },
  {
    documentId: '3',
    entryNumber: 'OCC-2025-003',
    entryType: 'SECURITY_BREACH',
    subject: 'Fire Alarm Test',
    content: 'Scheduled fire alarm test conducted. All systems functioning properly. Drills completed successfully. All staff responded appropriately.',
    priority: 'HIGH',
    followUpStatus: 'IN_PROGRESS',
    acknowledgmentStatus: 'PENDING',
    site: { documentId: 's3', name: 'Harbor Point' },
    user: { fullName: 'Emily Chen', documentId: 'u4' },
    assignedTo: { fullName: 'Robert Wilson', documentId: 'u5' },
    createdAt: '2025-01-20T14:20:00Z',
    archived: false,
  },
  {
    documentId: '4',
    entryNumber: 'OCC-2025-004',
    entryType: 'SHIFT_HANDOVER',
    subject: 'Morning Shift Handover',
    content: 'Routine shift handover completed. All posts secured. Keys accounted for. No incidents to report. Equipment checks completed.',
    priority: 'LOW',
    followUpStatus: 'PENDING',
    acknowledgmentStatus: 'ACKNOWLEDGED',
    site: { documentId: 's4', name: 'Metro Center Mall' },
    user: { fullName: 'David Lee', documentId: 'u6' },
    assignedTo: null,
    createdAt: '2025-01-20T06:00:00Z',
    archived: false,
  },
  {
    documentId: '5',
    entryNumber: 'OCC-2025-005',
    entryType: 'INCIDENT_REPORT',
    subject: 'Suspicious Activity - Lost Child',
    content: 'Report of lost child in food court. Child located and reunited with parents within 10 minutes. Security response timely.',
    priority: 'HIGH',
    followUpStatus: 'PENDING',
    acknowledgmentStatus: 'PENDING',
    site: { documentId: 's5', name: 'Airport Terminal' },
    user: { fullName: 'Lisa Martinez', documentId: 'u7' },
    assignedTo: { fullName: 'James Brown', documentId: 'u8' },
    createdAt: '2025-01-19T22:30:00Z',
    archived: true,
  },
  {
    documentId: '6',
    entryNumber: 'OCC-2025-006',
    entryType: 'MAINTENANCE',
    subject: 'Gate Control System Maintenance',
    content: 'Scheduled maintenance of gate control systems completed. All access cards tested and working. Backup systems verified.',
    priority: 'LOW',
    followUpStatus: 'COMPLETED',
    acknowledgmentStatus: 'ACKNOWLEDGED',
    site: { documentId: 's1', name: 'Downtown Plaza' },
    user: { fullName: 'Tom Wilson', documentId: 'u9' },
    assignedTo: null,
    createdAt: '2025-01-19T16:00:00Z',
    archived: true,
  },
];

const fakeStats = {
  total: fakeEntries.length,
  highPriority: fakeEntries.filter((e) => e.priority === 'HIGH' || e.priority === 'URGENT').length,
  awaitingAck: fakeEntries.filter((e) => e.acknowledgmentStatus === 'PENDING').length,
  openFollowUps: fakeEntries.filter((e) => e.followUpStatus === 'PENDING' || e.followUpStatus === 'IN_PROGRESS').length,
  archived: fakeEntries.filter((e) => e.archived).length,
};

const ENTRY_TYPE_OPTIONS = [
  { value: 'INCIDENT_REPORT', label: 'Incident Report' },
  { value: 'ROUTINE_PATROL', label: 'Routine Patrol' },
  { value: 'SECURITY_BREACH', label: 'Security Breach' },
  { value: 'SHIFT_HANDOVER', label: 'Shift Handover' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
];

export default function OccurrencePage() {
  const [entries, setEntries] = useState(fakeEntries);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    entryType: 'all',
    priority: 'all',
    followUp: 'all',
    site: 'all',
    status: 'active',
  });

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const term = filters.search.trim().toLowerCase();

    // Status filter
    if (filters.status === 'active' && entry.archived) return false;
    if (filters.status === 'archived' && !entry.archived) return false;

    // Entry type filter
    if (filters.entryType !== 'all' && entry.entryType !== filters.entryType)
      return false;

    // Priority filter
    if (filters.priority !== 'all' && entry.priority !== filters.priority)
      return false;

    // Follow-up filter
    if (filters.followUp !== 'all' && entry.followUpStatus !== filters.followUp)
      return false;

    // Search filter
    if (term) {
      const searchBody = [
        entry.subject,
        entry.entryNumber,
        entry.site?.name,
        entry.assignedTo?.fullName,
        entry.user?.fullName,
        entry.content,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!searchBody.includes(term)) return false;
    }

    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFollowUpColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEntryTypeLabel = (value) => {
    if (!value) return 'Unknown';
    return value
      .toLowerCase()
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      entryType: 'all',
      priority: 'all',
      followUp: 'all',
      site: 'all',
      status: 'active',
    });
  };

  const anyFiltersActive =
    filters.entryType !== 'all' ||
    filters.priority !== 'all' ||
    filters.followUp !== 'all' ||
    filters.site !== 'all' ||
    filters.status !== 'active' ||
    filters.search.trim().length > 0;

  return (
    <div className="mx-auto w-full pb-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Occurrence Book</h1>
          <p className="text-sm text-muted-foreground">
            Capture, review, and hand over shift notes, incidents, and patrol updates
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          New entry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Entries"
          value={fakeStats.total}
          description="All records captured"
          icon={ClipboardList}
        />
        <StatsCard
          title="High Priority"
          value={fakeStats.highPriority}
          description="Marked as High / Urgent"
          icon={AlertTriangle}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
        <StatsCard
          title="Awaiting Acknowledgment"
          value={fakeStats.awaitingAck}
          description="Require confirmation"
          icon={Activity}
          iconColor="text-sky-600"
          iconBgColor="bg-sky-100"
        />
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Archived Entries</p>
              <p className="text-2xl font-semibold">{fakeStats.archived}</p>
              <p className="text-xs text-muted-foreground">
                Preserved for audit trail
              </p>
            </div>
            <Archive className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2.4fr,1fr] w-full">
        <div className="space-y-4 min-w-0">
          {/* Filters */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subject, entry number, or officer"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-9 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleResetFilters}
                    disabled={!anyFiltersActive}
                  >
                    <Filter className="h-4 w-4" />
                    Reset filters
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Entry Type</label>
                  <Select
                    value={filters.entryType}
                    onValueChange={(value) => setFilters({ ...filters, entryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {ENTRY_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                  <Select
                    value={filters.priority}
                    onValueChange={(value) => setFilters({ ...filters, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All priorities</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Follow-up</label>
                  <Select
                    value={filters.followUp}
                    onValueChange={(value) => setFilters({ ...filters, followUp: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">View</label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters({ ...filters, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active only</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="all">All entries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Officer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Follow-up</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr
                      key={entry.documentId}
                      className={cn(
                        'hover:bg-gray-50',
                        entry.archived && 'bg-gray-50 opacity-60'
                      )}
                    >
                      <td className="px-4 py-3 text-sm font-mono">{entry.entryNumber}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">
                          {getEntryTypeLabel(entry.entryType)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {entry.subject}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={cn('text-xs border', getPriorityColor(entry.priority))}>
                          {entry.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{entry.site?.name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{entry.user?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn('text-xs', getFollowUpColor(entry.followUpStatus))}>
                          {entry.followUpStatus.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(entry.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              'h-8 w-8 p-0',
                              entry.archived && 'text-blue-600'
                            )}
                            title={entry.archived ? 'Unarchive' : 'Archive'}
                          >
                            {entry.archived ? (
                              <Undo className="h-4 w-4" />
                            ) : (
                              <Archive className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Selected Entry Detail */}
        <div className="min-w-0">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Entry Details
            </h3>
            <p className="text-sm text-muted-foreground">
              Select an entry to view full details
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Entry Number</label>
                <p className="text-sm font-medium">-</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Entry Type</label>
                <p className="text-sm">-</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Subject</label>
                <p className="text-sm">-</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Description</label>
                <p className="text-sm text-gray-600">-</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
