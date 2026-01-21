'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Officer {
  id: string;
  name: string;
  officerType: string;
  officerStatus: string;
}

interface Building {
  id: string;
  name: string;
  officers: Officer[];
}

// Fake roster data
const fakeBuildings: Building[] = [
  {
    id: '1',
    name: 'Downtown Plaza',
    officers: [
      { id: '1', name: 'John Smith', officerType: 'Permanent', officerStatus: 'A' },
      { id: '2', name: 'Sarah Johnson', officerType: 'Permanent', officerStatus: 'A' },
      { id: '3', name: 'Mike Brown', officerType: 'Contract', officerStatus: 'A' },
    ],
  },
  {
    id: '2',
    name: 'Tech Park Complex',
    officers: [
      { id: '4', name: 'Emily Chen', officerType: 'Permanent', officerStatus: 'A' },
      { id: '5', name: 'David Lee', officerType: 'Permanent', officerStatus: 'A' },
    ],
  },
  {
    id: '3',
    name: 'Harbor Point',
    officers: [
      { id: '6', name: 'Lisa Thompson', officerType: 'Permanent', officerStatus: 'A' },
      { id: '7', name: 'James Wilson', officerType: 'Contract', officerStatus: 'A' },
      { id: '8', name: 'Maria Garcia', officerType: 'Permanent', officerStatus: 'A' },
    ],
  },
  {
    id: '4',
    name: 'Metro Center Mall',
    officers: [
      { id: '9', name: 'Robert Taylor', officerType: 'Permanent', officerStatus: 'A' },
      { id: '10', name: 'Jennifer White', officerType: 'Permanent', officerStatus: 'A' },
      { id: '11', name: 'Thomas Martinez', officerType: 'Contract', officerStatus: 'A' },
      { id: '12', name: 'Amanda Davis', officerType: 'Permanent', officerStatus: 'A' },
    ],
  },
  {
    id: '5',
    name: 'Airport Terminal',
    officers: [
      { id: '13', name: 'Chris Anderson', officerType: 'Permanent', officerStatus: 'A' },
      { id: '14', name: 'Jessica Robinson', officerType: 'Permanent', officerStatus: 'A' },
    ],
  },
];

// Fake shift data for each officer/day
const fakeShifts: Record<string, Record<number, string>> = {
  '1': { 1: 'M', 2: 'M', 3: 'M', 4: 'M', 5: 'M', 6: 'OFF', 7: 'OFF', 8: 'A', 9: 'A', 10: 'A', 11: 'A', 12: 'A', 13: 'OFF', 14: 'OFF', 15: 'N', 16: 'N', 17: 'N', 18: 'N', 19: 'N', 20: 'OFF', 21: 'OFF', 22: 'M', 23: 'M', 24: 'M', 25: 'M', 26: 'M', 27: 'OFF', 28: 'OFF', 29: 'A', 30: 'A', 31: 'A' },
  '2': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'OFF', 7: 'OFF', 8: 'N', 9: 'N', 10: 'N', 11: 'N', 12: 'N', 13: 'OFF', 14: 'OFF', 15: 'M', 16: 'M', 17: 'M', 18: 'M', 19: 'M', 20: 'OFF', 21: 'OFF', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'OFF', 28: 'OFF', 29: 'N', 30: 'N', 31: 'N' },
  '3': { 1: 'N', 2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'OFF', 7: 'OFF', 8: 'M', 9: 'M', 10: 'M', 11: 'M', 12: 'M', 13: 'OFF', 14: 'OFF', 15: 'A', 16: 'A', 17: 'A', 18: 'A', 19: 'A', 20: 'OFF', 21: 'OFF', 22: 'N', 23: 'N', 24: 'N', 25: 'N', 26: 'N', 27: 'OFF', 28: 'OFF', 29: 'M', 30: 'M', 31: 'M' },
  '4': { 1: 'M', 2: 'M', 3: 'M', 4: 'M', 5: 'M', 6: 'OFF', 7: 'OFF', 8: 'A', 9: 'A', 10: 'A', 11: 'A', 12: 'A', 13: 'OFF', 14: 'OFF', 15: 'N', 16: 'N', 17: 'N', 18: 'N', 19: 'N', 20: 'OFF', 21: 'OFF', 22: 'M', 23: 'M', 24: 'M', 25: 'M', 26: 'M', 27: 'OFF', 28: 'OFF', 29: 'A', 30: 'A', 31: 'A' },
  '5': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'OFF', 7: 'OFF', 8: 'N', 9: 'N', 10: 'N', 11: 'N', 12: 'N', 13: 'OFF', 14: 'OFF', 15: 'M', 16: 'M', 17: 'M', 18: 'M', 19: 'M', 20: 'OFF', 21: 'OFF', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'OFF', 28: 'OFF', 29: 'N', 30: 'N', 31: 'N' },
  '6': { 1: 'N', 2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'OFF', 7: 'OFF', 8: 'M', 9: 'M', 10: 'M', 11: 'M', 12: 'M', 13: 'OFF', 14: 'OFF', 15: 'A', 16: 'A', 17: 'A', 18: 'A', 19: 'A', 20: 'OFF', 21: 'OFF', 22: 'N', 23: 'N', 24: 'N', 25: 'N', 26: 'N', 27: 'OFF', 28: 'OFF', 29: 'M', 30: 'M', 31: 'M' },
  '7': { 1: 'M', 2: 'M', 3: 'M', 4: 'M', 5: 'M', 6: 'OFF', 7: 'OFF', 8: 'A', 9: 'A', 10: 'A', 11: 'A', 12: 'A', 13: 'OFF', 14: 'OFF', 15: 'N', 16: 'N', 17: 'N', 18: 'N', 19: 'N', 20: 'OFF', 21: 'OFF', 22: 'M', 23: 'M', 24: 'M', 25: 'M', 26: 'M', 27: 'OFF', 28: 'OFF', 29: 'A', 30: 'A', 31: 'A' },
  '8': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'OFF', 7: 'OFF', 8: 'N', 9: 'N', 10: 'N', 11: 'N', 12: 'N', 13: 'OFF', 14: 'OFF', 15: 'M', 16: 'M', 17: 'M', 18: 'M', 19: 'M', 20: 'OFF', 21: 'OFF', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'OFF', 28: 'OFF', 29: 'N', 30: 'N', 31: 'N' },
  '9': { 1: 'N', 2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'OFF', 7: 'OFF', 8: 'M', 9: 'M', 10: 'M', 11: 'M', 12: 'M', 13: 'OFF', 14: 'OFF', 15: 'A', 16: 'A', 17: 'A', 18: 'A', 19: 'A', 20: 'OFF', 21: 'OFF', 22: 'N', 23: 'N', 24: 'N', 25: 'N', 26: 'N', 27: 'OFF', 28: 'OFF', 29: 'M', 30: 'M', 31: 'M' },
  '10': { 1: 'M', 2: 'M', 3: 'M', 4: 'M', 5: 'M', 6: 'OFF', 7: 'OFF', 8: 'A', 9: 'A', 10: 'A', 11: 'A', 12: 'A', 13: 'OFF', 14: 'OFF', 15: 'N', 16: 'N', 17: 'N', 18: 'N', 19: 'N', 20: 'OFF', 21: 'OFF', 22: 'M', 23: 'M', 24: 'M', 25: 'M', 26: 'M', 27: 'OFF', 28: 'OFF', 29: 'A', 30: 'A', 31: 'A' },
  '11': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'OFF', 7: 'OFF', 8: 'N', 9: 'N', 10: 'N', 11: 'N', 12: 'N', 13: 'OFF', 14: 'OFF', 15: 'M', 16: 'M', 17: 'M', 18: 'M', 19: 'M', 20: 'OFF', 21: 'OFF', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'OFF', 28: 'OFF', 29: 'N', 30: 'N', 31: 'N' },
  '12': { 1: 'N', 2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'OFF', 7: 'OFF', 8: 'M', 9: 'M', 10: 'M', 11: 'M', 12: 'M', 13: 'OFF', 14: 'OFF', 15: 'A', 16: 'A', 17: 'A', 18: 'A', 19: 'A', 20: 'OFF', 21: 'OFF', 22: 'N', 23: 'N', 24: 'N', 25: 'N', 26: 'N', 27: 'OFF', 28: 'OFF', 29: 'M', 30: 'M', 31: 'M' },
  '13': { 1: 'M', 2: 'M', 3: 'M', 4: 'M', 5: 'M', 6: 'OFF', 7: 'OFF', 8: 'A', 9: 'A', 10: 'A', 11: 'A', 12: 'A', 13: 'OFF', 14: 'OFF', 15: 'N', 16: 'N', 17: 'N', 18: 'N', 19: 'N', 20: 'OFF', 21: 'OFF', 22: 'M', 23: 'M', 24: 'M', 25: 'M', 26: 'M', 27: 'OFF', 28: 'OFF', 29: 'A', 30: 'A', 31: 'A' },
  '14': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'OFF', 7: 'OFF', 8: 'N', 9: 'N', 10: 'N', 11: 'N', 12: 'N', 13: 'OFF', 14: 'OFF', 15: 'M', 16: 'M', 17: 'M', 18: 'M', 19: 'M', 20: 'OFF', 21: 'OFF', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'OFF', 28: 'OFF', 29: 'N', 30: 'N', 31: 'N' },
};

const shiftColors: Record<string, string> = {
  'M': '#FEF3C7',
  'A': '#FED7AA',
  'N': '#C7D2FE',
  'OFF': '#E5E7EB',
};

const shiftLabels: Record<string, string> = {
  'M': 'Morning',
  'A': 'Afternoon',
  'N': 'Night',
  'OFF': 'OFF',
};

interface RosterTableProps {
  month: number;
  year: number;
  daysInMonth: number;
}

export default function RosterTable({ month, year, daysInMonth }: RosterTableProps) {
  const [collapsedBuildings, setCollapsedBuildings] = useState<Set<string>>(new Set());
  const today = new Date();

  const toggleBuilding = (buildingId: string) => {
    const newCollapsed = new Set(collapsedBuildings);
    if (newCollapsed.has(buildingId)) {
      newCollapsed.delete(buildingId);
    } else {
      newCollapsed.add(buildingId);
    }
    setCollapsedBuildings(newCollapsed);
  };

  const getDayName = (day: number) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getShiftForOfficer = (officerId: string, day: number) => {
    return fakeShifts[officerId]?.[day] || 'OFF';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-30">
          <TableRow className="border-b-2">
            <TableHead className="sticky left-0 z-20 bg-muted min-w-[200px] border-r">
              Officer / Site
            </TableHead>
            <TableHead className="w-16 border-r">Type</TableHead>
            <TableHead className="w-16 border-r">Status</TableHead>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(year, month, day);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isToday =
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate();

              return (
                <TableHead
                  key={day}
                  className={cn(
                    'text-center min-w-[50px] p-1 border-r',
                    isWeekend && 'bg-muted/50',
                    isToday && 'border-primary/70 border-2 rounded-md bg-primary/5',
                  )}
                >
                  <div className="text-xs text-muted-foreground">{getDayName(day)}</div>
                  <div className="text-sm font-semibold">{day}</div>
                </TableHead>
              );
            })}
            <TableHead className="text-center sticky right-0 z-20 bg-muted min-w-[80px] border-l">
              Hours
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fakeBuildings.map((building) => {
            const isCollapsed = collapsedBuildings.has(building.id);

            return (
              <>
                {/* Site Header Row */}
                <TableRow key={`header-${building.id}`} className="bg-muted border-t-2 border-b">
                  <TableCell
                    className="sticky left-0 z-10 bg-muted font-bold text-primary border-r cursor-pointer hover:bg-muted/70"
                    onClick={() => toggleBuilding(building.id)}
                  >
                    <div className="flex items-center gap-2">
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <div>
                        {building.name}
                        <div className="text-xs text-muted-foreground font-normal">
                          {building.officers.length} officers
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="bg-muted border-r"></TableCell>
                  <TableCell className="bg-muted border-r"></TableCell>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <TableCell key={day} className="text-center p-1 bg-muted border-r">
                      <div className="text-xs text-muted-foreground">
                        {building.officers.filter(o => getShiftForOfficer(o.id, day) !== 'OFF').length}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell className="border-r border-l bg-muted sticky right-0 z-20"></TableCell>
                </TableRow>

                {/* Officers Rows */}
                {!isCollapsed && building.officers.map((officer) => {
                  // Calculate hours
                  let totalHours = 0;
                  let morningShifts = 0;
                  let afternoonShifts = 0;
                  let nightShifts = 0;

                  for (let day = 1; day <= daysInMonth; day++) {
                    const shift = getShiftForOfficer(officer.id, day);
                    if (shift === 'M') { totalHours += 8; morningShifts++; }
                    else if (shift === 'A') { totalHours += 8; afternoonShifts++; }
                    else if (shift === 'N') { totalHours += 8; nightShifts++; }
                  }

                  return (
                    <TableRow key={officer.id} className="border-b">
                      <TableCell className="sticky left-0 z-10 bg-background font-medium pl-8 border-r">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'w-2 h-2 rounded-full',
                              officer.officerStatus === 'A' && 'bg-green-500',
                            )}
                          />
                          <span className="text-sm">{officer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <Badge variant="outline" className="text-xs">
                          {officer.officerType.charAt(0)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <Badge variant="default" className="text-xs">
                          {officer.officerStatus}
                        </Badge>
                      </TableCell>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const date = new Date(year, month, day);
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                        const shift = getShiftForOfficer(officer.id, day);
                        const bgColor = shiftColors[shift] || '#E5E7EB';
                        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                        return (
                          <TableCell
                            key={day}
                            className={cn(
                              'p-1 text-center border-r cursor-pointer hover:opacity-80',
                              isWeekend && 'bg-muted/50',
                              isPast && 'opacity-50',
                            )}
                            style={{ backgroundColor: bgColor }}
                          >
                            <div className="text-xs font-semibold">{shiftLabels[shift]}</div>
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center sticky right-0 z-20 bg-background border-l font-semibold">
                        {totalHours}h
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* Assign Officers Row */}
                {!isCollapsed && (
                  <TableRow className="border-b-2 hover:bg-muted/30">
                    <TableCell className="sticky left-0 z-10 bg-background border-r pl-8">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Assign / Remove Officers</span>
                      </div>
                    </TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="border-r"></TableCell>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                      <TableCell key={day} className="border-r bg-muted/20"></TableCell>
                    ))}
                    <TableCell className="border-r border-l bg-muted/20 sticky right-0 z-20"></TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
