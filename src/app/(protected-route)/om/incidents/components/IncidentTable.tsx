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
  CheckCircle,
  Search,
  Trash2,
  Shield,
} from 'lucide-react';
import type { FakeIncident } from '@/lib/data/fakeIncidents';
import { useState } from 'react';

interface IncidentTableProps {
  incidents: FakeIncident[];
  loading: boolean;
  onStatusUpdate: (id: string, status: FakeIncident['status']) => void;
  onDelete: (id: string) => void;
}

const getSeverityBadge = (severity: FakeIncident['severity']) => {
  const variants: Record<FakeIncident['severity'], { bg: string; text: string }> = {
    CRITICAL: { bg: 'bg-red-100', text: 'text-red-700' },
    HIGH: { bg: 'bg-red-100', text: 'text-red-700' },
    MEDIUM: { bg: 'bg-blue-100', text: 'text-blue-700' },
    LOW: { bg: 'bg-slate-100', text: 'text-slate-700' },
  };
  const variant = variants[severity];
  return (
    <Badge className={`${variant.bg} ${variant.text} border-none px-3 py-1 font-semibold text-xs rounded-md hover:${variant.bg}`}>
      {severity}
    </Badge>
  );
};

const getStatusBadge = (status: FakeIncident['status']) => {
  const variants: Record<FakeIncident['status'], { bg: string; text: string }> = {
    REPORTED: { bg: 'bg-red-100', text: 'text-red-700' },
    ACKNOWLEDGED: { bg: 'bg-blue-100', text: 'text-blue-700' },
    INVESTIGATING: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    RESOLVED: { bg: 'bg-green-100', text: 'text-green-700' },
  };
  const variant = variants[status];
  return (
    <Badge className={`${variant.bg} ${variant.text} border-none px-3 py-1 font-semibold text-xs rounded-md hover:${variant.bg}`}>
      {status}
    </Badge>
  );
};

const formatIncidentTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hr ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export default function IncidentTable({
  incidents,
  loading,
  onStatusUpdate,
  onDelete,
}: IncidentTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading incidents...
      </div>
    );
  }

  const columns: Column<FakeIncident>[] = [
    {
      key: 'incident',
      header: 'Incident',
      className: 'min-w-[240px]',
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-sm text-zinc-900">{row.incidentNumber}</span>
          </div>
          <p className="text-sm text-zinc-500">{row.title}</p>
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
      key: 'type',
      header: 'Type',
      className: 'min-w-[160px]',
      cell: (row) => (
        <div>
          <p className="font-medium text-sm text-zinc-900">{row.incidentType}</p>
          <p className="text-xs text-zinc-500">{row.subType}</p>
        </div>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      className: 'min-w-[120px]',
      cell: (row) => getSeverityBadge(row.severity),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'min-w-[140px]',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      className: 'min-w-[150px]',
      cell: (row) => (
        <span className="text-sm text-zinc-700">{row.assignedTo || <span className="text-zinc-400">Unassigned</span>}</span>
      ),
    },
    {
      key: 'time',
      header: 'Time',
      className: 'min-w-[120px]',
      cell: (row) => (
        <span className="text-sm text-zinc-500">{formatIncidentTime(row.incidentTime)}</span>
      ),
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onStatusUpdate(row.id, 'ACKNOWLEDGED')}
              disabled={row.status !== 'REPORTED'}
              className="cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Acknowledge
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusUpdate(row.id, 'INVESTIGATING')}
              disabled={row.status === 'RESOLVED' || row.status === 'INVESTIGATING'}
              className="cursor-pointer"
            >
              <Search className="h-4 w-4 mr-2" />
              Start Investigation
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusUpdate(row.id, 'RESOLVED')}
              disabled={row.status === 'RESOLVED'}
              className="cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Resolved
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteConfirm(row.id)}
              className="text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={incidents} />

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Incident</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this incident? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete(deleteConfirm);
                  setDeleteConfirm(null);
                }}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
