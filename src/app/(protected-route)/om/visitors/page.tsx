'use client';

import { useState } from 'react';
import { Search, Filter, Building2, Plus, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Fake data
const fakeVisitors = [
  {
    documentId: '1',
    visitorNumber: 'VIS-2025-001',
    fullName: 'Sarah Mitchell',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    company: 'Tech Corp',
    visitorType: 'CONTRACTOR',
    visitMode: 'WALK_IN',
    site: { documentId: 's1', name: 'Downtown Plaza' },
    vehicle: {
      plateNumber: 'ABC-1234',
      vehiclePurpose: 'VISITOR',
      vehicleType: 'SEDAN',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleColor: 'Black',
    },
    checkInTime: '2025-01-20T09:00:00Z',
    checkOutTime: null,
    visitorStatus: 'CHECKED_IN',
    host: { firstName: 'John', lastName: 'Anderson' },
    appointmentHost: null,
    appointmentTime: null,
  },
  {
    documentId: '2',
    visitorNumber: 'VIS-2025-002',
    fullName: 'Michael Chen',
    firstName: 'Michael',
    lastName: 'Chen',
    company: 'Innovation Labs',
    visitorType: 'INTERVIEWEE',
    visitMode: 'APPOINTMENT',
    site: { documentId: 's2', name: 'Tech Park Complex' },
    vehicle: null,
    checkInTime: '2025-01-20T10:30:00Z',
    checkOutTime: null,
    visitorStatus: 'CHECKED_IN',
    host: null,
    appointmentHost: { firstName: 'Emily', lastName: 'Davis' },
    appointmentTime: '2025-01-20T10:00:00Z',
  },
  {
    documentId: '3',
    visitorNumber: 'VIS-2025-003',
    fullName: 'Lisa Thompson',
    firstName: 'Lisa',
    lastName: 'Thompson',
    company: 'Global Solutions',
    visitorType: 'CLIENT',
    visitMode: 'APPOINTMENT',
    site: { documentId: 's1', name: 'Downtown Plaza' },
    vehicle: {
      plateNumber: 'XYZ-5678',
      vehiclePurpose: 'DELIVERY',
      vehicleType: 'SUV',
      vehicleMake: 'Honda',
      vehicleModel: 'CR-V',
      vehicleColor: 'White',
    },
    checkInTime: '2025-01-20T08:00:00Z',
    checkOutTime: '2025-01-20T11:00:00Z',
    visitorStatus: 'CHECKED_OUT',
    host: { firstName: 'Robert', lastName: 'Wilson' },
    appointmentHost: null,
    appointmentTime: null,
  },
  {
    documentId: '4',
    visitorNumber: 'VIS-2025-004',
    fullName: 'David Brown',
    firstName: 'David',
    lastName: 'Brown',
    company: 'StartUp Inc',
    visitorType: 'VENDOR',
    visitMode: 'WALK_IN',
    site: { documentId: 's3', name: 'Harbor Point' },
    vehicle: {
      plateNumber: 'DEF-9012',
      vehiclePurpose: 'STAFF',
      vehicleType: 'VAN',
      vehicleMake: 'Ford',
      vehicleModel: 'Transit',
      vehicleColor: 'Blue',
    },
    checkInTime: '2025-01-20T09:45:00Z',
    checkOutTime: null,
    visitorStatus: 'CHECKED_IN',
    host: { firstName: 'Jennifer', lastName: 'Martinez' },
    appointmentHost: null,
    appointmentTime: null,
  },
  {
    documentId: '5',
    visitorNumber: 'VIS-2025-005',
    fullName: 'Jennifer Martinez',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    company: 'Logistics Co',
    visitorType: 'DELIVERY',
    visitMode: 'WALK_IN',
    site: { documentId: 's2', name: 'Tech Park Complex' },
    vehicle: null,
    checkInTime: '2025-01-20T07:30:00Z',
    checkOutTime: '2025-01-20T08:30:00Z',
    visitorStatus: 'CHECKED_OUT',
    host: null,
    appointmentHost: null,
    appointmentTime: null,
  },
  {
    documentId: '6',
    visitorNumber: 'VIS-2025-006',
    fullName: 'Robert Wilson',
    firstName: 'Robert',
    lastName: 'Wilson',
    company: null,
    visitorType: 'GUEST',
    visitMode: 'WALK_IN',
    site: { documentId: 's4', name: 'Metro Center Mall' },
    vehicle: {
      plateNumber: 'GHI-3456',
      vehiclePurpose: 'VISITOR',
      vehicleType: 'MOTORCYCLE',
      vehicleMake: 'Harley-Davidson',
      vehicleModel: 'Street 750',
      vehicleColor: 'Silver',
    },
    checkInTime: '2025-01-20T11:15:00Z',
    checkOutTime: null,
    visitorStatus: 'CHECKED_IN',
    host: { firstName: 'Tom', lastName: 'Wilson' },
    appointmentHost: null,
    appointmentTime: null,
  },
];

const fakeSites = [
  { documentId: 's1', name: 'Downtown Plaza' },
  { documentId: 's2', name: 'Tech Park Complex' },
  { documentId: 's3', name: 'Harbor Point' },
  { documentId: 's4', name: 'Metro Center Mall' },
  { documentId: 's5', name: 'Airport Terminal' },
];

const statusOptions = ['CHECKED_IN', 'CHECKED_OUT'];
const visitorTypes = ['CONTRACTOR', 'CLIENT', 'VENDOR', 'INTERVIEWEE', 'DELIVERY', 'GUEST'];
const visitModes = ['WALK_IN', 'APPOINTMENT'];

const formatEnumLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const getStatusLabel = (status: string) =>
  status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getVisitorStatusColor = (status: string) => {
  switch (status) {
    case 'CHECKED_IN':
      return 'bg-green-100 text-green-800';
    case 'CHECKED_OUT':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState(fakeVisitors);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | string>('all');
  const [siteFilter, setSiteFilter] = useState<'all' | string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [modeFilter, setModeFilter] = useState<'all' | string>('all');

  // Handle search debounce
  useState(() => {
    const handle = setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 400);
    return () => clearTimeout(handle);
  });

  // Reset page when filters change
  useState(() => {
    setPage(1);
  });

  // Filter visitors
  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch = searchTerm === '' ||
      visitor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.visitorNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.host?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.host?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || visitor.visitorStatus === statusFilter;
    const matchesSite = siteFilter === 'all' || visitor.site?.documentId === siteFilter;
    const matchesType = typeFilter === 'all' || visitor.visitorType === typeFilter;
    const matchesMode = modeFilter === 'all' || visitor.visitMode === modeFilter;

    return matchesSearch && matchesStatus && matchesSite && matchesType && matchesMode;
  });

  const handleToggleStatus = (visitor: typeof fakeVisitors[0]) => {
    const newStatus = visitor.visitorStatus === 'CHECKED_IN' ? 'CHECKED_OUT' : 'CHECKED_IN';
    setVisitors((prev) =>
      prev.map((v) =>
        v.documentId === visitor.documentId
          ? {
              ...v,
              visitorStatus: newStatus,
              checkOutTime: newStatus === 'CHECKED_OUT' ? new Date().toISOString() : null,
            }
          : v
      )
    );
  };

  const handleDelete = (visitor: typeof fakeVisitors[0]) => {
    setVisitors((prev) => prev.filter((v) => v.documentId !== visitor.documentId));
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
          <p className="text-gray-600">
            Monitor visitor check-ins and manage access requests
          </p>
        </div>
        <div className="flex">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            New visitor
          </Button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by name, company, host, or visitor number"
            className="pl-9"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {formatEnumLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={siteFilter} onValueChange={setSiteFilter}>
            <SelectTrigger className="w-full sm:w-56">
              <Building2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sites</SelectItem>
              {fakeSites.map((site) => (
                <SelectItem key={site.documentId} value={site.documentId}>
                  {site.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Visitor type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {visitorTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {formatEnumLabel(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Visit mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              {visitModes.map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {formatEnumLabel(mode)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Visitor Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                  No visitors found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.documentId}>
                  <TableCell className="font-medium">
                    {visitor.visitorNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {visitor.fullName}
                      </span>
                      {visitor.host && (
                        <span className="text-xs text-muted-foreground">
                          Host: {`${visitor.host.firstName || ''} ${visitor.host.lastName || ''}`.trim()}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatEnumLabel(visitor.visitorType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {formatEnumLabel(visitor.visitMode)}
                    </Badge>
                  </TableCell>
                  <TableCell>{visitor.company || '—'}</TableCell>
                  <TableCell>{visitor.site?.name ?? '—'}</TableCell>
                  <TableCell>
                    {visitor.vehicle ? (
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">
                          {visitor.vehicle.plateNumber ?? '—'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {[
                            visitor.vehicle.vehiclePurpose
                              ? formatEnumLabel(visitor.vehicle.vehiclePurpose)
                              : null,
                            visitor.vehicle.vehicleType
                              ? formatEnumLabel(visitor.vehicle.vehicleType)
                              : null,
                            [
                              visitor.vehicle.vehicleMake,
                              visitor.vehicle.vehicleModel,
                            ]
                              .filter(Boolean)
                              .join(' '),
                            visitor.vehicle.vehicleColor,
                          ]
                            .filter((value) => value && value.length > 0)
                            .join(' • ')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{formatDateTime(visitor.checkInTime)}</span>
                      {visitor.checkOutTime && (
                        <span className="text-xs text-muted-foreground">
                          Checked out: {formatDateTime(visitor.checkOutTime)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {visitor.visitMode === 'APPOINTMENT' ? (
                      <div className="flex flex-col text-sm">
                        <span>
                          {visitor.appointmentHost
                            ? `${visitor.appointmentHost.firstName ?? ''} ${visitor.appointmentHost.lastName ?? ''}`.trim()
                            : '—'}
                        </span>
                        {visitor.appointmentTime && (
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(visitor.appointmentTime)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getVisitorStatusColor(visitor.visitorStatus)}>
                      {getStatusLabel(visitor.visitorStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(visitor)}>
                          {visitor.visitorStatus === 'CHECKED_IN'
                            ? 'Mark as checked out'
                            : 'Mark as checked in'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(visitor)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredVisitors.length > 0 ? '1' : '0'}-{filteredVisitors.length} of {filteredVisitors.length} visitors
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
