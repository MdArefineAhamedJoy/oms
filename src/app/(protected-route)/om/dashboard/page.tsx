'use client';

import { useState, useEffect } from 'react';
import { Clock, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import components
import DashboardStats from './components/DashboardStats';
import SiteStaffingCoverage from './components/SiteStaffingCoverage';
import RecentIncidents from './components/RecentIncidents';
import ActiveStaff from './components/ActiveStaff';

// Fake data
const fakeStats = {
  activeGuards: 24,
  sitesMonitored: 8,
  openIncidents: 3,
  todayShifts: 45,
};

const fakeSiteStaffing = [
  {
    documentId: '1',
    name: 'Downtown Plaza',
    siteCode: 'DT01',
    requiredStaff: 5,
    currentStaff: 4,
    shortage: 1,
    status: 'understaffed' as const,
    shifts: {
      'Morning': { required: 2, assigned: 2, status: 'filled' as const },
      'Afternoon': { required: 2, assigned: 1, status: 'partial' as const },
      'Night': { required: 1, assigned: 1, status: 'filled' as const },
    },
  },
  {
    documentId: '2',
    name: 'Tech Park Complex',
    siteCode: 'TP02',
    requiredStaff: 6,
    currentStaff: 6,
    shortage: 0,
    status: 'fully-staffed' as const,
    shifts: {
      'Morning': { required: 3, assigned: 3, status: 'filled' as const },
      'Afternoon': { required: 2, assigned: 2, status: 'filled' as const },
      'Night': { required: 1, assigned: 1, status: 'filled' as const },
    },
  },
  {
    documentId: '3',
    name: 'Harbor Point',
    siteCode: 'HP03',
    requiredStaff: 4,
    currentStaff: 5,
    shortage: -1,
    status: 'overstaffed' as const,
    shifts: {
      'Morning': { required: 2, assigned: 2, status: 'filled' as const },
      'Afternoon': { required: 2, assigned: 3, status: 'filled' as const },
    },
  },
  {
    documentId: '4',
    name: 'Metro Center Mall',
    siteCode: 'MC04',
    requiredStaff: 8,
    currentStaff: 8,
    shortage: 0,
    status: 'fully-staffed' as const,
    shifts: {
      'Morning': { required: 4, assigned: 4, status: 'filled' as const },
      'Afternoon': { required: 3, assigned: 3, status: 'filled' as const },
      'Night': { required: 1, assigned: 1, status: 'filled' as const },
    },
  },
  {
    documentId: '5',
    name: 'Airport Terminal',
    siteCode: 'AT05',
    requiredStaff: 10,
    currentStaff: 8,
    shortage: 2,
    status: 'understaffed' as const,
    shifts: {
      'Morning': { required: 4, assigned: 3, status: 'partial' as const },
      'Afternoon': { required: 4, assigned: 3, status: 'partial' as const },
      'Night': { required: 2, assigned: 2, status: 'filled' as const },
    },
  },
];

const fakeIncidents = [
  {
    documentId: '1',
    title: 'Unauthorized Access Attempt',
    site: 'Downtown Plaza',
    time: '15 minutes ago',
    severity: 'high',
    status: 'investigating',
  },
  {
    documentId: '2',
    title: 'Fire Alarm Malfunction',
    site: 'Tech Park Complex',
    time: '1 hour ago',
    severity: 'medium',
    status: 'acknowledged',
  },
  {
    documentId: '3',
    title: 'Suspicious Package Report',
    site: 'Metro Center Mall',
    time: '2 hours ago',
    severity: 'high',
    status: 'investigating',
  },
  {
    documentId: '4',
    title: 'Parking Lot Dispute',
    site: 'Harbor Point',
    time: '3 hours ago',
    severity: 'low',
    status: 'resolved',
  },
];

const fakeActiveStaff = [
  {
    documentId: '1',
    name: 'John Anderson',
    role: 'operation_manager' as const,
    site: 'All Sites',
    shift: 'Management',
    status: 'managing' as const,
  },
  {
    documentId: '2',
    name: 'Sarah Mitchell',
    role: 'employee' as const,
    site: 'Downtown Plaza',
    shift: 'Morning',
    status: 'patrolling' as const,
  },
  {
    documentId: '3',
    name: 'Mike Johnson',
    role: 'employee' as const,
    site: 'Tech Park Complex',
    shift: 'Morning',
    status: 'on-post' as const,
  },
  {
    documentId: '4',
    name: 'Emily Chen',
    role: 'employee' as const,
    site: 'Metro Center Mall',
    shift: 'Afternoon',
    status: 'patrolling' as const,
  },
  {
    documentId: '5',
    name: 'David Brown',
    role: 'employee' as const,
    site: 'Airport Terminal',
    shift: 'Night',
    status: 'break' as const,
  },
  {
    documentId: '6',
    name: 'Lisa Thompson',
    role: 'employee' as const,
    site: 'Harbor Point',
    shift: 'Morning',
    status: 'on-post' as const,
  },
  {
    documentId: '7',
    name: 'James Wilson',
    role: 'employee' as const,
    site: 'Downtown Plaza',
    shift: 'Afternoon',
    status: 'patrolling' as const,
  },
  {
    documentId: '8',
    name: 'Maria Garcia',
    role: 'employee' as const,
    site: 'Tech Park Complex',
    shift: 'Night',
    status: 'off-duty' as const,
  },
];

export default function OMDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Operations Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>

        {/* Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 bg-white">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-100 rounded w-1/2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6 bg-white">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Operations Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-300"
            onClick={() => window.location.reload()}
          >
            <Clock className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Activity className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div> */}
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={fakeStats} />

      {/* Coverage + Active Staff */}
      <div className="grid grid-cols-1 2xl:gap-6 gap-3 lg:grid-cols-3  lg:h-screen 2xl:h-[85vh] min-h-0">
        <div className="lg:col-span-2 h-full min-h-0 flex flex-col 2xl:gap-6 gap-2">
          <div className="h-1/2 min-h-0">
            <SiteStaffingCoverage siteStaffing={fakeSiteStaffing} loading={loading} />
          </div>
          <div className="h-1/2 min-h-0">
            <RecentIncidents incidents={fakeIncidents} />
          </div>
        </div>
        <div className="lg:col-span-1 h-full min-h-0">
          <ActiveStaff activeStaff={fakeActiveStaff} />
        </div>
      </div>
    </div>
  );
}
