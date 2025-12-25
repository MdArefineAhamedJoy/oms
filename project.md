# Office Management & System (OMS) — Front-End

This repository contains the front-end (Next.js App Router + Tailwind , shadnc , react-hook , OOP concept Typescript must ) for a web-based multi-role HR and Office Management system.

Scope in this iteration focuses on three roles only:

- Super Admin
- Operation Manager
- Employee

The UI reads hard-coded sample data from `public/data/omhs-data.json` and renders role-specific dashboards/pages.

## Objectives

- Replace manual tracking with a centralized, role-based web UI.
- Provide real-time visibility of on-duty/off-duty, attendance, leave, and basic payroll stats.
- Secure data visibility by role (UI-level for this mock; full auth to be added later).

## Modules (front-end mock)

- Authentication (placeholder only; not implemented in this mock)
- Company & Org structure (read-only via sample data)
- Employee Management (list/filter basics shown via data)
- Shift & Roster (sample shifts + simple views)
- Attendance (sample daily/monthly data rendered per role)
- Leave Management (balances + requests lists; approve/reject mocked)
- Payroll (basic summary; read-only from sample data)
- Notifications (simple list)
- Settings (placeholder)

## Data Model (sample JSON)

The JSON (`public/data/omhs-data.json`) includes the following top-level collections:

- `companies`, `branches`, `departments`, `designations`
- `users` (with `role`: `super_admin` | `operation_manager` | `employee`)
- `shifts`, `roster` (per-employee schedule), `attendance`
- `leaveTypes`, `leaveRequests`
- `salaryStructures`, `payrollRecords`
- `notifications`

Note: This is demo data and not a full schema.

## Pages

- `/super-admin` — high-level company stats and quick links
- `/operation-manager` — team/department-oriented attendance + requests
- `/employee` — personal dashboard: todays shift, check-in/out status, monthly view

Home page (`/`) links to the above.

## How to run

1. Install deps (if not already): `pnpm i` or `npm i`.
2. Start dev server: `pnpm dev` or `npm run dev`.
3. Navigate to `/super-admin`, `/operation-manager`, or `/employee`.

No backend is required for this mock; data is served from `public/data/omhs-data.json`.

## Future enhancements

- Real authentication and RBAC enforcement
- API integration with a real backend
- Full CRUD for employees, shifts, attendance, leave, payroll
- Export to CSV/PDF and richer dashboards

## Advanced Dashboards and Routes (User-Friendly)

- Super Admin Dashboard (`/super-admin`)
  - KPIs: Total employees, Present/Absent/On Leave today, Active branches
  - Charts: Monthly attendance trend, Leave by type, Overtime trend
  - Quick Actions: Add employee, Define shift, Configure holidays, Import CSV
  - Filters: Company, branch, department, date range; save/share views
  - Exports: Attendance CSV, Leave CSV, Payroll summary CSV

- Operation Manager Dashboard (`/operation-manager`)
  - Team KPIs: Team size, Present/Absent/On Leave today, Late arrivals today
  - Roster Snapshot: Next 7 days with shift legend and off days
  - Action Inbox: Pending leave approvals, attendance corrections, missing check-outs
  - Drilldowns: Late > grace, Overtime > rule, Absent without leave
  - Bulk Actions: Approve selected, Assign shift, Export selected

- Employee Dashboard (`/employee`)
  - Today: Assigned shift, check-in/check-out buttons (mocked), current status
  - Monthly Summary: Worked hours, Late minutes, OT hours, Leave usage
  - Quick Actions: Apply leave, Request attendance correction, View payslip (mock)
  - Notifications: Recent actions and reminders

### Suggested Routes (by module)

- Organization
  - `/org/companies`, `/org/branches`, `/org/departments`, `/org/designations`

- People
  - `/people/employees` (search/filter, bulk import), `/people/employees/[id]`

- Shifts & Roster
  - `/shifts` (create/update rules and grace), `/roster` (calendar with bulk assign)

- Attendance
  - `/attendance/my` (employee), `/attendance/manage` (HR/Manager approvals), `/attendance/reports`

- Leave
  - `/leave/my`, `/leave/requests` (approve/reject), `/leave/types`

- Payroll
  - `/payroll/structures`, `/payroll/monthly` (run/lock/export), `/payroll/reports`

- Reports & Notifications
  - `/reports` (attendance/leave/payroll presets), `/notifications`

- Settings
  - `/settings/system` (working days, holidays, rules), `/settings/security` (password policy, 2FA toggle)

### Advanced Features (planned/mock)

- Saved views per user, shareable links, default landing view per role
- Approval workflows: multi-step for leave/corrections with comments
- Audit log: who/what/when on sensitive updates (attendance, salary)
- Import/Export: CSV templates for employees/roster/attendance; payroll CSV/PDF
- Policy engine: grace, half-day, OT rules per company/branch; holiday calendar
- Localization/time zones and multi-branch support

### Data and Access

- Data loads from `public/data/omhs-data.json` (mock)
- UI-based role guards for three roles: `super_admin`, `operation_manager`, `employee`
- In production: enforce RBAC server-side and via API
