// Pure incident types - aligned with Strapi schema

export interface IncidentPhoto {
  id: number;
  documentId?: string | null;
  url: string;
  name: string;
  mime?: string;
  size?: number;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: Record<string, unknown> | null;
}

export type IncidentSubType = string;

export interface Incident {
  documentId: string;
  tenantDocumentId: string;
  incidentNumber: string;
  incidentType: string;
  subType: IncidentSubType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  incidentTime: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  photos?: IncidentPhoto[];
  witnesses?: Array<{
    name: string;
    contact: string;
    statement: string;
  }>;
  injuries: boolean;
  propertyDamage: boolean;
  emergencyServicesNotified: boolean;
  incidentStatus: 'REPORTED' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  resolvedAt?: string;
  resolutionNotes?: string;
  clientVisible: boolean;
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
  reportedBy?: {
    documentId: string;
    firstName: string;
    lastName: string;
    employeeId?: string;
    profilePhoto?: string;
    role?: string;
  };
  assignedTo?: {
    documentId: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateIncidentRequest {
  incidentNumber?: string; // Will be auto-generated if not provided
  incidentType: string;
  subType: IncidentSubType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  incidentTime: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  photos?: number[];
  witnesses?: Array<{
    name: string;
    contact: string;
    statement: string;
  }>;
  injuries?: boolean;
  propertyDamage?: boolean;
  emergencyServicesNotified?: boolean;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  clientVisible?: boolean;
  tenant?: string; // Tenant documentId for relation
  site?: string; // Site documentId for relation
  reportedBy?: string; // User profile documentId for relation
  assignedTo?: string; // User profile documentId for relation
}

export interface UpdateIncidentRequest {
  incidentType?: string;
  subType?: IncidentSubType;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title?: string;
  description?: string;
  incidentTime?: string;
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  photos?: number[];
  witnesses?: Array<{
    name: string;
    contact: string;
    statement: string;
  }>;
  injuries?: boolean;
  propertyDamage?: boolean;
  emergencyServicesNotified?: boolean;
  incidentStatus?: 'REPORTED' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  resolvedAt?: string;
  resolutionNotes?: string;
  clientVisible?: boolean;
  assignedTo?: string; // User profile documentId for relation (Strapi uses field name not fieldDocumentId)
  site?: string; // Site documentId for relation
}

export interface IncidentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  incidentType?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  incidentStatus?: 'REPORTED' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  siteDocumentId?: string;
  reportedByDocumentId?: string;
  assignedToDocumentId?: string;
  tenantDocumentId?: string;
  clientVisible?: boolean;
  injuries?: boolean;
  propertyDamage?: boolean;
  startDate?: string;
  endDate?: string;
  sortBy?:
    | 'incidentTime'
    | 'severity'
    | 'priority'
    | 'incidentStatus'
    | 'createdAt'
    | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface IncidentSubtypeConfig {
  documentId: string;
  name: IncidentSubType;
  description?: string;
  order?: number;
}

export interface IncidentTypeConfig {
  documentId: string;
  name: string;
  displayName?: string;
  description?: string;
  order?: number;
  subtypes: IncidentSubtypeConfig[];
}
