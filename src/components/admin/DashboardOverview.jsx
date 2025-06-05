// "use client"

// import { motion } from "framer-motion"
// import {
//   LucideUsers,
//   LucideGraduationCap,
//   LucideUserCheck,
//   LucideBookOpen,
//   LucideClock,
//   LucideCheckCircle,
//   LucideBarChart3,
// } from "lucide-react"

// export default function DashboardOverview({ teacherRequests, studentRequests, sections }) {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   }

//   // Calculate statistics
//   const totalTeachers = teacherRequests.filter((t) => t.status === "approved").length
//   const totalStudents = studentRequests.filter((s) => s.status === "approved").length
//   const pendingTeachers = teacherRequests.filter((t) => t.status === "pending").length
//   const pendingStudents = studentRequests.filter((s) => s.status === "pending").length
//   const totalSections = sections.length
//   const totalEnrolledStudents = sections.reduce((sum, section) => sum + (section.enrolledStudents || 0), 0)

//   // Group sections by semester
//   const sectionsBySemester = sections.reduce((acc, section) => {
//     const semester = section.semester
//     if (!acc[semester]) {
//       acc[semester] = []
//     }
//     acc[semester].push(section)
//     return acc
//   }, {})

//   // Teacher-section mapping (mock data for demonstration)
//   const teacherSectionMapping = teacherRequests
//     .filter((t) => t.status === "approved")
//     .map((teacher) => ({
//       name: teacher.name,
//       sections: Math.floor(Math.random() * 3) + 1, // Random for demo
//       subjects: ["Mathematics", "Physics", "Chemistry"][Math.floor(Math.random() * 3)],
//     }))

//   const statsCards = [
//     {
//       title: "Total Teachers",
//       value: totalTeachers,
//       icon: LucideUserCheck,
//       color: "from-blue-500 to-blue-600",
//       bgColor: "bg-blue-500/20",
//       textColor: "text-blue-400",
//     },
//     {
//       title: "Total Students",
//       value: totalStudents,
//       icon: LucideGraduationCap,
//       color: "from-purple-500 to-purple-600",
//       bgColor: "bg-purple-500/20",
//       textColor: "text-purple-400",
//     },
//     {
//       title: "Pending Teachers",
//       value: pendingTeachers,
//       icon: LucideClock,
//       color: "from-yellow-500 to-yellow-600",
//       bgColor: "bg-yellow-500/20",
//       textColor: "text-yellow-400",
//     },
//     {
//       title: "Pending Students",
//       value: pendingStudents,
//       icon: LucideClock,
//       color: "from-orange-500 to-orange-600",
//       bgColor: "bg-orange-500/20",
//       textColor: "text-orange-400",
//     },
//     {
//       title: "Total Sections",
//       value: totalSections,
//       icon: LucideUsers,
//       color: "from-green-500 to-green-600",
//       bgColor: "bg-green-500/20",
//       textColor: "text-green-400",
//     },
//     {
//       title: "Enrolled Students",
//       value: totalEnrolledStudents,
//       icon: LucideBookOpen,
//       color: "from-pink-500 to-pink-600",
//       bgColor: "bg-pink-500/20",
//       textColor: "text-pink-400",
//     },
//   ]

//   return (
//     <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
//       {/* Header */}
//       <motion.div variants={item}>
//         <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
//         <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
//       </motion.div>

//       {/* Stats Cards */}
//       <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {statsCards.map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
//             whileHover={{ scale: 1.05, y: -5 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
//                 <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
//               </div>
//               <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} p-1`}>
//                 <div className={`w-full h-full rounded-full ${stat.bgColor} flex items-center justify-center`}>
//                   <stat.icon size={24} className={stat.textColor} />
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>


//       {/* Recent Activity */}
//       <motion.div variants={item} className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
//         <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
//           <LucideBarChart3 className="mr-3 text-purple-400" size={24} />
//           Recent Activity Summary
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//               <LucideCheckCircle size={24} className="text-green-400" />
//             </div>
//             <p className="text-2xl font-bold text-white">{totalTeachers + totalStudents}</p>
//             <p className="text-gray-400 text-sm">Total Approved</p>
//           </div>
//           <div className="text-center">
//             <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//               <LucideClock size={24} className="text-yellow-400" />
//             </div>
//             <p className="text-2xl font-bold text-white">{pendingTeachers + pendingStudents}</p>
//             <p className="text-gray-400 text-sm">Pending Requests</p>
//           </div>
//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//               <LucideUsers size={24} className="text-blue-400" />
//             </div>
//             <p className="text-2xl font-bold text-white">{totalEnrolledStudents}</p>
//             <p className="text-gray-400 text-sm">Active Students</p>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }






// "use client"

// import { Users, GraduationCap, Clock, BookOpen, UserCheck, UserX, TrendingUp, Activity } from "lucide-react"

// export default function DashboardOverview({ teacherRequests, allStudents, allTeachers, sections, setActiveTab }) {
//   const approvedTeachers = allTeachers?.filter((teacher) => teacher.isApproved) || []
//   const unassignedTeachers = approvedTeachers?.filter((teacher) => !teacher.assignedClass) || []

//   const stats = [
//     {
//       title: "Total Students",
//       value: allStudents?.length || 0,
//       icon: GraduationCap,
//       color: "from-blue-500 to-blue-600",
//       textColor: "text-blue-100",
//       onClick: () => setActiveTab("all-students"),
//     },
//     {
//       title: "Total Teachers",
//       value: approvedTeachers?.length || 0,
//       icon: Users,
//       color: "from-green-500 to-green-600",
//       textColor: "text-green-100",
//       onClick: () => setActiveTab("all-teachers"),
//     },
//     {
//       title: "Pending Teachers",
//       value: teacherRequests?.length || 0,
//       icon: Clock,
//       color: "from-orange-500 to-orange-600",
//       textColor: "text-orange-100",
//       onClick: () => setActiveTab("pending-teachers"),
//     },
//     {
//       title: "Class Sections",
//       value: sections?.length || 0,
//       icon: BookOpen,
//       color: "from-purple-500 to-purple-600",
//       textColor: "text-purple-100",
//       onClick: () => setActiveTab("class-sections"),
//     },
//     {
//       title: "Assigned Teachers",
//       value: approvedTeachers?.filter((teacher) => teacher.assignedClass)?.length || 0,
//       icon: UserCheck,
//       color: "from-emerald-500 to-emerald-600",
//       textColor: "text-emerald-100",
//       description: "Teachers with classes",
//       onClick: () => setActiveTab("assign-classes"),
//     },
//     {
//       title: "Unassigned Teachers",
//       value: unassignedTeachers?.length || 0,
//       icon: UserX,
//       color: "from-red-500 to-red-600",
//       textColor: "text-red-100",
//       description: "Teachers awaiting assignment",
//       onClick: () => setActiveTab("assign-classes"),
//     },
//   ]

//   const recentActivity = [
//     { text: `${allStudents?.length || 0} students registered`, color: "text-green-400", icon: GraduationCap },
//     {
//       text: `${approvedTeachers?.filter((teacher) => teacher.assignedClass)?.length || 0} teachers assigned to classes`,
//       color: "text-blue-400",
//       icon: UserCheck,
//     },
//     { text: `${unassignedTeachers?.length || 0} teachers awaiting assignment`, color: "text-orange-400", icon: UserX },
//     {
//       text: `${teacherRequests?.length || 0} teacher requests pending approval`,
//       color: "text-yellow-400",
//       icon: Clock,
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
//         <p className="text-gray-400">Welcome back, Administrator</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <div
//               key={index}
//               onClick={stat.onClick}
//               className={`
//                 bg-gradient-to-r ${stat.color} rounded-xl p-6 cursor-pointer
//                 transform transition-all duration-200 hover:scale-105 hover:shadow-xl
//                 border border-white/10
//               `}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className={`${stat.textColor} text-sm font-medium opacity-90`}>{stat.title}</p>
//                   <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
//                   {stat.description && (
//                     <p className={`${stat.textColor} text-xs mt-1 opacity-75`}>{stat.description}</p>
//                   )}
//                 </div>
//                 <Icon className="text-white opacity-80" size={32} />
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Recent Activity and Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//           <div className="flex items-center space-x-2 mb-4">
//             <Activity className="text-blue-400" size={24} />
//             <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
//           </div>
//           <div className="space-y-3">
//             {recentActivity.map((activity, index) => {
//               const Icon = activity.icon
//               return (
//                 <div key={index} className="flex items-center space-x-3">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <Icon className={activity.color} size={16} />
//                   <span className="text-gray-300 text-sm">{activity.text}</span>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//           <div className="flex items-center space-x-2 mb-4">
//             <TrendingUp className="text-green-400" size={24} />
//             <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
//           </div>
//           <div className="space-y-3">
//             <button
//               onClick={() => setActiveTab("all-students")}
//               className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-colors"
//             >
//               <span className="text-green-400 font-medium">View All Students ({allStudents?.length || 0})</span>
//             </button>
//             <button
//               onClick={() => setActiveTab("all-teachers")}
//               className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-colors"
//             >
//               <span className="text-purple-400 font-medium">Manage Teachers ({approvedTeachers?.length || 0})</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





"use client"

import { Users, GraduationCap, Clock, BookOpen, UserCheck, UserX, TrendingUp, Activity } from "lucide-react"

export default function DashboardOverview({ teacherRequests, allStudents, allTeachers, sections, setActiveTab }) {
  const approvedTeachers = allTeachers?.filter((teacher) => teacher.isApproved) || []
  const assignedTeachers = approvedTeachers?.filter((teacher) => teacher.assignedClass) || []
  const unassignedTeachers = approvedTeachers?.filter((teacher) => !teacher.assignedClass) || []

  const stats = [
    {
      title: "Total Students",
      value: allStudents?.length || 0,
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      onClick: () => setActiveTab("all-students"),
    },
    {
      title: "Total Teachers",
      value: approvedTeachers?.length || 0,
      icon: Users,
      color: "from-green-500 to-green-600",
      textColor: "text-green-100",
      onClick: () => setActiveTab("all-teachers"),
    },
    {
      title: "Pending Teachers",
      value: teacherRequests?.length || 0,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-100",
      onClick: () => setActiveTab("pending-teachers"),
    },
    {
      title: "Class Sections",
      value: sections?.length || 0,
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      onClick: () => setActiveTab("class-sections"),
    },
    {
      title: "Assigned Teachers",
      value: assignedTeachers?.length || 0,
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-100",
      description: "Teachers with classes",
      onClick: () => setActiveTab("assign-classes"),
    },
    {
      title: "Unassigned Teachers",
      value: unassignedTeachers?.length || 0,
      icon: UserX,
      color: "from-red-500 to-red-600",
      textColor: "text-red-100",
      description: "Teachers awaiting assignment",
      onClick: () => setActiveTab("assign-classes"),
    },
  ]

  const recentActivity = [
    { text: `${allStudents?.length || 0} students registered`, color: "text-green-400", icon: GraduationCap },
    {
      text: `${assignedTeachers?.length || 0} teachers assigned to classes`,
      color: "text-blue-400",
      icon: UserCheck,
    },
    { text: `${unassignedTeachers?.length || 0} teachers awaiting assignment`, color: "text-orange-400", icon: UserX },
    {
      text: `${teacherRequests?.length || 0} teacher requests pending approval`,
      color: "text-yellow-400",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome back, Administrator</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              onClick={stat.onClick}
              className={`
                bg-gradient-to-r ${stat.color} rounded-xl p-6 cursor-pointer
                transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                border border-white/10
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${stat.textColor} text-sm font-medium opacity-90`}>{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  {stat.description && (
                    <p className={`${stat.textColor} text-xs mt-1 opacity-75`}>{stat.description}</p>
                  )}
                </div>
                <Icon className="text-white opacity-80" size={32} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="text-blue-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Icon className={activity.color} size={16} />
                  <span className="text-gray-300 text-sm">{activity.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recently Assigned Classes */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-green-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Recently Assigned Classes</h2>
          </div>
          <div className="space-y-3">
            {assignedTeachers?.slice(0, 3).map((teacher, index) => (
              <div key={index} className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{teacher.name}</p>
                    <p className="text-green-400 text-sm">{teacher.assignedClass}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">{teacher.subject}</p>
                  </div>
                </div>
              </div>
            )) || <p className="text-gray-400 text-center py-4">No classes assigned yet</p>}
            {assignedTeachers?.length > 3 && (
              <button
                onClick={() => setActiveTab("assign-classes")}
                className="w-full text-center text-green-400 hover:text-green-300 text-sm py-2"
              >
                View all assigned classes ({assignedTeachers.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
