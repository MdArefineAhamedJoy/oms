import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, UserCheck, AlertCircle } from 'lucide-react';

interface ShiftStatsProps {
  stats: {
    total: number;
    active: number;
    scheduled: number;
    fullyStaffed: number;
    understaffed: number;
  };
}

export default function ShiftStats({ stats }: ShiftStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">Total Shifts</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">Active</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900">{stats.active}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">Fully Staffed</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900">{stats.fullyStaffed}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">Understaffed</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900">{stats.understaffed}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
