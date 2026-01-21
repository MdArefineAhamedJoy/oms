'use client';

import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ShiftTable from './components/ShiftTable';
import ShiftFilters from './components/ShiftFilters';
import ShiftStats from './components/ShiftStats';
import { fakeShifts, shiftStats } from '@/lib/data/fakeShifts';

export default function ShiftsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter shifts
  const filteredShifts = fakeShifts.filter((shift) => {
    const matchesSearch =
      shift.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.supervisor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || shift.shiftType === typeFilter;
    const matchesStatus = statusFilter === 'all' || shift.status === statusFilter;
    const matchesSite = siteFilter === 'all' || shift.site === siteFilter;

    return matchesSearch && matchesType && matchesStatus && matchesSite;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
    setSiteFilter('all');
  };

  const sites = Array.from(new Set(fakeShifts.map((s) => s.site)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Shift Management</h1>
          <p className="text-zinc-600">
            Manage shift schedules and assignments across all sites
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Create Shift
        </Button>
      </div>

      {/* Stats Cards */}
      <ShiftStats stats={shiftStats} />

      {/* Filters */}
      <ShiftFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        siteFilter={siteFilter}
        setSiteFilter={setSiteFilter}
        sites={sites}
        onClearFilters={handleClearFilters}
      />

      {/* Shifts Table */}
      <Card>
        <CardContent className="p-0">
          <ShiftTable shifts={filteredShifts} loading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
