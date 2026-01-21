import { LucideIcon } from 'lucide-react';
import { UserRole } from '@/lib/utils/user-role';

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export type User = {
  id: string;
  documentId?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  sites?: Array<{ documentId?: string; name?: string }>;
  employeeId?: string;
  phone?: string;
  hiredDate?: string;
};
