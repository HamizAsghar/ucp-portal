"use client";

import { motion } from "framer-motion";
import { User, BookOpen, Home, Bell, Calendar } from "lucide-react";

export default function OverviewSection({ studentData, enrolledClasses, notifications, recentAssignments }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6"
    >
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome, {studentData.name}!</h1>
        <p className="text-blue-200">Your academic dashboard for managing classes and assignments.</p>
      </div>

      {/* Student and Class Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Details */}
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Your Profile
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {studentData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{studentData.name}</h3>
              <p className="text-blue-200 text-sm">{studentData.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Registration Number:</span>
              <p className="text-white font-medium">{studentData.registrationNumber}</p>
            </div>
            <div>
              <span className="text-gray-300">Program:</span>
              <p className="text-white font-medium">{studentData.program || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-300">Semester:</span>
              <p className="text-white font-medium">{studentData.semester}</p>
            </div>
            <div>
              <span className="text-gray-300">Section:</span>
              <p className="text-white font-medium">{studentData.section}</p>
            </div>
            <div>
              <span className="text-gray-300">Enrolled Classes:</span>
              <p className="text-white font-medium">{enrolledClasses.length}</p>
            </div>
          </div>
        </div>

        {/* Class Details */}
        <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-400" />
            Class Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="text-gray-300">Room:</span>
              <p className="text-white font-medium">{studentData.room || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-300">Total Students:</span>
              <p className="text-white font-medium">{studentData.classInfo?.totalStudents || "N/A"}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Class Teacher</h3>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-white font-medium">{studentData.teacher?.name || "N/A"}</p>
              <p className="text-blue-200 text-sm">{studentData.teacher?.email || "N/A"}</p>
              <p className="text-gray-300 text-sm">Subject: {studentData.teacher?.subject || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Classes */}
      <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Home className="h-5 w-5 text-purple-400" />
          Enrolled Classes
        </h2>
        {enrolledClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-lg font-medium text-white">{cls.subject}</h3>
                <p className="text-gray-300 text-sm">Program: {cls.program}</p>
                <p className="text-gray-300 text-sm">Section: {cls.section}</p>
                <p className="text-gray-300 text-sm">Teacher: {cls.teacher?.name || "N/A"}</p>
                <p className="text-gray-400 text-sm">Room: {cls.room}</p>
                <p className="text-gray-400 text-sm">Students: {cls.enrolledStudents}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No classes enrolled yet. Visit the Enroll Class section to join a course.</p>
        )}
      </div>

      {/* Recent Notifications and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            Recent Notifications
          </h2>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-gray-800/50 border ${
                    notification.read ? "border-gray-600" : "border-blue-400"
                  } rounded-lg p-4 flex items-start gap-3`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.read ? "bg-gray-400" : "bg-blue-400"
                    }`}
                  ></div>
                  <div>
                    <h3 className="text-white font-medium">{notification.title}</h3>
                    <p className="text-gray-300 text-sm">{notification.message}</p>
                    <p className="text-gray-400 text-xs">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No new notifications.</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-400" />
            Upcoming Events
          </h2>
          {recentAssignments.length > 0 ? (
            <div className="space-y-4">
              {recentAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-medium">{assignment.title}</h3>
                    <p className="text-gray-300 text-sm">Subject: {assignment.subject}</p>
                    <p className="text-gray-400 text-sm">Due: {assignment.dueDate}</p>
                    <p className="text-gray-400 text-sm">Status: {assignment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No upcoming events or assignments.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}