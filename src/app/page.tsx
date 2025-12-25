export default function Home() {
  const features = [
    { title: "Advanced Security", color: "from-blue-500 to-purple-600", desc: "Role-based access and safe UI flows" },
    { title: "Roster & Shifts", color: "from-emerald-500 to-teal-600", desc: "Assign and visualize team schedules" },
    { title: "Attendance", color: "from-indigo-500 to-sky-600", desc: "Daily status, monthly summaries" },
    { title: "Leave", color: "from-rose-500 to-pink-600", desc: "Requests and approvals (mock)" },
    { title: "Payroll", color: "from-amber-500 to-orange-600", desc: "Structures and monthly summaries" },
    { title: "Reports", color: "from-violet-500 to-fuchsia-600", desc: "Quick presets across modules" },
  ];
  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "12+", label: "Modules" },
    { value: "3", label: "Roles" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated blobs background (CSS only) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-6000" />
      </div>

      {/* Simple top bar (local to landing) */}
      <nav className="sticky top-0 z-20 h-16 px-6 flex items-center justify-between bg-white/70 backdrop-blur border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OMHS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/admin" className="glass px-4 py-2 rounded-md text-sm">Admin</a>
          <a href="/om" className="glass px-4 py-2 rounded-md text-sm">OM</a>
          <a href="/employee" className="glass px-4 py-2 rounded-md text-sm">Employee</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="container-section pt-20 pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200">
            Live Demo • No Login Needed
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900">
            Guardly-style Modern Office Management
          </h1>
          <p className="mt-4 text-zinc-600">
            Beautiful landing with animated background, and quick access to Admin, OM and Employee dashboards.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/admin" className="px-6 py-3 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Go to Admin</a>
            <a href="/om" className="px-6 py-3 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">Go to OM</a>
            <a href="/employee" className="px-6 py-3 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-950">Go to Employee</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-section py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${f.color}`} />
              <div className="mt-3 text-lg font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-zinc-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container-section py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-5 text-center">
              <div className="text-3xl font-bold text-zinc-900">{s.value}</div>
              <div className="text-sm text-zinc-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-section pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl p-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="mt-2 text-white/90">Jump into any dashboard — no account required.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/admin" className="px-6 py-3 rounded-md bg-white text-blue-600 text-sm font-medium hover:bg-blue-50">Admin</a>
            <a href="/om" className="px-6 py-3 rounded-md bg-white text-purple-700 text-sm font-medium hover:bg-purple-50">Operation Manager</a>
            <a href="/employee" className="px-6 py-3 rounded-md bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100">Employee</a>
          </div>
          <p className="mt-4 text-xs text-white/80">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-10">
        <div className="container-section flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-xl font-bold text-zinc-800">OMHS</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-600">
            <a className="hover:text-blue-600" href="#">Privacy</a>
            <a className="hover:text-blue-600" href="#">Terms</a>
            <a className="hover:text-blue-600" href="#">Contact</a>
          </div>
          <div className="text-sm text-zinc-500">© 2025 OMHS. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}



