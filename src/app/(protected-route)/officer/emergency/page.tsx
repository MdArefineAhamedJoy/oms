'use client';

import { Button } from '@/components/ui/button';
import {
  Phone,
  PhoneCall,
  AlertTriangle,
  Shield,
  Flame,
  Building,
  User,
  ChevronRight,
} from 'lucide-react';

// Fake emergency contacts data
const emergencyContacts = [
  {
    category: 'Emergency Services',
    icon: AlertTriangle,
    color: 'red',
    contacts: [
      { name: 'Emergency Services', number: '911', description: 'Police, Fire, Ambulance' },
      { name: 'Police Station', number: '555-1234', description: 'Local police department' },
      { name: 'Fire Department', number: '555-2345', description: 'Fire and rescue services' },
      { name: 'Ambulance', number: '555-3456', description: 'Medical emergency services' },
    ],
  },
  {
    category: 'Site Management',
    icon: Building,
    color: 'blue',
    contacts: [
      { name: 'Site Manager', number: '+1-555-1001', description: 'On-duty manager' },
      { name: 'Security Control Room', number: '+1-555-1002', description: '24/7 security desk' },
      { name: 'Facilities Manager', number: '+1-555-1003', description: 'Building maintenance' },
    ],
  },
  {
    category: 'Company Contacts',
    icon: Shield,
    color: 'purple',
    contacts: [
      { name: 'Operations Director', number: '+1-555-2001', description: 'Senior management' },
      { name: 'HR Department', number: '+1-555-2002', description: 'Human resources' },
      { name: 'IT Support', number: '+1-555-2003', description: 'Technical support' },
    ],
  },
  {
    category: 'Medical',
    icon: User,
    color: 'green',
    contacts: [
      { name: 'Company Medical Officer', number: '+1-555-3001', description: 'On-site medical' },
      { name: 'Nearest Hospital', number: '+1-555-3002', description: 'City General Hospital' },
      { name: 'Poison Control', number: '1-800-222-1222', description: 'Poison emergency hotline' },
    ],
  },
];

export default function EmergencyPage() {
  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          iconText: 'text-red-600',
          text: 'text-red-900',
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          text: 'text-blue-900',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-600',
          text: 'text-purple-900',
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconText: 'text-green-600',
          text: 'text-green-900',
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-100',
          iconText: 'text-slate-600',
          text: 'text-slate-900',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-3">
          <PhoneCall className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Emergency Contacts</h1>
        <p className="text-sm text-slate-600 mt-1">Quick access to important phone numbers</p>
      </div>

      {/* Emergency Quick Call */}
      <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900">Emergency Services</h3>
              <p className="text-sm text-red-700">Police, Fire, Ambulance</p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => handleCall('911')}
          >
            <Phone className="h-5 w-5 mr-2" />
            Call 911
          </Button>
        </div>
      </div>

      {/* Contact Categories */}
      <div className="space-y-4">
        {emergencyContacts.map((category) => {
          const Icon = category.icon;
          const colors = getColorClasses(category.color);

          return (
            <div
              key={category.category}
              className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}
            >
              {/* Category Header */}
              <div className={`px-4 py-3 border-b ${colors.border}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${colors.iconText}`} />
                  </div>
                  <h3 className={`font-semibold ${colors.text}`}>{category.category}</h3>
                </div>
              </div>

              {/* Contact List */}
              <div className="divide-y divide-inherit">
                {category.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 flex items-center justify-between hover:bg-white/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${colors.text} truncate`}>{contact.name}</h4>
                      <p className="text-xs text-slate-600 truncate">{contact.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(contact.number)}
                      className="flex-shrink-0 ml-2"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h4 className="font-semibold text-slate-900 mb-2">Important Notes</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Always verify the location and nature of emergency before calling</li>
          <li>• For on-site incidents, contact Security Control Room first</li>
          <li>• Keep this list updated with current contact information</li>
          <li>• In case of fire alarm, evacuate immediately and call from outside</li>
        </ul>
      </div>
    </div>
  );
}
