import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { USER_ROLES, type User } from '@/types';
import { formatUserRole, normalizeUserRole } from '@/lib/utils/user-role';

interface StaffStatus {
  documentId: string;
  name: string;
  role: User['role'];
  site: string;
  shift: string;
  status: 'patrolling' | 'on-post' | 'break' | 'off-duty' | 'managing';
}

interface ActiveStaffProps {
  activeStaff: StaffStatus[];
}

export default function ActiveStaff({ activeStaff }: ActiveStaffProps) {
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

  const getRoleBadgeColor = (role: string) => {
    const canonicalRole = normalizeUserRole(role);
    switch (canonicalRole) {
      case USER_ROLES.OFFICER:
        return 'bg-blue-500';
      case USER_ROLES.OM:
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-2 2xl:p-4 bg-white h-full flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold text-gray-900 pt-2">Active Staff</h2>
        <Badge className="bg-green-100 text-green-700">
          {activeStaff.length} Total
        </Badge>
      </div>
      {activeStaff.length === 0 ? (
        <div className="text-center py-8 text-gray-500 flex-1 flex items-center justify-center">
          No active staff at the moment
        </div>
      ) : (
        <>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {activeStaff.map((staff) => (
              <div
                key={staff.documentId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold',
                          'bg-gradient-to-br',
                          normalizeUserRole(staff.role) === USER_ROLES.OM
                            ? 'from-purple-500 to-purple-600'
                            : 'from-blue-500 to-blue-600',
                        )}
                      >
                        {(staff.name || '').trim().charAt(0).toUpperCase()}
                      </div>
                      <div
                        className={cn(
                          'absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold',
                          getRoleBadgeColor(staff.role),
                        )}
                      >
                        {formatUserRole(staff.role).at(0)}
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm flex items-center gap-2">
                      <span className="truncate max-w-[10rem] md:max-w-[16rem] lg:max-w-[24rem] inline-block">{staff.name}</span>
                      {normalizeUserRole(staff.role) === USER_ROLES.OM && (
                        <span className="text-xs text-purple-600 font-normal">
                          (Manager)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600">{staff.site}</p>
                  </div>
                </div>
                <Badge className={cn('shrink-0', getStaffStatusColor(staff.status))}>
                  {staff.status === 'patrolling' && 'Patrolling'}
                  {staff.status === 'on-post' && 'On Post'}
                  {staff.status === 'break' && 'Break'}
                  {staff.status === 'off-duty' && 'Off Duty'}
                  {staff.status === 'managing' && 'Managing'}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-gray-300 cursor-pointer" onClick={() => (window.location.href = '/om/users')}>
            View All Staff
          </Button>
        </>
      )}
    </Card>
  );
}
