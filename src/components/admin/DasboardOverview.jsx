"use client"

import { motion } from "framer-motion"
import {
  LucideUsers,
  LucideGraduationCap,
  LucideUserCheck,
  LucideBookOpen,
  LucideClock,
  LucideCheckCircle,
  LucideBarChart3,
} from "lucide-react"

export default function DashboardOverview({ teacherRequests, studentRequests, sections }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  // Calculate statistics
  const totalTeachers = teacherRequests.filter((t) => t.status === "approved").length
  const totalStudents = studentRequests.filter((s) => s.status === "approved").length
  const pendingTeachers = teacherRequests.filter((t) => t.status === "pending").length
  const pendingStudents = studentRequests.filter((s) => s.status === "pending").length
  const totalSections = sections.length
  const totalEnrolledStudents = sections.reduce((sum, section) => sum + (section.enrolledStudents || 0), 0)

  // Group sections by semester
  const sectionsBySemester = sections.reduce((acc, section) => {
    const semester = section.semester
    if (!acc[semester]) {
      acc[semester] = []
    }
    acc[semester].push(section)
    return acc
  }, {})

  // Teacher-section mapping (mock data for demonstration)
  const teacherSectionMapping = teacherRequests
    .filter((t) => t.status === "approved")
    .map((teacher) => ({
      name: teacher.name,
      sections: Math.floor(Math.random() * 3) + 1, // Random for demo
      subjects: ["Mathematics", "Physics", "Chemistry"][Math.floor(Math.random() * 3)],
    }))

  const statsCards = [
    {
      title: "Total Teachers",
      value: totalTeachers,
      icon: LucideUserCheck,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: LucideGraduationCap,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-400",
    },
    {
      title: "Pending Teachers",
      value: pendingTeachers,
      icon: LucideClock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-500/20",
      textColor: "text-yellow-400",
    },
    {
      title: "Pending Students",
      value: pendingStudents,
      icon: LucideClock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-400",
    },
    {
      title: "Total Sections",
      value: totalSections,
      icon: LucideUsers,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
    },
    {
      title: "Enrolled Students",
      value: totalEnrolledStudents,
      icon: LucideBookOpen,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500/20",
      textColor: "text-pink-400",
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} p-1`}>
                <div className={`w-full h-full rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.textColor} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>


      {/* Recent Activity */}
      <motion.div variants={item} className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <LucideBarChart3 className="mr-3 text-purple-400" size={24} />
          Recent Activity Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <LucideCheckCircle size={24} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalTeachers + totalStudents}</p>
            <p className="text-gray-400 text-sm">Total Approved</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <LucideClock size={24} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">{pendingTeachers + pendingStudents}</p>
            <p className="text-gray-400 text-sm">Pending Requests</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <LucideUsers size={24} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalEnrolledStudents}</p>
            <p className="text-gray-400 text-sm">Active Students</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
