"use client"

import { motion } from "framer-motion"
import { LucideCheck, LucideX, LucideGraduationCap, LucideMail, LucidePhone, LucideTrash2 } from "lucide-react"

export default function StudentRequests({
  studentRequests,
  handleApprove,
  handleRejectClick,
  handleDeleteStudent,
  processingRequests,
}) {
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

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Student Requests</h1>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
      </motion.div>

      <motion.div variants={item} className="space-y-4">
        {studentRequests.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <LucideGraduationCap size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">No student requests found</p>
          </div>
        ) : (
          studentRequests.map((request) => {
            const requestId = request._id || request.id
            return (
              <motion.div
                key={requestId}
                className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {request.image ? (
                          <img
                            src={request.image || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <LucideGraduationCap size={24} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{request.name}</h3>
                      <div className="text-purple-400 font-mono text-sm mb-1">Reg: {request.registrationNumber}</div>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <LucideMail size={16} className="mr-2" />
                        {request.email}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <LucidePhone size={16} className="mr-2" />
                        {request.phone}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <LucideGraduationCap size={16} className="mr-2" />
                        {request.semester} Semester - Section {request.section}
                      </div>
                      <div className="text-xs text-purple-400 mt-1">ID: {requestId}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : request.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>

                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleApprove(request, "students")}
                          disabled={processingRequests.has(requestId)}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                          whileHover={{ scale: processingRequests.has(requestId) ? 1 : 1.1 }}
                          whileTap={{ scale: processingRequests.has(requestId) ? 1 : 0.9 }}
                        >
                          <LucideCheck size={20} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleRejectClick(request, "students")}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <LucideX size={20} />
                        </motion.button>
                      </div>
                    )}

                    {request.status === "approved" && (
                      <motion.button
                        onClick={() => handleDeleteStudent(request)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LucideTrash2 size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </motion.div>
    </motion.div>
  )
}
