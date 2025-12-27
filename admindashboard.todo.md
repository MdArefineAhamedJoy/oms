I want you to create a modern, responsive Admin Dashboard page UI for an "Office Management System (OMS)" using Next.js 14 (App Router) and TypeScript.

🎯 Tech & Setup:
- Framework: Next.js 14 with App Router (`app/` directory)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Library: shadcn/ui for base components (Card, Button, Tabs, Dropdown, Table, Skeleton, etc.)
- Icons: lucide-react
- Charts: Any React chart library (Recharts or similar)

🎯 Dashboard Context:
This is the **Admin Dashboard** for an Office Management System. The admin manages:
- Employees
- Departments
- Attendance
- Shifts / Roster
- Leave Requests
- Salaries / Payroll
- Tasks / To-dos
- Announcements / Notices

I want a **clean, modern, data-driven layout** with multiple charts and KPI cards. It must be **user friendly**, not overloaded.

🧱 Layout Requirements:
- A top header with:
  - Page title: "Admin Dashboard"
  - Today’s date
  - A small welcome text like “Welcome back, Admin”
  - Right side: a search input, notification icon, profile avatar
- A left sidebar is already assumed to exist (you don’t need to code it), so focus on the **main content area**.

📊 Main Content Structure:
Inside the main content area, build something like this:

1) KPI Summary Cards (Top Row)
   - Use a 4-column responsive grid (1 column on mobile, 2 on tablet, 4 on desktop).
   - Each card should show:
     - A label
     - A big number
     - An icon
     - A small trend indicator (e.g., “+8% vs last month”)
   - Example KPI cards:
     - Total Employees
     - Present Today
     - Pending Leave Requests
     - This Month’s Payroll

2) Charts Section (Middle)
   Use a responsive 2-column grid (1 column on mobile):
   - Left Card: "Attendance Overview"
     - Line chart or area chart showing daily attendance for the last 7 or 30 days.
     - Show Present vs Absent counts if possible.
   - Right Card: "Department Distribution"
     - Pie or donut chart showing employees count per department (HR, IT, Finance, Operations, etc.).

3) Secondary Analytics (Below Charts)
   Another 2-column grid:
   - Left Card: "Monthly Salary Expense"
     - Bar chart showing total salary per month (for last 6 months).
   - Right Card: "Task Completion"
     - Simple chart or progress indicators showing:
       - Total Tasks
       - Completed
       - In Progress
       - Overdue

4) Recent Activity & Tables (Bottom Section)
   Use a 2-column layout on desktop, stacked on mobile:
   - Left: "Recent Attendance Events"
     - A small table with columns: Employee, Status (Present/Absent/Late), Check-in Time, Department.
   - Right: "Latest Leave Requests"
     - A table with: Employee, Type (Sick, Casual, Annual), Dates, Status (Pending/Approved/Rejected), with status badges.

🎨 UI & UX Style:
- Overall look: modern, minimal, clean, with good spacing and soft shadows.
- Use a light background with subtle cards.
- Use a neutral color palette with one accent color (e.g., blue or indigo) for highlights and charts.
- Use badges and subtle colors for statuses (green for Approved, yellow for Pending, red for Rejected, etc.).
- Add hover states on cards and table rows.
- Add skeleton loaders for cards and charts to simulate loading state.
- All cards should be built as reusable components.

📱 Responsiveness:
- Mobile-friendly: stack elements vertically.
- On small screens:
  - KPI cards: 1 per row.
  - Charts: full width one under another.
  - Tables: full width with maybe horizontal scroll if needed.

⚙️ Code Expectations:
- Write a complete React component in TypeScript, e.g. `AdminDashboardPage`.
- Show mock data directly in the component (no API needed).
- Use proper type definitions for data (e.g. Employee, AttendanceRecord, LeaveRequest).
- Split UI into small reusable components where it makes sense (e.g. `KpiCard`, `ChartCard`, `StatusBadge`).
- Include basic Tailwind classes for spacing, typography, and layout.
- Do NOT overcomplicate global state, just local component state and mock data is fine.

The final result should look like a professional, SaaS-style admin dashboard with clear charts and metrics for an Office Management System admin.
