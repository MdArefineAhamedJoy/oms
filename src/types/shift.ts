// Pure shift types - aligned with Strapi schema

export type LateArrivalReason =
  | 'TRAFFIC'
  | 'TRANSPORT_DELAY'
  | 'WEATHER'
  | 'ILLNESS'
  | 'PERSONAL_EMERGENCY'
  | 'OTHER';

export interface ShiftMediaAsset {
  id: number;
  url: string;
  name: string;
  mime?: string;
  size?: number;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, unknown> | null;
}


export interface Shift {
  documentId: string;
  shiftDate: string; // Date string YYYY-MM-DD
  shiftType: string; // Comes from shift template codes in database
  startTime: string; // ISO datetime string from Strapi
  endTime: string; // ISO datetime string from Strapi
  dutyPost?: string;
  checkInTime?: string;
  checkInLocation?: {
    latitude: number;
    longitude: number;
  };
  checkInOverride?: {
    reason: string;
    approvedBy: string;
    timestamp: string;
  };
  checkInNote?: string | null;
  checkInPhoto?: ShiftMediaAsset | null;
  checkOutTime?: string;
  checkOutLocation?: {
    latitude: number;
    longitude: number;
  };
  checkOutOverride?: {
    reason: string;
    approvedBy: string;
    timestamp: string;
  };
  checkOutNote?: string | null;
  checkOutPhoto?: ShiftMediaAsset | null;
  overtimeMinutes: number;
  shiftStatus: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'MISSED';
  notes?: string;
  requiredStaff?: number;
  lateArrivalReason?: LateArrivalReason | null;
  lateArrivalNote?: string | null;
  postConfirmed?: boolean;
  postConfirmationNote?: string | null;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
  manualAdjustment?: boolean;
  adjustedBy?: {
    documentId: string;
    firstName: string;
    lastName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  tenant?: {
    documentId: string;
    name: string;
    tenantCode: string;
  };
  site?: {
    documentId: string;
    name: string;
    siteCode: string;
    address: string;
  };
  user?: {
    documentId: string;
    firstName: string;
    lastName: string;
    employeeId?: string;
  };
  createdBy?: {
    documentId: string;
    firstName: string;
    lastName: string;
  };
  _count?: {
    patrols: number;
    incidents: number;
  };
}

export interface CreateShiftRequest {
  shiftDate: string;
  shiftType: string; // Comes from shift template codes in database
  startTime: string;
  endTime: string;
  dutyPost?: string;
  notes?: string;
  requiredStaff?: number;
}

export interface UpdateShiftRequest {
  shiftDate?: string;
  shiftType?: string; // Comes from shift template codes in database
  startTime?: string;
  endTime?: string;
  dutyPost?: string;
  siteDocumentId?: string;
  // Preferred
  userDocumentId?: string;
  // Backward-compat with older UI bits
  guardDocumentId?: string;
  checkInTime?: string;
  checkInLocation?: {
    latitude: number;
    longitude: number;
  };
  checkInOverride?: {
    reason: string;
    approvedBy: string;
    timestamp: string;
  };
  checkOutTime?: string;
  checkOutLocation?: {
    latitude: number;
    longitude: number;
  };
  checkOutOverride?: {
    reason: string;
    approvedBy: string;
    timestamp: string;
  };
  checkInNote?: string | null;
  checkOutNote?: string | null;
  checkInPhotoId?: number | null;
  checkOutPhotoId?: number | null;
  lateArrivalReason?: LateArrivalReason | null;
  lateArrivalNote?: string | null;
  postConfirmed?: boolean;
  postConfirmationNote?: string | null;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
  manualAdjustment?: boolean;
  adjustedByDocumentId?: string | null;
  overtimeMinutes?: number;
  shiftStatus?: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'MISSED';
  notes?: string;
  requiredStaff?: number;
}

export interface ShiftsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  shiftStatus?: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'MISSED';
  shiftType?: string; // Comes from shift template codes in database
  siteDocumentId?: string;
  // Preferred
  userDocumentId?: string;
  // Backward-compat
  guardDocumentId?: string;
  tenantDocumentId?: string;
  shiftDate?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'shiftDate' | 'startTime' | 'endTime' | 'createdAt' | 'updatedAt' | 'site.name';
  sortOrder?: 'asc' | 'desc';
  excludeOff?: boolean;
}
