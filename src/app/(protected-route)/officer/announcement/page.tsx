'use client';

import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Megaphone,
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Fake announcements data
const announcements = [
  {
    documentId: 'ann-001',
    title: 'Updated Security Protocols',
    content: 'New security protocols have been implemented for the main entrance. All officers are required to verify identification badges for all personnel entering after 6 PM. This change is effective immediately.',
    type: 'IMPORTANT',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Security Manager',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    documentId: 'ann-002',
    title: 'Schedule Changes - Next Week',
    content: 'Due to upcoming maintenance work, patrol routes will be modified from Monday to Wednesday. The main building will have restricted access during this period. Please check your updated schedules.',
    type: 'INFO',
    priority: 'medium',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Operations Manager',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    documentId: 'ann-003',
    title: 'Equipment Training Session',
    content: 'A mandatory training session on the new CCTV monitoring system will be held this Friday at 2 PM in the conference room. All officers are required to attend.',
    type: 'INFO',
    priority: 'medium',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Training Coordinator',
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    documentId: 'ann-004',
    title: 'Holiday Schedule',
    content: 'The office will be closed on December 25th and 26th for the holidays. Regular security patrols will continue with modified schedules. Check the duty roster for your assigned shifts.',
    type: 'INFO',
    priority: 'low',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    createdBy: 'HR Department',
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    documentId: 'ann-005',
    title: 'Fire Drill Completed Successfully',
    content: 'Thank you to all officers who participated in yesterday\'s fire drill. The evacuation was completed in 4 minutes, which is within our target time. Well done everyone!',
    type: 'SUCCESS',
    priority: 'low',
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Safety Officer',
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function AnnouncementPage() {
  const getAnnouncementStyle = (type: string, priority: string) => {
    switch (type) {
      case 'IMPORTANT':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          icon: AlertTriangle,
        };
      case 'SUCCESS':
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          icon: CheckCircle,
        };
      case 'INFO':
      default:
        if (priority === 'high') {
          return {
            border: 'border-amber-200',
            bg: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            icon: Bell,
          };
        }
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          icon: Info,
        };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-3">
          <Megaphone className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Announcements</h1>
        <p className="text-sm text-slate-600 mt-1">Important updates and information</p>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((announcement) => {
          const styles = getAnnouncementStyle(announcement.type, announcement.priority);
          const Icon = styles.icon;

          return (
            <div
              key={announcement.documentId}
              className={`rounded-lg border ${styles.border} ${styles.bg} p-4`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${styles.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {announcement.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getPriorityBadge(announcement.priority)}
                        >
                          {announcement.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{announcement.createdBy}</span>
                        <span>•</span>
                        <span>{format(parseISO(announcement.createdAt), 'dd MMM yyyy')}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-3">
                    {announcement.content}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Expires: {format(parseISO(announcement.expiresAt), 'dd MMM yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No More Announcements */}
      <div className="text-center py-6">
        <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-500">No more announcements</p>
      </div>
    </div>
  );
}
