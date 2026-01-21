export interface FakeAttendance {
  id: string;
  employeeId: string;
  employeeName: string;
  site: string;
  siteCode: string;
  shift: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'EARLY_DEPARTURE';
  location?: string;
  notes?: string;
  photoUrl?: string;
}

export const fakeAttendance: FakeAttendance[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Anderson',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shift: 'Morning',
    checkInTime: '2024-01-15T06:00:00Z',
    status: 'PRESENT',
    location: 'Main Entrance',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Mitchell',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shift: 'Morning',
    checkInTime: '2024-01-15T06:15:00Z',
    status: 'LATE',
    location: 'Main Entrance',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    site: 'Tech Park Complex',
    siteCode: 'TP02',
    shift: 'Morning',
    checkInTime: '2024-01-15T06:00:00Z',
    status: 'PRESENT',
    location: 'Building A Entrance',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'Emily Chen',
    site: 'Metro Center Mall',
    siteCode: 'MC04',
    shift: 'Afternoon',
    checkInTime: '2024-01-15T14:00:00Z',
    checkOutTime: '2024-01-15T21:00:00Z',
    status: 'PRESENT',
    location: 'Security Office',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'David Brown',
    site: 'Airport Terminal',
    siteCode: 'AT05',
    shift: 'Night',
    checkInTime: '2024-01-15T22:00:00Z',
    status: 'PRESENT',
    location: 'Terminal 1 Checkpoint',
  },
  {
    id: '6',
    employeeId: 'EMP006',
    employeeName: 'Lisa Thompson',
    site: 'Harbor Point',
    siteCode: 'HP03',
    shift: 'Morning',
    checkInTime: '2024-01-15T06:00:00Z',
    checkOutTime: '2024-01-15T12:30:00Z',
    status: 'EARLY_DEPARTURE',
    location: 'Main Gate',
    notes: 'Medical emergency - left early',
  },
  {
    id: '7',
    employeeId: 'EMP007',
    employeeName: 'James Wilson',
    site: 'Downtown Plaza',
    siteCode: 'DT01',
    shift: 'Afternoon',
    checkInTime: '2024-01-15T13:45:00Z',
    status: 'LATE',
    location: 'Main Entrance',
  },
  {
    id: '8',
    employeeId: 'EMP008',
    employeeName: 'Maria Garcia',
    site: 'Tech Park Complex',
    siteCode: 'TP02',
    shift: 'Night',
    checkInTime: '2024-01-15T22:00:00Z',
    status: 'PRESENT',
    location: 'Building B Lobby',
  },
];

export const attendanceStats = {
  total: fakeAttendance.length,
  present: fakeAttendance.filter((a) => a.status === 'PRESENT').length,
  late: fakeAttendance.filter((a) => a.status === 'LATE').length,
  absent: fakeAttendance.filter((a) => a.status === 'ABSENT').length,
  earlyDeparture: fakeAttendance.filter((a) => a.status === 'EARLY_DEPARTURE').length,
};
