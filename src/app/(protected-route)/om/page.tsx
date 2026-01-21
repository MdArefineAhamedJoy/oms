'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Activity, MapPin, Users, AlertTriangle, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import StatsCard from '@/components/shared/StatsCard';
import { createStatsConfig } from '@/lib/stats-utils';
import { getIncidentStatusColor, getSeverityColor } from '@/lib/status-utils';
import { USER_ROLES } from '@/lib/utils/user-role';

// Fake data - same as dashboard
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
];

export default function OMHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const statsConfig = [
    {
      ...createStatsConfig(
        'Active Staff',
        fakeStats.activeGuards.toString(),
        Users,
        { trend: undefined, variant: 'info' },
      ),
      description: 'Guards & Managers',
    },
    {
      ...createStatsConfig(
        'Active Sites',
        fakeStats.sitesMonitored.toString(),
        MapPin,
        { trend: undefined, variant: 'success' },
      ),
      description: 'Currently active',
    },
    {
      ...createStatsConfig(
        'Open Incidents',
        fakeStats.openIncidents.toString(),
        AlertTriangle,
        { trend: undefined, variant: 'warning' },
      ),
      description: 'Requiring attention',
    },
    {
      ...createStatsConfig(
        'Total Shifts',
        fakeStats.todayShifts.toString(),
        Calendar,
        { trend: undefined, variant: 'default' },
      ),
      description: 'Scheduled shifts',
    },
  ];

  const STATUS_STYLES: Record<
    string,
    { badge: string; helper: string }
  > = {
    'fully-staffed': {
      badge: 'bg-emerald-100 text-emerald-700',
      helper: 'All required posts are filled.',
    },
    understaffed: {
      badge: 'bg-amber-100 text-amber-700',
      helper: 'Assign additional officers as soon as possible.',
    },
    overstaffed: {
      badge: 'bg-blue-100 text-blue-700',
      helper: 'Consider redeploying surplus officers.',
    },
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case 'patrolling':
        return 'bg-blue-100 text-blue-700';
      case 'on-post':
        return 'bg-green-100 text-green-700';
      case 'break':
        return 'bg-yellow-100 text-yellow-700';
      case 'off-duty':
        return 'bg-gray-100 text-gray-700';
      case 'managing':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 bg-white">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-100 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
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
        <div className="flex gap-3">
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
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Staffing Coverage */}
        <div className="lg:col-span-2">
          <Card className="bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Site Staffing & Coverage
                </h2>
                <p className="text-sm text-gray-600">
                  Quick view of today&apos;s staffing levels across active sites.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => router.push('/om/tenants')}
              >
                View All Sites
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-600">
                    <th className="pb-3 pr-3 font-medium">Site</th>
                    <th className="pb-3 pr-3 font-medium">Assigned</th>
                    <th className="pb-3 pr-3 font-medium">Coverage</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {fakeSiteStaffing.map((site) => {
                    const statusStyle = STATUS_STYLES[site.status] || STATUS_STYLES['fully-staffed'];
                    const difference = site.currentStaff - site.requiredStaff;

                    return (
                      <tr key={site.documentId} className="border-b last:border-0">
                        <td className="py-3 pr-3">
                          <p className="font-medium text-gray-900">{site.name}</p>
                          {site.siteCode && (
                            <p className="text-xs text-gray-500">{site.siteCode}</p>
                          )}
                        </td>
                        <td className="py-3 pr-3">
                          <p className="text-base font-semibold">{site.currentStaff}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <Badge className={cn('text-xs', statusStyle.badge)}>
                            {difference === 0 ? 'Fully staffed' :
                             difference > 0 ? `+${difference} extra` :
                             `${Math.abs(difference)} short`}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Active Staff */}
        <div>
          <Card className="bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Active Staff
              </h2>
              <Badge className="bg-green-100 text-green-700">
                {fakeActiveStaff.length} Total
              </Badge>
            </div>
            <div className="space-y-3">
              {fakeActiveStaff.map((staff) => (
                <div
                  key={staff.documentId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold',
                        staff.role === 'operation_manager'
                          ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600',
                      )}
                    >
                      {(staff.name || '').trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{staff.name}</p>
                      <p className="text-xs text-gray-600">{staff.site}</p>
                    </div>
                  </div>
                  <Badge className={cn('text-xs', getStaffStatusColor(staff.status))}>
                    {staff.status === 'patrolling' && 'Patrolling'}
                    {staff.status === 'on-post' && 'On Post'}
                    {staff.status === 'managing' && 'Managing'}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-gray-300"
              onClick={() => router.push('/om/users')}
            >
              View All Staff
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Incidents */}
      <Card className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Incidents
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => router.push('/om/incidents')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fakeIncidents.map((incident) => (
            <div
              key={incident.documentId}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => router.push('/om/incidents')}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{incident.title}</h3>
                <Badge
                  className={cn('border text-xs', getSeverityColor(incident.severity))}
                >
                  {incident.severity}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{incident.site}</span>
                <span>•</span>
                <span>{incident.time}</span>
              </div>
              <div className="mt-2">
                <Badge className={cn('text-xs', getIncidentStatusColor(incident.status))}>
                  {incident.status === 'investigating' && 'Investigating'}
                  {incident.status === 'acknowledged' && 'Acknowledged'}
                  {incident.status === 'resolved' && 'Resolved'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-white hover:bg-gray-50"
            onClick={() => router.push('/om/roster')}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Manage Roster</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-white hover:bg-gray-50"
            onClick={() => router.push('/om/users')}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm">View Staff</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-white hover:bg-gray-50"
            onClick={() => router.push('/om/incidents')}
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Incidents</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-white hover:bg-gray-50"
            onClick={() => router.push('/om/reports')}
          >
            <Activity className="h-5 w-5" />
            <span className="text-sm">Reports</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
