'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Settings,
  Bell,
  Shield,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Fake officer data
const officerInfo = {
  name: 'John Smith',
  documentId: 'OFF-2024-001',
  email: 'john.smith@company.com',
  phone: '+1-555-0123',
  shift: 'Morning',
  site: 'Main Building',
  joinDate: '2023-06-15',
  status: 'Active',
};

const menuItems = [
  {
    icon: User,
    label: 'Profile',
    description: 'View and edit your profile',
    href: '/officer/more/profile',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Bell,
    label: 'Notifications',
    description: 'Manage notification settings',
    href: '/officer/more/notifications',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Shield,
    label: 'Security',
    description: 'Password and security settings',
    href: '/officer/more/security',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FileText,
    label: 'Documents',
    description: 'View your documents and certificates',
    href: '/officer/more/documents',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: HelpCircle,
    label: 'Help & Support',
    description: 'Get help and contact support',
    href: '/officer/more/help',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
  {
    icon: Settings,
    label: 'App Settings',
    description: 'Application preferences',
    href: '/officer/more/settings',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
];

export default function MorePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
            {officerInfo.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">{officerInfo.name}</h2>
            <p className="text-sm text-slate-600">{officerInfo.documentId}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Active
              </Badge>
              <span className="text-xs text-slate-500">
                {officerInfo.shift} Shift • {officerInfo.site}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xl font-semibold text-blue-600">156</p>
          <p className="text-xs text-slate-600">Days Worked</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xl font-semibold text-green-600">42</p>
          <p className="text-xs text-slate-600">Patrols</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xl font-semibold text-purple-600">8</p>
          <p className="text-xs text-slate-600">Reports</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isProfilePage = item.href === '/officer/more/profile';

          return (
            <Link
              key={item.label}
              href={isProfilePage ? '#' : item.href}
              onClick={(e) => {
                if (isProfilePage) {
                  e.preventDefault();
                }
              }}
              className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900">{item.label}</h3>
                <p className="text-xs text-slate-500 truncate">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>

      {/* App Info */}
      <div className="text-center py-4">
        <p className="text-xs text-slate-500">Officer Portal v1.0.0</p>
        <p className="text-xs text-slate-400 mt-1">© 2025 Security Management System</p>
      </div>
    </div>
  );
}
