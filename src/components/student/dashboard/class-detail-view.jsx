"use client"

import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { ArrowLeft, FileText, Award, Clock, Eye, Download, Upload, MoreVertical } from "lucide-react"

export default function ClassDetailView({ selectedClass, recentAssignments, onBack }) {
  if (!selectedClass) return null

  const classAssignments = recentAssignments.filter((assignment) =>
    assignment.subject.toLowerCase().includes(selectedClass.name.toLowerCase().split(" ")[0]),
  )

  const handleAssignmentAction = (action, assignment) => {
    toast.success(`${action} ${assignment.title}`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-green-500 text-white"
      case "in-progress":
        return "bg-yellow-500 text-black"
      case "pending":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-600 text-white"
      case "medium":
        return "bg-gray-600 text-white"
      case "low":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-200 hover:bg-blue-500/20 px-4 py-2 rounded-lg mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Overview
      </button>

      {/* Class Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full ${selectedClass.color} flex items-center justify-center`}>
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{selectedClass.name}</h1>
            <p className="text-blue-200">{selectedClass.teacher}</p>
            <p className="text-gray-300">
              {selectedClass.code} • {selectedClass.section} • {selectedClass.room}
            </p>
          </div>
        </div>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{selectedClass.assignments}</p>
              <p className="text-gray-300">Total Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <Award className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{selectedClass.completed}</p>
              <p className="text-gray-300">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <Clock className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{selectedClass.pending}</p>
              <p className="text-gray-300">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Class Assignments</h2>
        <div className="space-y-4">
          {classAssignments.length > 0 ? (
            classAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{assignment.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}
                      >
                        {assignment.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}
                      >
                        {assignment.priority} priority
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                        {assignment.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Due: {assignment.dueDate}</p>
                  </div>

                  <div className="relative group">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-1 bg-black/40 backdrop-blur-xl border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-1 min-w-[120px]">
                        <button
                          onClick={() => handleAssignmentAction("Viewing", assignment)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-blue-500/20"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleAssignmentAction("Downloading", assignment)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-blue-500/20"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        {assignment.status !== "submitted" && (
                          <button
                            onClick={() => handleAssignmentAction("Submitting", assignment)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-blue-500/20"
                          >
                            <Upload className="h-4 w-4" />
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No assignments found for this class</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
