'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceStats from './components/AttendanceStats';
import { fakeAttendance, attendanceStats } from '@/lib/data/fakeAttendance';
import type { FakeAttendance } from '@/lib/data/fakeAttendance';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [siteFilter, setSiteFilter] = useState<string>('all');

  // Filter attendance
  const filteredAttendance = fakeAttendance.filter((attendance) => {
    const matchesSearch =
      attendance.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.site.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || attendance.status === statusFilter;
    const matchesSite = siteFilter === 'all' || attendance.site === siteFilter;

    return matchesSearch && matchesStatus && matchesSite;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSiteFilter('all');
  };

  const sites = Array.from(new Set(fakeAttendance.map((a) => a.site)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-muted-foreground">
            Track and manage staff attendance across all sites
          </p>
        </div>
        <Button variant="outline" className="cursor-pointer">
          <Calendar className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <AttendanceStats stats={attendanceStats} />

      {/* Filters */}
      <AttendanceFilters
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        siteFilter={siteFilter}
        setSiteFilter={setSiteFilter}
        sites={sites}
        onClearFilters={handleClearFilters}
      />

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-0">
          <AttendanceTable attendance={filteredAttendance} loading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
