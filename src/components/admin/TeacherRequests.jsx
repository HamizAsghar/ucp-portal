


"use client"

import { User, Mail, Phone, Calendar, Check, X, Clock } from "lucide-react"

export default function TeacherRequests({ teacherRequests, handleApprove, handleRejectClick, processingRequests }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Pending Teacher Requests</h1>
        <div className="text-gray-400">{teacherRequests?.length || 0} pending requests</div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {teacherRequests?.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="mx-auto text-gray-500 mb-4" size={64} />
            <p className="text-gray-400 text-lg">No pending teacher requests</p>
          </div>
        ) : (
          teacherRequests?.map((request) => {
            const isProcessing = processingRequests.has(request._id)

            return (
              <div key={request._id} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="text-blue-400" size={16} />
                      <span className="text-white font-medium">{request.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="text-green-400" size={16} />
                      <span className="text-gray-300">{request.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="text-yellow-400" size={16} />
                      <span className="text-gray-300">{request.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-orange-400" size={16} />
                      <span className="text-gray-300">{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-purple-400" size={16} />
                      <span className="text-purple-400 capitalize">{request.status}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleApprove(request, "teachers")}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Check size={16} className="mr-1" />
                      {isProcessing ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleRejectClick(request, "teachers")}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                    >
                      <X size={16} className="mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
