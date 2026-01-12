'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Phone,
  IdCard,
} from 'lucide-react';
import { useState } from 'react';

// Fake data
const visitors = [
  {
    documentId: 'visitor-001',
    name: 'John Davidson',
    company: 'Tech Solutions Inc',
    purpose: 'Meeting with IT Director',
    contactPhone: '+1-555-0123',
    checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    checkOutTime: null,
    status: 'checked_in',
    host: 'Sarah Johnson',
    badgeNumber: 'VST-2024-089',
  },
  {
    documentId: 'visitor-002',
    name: 'Maria Garcia',
    company: 'Self-employed',
    purpose: 'Job Interview',
    contactPhone: '+1-555-0456',
    checkInTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'checked_out',
    host: 'HR Department',
    badgeNumber: 'VST-2024-088',
  },
  {
    documentId: 'visitor-003',
    name: 'Robert Chen',
    company: 'Global Logistics',
    purpose: 'Delivery verification',
    contactPhone: '+1-555-0789',
    checkInTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    checkOutTime: null,
    status: 'checked_in',
    host: 'Warehouse Manager',
    badgeNumber: 'VST-2024-090',
  },
];

export default function VisitorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCheckOut = (visitorId: string) => {
    console.log('Check out visitor:', visitorId);
  };

  const handleCheckIn = () => {
    console.log('Check in new visitor');
    setShowCheckIn(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Visitor Management</h1>
          <p className="text-sm text-slate-600">Track site visitors and check-in/out</p>
        </div>
        <Button onClick={() => setShowCheckIn(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Check In
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-blue-900">{visitors.filter(v => v.status === 'checked_in').length}</p>
              <p className="text-xs text-blue-600">On Site</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-2xl font-semibold text-green-900">{visitors.filter(v => v.status === 'checked_out').length}</p>
              <p className="text-xs text-green-600">Completed Today</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <IdCard className="h-5 w-5 text-slate-600" />
            <div>
              <p className="text-2xl font-semibold text-slate-900">{visitors.length}</p>
              <p className="text-xs text-slate-600">Total Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by name, company, or badge number..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Visitors List */}
      <div className="space-y-2">
        {filteredVisitors.map((visitor) => (
          <div
            key={visitor.documentId}
            className={`rounded-lg border p-4 ${
              visitor.status === 'checked_in'
                ? 'bg-blue-50/50 border-blue-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-slate-900">{visitor.name}</h3>
                  <Badge
                    variant="outline"
                    className={
                      visitor.status === 'checked_in'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }
                  >
                    {visitor.status === 'checked_in' ? (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Checked In
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Checked Out
                      </>
                    )}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <IdCard className="h-3 w-3 text-slate-400" />
                    <span className="font-medium">Badge:</span> {visitor.badgeNumber}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span className="font-medium">Company:</span> {visitor.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    <span className="font-medium">Contact:</span> {visitor.contactPhone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span className="font-medium">Host:</span> {visitor.host}
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-medium">Purpose:</span> {visitor.purpose}
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>In: {formatTime(visitor.checkInTime)}</span>
                  </div>
                  {visitor.checkOutTime && (
                    <div className="flex items-center gap-1">
                      <LogOut className="h-3 w-3 text-slate-400" />
                      <span>Out: {formatTime(visitor.checkOutTime)}</span>
                    </div>
                  )}
                </div>
              </div>

              {visitor.status === 'checked_in' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCheckOut(visitor.documentId)}
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
              <h3 className="text-lg font-semibold">Check In Visitor</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCheckIn(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <Input placeholder="Enter visitor name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Company</label>
                <Input placeholder="Company name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Purpose</label>
                <Input placeholder="Reason for visit" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Contact Phone</label>
                <Input placeholder="+1-555-0000" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Host</label>
                <Input placeholder="Person visiting" />
              </div>
            </div>

            <Button onClick={handleCheckIn} className="w-full">
              Check In Visitor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
