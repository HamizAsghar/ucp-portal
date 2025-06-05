// "use client"

// import { motion } from "framer-motion"
// import {
//   LucideMenu,
//   LucideChevronRight,
//   LucideUserCheck,
//   LucideGraduationCap,
//   LucideUsers,
//   LucideHome,
// } from "lucide-react"

// export default function Sidebar({
//   activeTab,
//   setActiveTab,
//   sidebarOpen,
//   setSidebarOpen,
//   teacherRequests,
//   studentRequests,
//   sections,
// }) {
//   const sidebarItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard Overview",
//       icon: LucideHome,
//       count: null,
//     },
//     {
//       id: "teachers",
//       label: "Teacher Requests",
//       icon: LucideUserCheck,
//       count: teacherRequests.filter((r) => r.status === "pending").length,
//     },
//     {
//       id: "students",
//       label: "Student Requests",
//       icon: LucideGraduationCap,
//       count: studentRequests.filter((r) => r.status === "pending").length,
//     },
//     {
//       id: "sections",
//       label: "Class Sections",
//       icon: LucideUsers,
//       count: sections.length,
//     },
//   ]

//   return (
//     <motion.div
//       initial={false}
//       animate={{
//         width: sidebarOpen ? 320 : 80,
//       }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="bg-black/50 backdrop-blur-md border-r border-white/10 relative z-10 flex-shrink-0"
//     >
//       <div className="p-6 h-full">
//         <div className="flex items-center justify-between mb-8">
//           {sidebarOpen && (
//             <motion.h2
//               initial={{ opacity: 0 }}
//               animate={{ opacity: sidebarOpen ? 1 : 0 }}
//               transition={{ duration: 0.2 }}
//               className="text-2xl font-bold text-white"
//             >
//               Admin Panel
//             </motion.h2>
//           )}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
//           >
//             <LucideMenu size={24} />
//           </button>
//         </div>

//         <nav className="space-y-2">
//           {sidebarItems.map((item) => (
//             <motion.button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 rounded-xl transition-all ${
//                 activeTab === item.id
//                   ? "bg-blue-600/30 border border-blue-500/50 text-white"
//                   : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
//               }`}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               title={!sidebarOpen ? item.label : undefined}
//             >
//               <div className="flex items-center space-x-3">
//                 <item.icon size={20} />
//                 {sidebarOpen && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="font-medium"
//                   >
//                     {item.label}
//                   </motion.span>
//                 )}
//               </div>
//               {sidebarOpen && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: sidebarOpen ? 1 : 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center space-x-2"
//                 >
//                   {item.count !== null && item.count > 0 && (
//                     <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.count}</span>
//                   )}
//                   <LucideChevronRight size={16} />
//                 </motion.div>
//               )}
//             </motion.button>
//           ))}
//         </nav>
//       </div>
//     </motion.div>
//   )
// }





"use client"
import { LayoutDashboard, Clock, Users, GraduationCap, UserCheck, BookOpen, Menu, X } from "lucide-react"

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  teacherRequests,
  allStudents,
  allTeachers,
  sections,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      count: null,
    },
    {
      id: "pending-teachers",
      label: "Pending Teachers",
      icon: Clock,
      count: teacherRequests?.length || 0,
    },
    {
      id: "all-teachers",
      label: "All Teachers",
      icon: Users,
      count: allTeachers?.length || 0,
    },
    {
      id: "all-students",
      label: "All Students",
      icon: GraduationCap,
      count: allStudents?.length || 0,
    },
    {
      id: "assign-classes",
      label: "Assign Classes",
      icon: UserCheck,
      count: null,
    },
    {
      id: "class-sections",
      label: "Class Sections",
      icon: BookOpen,
      count: sections?.length || 0,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-gray-900/95 backdrop-blur-md border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false) // Close mobile menu
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span
                      className={`
                      px-2 py-1 text-xs rounded-full font-semibold
                      ${isActive ? "bg-white text-blue-600" : "bg-gray-700 text-gray-300"}
                    `}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
