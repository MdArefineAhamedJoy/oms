export interface FakeShift {
  id: string;
  shiftName: string;
  site: string;
  siteCode: string;
  shiftType: 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'CUSTOM';
  startTime: string;
  endTime: string;
  requiredStaff: number;
  assignedStaff: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';
  supervisor: string;
  days: string[];
  notes?: string;
}

export const fakeShifts: FakeShift[] = [
  {
    id: '1',
    shiftName: 'Morning Shift A',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shiftType: 'MORNING',
    startTime: '06:00',
    endTime: '14:00',
    requiredStaff: 5,
    assignedStaff: 5,
    status: 'ACTIVE',
    supervisor: 'John Anderson',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    notes: 'Main entrance and patrol duty',
  },
  {
    id: '2',
    shiftName: 'Afternoon Shift B',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shiftType: 'AFTERNOON',
    startTime: '14:00',
    endTime: '22:00',
    requiredStaff: 5,
    assignedStaff: 4,
    status: 'ACTIVE',
    supervisor: 'Sarah Mitchell',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: '3',
    shiftName: 'Night Shift Alpha',
    site: 'Tech Park Complex',
    siteCode: 'TP02',
    shiftType: 'NIGHT',
    startTime: '22:00',
    endTime: '06:00',
    requiredStaff: 3,
    assignedStaff: 3,
    status: 'ACTIVE',
    supervisor: 'Mike Johnson',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: '4',
    shiftName: 'Morning Patrol',
    site: 'Metro Center Mall',
    siteCode: 'MC04',
    shiftType: 'MORNING',
    startTime: '06:00',
    endTime: '14:00',
    requiredStaff: 8,
    assignedStaff: 8,
    status: 'ACTIVE',
    supervisor: 'Emily Chen',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: '5',
    shiftName: 'Afternoon Security',
    site: 'Metro Center Mall',
    siteCode: 'MC04',
    shiftType: 'AFTERNOON',
    startTime: '14:00',
    endTime: '22:00',
    requiredStaff: 6,
    assignedStaff: 6,
    status: 'ACTIVE',
    supervisor: 'James Wilson',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: '6',
    shiftName: 'Night Watch',
    site: 'Airport Terminal',
    siteCode: 'AT05',
    shiftType: 'NIGHT',
    startTime: '22:00',
    endTime: '06:00',
    requiredStaff: 10,
    assignedStaff: 8,
    status: 'ACTIVE',
    supervisor: 'David Brown',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    notes: 'High security alert - additional staff needed',
  },
  {
    id: '7',
    shiftName: 'Weekend Special',
    site: 'Harbor Point',
    siteCode: 'HP03',
    shiftType: 'CUSTOM',
    startTime: '08:00',
    endTime: '20:00',
    requiredStaff: 4,
    assignedStaff: 5,
    status: 'ACTIVE',
    supervisor: 'Lisa Thompson',
    days: ['Sat', 'Sun'],
  },
  {
    id: '8',
    shiftName: 'Emergency Response',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shiftType: 'CUSTOM',
    startTime: '00:00',
    endTime: '23:59',
    requiredStaff: 2,
    assignedStaff: 0,
    status: 'SCHEDULED',
    supervisor: 'Maria Garcia',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    notes: 'On-call emergency team',
  },
];

export const shiftStats = {
  total: fakeShifts.length,
  active: fakeShifts.filter((s) => s.status === 'ACTIVE').length,
  scheduled: fakeShifts.filter((s) => s.status === 'SCHEDULED').length,
  fullyStaffed: fakeShifts.filter((s) => s.assignedStaff >= s.requiredStaff).length,
  understaffed: fakeShifts.filter((s) => s.assignedStaff < s.requiredStaff).length,
};
