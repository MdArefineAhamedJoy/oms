'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  MapPin,
  Building2,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Power,
  PowerOff,
  Download,
} from 'lucide-react';


// Fake data
const fakeSites = [
  {
    documentId: '1',
    name: 'Downtown Plaza',
    siteCode: 'DT01',
    address: '123 Main Street, Downtown, New York, NY 10001',
    siteStatus: 'ACTIVE',
    clients: [{ contactName: 'John Smith' }, { contactName: 'Jane Doe' }],
    userProfiles: [
      { documentId: 'u1' },
      { documentId: 'u2' },
      { documentId: 'u3' },
      { documentId: 'u4' },
    ],
  },
  {
    documentId: '2',
    name: 'Tech Park Complex',
    siteCode: 'TP02',
    address: '456 Tech Avenue, San Francisco, CA 94102',
    siteStatus: 'ACTIVE',
    clients: [{ contactName: 'Tech Corp Inc' }],
    userProfiles: [
      { documentId: 'u5' },
      { documentId: 'u6' },
      { documentId: 'u7' },
      { documentId: 'u8' },
      { documentId: 'u9' },
      { documentId: 'u10' },
    ],
  },
  {
    documentId: '3',
    name: 'Harbor Point',
    siteCode: 'HP03',
    address: '789 Harbor Road, Seattle, WA 98101',
    siteStatus: 'ACTIVE',
    clients: [],
    userProfiles: [
      { documentId: 'u11' },
      { documentId: 'u12' },
      { documentId: 'u13' },
      { documentId: 'u14' },
      { documentId: 'u15' },
    ],
  },
  {
    documentId: '4',
    name: 'Metro Center Mall',
    siteCode: 'MC04',
    address: '321 Mall Boulevard, Chicago, IL 60601',
    siteStatus: 'ACTIVE',
    clients: [{ contactName: 'Mall Management' }, { contactName: 'Security Co' }],
    userProfiles: [
      { documentId: 'u16' },
      { documentId: 'u17' },
      { documentId: 'u18' },
      { documentId: 'u19' },
      { documentId: 'u20' },
      { documentId: 'u21' },
      { documentId: 'u22' },
      { documentId: 'u23' },
    ],
  },
  {
    documentId: '5',
    name: 'Airport Terminal',
    siteCode: 'AT05',
    address: '555 Airport Way, Los Angeles, CA 90001',
    siteStatus: 'INACTIVE',
    clients: [{ contactName: 'Airport Authority' }],
    userProfiles: [
      { documentId: 'u24' },
      { documentId: 'u25' },
    ],
  },
];

const fakeStats = {
  total: 5,
  active: 4,
  inactive: 1,
  withGuards: 4,
};

export default function SitesPage() {
  const [sites, setSites] = useState(fakeSites);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSite, setSelectedSite] = useState(null);

  // Filter sites
  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || site.siteStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle status toggle (optimistic update)
  const handleToggleStatus = (site ) => {
    const newStatus = site.siteStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setSites((prev) =>
      prev.map((s) =>
        s.documentId === site.documentId ? { ...s, siteStatus: newStatus } : s
      )
    );
  };

  // Handle delete (optimistic update)
  const handleDelete = (site) => {
    setSites((prev) => prev.filter((s) => s.documentId !== site.documentId));
  };

  const getStatusBadge = (status) => {
    if (status === 'ACTIVE') {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
    return <Badge variant="destructive">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Site Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage security sites and locations
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Site
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sites</p>
              <p className="text-2xl font-bold">{fakeStats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Sites</p>
              <p className="text-2xl font-bold">{fakeStats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Building2 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Inactive Sites</p>
              <p className="text-2xl font-bold">{fakeStats.inactive}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sites with Guards</p>
              <p className="text-2xl font-bold">{fakeStats.withGuards}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Sites</CardTitle>
          <CardDescription>
            Manage site locations and assignments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site Name</TableHead>
                  <TableHead>Site Code</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Assigned Guards</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSites.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No sites found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSites.map((site) => (
                    <TableRow key={site.documentId}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {site.name}
                        </div>
                      </TableCell>
                      <TableCell>{site.siteCode}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {site.address}
                      </TableCell>
                      <TableCell>
                        {site.clients && site.clients.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {site.clients.slice(0, 2).map((client, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {client.contactName}
                              </Badge>
                            ))}
                            {site.clients.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{site.clients.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{site.userProfiles?.length || 0}</TableCell>
                      <TableCell>{getStatusBadge(site.siteStatus)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Site
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Building2 className="mr-2 h-4 w-4" />
                              Manage Clients
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleStatus(site)}>
                              {site.siteStatus === 'ACTIVE' ? (
                                <>
                                  <PowerOff className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Power className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(site)}
                              className="text-red-600"
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
        </CardContent>
      </Card>
    </div>
  );
}
