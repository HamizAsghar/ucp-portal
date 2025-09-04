"use client"

import { AlertTriangle, Clock, BookOpen } from "lucide-react"

export default function SessionGuard({ hasActiveSession }) {
    if (hasActiveSession) {
        return null // Don't render anything if session is active
    }

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md mx-auto text-center">
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700">
                    <div className="mb-6">
                        <AlertTriangle className="mx-auto text-yellow-400 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-white mb-2">No Active Session</h2>
                        <p className="text-gray-400">Please start a new academic session to access dashboard features.</p>
                    </div>

                    <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center mb-2">
                            <Clock className="text-yellow-400 mr-2" size={20} />
                            <span className="text-yellow-400 font-medium">Session Break</span>
                        </div>
                        <p className="text-yellow-200 text-sm">
                            Your semester has ended! Enjoy your semester break and wait for further enrollment opportunities.
                        </p>
                    </div>

                    <div className="space-y-3 text-left">
                        <div className="flex items-center text-gray-300">
                            <BookOpen className="mr-3 text-blue-400" size={16} />
                            <span className="text-sm">All classes have been unassigned</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <BookOpen className="mr-3 text-green-400" size={16} />
                            <span className="text-sm">Student semesters have been incremented</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <BookOpen className="mr-3 text-purple-400" size={16} />
                            <span className="text-sm">Ready for new session enrollment</span>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                        <p className="text-blue-200 text-sm">
                            <strong>Note:</strong> Go to Session Management to start a new academic session.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}