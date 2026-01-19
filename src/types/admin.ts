// Tenant Types
export type SubscriptionPlan = 'BASIC' | 'STANDARD' | 'PREMIUM';
export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Tenant {
  documentId: string;
  name: string;
  tenantCode: string;
  email: string;
  phone: string;
  licenseNumber: string;
  subscriptionPlan: SubscriptionPlan;
  maxSites: number;
  maxUsers: number;
  settings: Record<string, unknown>;
  tenantStatus: TenantStatus;
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
    sites: number;
    shifts: number;
  };
}

// User Types
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'OPERATIONS_MANAGER' | 'OFFICER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  documentId: string;
  tenantDocumentId: string;
  phone: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  employeeId?: string;
  company?: string;
  position?: string;
  profilePhoto?: string;
  lastLogin?: string;
  failedAttempts: number;
  lockedUntil?: string;
  userStatus: UserStatus;
  permissions: Record<string, unknown>;
  metadata: Record<string, unknown>;
  strapiUser?: {
    documentId: string;
    username: string;
    email: string;
  };
  tenant?: {
    documentId: string;
    name: string;
    tenantCode: string;
  };
  sites?: Array<{
    documentId: string;
    name: string;
    siteCode: string;
  }>;
}

// System Metrics
export interface SystemMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  activeTenants: number;
  tenantGrowth: number;
  totalUsers: number;
  userGrowth: number;
  systemHealth: number;
  activeGuards: number;
  activeShifts: number;
  sitesCovered: number;
  incidentsToday: number;
  guardUtilization: number;
  shiftCoverage: number;
  siteCoveragePercent: number;
  incidentDelta: number;
}

// Analytics Metrics
export interface AnalyticsMetrics {
  totalRevenue: number;
  revenueChange: number;
  activeTenants: number;
  tenantChange: number;
  totalUsers: number;
  userChange: number;
  activeGuards: number;
  guardChange: number;
  sitesMonitored: number;
  siteChange: number;
  incidentsToday: number;
  incidentChange: number;
  slaCompliance: number;
  slaChange: number;
  systemUptime: number;
  uptimeChange: number;
}

// Activity & Alerts
export interface PlatformActivity {
  timestamp: string;
  activityType: string;
  description: string;
  user?: string;
  tenant?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  source: string;
  createdAt: string;
  resolved: boolean;
}

// System Health
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
  apiResponseTime: number;
  databaseStatus: 'healthy' | 'degraded' | 'down';
}

// Chart Data Types
export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface UserGrowthDataPoint {
  month: string;
  users: number;
}

export interface OperationsDataPoint {
  category: string;
  value: number;
  change?: number;
}

export interface SubscriptionDataPoint {
  plan: string;
  count: number;
  percentage: number;
}

export interface PerformanceMetric {
  category: string;
  value: number;
  benchmark?: number;
}

// Activity Log
export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  description: string;
  user: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Pagination
export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Filter Types
export interface TenantFilters {
  search?: string;
  status?: TenantStatus;
  plan?: SubscriptionPlan;
  page?: number;
  pageSize?: number;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  tenant?: string;
  status?: UserStatus;
  page?: number;
  pageSize?: number;
}
