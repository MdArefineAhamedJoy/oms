import { LucideIcon } from 'lucide-react';

/**
 * Common stats configuration interface
 */
export interface StatsConfig {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  iconColor?: string;
  iconBg?: string;
}

/**
 * Generate stats configuration with consistent styling
 */
export function createStatsConfig(
  title: string,
  value: number | string,
  icon: LucideIcon,
  options?: {
    trend?: { value: number; isPositive: boolean };
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  },
): StatsConfig {
  const variants = {
    default: {
      bgColor: 'bg-gradient-to-br from-white to-gray-50',
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100',
    },
    success: {
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    warning: {
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    danger: {
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
    },
    info: {
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
  };

  const variant = options?.variant || 'default';
  const style = variants[variant];

  return {
    title,
    value,
    icon,
    trend: options?.trend,
    ...style,
  };
}

/**
 * Calculate percentage change between two values
 */
export function calculateTrend(
  current: number,
  previous: number,
): { value: number; isPositive: boolean } {
  if (previous === 0) {
    return { value: 0, isPositive: true };
  }

  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change),
    isPositive: change >= 0,
  };
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatStatValue(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}
