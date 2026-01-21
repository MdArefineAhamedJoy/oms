export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'success':
    case 'healthy':
    case 'in':
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'inactive':
    case 'pending':
    case 'warning':
    case 'acknowledged':
      return 'bg-yellow-100 text-yellow-800';
    case 'suspended':
    case 'failed':
    case 'error':
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'in_progress':
    case 'processing':
    case 'investigating':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
    case 'archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getStatusBadge = (
  status: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'success':
      return 'default';
    case 'inactive':
    case 'pending':
      return 'secondary';
    case 'suspended':
    case 'failed':
    case 'error':
      return 'destructive';
    default:
      return 'outline';
  }
};

export const getSiteStatusColor = (status: string): string => {
  return status === 'ACTIVE'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-600';
};

export const getUserStatusColor = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-600';
    case 'SUSPENDED':
      return 'bg-red-100 text-red-800';
    case 'ON_LEAVE':
      return 'bg-yellow-100 text-yellow-800';
    case 'TERMINATED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getTenantStatusColor = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-600';
    case 'SUSPENDED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getIncidentStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'bg-green-100 text-green-700';
    case 'investigating':
      return 'bg-blue-100 text-blue-700';
    case 'acknowledged':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getShiftStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
    case 'ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getShiftTypeColor = (type: string): string => {
  switch (type.toUpperCase()) {
    case 'MORNING':
      return 'bg-yellow-100 text-yellow-700';
    case 'AFTERNOON':
    case 'NOON':
      return 'bg-orange-100 text-orange-700';
    case 'EVENING':
      return 'bg-blue-100 text-blue-700';
    case 'NIGHT':
      return 'bg-indigo-100 text-indigo-700';
    case 'CUSTOM':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getPatrolStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
    case 'ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800';
    case 'missed':
    case 'incomplete':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getVisitorStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'checked_in':
    case 'in':
      return 'bg-green-100 text-green-800';
    case 'checked_out':
    case 'out':
      return 'bg-gray-100 text-gray-600';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getVehicleStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'entered':
    case 'in':
      return 'bg-green-100 text-green-800';
    case 'exited':
    case 'out':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getSupportTicketStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'resolved':
    case 'closed':
      return 'bg-green-100 text-green-800';
    case 'open':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'escalated':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'critical':
    case 'urgent':
      return 'bg-red-100 text-red-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'medium':
    case 'normal':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getPerformanceStatusColor = (
  value: number,
  threshold: number = 90,
): string => {
  if (value >= threshold) {
    return 'bg-green-100 text-green-800';
  } else if (value >= threshold - 10) {
    return 'bg-yellow-100 text-yellow-800';
  } else {
    return 'bg-red-100 text-red-800';
  }
};
