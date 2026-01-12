'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Car,
  CheckCircle2,
  Clock,
  LogOut,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

// Fake data
const vehicles = [
  {
    documentId: 'vehicle-001',
    registrationNumber: 'ABC-1234',
    make: 'Toyota',
    model: 'Camry',
    color: 'Silver',
    driverName: 'John Smith',
    driverPhone: '+1-555-0123',
    purpose: 'Equipment delivery',
    checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    checkOutTime: null,
    status: 'on_site',
    passNumber: 'VHP-2024-045',
  },
  {
    documentId: 'vehicle-002',
    registrationNumber: 'XYZ-5678',
    make: 'Ford',
    model: 'Transit',
    color: 'White',
    driverName: 'Mike Delivery Service',
    driverPhone: '+1-555-0456',
    purpose: 'Package pickup',
    checkInTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    checkOutTime: null,
    status: 'on_site',
    passNumber: 'VHP-2024-046',
  },
  {
    documentId: 'vehicle-003',
    registrationNumber: 'DEF-9012',
    make: 'Honda',
    model: 'Civic',
    color: 'Black',
    driverName: 'Sarah Johnson',
    driverPhone: '+1-555-0789',
    purpose: 'Visitor',
    checkInTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'departed',
    passNumber: 'VHP-2024-044',
  },
];

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckIn, setShowCheckIn] = useState(false);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCheckOut = (vehicleId: string) => {
    console.log('Check out vehicle:', vehicleId);
  };

  const handleCheckIn = () => {
    console.log('Check in new vehicle');
    setShowCheckIn(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Vehicle Management</h1>
          <p className="text-sm text-slate-600">Track vehicle access to premises</p>
        </div>
        <Button onClick={() => setShowCheckIn(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Check In
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-blue-900">{vehicles.filter(v => v.status === 'on_site').length}</p>
              <p className="text-xs text-blue-600">On Site</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-slate-600" />
            <div>
              <p className="text-2xl font-semibold text-slate-900">{vehicles.length}</p>
              <p className="text-xs text-slate-600">Total Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by registration, make, model, or driver..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Vehicles List */}
      <div className="space-y-2">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.documentId}
            className={`rounded-lg border p-4 ${
              vehicle.status === 'on_site'
                ? 'bg-blue-50/50 border-blue-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <Badge
                    variant="outline"
                    className={
                      vehicle.status === 'on_site'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }
                  >
                    {vehicle.status === 'on_site' ? (
                      <>
                        <Car className="h-3 w-3 mr-1" />
                        On Site
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Departed
                      </>
                    )}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                  <div>
                    <span className="font-medium">Registration:</span> {vehicle.registrationNumber}
                  </div>
                  <div>
                    <span className="font-medium">Color:</span> {vehicle.color}
                  </div>
                  <div>
                    <span className="font-medium">Pass:</span> {vehicle.passNumber}
                  </div>
                  <div>
                    <span className="font-medium">Purpose:</span> {vehicle.purpose}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2 mt-2">
                  <div className="text-xs text-slate-600 mb-1">
                    <span className="font-medium">Driver:</span> {vehicle.driverName}
                  </div>
                  <div className="text-xs text-slate-500">
                    Phone: {vehicle.driverPhone}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <ArrowRight className="h-3 w-3 text-green-500" />
                    <span>In: {formatTime(vehicle.checkInTime)}</span>
                  </div>
                  {vehicle.checkOutTime && (
                    <div className="flex items-center gap-1">
                      <ArrowLeft className="h-3 w-3 text-red-500" />
                      <span>Out: {formatTime(vehicle.checkOutTime)}</span>
                    </div>
                  )}
                </div>
              </div>

              {vehicle.status === 'on_site' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCheckOut(vehicle.documentId)}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Check Out
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Check In Modal */}
      {showCheckIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Check In Vehicle</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCheckIn(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Registration #</label>
                  <Input placeholder="ABC-1234" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Color</label>
                  <Input placeholder="Silver" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Make</label>
                  <Input placeholder="Toyota" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Model</label>
                  <Input placeholder="Camry" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Driver Name</label>
                <Input placeholder="Full name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Driver Phone</label>
                <Input placeholder="+1-555-0000" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Purpose</label>
                <Input placeholder="Reason for visit" />
              </div>
            </div>

            <Button onClick={handleCheckIn} className="w-full">
              Check In Vehicle
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
