"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, BookOpen, Coffee } from "lucide-react"

export default function SemesterBreakMessage({ currentSemester, nextSemester }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 sm:px-6"
        >
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-6"
                >
                    <GraduationCap className="mx-auto text-green-400 mb-4" size={80} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-4"
                >
                    🎉 Congratulations!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-green-200 mb-6"
                >
                    Your Semester {currentSemester} has ended successfully!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-black/30 rounded-xl p-6 mb-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                            <Coffee className="text-yellow-400 mb-2" size={32} />
                            <h3 className="text-white font-semibold mb-1">Enjoy Your Break</h3>
                            <p className="text-gray-300 text-sm">Take time to relax and recharge</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <Calendar className="text-blue-400 mb-2" size={32} />
                            <h3 className="text-white font-semibold mb-1">Next Semester</h3>
                            <p className="text-gray-300 text-sm">You'll be in Semester {nextSemester}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <BookOpen className="text-purple-400 mb-2" size={32} />
                            <h3 className="text-white font-semibold mb-1">New Enrollment</h3>
                            <p className="text-gray-300 text-sm">Wait for enrollment to open</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="space-y-4">
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                        <h4 className="text-blue-300 font-medium mb-2">📚 What Happened?</h4>
                        <ul className="text-blue-200 text-sm space-y-1 text-left">
                            <li>• Your semester has been automatically incremented</li>
                            <li>• All previous enrollments have been cleared</li>
                            <li>• You're ready for new subject enrollment</li>
                            <li>• Teachers will be assigned new classes for next semester</li>
                        </ul>
                    </div>

                    <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                        <h4 className="text-green-300 font-medium mb-2">🎯 What's Next?</h4>
                        <ul className="text-green-200 text-sm space-y-1 text-left">
                            <li>• Wait for the new academic session to begin</li>
                            <li>• You'll receive enrollment credentials for Semester {nextSemester}</li>
                            <li>• New subjects and teachers will be available</li>
                            <li>• Check back regularly for updates</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 p-4 bg-purple-500/20 border border-purple-400/30 rounded-lg"
                >
                    <p className="text-purple-200 text-sm">
                        💡 <strong>Tip:</strong> Use this break to prepare for your upcoming semester. Review your academic goals
                        and get ready for new challenges!
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
