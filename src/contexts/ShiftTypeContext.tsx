'use client';

import { createContext, useContext, ReactNode } from 'react';

interface ShiftType {
  label: string;
  color: string;
  category?: 'main' | 'leave' | 'other';
  hours?: number;
}

interface ShiftTypes {
  [key: string]: ShiftType;
}

interface ShiftTypeContextType {
  shifts: ShiftTypes;
  setShifts?: (shifts: ShiftTypes) => void;
}

const ShiftTypeContext = createContext<ShiftTypeContextType>({
  shifts: {
    'M': { label: 'Morning', color: '#FEF3C7', category: 'main', hours: 8 },
    'A': { label: 'Afternoon', color: '#FED7AA', category: 'main', hours: 8 },
    'N': { label: 'Night', color: '#C7D2FE', category: 'main', hours: 8 },
    'OFF': { label: 'OFF', color: '#E5E7EB', category: 'leave', hours: 0 },
  },
});

export function ShiftTypeProvider({
  children,
  defaultShifts,
}: {
  children: ReactNode;
  defaultShifts?: ShiftTypes;
}) {
  return (
    <ShiftTypeContext.Provider
      value={{
        shifts: defaultShifts || {
          'M': { label: 'Morning', color: '#FEF3C7', category: 'main', hours: 8 },
          'A': { label: 'Afternoon', color: '#FED7AA', category: 'main', hours: 8 },
          'N': { label: 'Night', color: '#C7D2FE', category: 'main', hours: 8 },
          'OFF': { label: 'OFF', color: '#E5E7EB', category: 'leave', hours: 0 },
        },
      }}
    >
      {children}
    </ShiftTypeContext.Provider>
  );
}

export const useShiftTypes = () => {
  return useContext(ShiftTypeContext);
};
