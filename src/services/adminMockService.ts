import {
  Tenant,
  User,
  SystemMetrics,
  AnalyticsMetrics,
  PlatformActivity,
  Alert,
  SystemHealth,
  RevenueDataPoint,
  UserGrowthDataPoint,
  OperationsDataPoint,
  SubscriptionDataPoint,
  PerformanceMetric,
  ActivityLog,
  Pagination,
  ApiResponse,
  TenantFilters,
  UserFilters,
} from '@/types/admin';

// Mock Tenants Data
export const mockTenants: Tenant[] = [
  {
    documentId: 'tenant-1',
    name: 'Acme Security Corp',
    tenantCode: 'ACME001',
    email: 'admin@acme.com',
    phone: '+1-555-0101',
    licenseNumber: 'LIC-2024-001',
    subscriptionPlan: 'PREMIUM',
    maxSites: 50,
    maxUsers: 500,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-10T14:30:00Z',
    _count: { users: 342, sites: 28, shifts: 156 },
  },
  {
    documentId: 'tenant-2',
    name: 'Global Protection Services',
    tenantCode: 'GPS002',
    email: 'contact@gps.com',
    phone: '+1-555-0102',
    licenseNumber: 'LIC-2024-002',
    subscriptionPlan: 'STANDARD',
    maxSites: 25,
    maxUsers: 250,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-06-12T09:15:00Z',
    _count: { users: 187, sites: 18, shifts: 89 },
  },
  {
    documentId: 'tenant-3',
    name: 'SafeGuard Solutions',
    tenantCode: 'SGS003',
    email: 'info@safeguard.com',
    phone: '+1-555-0103',
    licenseNumber: 'LIC-2024-003',
    subscriptionPlan: 'BASIC',
    maxSites: 10,
    maxUsers: 100,
    settings: { timezone: 'UTC', notifications: false },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-06-08T16:45:00Z',
    _count: { users: 78, sites: 8, shifts: 42 },
  },
  {
    documentId: 'tenant-4',
    name: 'Metro Security',
    tenantCode: 'METRO004',
    email: 'ops@metrosec.com',
    phone: '+1-555-0104',
    licenseNumber: 'LIC-2024-004',
    subscriptionPlan: 'PREMIUM',
    maxSites: 100,
    maxUsers: 1000,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'SUSPENDED',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-06-05T11:20:00Z',
    _count: { users: 521, sites: 45, shifts: 210 },
  },
  {
    documentId: 'tenant-5',
    name: 'Elite Guard Force',
    tenantCode: 'ELITE005',
    email: 'admin@eliteguard.com',
    phone: '+1-555-0105',
    licenseNumber: 'LIC-2024-005',
    subscriptionPlan: 'STANDARD',
    maxSites: 30,
    maxUsers: 300,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-06-11T15:30:00Z',
    _count: { users: 234, sites: 22, shifts: 98 },
  },
  {
    documentId: 'tenant-6',
    name: 'Night Watch Inc',
    tenantCode: 'NIGHT006',
    email: 'contact@nightwatch.com',
    phone: '+1-555-0106',
    licenseNumber: 'LIC-2024-006',
    subscriptionPlan: 'BASIC',
    maxSites: 15,
    maxUsers: 150,
    settings: { timezone: 'UTC', notifications: false },
    tenantStatus: 'INACTIVE',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    _count: { users: 45, sites: 5, shifts: 18 },
  },
  {
    documentId: 'tenant-7',
    name: 'Prime Security Partners',
    tenantCode: 'PRIME007',
    email: 'info@primesec.com',
    phone: '+1-555-0107',
    licenseNumber: 'LIC-2024-007',
    subscriptionPlan: 'PREMIUM',
    maxSites: 75,
    maxUsers: 750,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-02-28T10:00:00Z',
    updatedAt: '2024-06-13T12:00:00Z',
    _count: { users: 489, sites: 38, shifts: 178 },
  },
  {
    documentId: 'tenant-8',
    name: 'Shield Force Limited',
    tenantCode: 'SHIELD008',
    email: 'admin@shieldforce.com',
    phone: '+1-555-0108',
    licenseNumber: 'LIC-2024-008',
    subscriptionPlan: 'STANDARD',
    maxSites: 20,
    maxUsers: 200,
    settings: { timezone: 'UTC', notifications: true },
    tenantStatus: 'ACTIVE',
    createdAt: '2024-03-22T10:00:00Z',
    updatedAt: '2024-06-09T14:15:00Z',
    _count: { users: 156, sites: 14, shifts: 67 },
  },
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    documentId: 'user-1',
    tenantDocumentId: 'tenant-1',
    phone: '+1-555-1001',
    role: 'SUPER_ADMIN',
    firstName: 'John',
    lastName: 'Anderson',
    employeeId: 'EMP001',
    company: 'Acme Security Corp',
    position: 'System Administrator',
    lastLogin: '2024-06-13T08:30:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { all: true },
    metadata: { department: 'IT' },
    tenant: { documentId: 'tenant-1', name: 'Acme Security Corp', tenantCode: 'ACME001' },
  },
  {
    documentId: 'user-2',
    tenantDocumentId: 'tenant-1',
    phone: '+1-555-1002',
    role: 'ADMIN',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    employeeId: 'EMP002',
    company: 'Acme Security Corp',
    position: 'Operations Manager',
    lastLogin: '2024-06-13T07:45:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { manageUsers: true, manageShifts: true },
    metadata: { department: 'Operations' },
    tenant: { documentId: 'tenant-1', name: 'Acme Security Corp', tenantCode: 'ACME001' },
    sites: [
      { documentId: 'site-1', name: 'Downtown Plaza', siteCode: 'DT-001' },
      { documentId: 'site-2', name: 'Airport Terminal', siteCode: 'AT-002' },
    ],
  },
  {
    documentId: 'user-3',
    tenantDocumentId: 'tenant-2',
    phone: '+1-555-2001',
    role: 'OPERATIONS_MANAGER',
    firstName: 'Michael',
    lastName: 'Chen',
    employeeId: 'EMP003',
    company: 'Global Protection Services',
    position: 'Regional Manager',
    lastLogin: '2024-06-12T18:20:00Z',
    failedAttempts: 1,
    userStatus: 'ACTIVE',
    permissions: { manageShifts: true, viewReports: true },
    metadata: { region: 'West Coast' },
    tenant: { documentId: 'tenant-2', name: 'Global Protection Services', tenantCode: 'GPS002' },
    sites: [
      { documentId: 'site-3', name: 'Tech Park', siteCode: 'TP-003' },
      { documentId: 'site-4', name: 'Harbor Facility', siteCode: 'HF-004' },
    ],
  },
  {
    documentId: 'user-4',
    tenantDocumentId: 'tenant-1',
    phone: '+1-555-1003',
    role: 'OFFICER',
    firstName: 'James',
    lastName: 'Wilson',
    employeeId: 'EMP004',
    company: 'Acme Security Corp',
    position: 'Security Officer',
    lastLogin: '2024-06-13T06:00:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { patrol: true, report: true },
    metadata: { badgeNumber: 'B-1042' },
    tenant: { documentId: 'tenant-1', name: 'Acme Security Corp', tenantCode: 'ACME001' },
    sites: [
      { documentId: 'site-1', name: 'Downtown Plaza', siteCode: 'DT-001' },
    ],
  },
  {
    documentId: 'user-5',
    tenantDocumentId: 'tenant-3',
    phone: '+1-555-3001',
    role: 'ADMIN',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    employeeId: 'EMP005',
    company: 'SafeGuard Solutions',
    position: 'Office Administrator',
    lastLogin: '2024-06-13T09:00:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { manageUsers: true, manageSchedules: true },
    metadata: { department: 'Administration' },
    tenant: { documentId: 'tenant-3', name: 'SafeGuard Solutions', tenantCode: 'SGS003' },
  },
  {
    documentId: 'user-6',
    tenantDocumentId: 'tenant-2',
    phone: '+1-555-2002',
    role: 'OFFICER',
    firstName: 'David',
    lastName: 'Kim',
    employeeId: 'EMP006',
    company: 'Global Protection Services',
    position: 'Patrol Officer',
    lastLogin: '2024-06-13T07:15:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { patrol: true, checkIn: true },
    metadata: { badgeNumber: 'B-2056' },
    tenant: { documentId: 'tenant-2', name: 'Global Protection Services', tenantCode: 'GPS002' },
    sites: [
      { documentId: 'site-3', name: 'Tech Park', siteCode: 'TP-003' },
    ],
  },
  {
    documentId: 'user-7',
    tenantDocumentId: 'tenant-5',
    phone: '+1-555-5001',
    role: 'OPERATIONS_MANAGER',
    firstName: 'Lisa',
    lastName: 'Thompson',
    employeeId: 'EMP007',
    company: 'Elite Guard Force',
    position: 'Shift Supervisor',
    lastLogin: '2024-06-12T22:30:00Z',
    failedAttempts: 2,
    userStatus: 'ACTIVE',
    permissions: { manageShifts: true, assignOfficers: true },
    metadata: { shift: 'Night' },
    tenant: { documentId: 'tenant-5', name: 'Elite Guard Force', tenantCode: 'ELITE005' },
  },
  {
    documentId: 'user-8',
    tenantDocumentId: 'tenant-4',
    phone: '+1-555-4001',
    role: 'ADMIN',
    firstName: 'Robert',
    lastName: 'Martinez',
    employeeId: 'EMP008',
    company: 'Metro Security',
    position: 'General Manager',
    lastLogin: '2024-06-05T17:00:00Z',
    failedAttempts: 0,
    userStatus: 'SUSPENDED',
    permissions: { all: true },
    metadata: { department: 'Management' },
    tenant: { documentId: 'tenant-4', name: 'Metro Security', tenantCode: 'METRO004' },
  },
  {
    documentId: 'user-9',
    tenantDocumentId: 'tenant-7',
    phone: '+1-555-7001',
    role: 'OFFICER',
    firstName: 'Amanda',
    lastName: 'Lee',
    employeeId: 'EMP009',
    company: 'Prime Security Partners',
    position: 'Senior Officer',
    lastLogin: '2024-06-13T08:45:00Z',
    failedAttempts: 0,
    userStatus: 'ACTIVE',
    permissions: { patrol: true, report: true, train: true },
    metadata: { badgeNumber: 'B-7089', certifications: ['First Aid', 'CPR'] },
    tenant: { documentId: 'tenant-7', name: 'Prime Security Partners', tenantCode: 'PRIME007' },
  },
  {
    documentId: 'user-10',
    tenantDocumentId: 'tenant-1',
    phone: '+1-555-1004',
    role: 'OFFICER',
    firstName: 'Chris',
    lastName: 'Brown',
    employeeId: 'EMP010',
    company: 'Acme Security Corp',
    position: 'Security Officer',
    lastLogin: '2024-06-10T19:30:00Z',
    failedAttempts: 3,
    userStatus: 'INACTIVE',
    permissions: { patrol: true },
    metadata: { badgeNumber: 'B-1098' },
    tenant: { documentId: 'tenant-1', name: 'Acme Security Corp', tenantCode: 'ACME001' },
  },
];

// Mock System Metrics
export const mockSystemMetrics: SystemMetrics = {
  totalRevenue: 2847500,
  revenueGrowth: 12.5,
  activeTenants: 28,
  tenantGrowth: 8.3,
  totalUsers: 3420,
  userGrowth: 15.2,
  systemHealth: 98,
  activeGuards: 1842,
  activeShifts: 342,
  sitesCovered: 156,
  incidentsToday: 23,
  guardUtilization: 87,
  shiftCoverage: 92,
  siteCoveragePercent: 94,
  incidentDelta: -5,
};

// Mock Analytics Metrics
export const mockAnalyticsMetrics: AnalyticsMetrics = {
  totalRevenue: 2847500,
  revenueChange: 12.5,
  activeTenants: 28,
  tenantChange: 8.3,
  totalUsers: 3420,
  userChange: 15.2,
  activeGuards: 1842,
  guardChange: 10.1,
  sitesMonitored: 156,
  siteChange: 7.8,
  incidentsToday: 23,
  incidentChange: -8.3,
  slaCompliance: 96.8,
  slaChange: 2.1,
  systemUptime: 99.9,
  uptimeChange: 0.1,
};

// Mock Platform Activity
export const mockPlatformActivity: PlatformActivity[] = [
  { timestamp: '2024-06-13T09:45:00Z', activityType: 'shift_created', description: 'New shift created', user: 'Sarah Mitchell', tenant: 'Acme Security Corp' },
  { timestamp: '2024-06-13T09:42:00Z', activityType: 'officer_checkin', description: 'Officer checked in', user: 'James Wilson', tenant: 'Acme Security Corp' },
  { timestamp: '2024-06-13T09:38:00Z', activityType: 'incident_reported', description: 'Incident reported', user: 'David Kim', tenant: 'Global Protection Services' },
  { timestamp: '2024-06-13T09:35:00Z', activityType: 'user_login', description: 'User logged in', user: 'John Anderson', tenant: 'Acme Security Corp' },
  { timestamp: '2024-06-13T09:30:00Z', activityType: 'patrol_completed', description: 'Patrol completed', user: 'Amanda Lee', tenant: 'Prime Security Partners' },
  { timestamp: '2024-06-13T09:25:00Z', activityType: 'shift_updated', description: 'Shift updated', user: 'Lisa Thompson', tenant: 'Elite Guard Force' },
  { timestamp: '2024-06-13T09:20:00Z', activityType: 'officer_checkout', description: 'Officer checked out', user: 'James Wilson', tenant: 'Acme Security Corp' },
  { timestamp: '2024-06-13T09:15:00Z', activityType: 'tenant_created', description: 'New tenant onboarded', user: 'John Anderson', tenant: 'Prime Security Partners' },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'error',
    severity: 'critical',
    title: 'Service Degradation',
    message: 'API response time exceeded threshold',
    source: 'API Gateway',
    createdAt: '2024-06-13T09:30:00Z',
    resolved: false,
  },
  {
    id: 'alert-2',
    type: 'warning',
    severity: 'medium',
    title: 'High Memory Usage',
    message: 'Server memory usage at 82%',
    source: 'App Server 2',
    createdAt: '2024-06-13T09:15:00Z',
    resolved: false,
  },
  {
    id: 'alert-3',
    type: 'info',
    severity: 'low',
    title: 'Scheduled Maintenance',
    message: 'Database maintenance scheduled for 2 AM',
    source: 'System',
    createdAt: '2024-06-13T08:00:00Z',
    resolved: true,
  },
  {
    id: 'alert-4',
    type: 'error',
    severity: 'high',
    title: 'Failed Backup',
    message: 'Daily backup failed to complete',
    source: 'Backup Service',
    createdAt: '2024-06-13T07:30:00Z',
    resolved: true,
  },
];

// Mock System Health
export const mockSystemHealth: SystemHealth = {
  status: 'healthy',
  cpu: 45,
  memory: 62,
  disk: 58,
  uptime: 99.9,
  apiResponseTime: 120,
  databaseStatus: 'healthy',
};

// Mock Revenue Data
export const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 180000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 195000 },
  { month: 'Apr', revenue: 245000 },
  { month: 'May', revenue: 280000 },
  { month: 'Jun', revenue: 320000 },
];

// Mock User Growth Data
export const mockUserGrowthData: UserGrowthDataPoint[] = [
  { month: 'Jan', users: 2580 },
  { month: 'Feb', users: 2740 },
  { month: 'Mar', users: 2890 },
  { month: 'Apr', users: 3040 },
  { month: 'May', users: 3210 },
  { month: 'Jun', users: 3420 },
];

// Mock Operations Data
export const mockOperationsData: OperationsDataPoint[] = [
  { category: 'Shifts Completed', value: 12458, change: 8.2 },
  { category: 'Patrols Conducted', value: 42156, change: 12.5 },
  { category: 'Reports Filed', value: 8742, change: -3.2 },
  { category: 'Incidents Resolved', value: 2341, change: 5.8 },
];

// Mock Subscription Data
export const mockSubscriptionData: SubscriptionDataPoint[] = [
  { plan: 'Basic', count: 12, percentage: 42.9 },
  { plan: 'Standard', count: 10, percentage: 35.7 },
  { plan: 'Premium', count: 6, percentage: 21.4 },
];

// Mock Performance Metrics
export const mockPerformanceMetrics: PerformanceMetric[] = [
  { category: 'Response Time', value: 120, benchmark: 150 },
  { category: 'Uptime', value: 99.9, benchmark: 99.5 },
  { category: 'SLA Compliance', value: 96.8, benchmark: 95 },
  { category: 'Guard Utilization', value: 87, benchmark: 80 },
  { category: 'Shift Coverage', value: 92, benchmark: 90 },
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  { id: '1', action: 'create', entity: 'tenant', description: 'Created new tenant: Prime Security Partners', user: 'John Anderson', timestamp: '2024-06-13T09:15:00Z' },
  { id: '2', action: 'update', entity: 'user', description: 'Updated user: Sarah Mitchell', user: 'John Anderson', timestamp: '2024-06-13T09:00:00Z' },
  { id: '3', action: 'delete', entity: 'shift', description: 'Deleted shift: SH-4521', user: 'Sarah Mitchell', timestamp: '2024-06-13T08:45:00Z' },
  { id: '4', action: 'create', entity: 'shift', description: 'Created new shift: SH-4522', user: 'Lisa Thompson', timestamp: '2024-06-13T08:30:00Z' },
  { id: '5', action: 'update', entity: 'incident', description: 'Resolved incident: INC-3421', user: 'Michael Chen', timestamp: '2024-06-13T08:15:00Z' },
];

// Mock API Service
const mockAdminService = {
  // Dashboard & System Health
  getSystemMetrics: async (): Promise<ApiResponse<SystemMetrics>> => {
    await delay(300);
    return { success: true, data: mockSystemMetrics };
  },

  getPlatformActivity: async (): Promise<ApiResponse<PlatformActivity[]>> => {
    await delay(200);
    return { success: true, data: mockPlatformActivity };
  },

  getActiveAlerts: async (): Promise<ApiResponse<Alert[]>> => {
    await delay(200);
    return { success: true, data: mockAlerts.filter(a => !a.resolved) };
  },

  resolveAlert: async (alertId: string): Promise<ApiResponse<{ message: string }>> => {
    await delay(300);
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) alert.resolved = true;
    return { success: true, data: { message: 'Alert resolved successfully' } };
  },

  getSystemHealth: async (): Promise<ApiResponse<SystemHealth>> => {
    await delay(200);
    return { success: true, data: mockSystemHealth };
  },

  // Tenant Management
  getTenants: async (filters?: TenantFilters): Promise<ApiResponse<{ data: Tenant[]; pagination: Pagination }>> => {
    await delay(400);
    let filtered = [...mockTenants];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(search) ||
        t.tenantCode.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search)
      );
    }

    if (filters?.status) {
      filtered = filtered.filter(t => t.tenantStatus === filters.status);
    }

    if (filters?.plan) {
      filtered = filtered.filter(t => t.subscriptionPlan === filters.plan);
    }

    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      success: true,
      data: {
        data: paginated,
        pagination: {
          total: filtered.length,
          page,
          pageSize,
          totalPages: Math.ceil(filtered.length / pageSize),
        },
      },
    };
  },

  getTenant: async (tenantId: string): Promise<ApiResponse<Tenant>> => {
    await delay(300);
    const tenant = mockTenants.find(t => t.documentId === tenantId);
    if (!tenant) {
      return { success: false, data: null as unknown as Tenant, error: 'Tenant not found' };
    }
    return { success: true, data: tenant };
  },

  createTenant: async (tenant: Partial<Tenant>): Promise<ApiResponse<Tenant>> => {
    await delay(400);
    const newTenant: Tenant = {
      documentId: `tenant-${Date.now()}`,
      name: tenant.name || 'New Tenant',
      tenantCode: `NEW${String(mockTenants.length + 1).padStart(3, '0')}`,
      email: tenant.email || '',
      phone: tenant.phone || '',
      licenseNumber: tenant.licenseNumber || '',
      subscriptionPlan: tenant.subscriptionPlan || 'BASIC',
      maxSites: tenant.maxSites || 10,
      maxUsers: tenant.maxUsers || 100,
      settings: tenant.settings || {},
      tenantStatus: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: { users: 0, sites: 0, shifts: 0 },
    };
    mockTenants.push(newTenant);
    return { success: true, data: newTenant };
  },

  updateTenant: async (tenantId: string, updates: Partial<Tenant>): Promise<ApiResponse<Tenant>> => {
    await delay(400);
    const index = mockTenants.findIndex(t => t.documentId === tenantId);
    if (index === -1) {
      return { success: false, data: null as unknown as Tenant, error: 'Tenant not found' };
    }
    mockTenants[index] = { ...mockTenants[index], ...updates, updatedAt: new Date().toISOString() };
    return { success: true, data: mockTenants[index] };
  },

  deleteTenant: async (tenantId: string): Promise<ApiResponse<{ message: string }>> => {
    await delay(400);
    const index = mockTenants.findIndex(t => t.documentId === tenantId);
    if (index === -1) {
      return { success: false, data: null as unknown as { message: string }, error: 'Tenant not found' };
    }
    mockTenants.splice(index, 1);
    return { success: true, data: { message: 'Tenant deleted successfully' } };
  },

  suspendTenant: async (tenantId: string): Promise<ApiResponse<Tenant>> => {
    await delay(300);
    const tenant = mockTenants.find(t => t.documentId === tenantId);
    if (!tenant) {
      return { success: false, data: null as unknown as Tenant, error: 'Tenant not found' };
    }
    tenant.tenantStatus = 'SUSPENDED';
    tenant.updatedAt = new Date().toISOString();
    return { success: true, data: tenant };
  },

  activateTenant: async (tenantId: string): Promise<ApiResponse<Tenant>> => {
    await delay(300);
    const tenant = mockTenants.find(t => t.documentId === tenantId);
    if (!tenant) {
      return { success: false, data: null as unknown as Tenant, error: 'Tenant not found' };
    }
    tenant.tenantStatus = 'ACTIVE';
    tenant.updatedAt = new Date().toISOString();
    return { success: true, data: tenant };
  },

  // User Management
  getUsers: async (filters?: UserFilters): Promise<ApiResponse<{ data: User[]; pagination: Pagination }>> => {
    await delay(400);
    let filtered = [...mockUsers];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(u =>
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search) ||
        u.email?.toLowerCase().includes(search) ||
        u.employeeId?.toLowerCase().includes(search)
      );
    }

    if (filters?.role) {
      filtered = filtered.filter(u => u.role === filters.role);
    }

    if (filters?.status) {
      filtered = filtered.filter(u => u.userStatus === filters.status);
    }

    if (filters?.tenant) {
      filtered = filtered.filter(u => u.tenantDocumentId === filters.tenant);
    }

    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      success: true,
      data: {
        data: paginated,
        pagination: {
          total: filtered.length,
          page,
          pageSize,
          totalPages: Math.ceil(filtered.length / pageSize),
        },
      },
    };
  },

  getUser: async (userId: string): Promise<ApiResponse<User>> => {
    await delay(300);
    const user = mockUsers.find(u => u.documentId === userId);
    if (!user) {
      return { success: false, data: null as unknown as User, error: 'User not found' };
    }
    return { success: true, data: user };
  },

  createUser: async (user: Partial<User>): Promise<ApiResponse<User>> => {
    await delay(400);
    const newUser: User = {
      documentId: `user-${Date.now()}`,
      tenantDocumentId: user.tenantDocumentId || '',
      phone: user.phone || '',
      role: user.role || 'OFFICER',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      employeeId: user.employeeId,
      company: user.company,
      position: user.position,
      profilePhoto: user.profilePhoto,
      lastLogin: undefined,
      failedAttempts: 0,
      userStatus: 'ACTIVE',
      permissions: user.permissions || {},
      metadata: user.metadata || {},
      tenant: user.tenant,
      sites: user.sites,
    };
    mockUsers.push(newUser);
    return { success: true, data: newUser };
  },

  updateUser: async (userId: string, updates: Partial<User>): Promise<ApiResponse<User>> => {
    await delay(400);
    const index = mockUsers.findIndex(u => u.documentId === userId);
    if (index === -1) {
      return { success: false, data: null as unknown as User, error: 'User not found' };
    }
    mockUsers[index] = { ...mockUsers[index], ...updates };
    return { success: true, data: mockUsers[index] };
  },

  deleteUser: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    await delay(400);
    const index = mockUsers.findIndex(u => u.documentId === userId);
    if (index === -1) {
      return { success: false, data: null as unknown as { message: string }, error: 'User not found' };
    }
    mockUsers.splice(index, 1);
    return { success: true, data: { message: 'User deleted successfully' } };
  },

  suspendUser: async (userId: string): Promise<ApiResponse<User>> => {
    await delay(300);
    const user = mockUsers.find(u => u.documentId === userId);
    if (!user) {
      return { success: false, data: null as unknown as User, error: 'User not found' };
    }
    user.userStatus = 'SUSPENDED';
    return { success: true, data: user };
  },

  activateUser: async (userId: string): Promise<ApiResponse<User>> => {
    await delay(300);
    const user = mockUsers.find(u => u.documentId === userId);
    if (!user) {
      return { success: false, data: null as unknown as User, error: 'User not found' };
    }
    user.userStatus = 'ACTIVE';
    return { success: true, data: user };
  },

  // Analytics
  getAnalyticsMetrics: async (): Promise<ApiResponse<AnalyticsMetrics>> => {
    await delay(300);
    return { success: true, data: mockAnalyticsMetrics };
  },

  getRevenueData: async (): Promise<ApiResponse<RevenueDataPoint[]>> => {
    await delay(200);
    return { success: true, data: mockRevenueData };
  },

  getUserGrowthData: async (): Promise<ApiResponse<UserGrowthDataPoint[]>> => {
    await delay(200);
    return { success: true, data: mockUserGrowthData };
  },

  getOperationsData: async (): Promise<ApiResponse<OperationsDataPoint[]>> => {
    await delay(200);
    return { success: true, data: mockOperationsData };
  },

  getSubscriptionData: async (): Promise<ApiResponse<SubscriptionDataPoint[]>> => {
    await delay(200);
    return { success: true, data: mockSubscriptionData };
  },

  getPerformanceData: async (): Promise<ApiResponse<PerformanceMetric[]>> => {
    await delay(200);
    return { success: true, data: mockPerformanceMetrics };
  },

  getRecentActivity: async (): Promise<ApiResponse<ActivityLog[]>> => {
    await delay(200);
    return { success: true, data: mockActivityLogs };
  },

  getAnalyticsData: async (): Promise<ApiResponse<{
    metrics: AnalyticsMetrics;
    revenue: RevenueDataPoint[];
    userGrowth: UserGrowthDataPoint[];
    operations: OperationsDataPoint[];
    subscriptions: SubscriptionDataPoint[];
    performance: PerformanceMetric[];
    activity: ActivityLog[];
  }>> => {
    await delay(400);
    return {
      success: true,
      data: {
        metrics: mockAnalyticsMetrics,
        revenue: mockRevenueData,
        userGrowth: mockUserGrowthData,
        operations: mockOperationsData,
        subscriptions: mockSubscriptionData,
        performance: mockPerformanceMetrics,
        activity: mockActivityLogs,
      },
    };
  },
};

// Helper function to simulate delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default mockAdminService;
