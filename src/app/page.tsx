// "use client"
// import { motion } from "framer-motion"
// import {
//   ArrowRight,
//   Shield,
//   Calendar,
//   Clock,
//   UserCheck,
//   CreditCard,
//   BarChart3,
//   Zap,
//   CheckCircle2,
//   Menu,
//   X,
// } from "lucide-react"
// import { useState } from "react"

// export default function Home() {
//   const features = [
//     {
//       title: "Advanced Security",
//       icon: <Shield className="h-5 w-5 text-white" />,
//       color: "from-indigo-600 via-violet-600 to-pink-600",
//       desc: "Enterprise-grade role-based access control and encrypted UI flows for maximum safety.",
//     },
//     {
//       title: "Roster & Shifts",
//       icon: <Calendar className="h-5 w-5 text-white" />,
//       color: "from-emerald-600 via-teal-600 to-cyan-600",
//       desc: "Intelligent scheduling system to assign and visualize team rotations effortlessly.",
//     },
//     {
//       title: "Attendance",
//       icon: <Clock className="h-5 w-5 text-white" />,
//       color: "from-indigo-600 via-blue-600 to-sky-500",
//       desc: "Real-time presence tracking with comprehensive daily and monthly status insights.",
//     },
//     {
//       title: "Leave Management",
//       icon: <UserCheck className="h-5 w-5 text-white" />,
//       color: "from-rose-600 to-pink-700",
//       desc: "Streamlined request and approval workflows with automated balance calculations.",
//     },
//     {
//       title: "Smart Payroll",
//       icon: <CreditCard className="h-5 w-5 text-white" />,
//       color: "from-rose-600 via-orange-600 to-amber-500",
//       desc: "Automated salary structures and digital payslips with one-click monthly summaries.",
//     },
//     {
//       title: "Advanced Reports",
//       icon: <BarChart3 className="h-5 w-5 text-white" />,
//       color: "from-violet-600 to-fuchsia-700",
//       desc: "Powerful data visualization across all modules with customizable preset exports.",
//     },
//   ]

//   const stats = [
//     { value: "99.9%", label: "Uptime" },
//     { value: "12+", label: "Modules" },
//     { value: "3", label: "Core Roles" },
//     { value: "24/7", label: "Smart Support" },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94]
//       },
//     },
//   }

//   const cardVariants = {
//     hidden: { scale: 0.9, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       },
//     },
//   }

//   const floatAnimation = {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   }

//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white">
//       {/* Navigation */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"
//       >
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//           <motion.div 
//             className="flex items-center gap-2 text-xl font-bold"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500">
//               <Zap className="h-5 w-5 text-white" />
//             </div>
//             <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
//               OMS
//             </span>
//           </motion.div>
//           <div className="hidden items-center gap-8 md:flex">
//             {["Features", "Enterprise", "Support"].map((item) => (
//               <motion.a
//                 key={item}
//                 href="#"
//                 className="text-sm text-gray-300 transition-colors hover:text-white"
//                 whileHover={{ y: -2 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {item}
//               </motion.a>
//             ))}
//           </div>
//           <div className="hidden items-center gap-3 md:flex">
//             <motion.button 
//               className="rounded-lg px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Sign In
//             </motion.button>
//             <motion.button 
//               className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-pink-500/30"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span className="relative z-10">Get Started</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
//             </motion.button>
//           </div>
//           <button
//             className="md:hidden text-gray-300"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </button>
//         </div>
//         {isMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden"
//           >
//             {["Features", "Enterprise", "Support"].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="block py-2 text-sm text-gray-300 transition-colors hover:text-white"
//               >
//                 {item}
//               </a>
//             ))}
//             <button className="mt-3 w-full rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-300">
//               Sign In
//             </button>
//           </motion.div>
//         )}
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
//         <div className="relative z-10 mx-auto max-w-6xl text-center">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-sm"
//           >
//             <Zap className="h-3 w-3" />
//             Next Gen Office Management System
//           </motion.div>
//           <motion.h1
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//             className="mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl"
//           >
//             Office Management
//             <br />
//             <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text">
//               Redefined.
//             </span>
//           </motion.h1>
//           <motion.p
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: 0.2 }}
//             className="mx-auto mb-8 max-w-2xl text-base text-gray-400 sm:text-lg"
//           >
//             Experience a powerful, role-based platform designed for modern HR efficiency. One unified system for your entire organization.
//           </motion.p>
//           <motion.div
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: 0.3 }}
//             className="flex flex-col items-center justify-center gap-3 sm:flex-row"
//           >
//             <motion.button 
//               className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:shadow-pink-500/40"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Start Free Trial
//               <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//             </motion.button>
//             <motion.button 
//               className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Book a Demo
//             </motion.button>
//           </motion.div>
//         </div>
//         <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/20 to-pink-600/20 blur-3xl" />
//       </section>

//       {/* Role-Specific Perspective */}
//       <section className="px-4 py-12 sm:px-6 lg:px-8">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
//         >
//           <motion.div
//             variants={cardVariants}
//             whileHover={{ y: -8, scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//             className="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 to-violet-950/30 p-6 backdrop-blur-xl"
//           >
//             <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-3xl" />
//             <div className="relative z-10">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white">
//                 <Shield className="h-3 w-3" />
//                 Super Admin
//               </div>
//               <h3 className="mb-2 text-xl font-bold text-white">
//                 Command Center.
//               </h3>
//               <p className="mb-4 text-sm text-gray-400">
//                 Full governance over rosters, payroll modules, and system-wide security protocols.
//               </p>
//               <motion.button 
//                 className="group/btn flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
//                 whileHover={{ x: 5 }}
//               >
//                 Launch Admin
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
//               </motion.button>
//             </div>
//           </motion.div>

//           <motion.div
//             variants={cardVariants}
//             whileHover={{ y: -8, scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//             className="group relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-950/50 to-orange-950/30 p-6 backdrop-blur-xl"
//           >
//             <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-rose-500/20 to-orange-500/20 blur-3xl" />
//             <div className="relative z-10">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 px-3 py-1 text-xs font-semibold text-white">
//                 <BarChart3 className="h-3 w-3" />
//                 Operations
//               </div>
//               <h3 className="mb-2 text-xl font-bold text-white">
//                 Strategic Flow.
//               </h3>
//               <p className="mb-4 text-sm text-gray-400">
//                 Real-time team orchestration, presence tracking, and incident resolution center.
//               </p>
//               <motion.button 
//                 className="group/btn flex items-center gap-2 text-sm font-medium text-rose-400 transition-colors hover:text-rose-300"
//                 whileHover={{ x: 5 }}
//               >
//                 Manage Ops
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
//               </motion.button>
//             </div>
//           </motion.div>

//           <motion.div
//             variants={cardVariants}
//             whileHover={{ y: -8, scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//             className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-teal-950/30 p-6 backdrop-blur-xl"
//           >
//             <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
//             <div className="relative z-10">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-3 py-1 text-xs font-semibold text-white">
//                 <UserCheck className="h-3 w-3" />
//                 My Portal
//               </div>
//               <h3 className="mb-2 text-xl font-bold text-white">
//                 Daily Sync.
//               </h3>
//               <p className="mb-4 text-sm text-gray-400">
//                 Your personal space for shift timings, attendance logs, and leave requests.
//               </p>
//               <motion.button 
//                 className="group/btn flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
//                 whileHover={{ x: 5 }}
//               >
//                 Open Portal
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Feature Grid */}
//       <section className="px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-6xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="mb-10 text-center"
//           >
//             <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
//               Powerful Core Modules.
//             </h2>
//             <p className="text-sm text-gray-400 sm:text-base">
//               Everything you need to modernize your office operations in one unified workspace.
//             </p>
//           </motion.div>
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
//           >
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 variants={cardVariants}
//                 whileHover={{ y: -5, scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//                 className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-lg"
//               >
//                 <motion.div 
//                   className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${f.color} shadow-lg`}
//                   animate={floatAnimation}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   {f.icon}
//                 </motion.div>
//                 <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
//                 <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
//                 <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Statistics */}
//       <section className="px-4 py-12 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 to-pink-950/20 backdrop-blur-xl"
//         >
//           <div className="grid gap-8 p-8 sm:grid-cols-4 sm:p-10">
//             {stats.map((s, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.5 }}
//                 className="text-center"
//               >
//                 <motion.div 
//                   className="mb-1 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {s.value}
//                 </motion.div>
//                 <div className="text-xs text-gray-400 sm:text-sm">{s.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

//       {/* High-Impact CTA */}
//       <section className="px-4 py-16 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-pink-600/20 to-purple-600/20 p-8 text-center backdrop-blur-xl sm:p-12"
//         >
//           <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 opacity-30 blur-3xl" />
//           <div className="relative z-10">
//             <motion.h2 
//               className="mb-3 text-3xl font-bold text-white sm:text-4xl"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//             >
//               Modernize your workforce today.
//             </motion.h2>
//             <motion.p 
//               className="mb-6 text-sm text-gray-300 sm:text-base"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//             >
//               Join 500+ companies optimizing their office management with OMS.
//             </motion.p>
//             <motion.div 
//               className="flex flex-col items-center justify-center gap-3 sm:flex-row"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.4 }}
//             >
//               <motion.button 
//                 className="group flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-lg transition-all hover:shadow-xl"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started for Free
//                 <CheckCircle2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
//               </motion.button>
//               <motion.button 
//                 className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Talk to Sales
//                 <ArrowRight className="h-4 w-4" />
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Abstract Decorative Element */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
//       >
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-purple-500/10 blur-3xl"
//         />
//       </motion.div>

//       {/* Footer */}
//       <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-6xl">
//           <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             <div>
//               <motion.div 
//                 className="mb-3 flex items-center gap-2 text-lg font-bold"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500">
//                   <Zap className="h-4 w-4 text-white" />
//                 </div>
//                 <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
//                   OMS
//                 </span>
//               </motion.div>
//               <p className="mb-4 text-xs text-gray-400 sm:text-sm">
//                 Beautiful workforce software, built for performance and scale.
//               </p>
//               <div className="flex gap-3">
//                 {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((social) => (
//                   <motion.a
//                     key={social}
//                     href="#"
//                     className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
//                     aria-label={social}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500" />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="mb-3 text-sm font-semibold text-white">Platform</h4>
//               <ul className="space-y-2">
//                 {["Features", "Enterprise", "Security", "Roles", "Pricing"].map((item) => (
//                   <li key={item}>
//                     <motion.a
//                       href="#"
//                       className="text-xs text-gray-400 transition-colors hover:text-white sm:text-sm"
//                       whileHover={{ x: 3 }}
//                     >
//                       {item}
//                     </motion.a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h4 className="mb-3 text-sm font-semibold text-white">Resources</h4>
//               <ul className="space-y-2">
//                 {["Documentation", "API Reference", "Guides", "Blog", "Community"].map((item) => (
//                   <li key={item}>
//                     <motion.a
//                       href="#"
//                       className="text-xs text-gray-400 transition-colors hover:text-white sm:text-sm"
//                       whileHover={{ x: 3 }}
//                     >
//                       {item}
//                     </motion.a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h4 className="mb-3 text-sm font-semibold text-white">Newsletter</h4>
//               <p className="mb-3 text-xs text-gray-400 sm:text-sm">
//                 Get the latest product updates and workspace tips.
//               </p>
//               <div className="flex gap-2">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-gray-500 backdrop-blur-sm focus:border-indigo-500 focus:outline-none sm:text-sm"
//                 />
//                 <motion.button 
//                   className="rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-3 py-2 text-xs font-medium text-white sm:px-4"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <ArrowRight className="h-4 w-4" />
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:text-sm">
//             <p>© 2025 OMS Technologies. Built for humans.</p>
//             <div className="flex gap-4">
//               {["Privacy", "Terms", "Cookies"].map((item) => (
//                 <motion.a
//                   key={item}
//                   href="#"
//                   className="transition-colors hover:text-white"
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

"use client";
import { motion } from "framer-motion"
import {
  ArrowRight,
  Shield,
  Calendar,
  Clock,
  UserCheck,
  CreditCard,
  BarChart3,
  Zap,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

export default function Home() {
  const features = [
    {
      title: "Advanced Security",
      icon: <Shield className="h-5 w-5 text-white" />,
      color: "from-cyan-600 via-blue-600 to-indigo-600",
      desc: "Enterprise-grade role-based access control and encrypted UI flows for maximum safety.",
    },
    {
      title: "Roster & Shifts",
      icon: <Calendar className="h-5 w-5 text-white" />,
      color: "from-emerald-600 via-teal-600 to-cyan-600",
      desc: "Intelligent scheduling system to assign and visualize team rotations effortlessly.",
    },
    {
      title: "Attendance",
      icon: <Clock className="h-5 w-5 text-white" />,
      color: "from-cyan-600 via-sky-600 to-blue-500",
      desc: "Real-time presence tracking with comprehensive daily and monthly status insights.",
    },
    {
      title: "Leave Management",
      icon: <UserCheck className="h-5 w-5 text-white" />,
      color: "from-rose-600 to-orange-600",
      desc: "Streamlined request and approval workflows with automated balance calculations.",
    },
    {
      title: "Smart Payroll",
      icon: <CreditCard className="h-5 w-5 text-white" />,
      color: "from-rose-600 via-orange-600 to-amber-500",
      desc: "Automated salary structures and digital payslips with one-click monthly summaries.",
    },
    {
      title: "Advanced Reports",
      icon: <BarChart3 className="h-5 w-5 text-white" />,
      color: "from-blue-600 to-cyan-600",
      desc: "Powerful data visualization across all modules with customizable preset exports.",
    },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "12+", label: "Modules" },
    { value: "3", label: "Core Roles" },
    { value: "24/7", label: "Smart Support" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  }

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center gap-2 text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              OMS
            </span>
          </motion.div>
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Enterprise", "Support"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <motion.button 
              className="rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          </div>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white px-4 py-4 md:hidden"
          >
            {["Features", "Enterprise", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {item}
              </a>
            ))}
            <button className="mt-3 w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600">
              Sign In
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-medium text-cyan-700 backdrop-blur-sm"
          >
            <Zap className="h-3 w-3" />
            Next Gen Office Management System
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl"
          >
            Office Management
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text">
              Redefined.
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg"
          >
            Experience a powerful, role-based platform designed for modern HR efficiency. One unified system for your entire organization.
          </motion.p>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.button 
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button 
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-gray-50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 blur-3xl" />
      </section>

      {/* Role-Specific Perspective */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-cyan-100 to-blue-100 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                <Shield className="h-3 w-3" />
                Super Admin
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Command Center.
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Full governance over rosters, payroll modules, and system-wide security protocols.
              </p>
              <motion.button 
                className="group/btn flex items-center gap-2 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                whileHover={{ x: 5 }}
              >
                Launch Admin
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50 p-6 shadow-sm backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-rose-100 to-orange-100 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 px-3 py-1 text-xs font-semibold text-white">
                <BarChart3 className="h-3 w-3" />
                Operations
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Strategic Flow.
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Real-time team orchestration, presence tracking, and incident resolution center.
              </p>
              <motion.button 
                className="group/btn flex items-center gap-2 text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
                whileHover={{ x: 5 }}
              >
                Manage Ops
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-emerald-100 to-teal-100 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-3 py-1 text-xs font-semibold text-white">
                <UserCheck className="h-3 w-3" />
                My Portal
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Daily Sync.
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Your personal space for shift timings, attendance logs, and leave requests.
              </p>
              <motion.button 
                className="group/btn flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                whileHover={{ x: 5 }}
              >
                Open Portal
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Powerful Core Modules.
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Everything you need to modernize your office operations in one unified workspace.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-sm transition-all hover:border-gray-300 hover:shadow-md"
              >
                <motion.div 
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${f.color} shadow-lg`}
                  animate={floatAnimation}
                  transition={{ delay: i * 0.1 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="mb-2 text-base font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-sm backdrop-blur-xl"
        >
          <div className="grid gap-8 p-8 sm:grid-cols-4 sm:p-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <motion.div 
                  className="mb-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {s.value}
                </motion.div>
                <div className="text-xs text-gray-600 sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* High-Impact CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 text-center shadow-sm backdrop-blur-xl sm:p-12"
        >
          <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-200 to-blue-200 opacity-50 blur-3xl" />
          <div className="relative z-10">
            <motion.h2 
              className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Modernize your workforce today.
            </motion.h2>
            <motion.p 
              className="mb-6 text-sm text-gray-600 sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join 500+ companies optimizing their office management with OMS.
            </motion.p>
            <motion.div 
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button 
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started for Free
                <CheckCircle2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-gray-50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to Sales
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Abstract Decorative Element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="h-full w-full rounded-full bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 blur-3xl"
        />
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <motion.div 
                className="mb-3 flex items-center gap-2 text-lg font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  OMS
                </span>
              </motion.div>
              <p className="mb-4 text-xs text-gray-600 sm:text-sm">
                Beautiful workforce software, built for performance and scale.
              </p>
              <div className="flex gap-3">
                {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-all hover:bg-gray-300 hover:text-gray-900"
                    aria-label={social}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Platform</h4>
              <ul className="space-y-2">
                {["Features", "Enterprise", "Security", "Roles", "Pricing"].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-xs text-gray-600 transition-colors hover:text-gray-900 sm:text-sm"
                      whileHover={{ x: 3 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "API Reference", "Guides", "Blog", "Community"].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-xs text-gray-600 transition-colors hover:text-gray-900 sm:text-sm"
                      whileHover={{ x: 3 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Newsletter</h4>
              <p className="mb-3 text-xs text-gray-600 sm:text-sm">
                Get the latest product updates and workspace tips.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-500 backdrop-blur-sm focus:border-cyan-500 focus:outline-none sm:text-sm"
                />
                <motion.button 
                  className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-2 text-xs font-medium text-white sm:px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:text-sm">
            <p>© 2025 OMS Technologies. Built for humans.</p>
            <div className="flex gap-4">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="transition-colors hover:text-white"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}