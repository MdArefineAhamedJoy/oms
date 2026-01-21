'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Car,
  Truck,
  Plus,
  Search,
  MapPin,
  Clock,
  Eye,
  Edit,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Camera,
  Ban,
  Shield,
  Users,
} from 'lucide-react';

// Vehicle types constants
const vehicleTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'car', label: 'Cars' },
  { value: 'motorcycle', label: 'Motorcycles' },
  { value: 'truck', label: 'Trucks' },
  { value: 'van', label: 'Vans' },
];

// Fake data
const fakeVehicles = [
  {
    documentId: '1',
    licensePlate: 'ABC-1234',
    vehicleType: 'car',
    make: 'Toyota',
    model: 'Camry',
    color: 'Black',
    ownerName: 'John Smith',
    ownerType: 'employee',
    ownerCompany: 'Tech Corp',
    ownerContact: '+1 (555) 111-2222',
    site: 'Downtown Plaza',
    siteId: 's1',
    parkingSlot: 'A-12',
    entryTime: '09:00',
    exitTime: null,
    duration: '2h 30m',
    status: 'parked' as const,
    permitType: 'employee',
    permitExpiry: 'Dec 2025',
    isBlacklisted: false,
    hasViolations: false,
    lastSeen: '09:00',
    guardName: 'Mike Davis',
    photo: null,
    notes: 'Regular employee parking',
    vehiclePurpose: 'STAFF',
  },
  {
    documentId: '2',
    licensePlate: 'XYZ-5678',
    vehicleType: 'suv',
    make: 'Honda',
    model: 'CR-V',
    color: 'White',
    ownerName: 'Jane Doe',
    ownerType: 'visitor',
    ownerCompany: 'Innovation Labs',
    ownerContact: '+1 (555) 333-4444',
    site: 'Tech Park Complex',
    siteId: 's2',
    parkingSlot: 'B-05',
    entryTime: '10:15',
    exitTime: null,
    duration: '1h 15m',
    status: 'parked' as const,
    permitType: 'visitor',
    permitExpiry: null,
    isBlacklisted: false,
    hasViolations: false,
    lastSeen: '10:15',
    guardName: 'Sarah Johnson',
    photo: null,
    notes: 'Client meeting',
    vehiclePurpose: 'VISITOR',
  },
  {
    documentId: '3',
    licensePlate: 'DEF-9012',
    vehicleType: 'truck',
    make: 'Ford',
    model: 'F-150',
    color: 'Blue',
    ownerName: 'Bob Johnson',
    ownerType: 'vendor',
    ownerCompany: 'Logistics Co',
    ownerContact: '+1 (555) 555-6666',
    site: 'Harbor Point',
    siteId: 's3',
    parkingSlot: 'Loading Zone',
    entryTime: '08:00',
    exitTime: '10:30',
    duration: '2h 30m',
    status: 'exited' as const,
    permitType: 'temporary',
    permitExpiry: null,
    isBlacklisted: false,
    hasViolations: false,
    lastSeen: '10:30',
    guardName: 'Emily Chen',
    photo: null,
    notes: 'Delivery completed',
    vehiclePurpose: 'DELIVERY',
  },
  {
    documentId: '4',
    licensePlate: 'GHI-3456',
    vehicleType: 'car',
    make: 'BMW',
    model: '3 Series',
    color: 'Silver',
    ownerName: 'Alice Williams',
    ownerType: 'contractor',
    ownerCompany: 'StartUp Inc',
    ownerContact: null,
    site: 'Metro Center Mall',
    siteId: 's4',
    parkingSlot: 'C-22',
    entryTime: '07:45',
    exitTime: null,
    duration: '4h 00m',
    status: 'parked' as const,
    permitType: 'temporary',
    permitExpiry: 'Today',
    isBlacklisted: false,
    hasViolations: false,
    lastSeen: '07:45',
    guardName: 'David Lee',
    photo: null,
    notes: 'Long-term parking',
    vehiclePurpose: 'CONTRACTOR',
  },
  {
    documentId: '5',
    licensePlate: 'JKL-7890',
    vehicleType: 'motorcycle',
    make: 'Harley-Davidson',
    model: 'Street 750',
    color: 'Red',
    ownerName: 'Tom Wilson',
    ownerType: 'visitor',
    ownerCompany: null,
    ownerContact: '+1 (555) 777-8888',
    site: 'Downtown Plaza',
    siteId: 's1',
    parkingSlot: 'M-01',
    entryTime: '11:00',
    exitTime: null,
    duration: '0h 45m',
    status: 'parked' as const,
    permitType: 'visitor',
    permitExpiry: null,
    isBlacklisted: false,
    hasViolations: false,
    lastSeen: '11:00',
    guardName: 'Mike Davis',
    photo: null,
    notes: null,
    vehiclePurpose: 'VISITOR',
  },
  {
    documentId: '6',
    licensePlate: 'MNO-2345',
    vehicleType: 'van',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    color: 'White',
    ownerName: 'Courier Express',
    ownerType: 'vendor',
    ownerCompany: 'Courier Express',
    ownerContact: '+1 (555) 999-0000',
    site: 'Tech Park Complex',
    siteId: 's2',
    parkingSlot: null,
    entryTime: '09:30',
    exitTime: null,
    duration: '2h 15m',
    status: 'unauthorized' as const,
    permitType: 'none',
    permitExpiry: null,
    isBlacklisted: false,
    hasViolations: true,
    lastSeen: '09:30',
    guardName: 'Sarah Johnson',
    photo: null,
    notes: 'No permit - parked in reserved spot',
    vehiclePurpose: 'DELIVERY',
  },
];

// Derive sites from vehicles
const sites = [
  { id: 's1', name: 'Downtown Plaza', parkingSlots: 50, occupied: 2 },
  { id: 's2', name: 'Tech Park Complex', parkingSlots: 100, occupied: 2 },
  { id: 's3', name: 'Harbor Point', parkingSlots: 40, occupied: 0 },
  { id: 's4', name: 'Metro Center Mall', parkingSlots: 200, occupied: 1 },
];

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'parked':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'exited':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'unauthorized':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getVehicleIcon = (type: string) => {
  switch (type) {
    case 'truck':
      return <Truck className="h-5 w-5" />;
    case 'motorcycle':
      return <Car className="h-5 w-5" />;
    default:
      return <Car className="h-5 w-5" />;
  }
};

const getOwnerTypeColor = (type: string) => {
  switch (type) {
    case 'employee':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'visitor':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'vendor':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'contractor':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Stat Card Component
function StatCard({
  icon: Icon,
  iconColor,
  title,
  value,
  subtitle,
}: {
  icon: any;
  iconColor: string;
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </Card>
  );
}

// Vehicle Card Component
function VehicleCard({
  vehicle,
  index,
  onToggleStatus,
}: {
  vehicle: typeof fakeVehicles[0];
  index: number;
  onToggleStatus: (vehicle: typeof fakeVehicles[0]) => void;
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
            {getVehicleIcon(vehicle.vehicleType)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-bold text-xl text-gray-900">
                {vehicle.licensePlate}
              </h3>
              <Badge className={getStatusColor(vehicle.status)}>
                {vehicle.status === 'parked' && (
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                )}
                {vehicle.status === 'unauthorized' && (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                )}
                <span className="capitalize">{vehicle.status}</span>
              </Badge>
              {vehicle.hasViolations && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Violation
                </Badge>
              )}
              {vehicle.isBlacklisted && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <Ban className="h-3 w-3 mr-1" />
                  Blacklisted
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">
                {vehicle.make} {vehicle.model}
              </span>
              <span aria-hidden className="text-gray-300">•</span>
              <span>{vehicle.color}</span>
              <span aria-hidden className="text-gray-300">•</span>
              <span className="capitalize">{vehicle.vehicleType}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={getOwnerTypeColor(vehicle.ownerType)}>
                <Users className="h-3 w-3 mr-1" />
                {vehicle.ownerType}
              </Badge>
              <span className="text-sm text-gray-500">
                ID: {vehicle.documentId}
              </span>
              <span aria-hidden className="text-sm text-gray-300">•</span>
              <span className="text-sm text-gray-500">{vehicle.site}</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Vehicle
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              View History
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Camera className="h-4 w-4 mr-2" />
              View Photos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {vehicle.status === 'parked' && (
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onToggleStatus(vehicle)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Mark as Exited
              </DropdownMenuItem>
            )}
            {vehicle.status === 'unauthorized' && (
              <>
                <DropdownMenuItem className="text-yellow-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Issue Warning
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Ban className="h-4 w-4 mr-2" />
                  Add to Blacklist
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Owner</p>
          <p className="font-medium">{vehicle.ownerName || 'Unknown'}</p>
          {vehicle.ownerCompany && (
            <p className="text-xs text-gray-500">{vehicle.ownerCompany}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Parking Slot</p>
          <p className="font-medium">{vehicle.parkingSlot || 'Not assigned'}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Entry Time</p>
          <p className="font-medium">{vehicle.entryTime}</p>
          {vehicle.exitTime && (
            <p className="text-xs text-gray-500">Exit: {vehicle.exitTime}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Duration</p>
          <p className="font-medium">{vehicle.duration}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Permit</p>
          <Badge
            variant="outline"
            className={
              vehicle.permitType === 'none'
                ? 'border-red-200 text-red-700'
                : ''
            }
          >
            {vehicle.permitType}
          </Badge>
          {vehicle.permitExpiry && (
            <p className="text-xs text-gray-500 mt-1">
              Exp: {vehicle.permitExpiry}
            </p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Recorded By</p>
          <p className="font-medium">{vehicle.guardName}</p>
        </div>
      </div>

      {vehicle.notes && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-600">{vehicle.notes}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-gray-500">
        {vehicle.ownerContact && (
          <>
            <span>{vehicle.ownerContact}</span>
            <span aria-hidden className="text-gray-300">•</span>
          </>
        )}
        <span>Last seen: {vehicle.lastSeen}</span>
      </div>

      {/* Action buttons for specific statuses */}
      {vehicle.status === 'unauthorized' && (
        <div className="flex gap-3 mt-4 pt-4 border-t">
          <Button
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Issue Warning
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            <Ban className="h-4 w-4 mr-2" />
            Add to Blacklist
          </Button>
          <Button size="sm" variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Register Vehicle
          </Button>
        </div>
      )}

      {vehicle.hasViolations && vehicle.status !== 'unauthorized' && (
        <div className="flex gap-3 mt-4 pt-4 border-t">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Violations
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-green-700 border-green-200 hover:bg-green-50"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Resolve
          </Button>
        </div>
      )}
    </Card>
  );
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(fakeVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSite, setFilterSite] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Calculate stats
  const stats = useMemo(() => {
    const total = vehicles.length;
    const parked = vehicles.filter((v) => v.status === 'parked').length;
    const exited = vehicles.filter((v) => v.status === 'exited').length;
    const percentage = total > 0 ? Math.round((parked / total) * 1000) / 10 : 0;

    return {
      totalVehicles: { current: total, parked, exited },
      parkingUtilization: { total, occupied: parked, percentage },
      avgDuration: '2h 15m',
    };
  }, [vehicles]);

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesSite = filterSite === 'all' || vehicle.siteId === filterSite;
    const matchesType =
      filterType === 'all' || vehicle.vehicleType === filterType;

    const matchesTab = (() => {
      switch (activeTab) {
        case 'active':
          return vehicle.status === 'parked';
        case 'exited':
          return vehicle.status === 'exited';
        case 'violations':
          return vehicle.hasViolations || vehicle.status === 'unauthorized';
        case 'all':
          return true;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesSite && matchesType && matchesTab;
  });

  const handleToggleStatus = (vehicle: typeof fakeVehicles[0]) => {
    if (vehicle.status === 'parked') {
      setVehicles((prev) =>
        prev.map((v) =>
          v.documentId === vehicle.documentId
            ? { ...v, status: 'exited' as const, exitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : v
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vehicle Management
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage vehicles across all sites
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Register Vehicle
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        <StatCard
          icon={Car}
          iconColor="text-blue-500"
          title="Currently Parked"
          value={stats.totalVehicles.parked}
          subtitle="vs yesterday"
        />
        <StatCard
          icon={MapPin}
          iconColor="text-green-500"
          title="Parking Usage"
          value={`${stats.parkingUtilization.percentage}%`}
          subtitle={`${stats.parkingUtilization.occupied} / ${stats.parkingUtilization.total} vehicles`}
        />
        <StatCard
          icon={Clock}
          iconColor="text-purple-500"
          title="Avg Duration"
          value={stats.avgDuration}
        />
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by license plate, owner, make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={filterSite} onValueChange={setFilterSite}>
              <SelectTrigger className="w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {sites.map((site) => (
                  <SelectItem key={site.id} value={site.id}>
                    {site.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Car className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="parked">Parked</SelectItem>
                <SelectItem value="exited">Exited</SelectItem>
                <SelectItem value="unauthorized">Unauthorized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({vehicles.length})</TabsTrigger>
          <TabsTrigger value="active">
            Currently Parked (
            {vehicles.filter((v) => v.status === 'parked').length})
          </TabsTrigger>
          <TabsTrigger value="exited">
            Exited ({vehicles.filter((v) => v.status === 'exited').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Vehicles List */}
          <div className="space-y-4">
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.documentId}
                vehicle={vehicle}
                index={index}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <Card className="p-12 text-center">
              <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No vehicles found
              </h3>
              <p className="text-gray-600 mb-6">
                No vehicles match your current search or filter criteria.
              </p>
              <Button className="cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Register New Vehicle
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
