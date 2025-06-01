"use client"

import { motion } from "framer-motion"
import {
  LucideMenu,
  LucideChevronRight,
  LucideUserCheck,
  LucideGraduationCap,
  LucideUsers,
  LucideHome,
} from "lucide-react"

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  teacherRequests,
  studentRequests,
  sections,
}) {
  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LucideHome,
      count: null,
    },
    {
      id: "teachers",
      label: "Teacher Requests",
      icon: LucideUserCheck,
      count: teacherRequests.filter((r) => r.status === "pending").length,
    },
    {
      id: "students",
      label: "Student Requests",
      icon: LucideGraduationCap,
      count: studentRequests.filter((r) => r.status === "pending").length,
    },
    {
      id: "sections",
      label: "Class Sections",
      icon: LucideUsers,
      count: sections.length,
    },
  ]

  return (
    <motion.div
      initial={false}
      animate={{
        width: sidebarOpen ? 320 : 80,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-black/50 backdrop-blur-md border-r border-white/10 relative z-10 flex-shrink-0"
    >
      <div className="p-6 h-full">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              Admin Panel
            </motion.h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <LucideMenu size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-blue-600/30 border border-blue-500/50 text-white"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={!sidebarOpen ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sidebarOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  {item.count !== null && item.count > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.count}</span>
                  )}
                  <LucideChevronRight size={16} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
