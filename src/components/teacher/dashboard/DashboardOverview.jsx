// export default function DashboardOverview() {
//   const stats = [
//     { title: "Total Students", value: "156", icon: "👥", color: "blue" },
//     { title: "Active Classes", value: "8", icon: "🏫", color: "green" },
//     { title: "Pending Assignments", value: "12", icon: "📝", color: "orange" },
//     { title: "Upcoming Quizzes", value: "3", icon: "✅", color: "purple" },
//   ]

//   const recentActivities = [
//     { type: "assignment", message: "New assignment submitted by John Smith", time: "2 hours ago" },
//     { type: "quiz", message: 'Quiz "Data Structures" completed by 25 students', time: "4 hours ago" },
//     { type: "class", message: "Class BSCS-6A attendance marked", time: "1 day ago" },
//     { type: "notification", message: "Reminder: Assignment deadline tomorrow", time: "2 days ago" },
//   ]

//   return (
//     <div className="dashboard-overview ">
//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className={`stat-card ${stat.color}`}>
//             <div className="stat-icon">{stat.icon}</div>
//             <div className="stat-content">
//               <div className="stat-value">{stat.value}</div>
//               <div className="stat-title">{stat.title}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         <div className="dashboard-section">
//           <h2>Recent Activities</h2>
//           <div className="activity-list">
//             {recentActivities.map((activity, index) => (
//               <div key={index} className="activity-item">
//                 <div className="activity-icon">
//                   {activity.type === "assignment" && "📝"}
//                   {activity.type === "quiz" && "✅"}
//                   {activity.type === "class" && "🏫"}
//                   {activity.type === "notification" && "🔔"}
//                 </div>
//                 <div className="activity-content">
//                   <div className="activity-message">{activity.message}</div>
//                   <div className="activity-time">{activity.time}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="dashboard-section">
//           <h2>Quick Actions</h2>
//           <div className="quick-actions">
//             <button className="quick-action-btn">
//               <span className="action-icon">📝</span>
//               <span>Create Assignment</span>
//             </button>
//             <button className="quick-action-btn">
//               <span className="action-icon">✅</span>
//               <span>Create Quiz</span>
//             </button>
//             <button className="quick-action-btn">
//               <span className="action-icon">📚</span>
//               <span>Upload Content</span>
//             </button>
//             <button className="quick-action-btn">
//               <span className="action-icon">🔔</span>
//               <span>Send Notification</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { motion } from "framer-motion";
import {
  Users,
  School,
  FileText,
  CheckSquare,
  Bell,
  PlusCircle,
  Upload,
} from "lucide-react";

// Stats data
const stats = [
  { title: "Total Students", value: "156", icon: Users, color: "from-blue-500 to-blue-700" },
  { title: "Active Classes", value: "8", icon: School, color: "from-green-500 to-green-700" },
  { title: "Pending Assignments", value: "12", icon: FileText, color: "from-orange-500 to-orange-700" },
  { title: "Upcoming Quizzes", value: "3", icon: CheckSquare, color: "from-purple-500 to-purple-700" },
];

// Recent activities data
const recentActivities = [
  { type: "assignment", message: "New assignment submitted by John Smith", time: "2 hours ago", icon: FileText },
  { type: "quiz", message: 'Quiz "Data Structures" completed by 25 students', time: "4 hours ago", icon: CheckSquare },
  { type: "class", message: "Class BSCS-6A attendance marked", time: "1 day ago", icon: School },
  { type: "notification", message: "Reminder: Assignment deadline tomorrow", time: "2 days ago", icon: Bell },
];

// Quick actions data
const quickActions = [
  { label: "Create Assignment", icon: FileText },
  { label: "Create Quiz", icon: CheckSquare },
  { label: "Upload Content", icon: Upload },
  { label: "Send Notification", icon: Bell },
];

export default function DashboardOverview() {
  return (
    <div className=" text-white">
      <div className="max-w-7xl mx-auto">
  
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      className={`relative bg-gradient-to-br ${stat.color} rounded-xl px-5 py-4 shadow-md hover:shadow-lg border border-white/10 overflow-hidden group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-15 transition duration-500 rounded-xl" />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon in circle */}
        <div className="p-2.5 rounded-lg bg-white/20 backdrop-blur-md shadow-inner shrink-0">
          <stat.icon className="h-7 w-7 text-white" />
        </div>

        {/* Text content */}
        <div className="truncate">
          <div className="text-2xl font-bold leading-snug">{stat.value}</div>
          <div className="text-sm font-medium uppercase tracking-wide opacity-90 truncate">
            {stat.title}
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>


        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities Section */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-md border border-gray-700/40 rounded-xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/50 pb-2">Recent Activities</h2>
            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-900/40 rounded-lg hover:bg-gray-900/70 border border-gray-700/30 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <activity.icon className="h-7 w-7 text-gray-300" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.message}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

{/* Quick Actions Section */}
<motion.div
  className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/40 rounded-xl p-5 shadow-lg"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-700/40 pb-2 tracking-wide text-gray-100">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {quickActions.map((action, index) => (
      <motion.button
        key={index}
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg 
                   bg-gradient-to-br from-indigo-600/90 to-blue-700/90 
                   shadow-md hover:shadow-xl text-left overflow-hidden 
                   group transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-15 transition duration-500 rounded-lg" />

        {/* Icon bubble */}
        <div className="p-2 rounded-md bg-white/20 backdrop-blur-sm shadow-inner flex items-center justify-center shrink-0">
          <action.icon className="h-5 w-5 text-white" />
        </div>

        {/* Label */}
        <span className="font-medium text-sm text-white truncate">
          {action.label}
        </span>

        {/* Arrow on hover */}
        <div className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.button>
    ))}
  </div>
</motion.div>

        </div>
      </div>
    </div>
  );
}