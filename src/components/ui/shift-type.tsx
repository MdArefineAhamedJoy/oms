import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ShiftTypeBadgeProps {
  label: string;
  color: string;
  isOff?: boolean;
  className?: string;
}

export function ShiftTypeBadge({
  label,
  color,
  isOff = false,
  className,
}: ShiftTypeBadgeProps) {
  const textColor = isOff ? 'text-gray-700' : 'text-gray-900';
  const borderColor = isOff ? 'border-gray-300' : 'border-transparent';

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium',
        textColor,
        borderColor,
        className,
      )}
      style={{
        backgroundColor: color,
        borderColor: isOff ? undefined : color,
      }}
    >
      {label}
    </Badge>
  );
}

interface ShiftTypeButtonProps {
  label: string;
  color: string;
  isOff?: boolean;
  size?: 'default' | 'sm';
  onClick?: () => void;
}

export function ShiftTypeButton({
  label,
  color,
  isOff = false,
  size = 'default',
  onClick,
}: ShiftTypeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'font-medium rounded border transition-colors',
        isOff ? 'text-gray-700 border-gray-300' : 'text-gray-900',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        'hover:opacity-80',
      )}
      style={{
        backgroundColor: color,
      }}
    >
      {label}
    </button>
  );
}
