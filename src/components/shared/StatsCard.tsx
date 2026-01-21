import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatsCardProps } from '@/types';

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
}: StatsCardProps) {
  return (
    <Card className="2xl:p-6 p-3  bg-white border border-gray-200 hover:shadow-lg transition-shadow h-full">
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 flex flex-col">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          <div className="mt-2 h-5">
            {trend ? (
              <div className="flex items-center">
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600',
                  )}
                >
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  from last week
                </span>
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
        </div>
        <div className={cn('p-3 rounded-lg', iconBgColor)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
    </Card>
  );
}
