'use client';

import { useRouter } from 'next/navigation';
import { ShiftSummaryCard } from './components/ShiftSummaryCard';
import { OfficerFunctionsGrid } from './components/OfficerFunctionsGrid';

export default function OfficerDashboard() {
  const router = useRouter();

  const officerInfo = {
    name: 'John Smith',
    documentId: 'OFF-2024-001',
    shift: 'Morning',
    site: 'Main Building',
    startTime: '06:00 AM',
    endTime: '02:00 PM',
    photoUrl: null,
  };

  const currentShift = {
    shiftStatus: 'ONGOING',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    checkInTime: new Date().toISOString(),
    checkOutTime: null,
  };

  return (
    <div className="space-y-4">
      <section className="space-y-2">
        <p className="text-xs text-slate-500">Shift overview</p>
        <ShiftSummaryCard
          officerInfo={officerInfo}
          currentShift={currentShift}
          onCheckIn={() => console.log('Check In clicked')}
          onCheckOut={() => console.log('Check Out clicked')}
          onRefresh={() => console.log('Refresh clicked')}
        />
      </section>

      <section className="space-y-2">
        <p className="text-xs text-slate-500">Officer functions</p>
        <OfficerFunctionsGrid
          onNavigate={(href) => {
            router.push(href);
          }}
        />
      </section>
    </div>
  );
}
