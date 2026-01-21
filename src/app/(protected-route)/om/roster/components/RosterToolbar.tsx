'use client';

import { Button } from '@/components/ui/button';
import { Copy, Settings } from 'lucide-react';
import { ShiftTypeBadge } from '@/components/ui/shift-type';
import { useShiftTypes } from '@/contexts/ShiftTypeContext';

interface RosterToolbarProps {
  saving?: boolean;
  onCopyNextMonth?: () => void;
  selectedCellsCount?: number;
  onClearSelection?: () => void;
}

export default function RosterToolbar({
  saving = false,
  onCopyNextMonth,
  selectedCellsCount = 0,
  onClearSelection,
}: RosterToolbarProps) {
  const { shifts } = useShiftTypes();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyNextMonth}
          disabled={saving}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy to Next Month
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {selectedCellsCount > 0 && (
          <>
            <span className="text-sm text-muted-foreground">
              {selectedCellsCount} cells selected
            </span>
            <Button variant="ghost" size="sm" onClick={onClearSelection}>
              Clear Selection
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface RosterHeaderActionsProps {}

export function RosterHeaderActions({}: RosterHeaderActionsProps) {
  const { shifts } = useShiftTypes();

  const shiftEntries = Object.entries(shifts || {})
    .filter(([, shift]) => shift?.category === 'main')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, shift]) => {
      const label = (shift?.label ?? code).trim() || code;
      const color = shift?.color || '#E5E7EB';
      const hours = typeof shift?.hours === 'number' ? shift.hours : null;
      const isOff =
        (Number(shift?.hours) || 0) === 0 ||
        String(code).toUpperCase() === 'OFF';
      return { code, label, color, hours, isOff };
    });

  return (
    <div className="flex items-center gap-3 flex-wrap justify-end">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground">
          Shift Types:
        </span>
        {shiftEntries.length > 0 ? (
          shiftEntries.map((entry) => {
            const badgeLabel =
              entry.label.toUpperCase() === entry.code.toUpperCase()
                ? entry.label
                : `${entry.label} (${entry.code})`;
            const badgeTitle =
              entry.hours !== null
                ? `${entry.code} • ${entry.hours}h`
                : entry.code;

            return (
              <span key={entry.code} title={badgeTitle} className="inline-flex">
                <ShiftTypeBadge
                  label={badgeLabel}
                  color={entry.color}
                  isOff={entry.isOff}
                  className="px-2 py-1 text-[11px]"
                />
              </span>
            );
          })
        ) : (
          <span className="text-xs text-muted-foreground">None configured</span>
        )}
      </div>
      <Button variant="outline" size="sm">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}
