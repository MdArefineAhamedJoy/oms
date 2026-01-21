'use client';

import { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import IncidentTable from './components/IncidentTable';
import IncidentFilters from './components/IncidentFilters';
import IncidentStats from './components/IncidentStats';
import { fakeIncidents, incidentStats } from '@/lib/data/fakeIncidents';
import type { FakeIncident } from '@/lib/data/fakeIncidents';

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIncident, setSelectedIncident] = useState<FakeIncident | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter incidents
  const filteredIncidents = fakeIncidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.site.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSeverityFilter('all');
    setStatusFilter('all');
  };

  const handleStatusUpdate = (incidentId: string, newStatus: FakeIncident['status']) => {
    console.log(`Updating incident ${incidentId} to status ${newStatus}`);
    // TODO: Implement status update
  };

  const handleDelete = (incidentId: string) => {
    console.log(`Deleting incident ${incidentId}`);
    // TODO: Implement delete
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Management</h1>
          <p className="text-muted-foreground">
            Track and manage security incidents across all sites
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Stats Cards */}
      <IncidentStats stats={incidentStats} />

      {/* Filters */}
      <IncidentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Incidents Table */}
      <Card>
        <CardContent className="p-0">
          <IncidentTable
            incidents={filteredIncidents}
            loading={false}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
