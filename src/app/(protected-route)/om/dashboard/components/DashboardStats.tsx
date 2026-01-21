import { Users, MapPin, AlertTriangle, Calendar } from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import { createStatsConfig } from '@/lib/stats-utils';
import { motion } from 'framer-motion';

interface DashboardStatsProps {
  stats: {
    activeGuards: number;
    sitesMonitored: number;
    openIncidents: number;
    todayShifts: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statsConfig = [
    {
      ...createStatsConfig(
        'Active Staff',
        stats.activeGuards.toString(),
        Users,
        {
          trend: undefined,
          variant: 'info',
        },
      ),
      description: 'Guards & Managers',
    },
    {
      ...createStatsConfig(
        'Active Sites',
        stats.sitesMonitored.toString(),
        MapPin,
        {
          trend: undefined,
          variant: 'success',
        },
      ),
      description: 'Currently active',
    },
    {
      ...createStatsConfig(
        'Open Incidents',
        stats.openIncidents.toString(),
        AlertTriangle,
        {
          trend: undefined,
          variant: 'warning',
        },
      ),
      description: 'Requiring attention',
    },
    {
      ...createStatsConfig(
        "Total Shifts",
        stats.todayShifts.toString(),
        Calendar,
        {
          trend: undefined,
          variant: 'default',
        },
      ),
      description: 'Scheduled shifts',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2x:gap-6 gap-3">
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
  );
}
