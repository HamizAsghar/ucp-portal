"use client"

import { X } from "lucide-react"

export default function RejectModal({
  showRejectModal,
  setShowRejectModal,
  rejectReason,
  setRejectReason,
  handleRejectSubmit,
  setSelectedRequest,
}) {
  if (!showRejectModal) return null

  const handleClose = () => {
    setShowRejectModal(false)
    setRejectReason("")
    setSelectedRequest(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Reject Request</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Reason for rejection</label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            rows={4}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleRejectSubmit}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Reject Request
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
