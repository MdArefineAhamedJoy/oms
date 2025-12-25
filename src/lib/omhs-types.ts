export type User = {
  id: string;
  name: string;
  role: "super_admin" | "operation_manager" | "employee";
  departmentId?: string;
};

export type Company = { id: string; name: string };
export type Department = { id: string; name: string };
export type Designation = { id: string; name: string };

export type Shift = { id: string; name: string; start: string; end: string };

export type Attendance = {
  userId: string;
  date: string;
  status: "present" | "absent" | "leave";
  checkIn?: string;
  checkOut?: string;
};

export type LeaveType = { id: string; name: string };
export type LeaveRequest = {
  id: string;
  userId: string;
  typeId: string;
  status: "pending" | "approved" | "rejected";
};

export type SalaryStructure = { id: string; name: string; base: number };
export type PayrollRecord = { id: string; userId: string; month: string; net: number };

export type DemoData = {
  users: User[];
  companies: Company[];
  departments: Department[];
  designations: Designation[];
  shifts: Shift[];
  attendance: Attendance[];
  leaveTypes: LeaveType[];
  leaveRequests: LeaveRequest[];
  salaryStructures: SalaryStructure[];
  payrollRecords: PayrollRecord[];
};

