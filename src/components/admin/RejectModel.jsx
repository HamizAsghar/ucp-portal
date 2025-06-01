"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LucideMessageSquare } from "lucide-react"

export default function RejectModal({
  showRejectModal,
  setShowRejectModal,
  rejectReason,
  setRejectReason,
  handleRejectSubmit,
  setSelectedRequest,
}) {
  return (
    <AnimatePresence>
      {showRejectModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4"
          >
            <div className="text-center mb-6">
              <LucideMessageSquare size={48} className="mx-auto text-red-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Reject Request</h3>
              <p className="text-gray-400">Please provide a reason for rejecting this request</p>
            </div>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              required
            />

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason("")
                  setSelectedRequest(null)
                }}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
              >
                Reject Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
