"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    LucideUser,
    LucideGraduationCap,
    LucideUsers,
    LucideBookOpen,
    LucideMail,
    LucideHash,
    LucideMapPin,
    LucideLogOut,
    LucideChevronDown,
    LucideChevronUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState(null)
    const [showClassmates, setShowClassmates] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const data = localStorage.getItem("studentData")
        if (data) {
            setStudentData(JSON.parse(data))
        } else {
            router.push("/student/login")
        }
    }, [router])

    const handleLogout = () => {
        Swal.fire({
            title: "Logout Confirmation",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("studentData")
                Swal.fire({
                    icon: "success",
                    title: "Logged out successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    router.push("/")
                })
            }
        })
    }

    if (!studentData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    const { student, teacher, classmates, classInfo } = studentData

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-blue-500/30"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {student.name}! 🎓</h1>
                        <p className="text-blue-200">
                            {classInfo.semester} Semester - Section {classInfo.section} | Room {classInfo.room}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        <LucideLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30"
                >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <LucideUser className="mr-2" size={24} />
                        Your Information
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <LucideUser className="text-blue-400" size={20} />
                            <span className="text-white font-medium">{student.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideMail className="text-green-400" size={20} />
                            <span className="text-gray-300">{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideHash className="text-purple-400" size={20} />
                            <span className="text-gray-300">{student.registrationNumber}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideGraduationCap className="text-indigo-400" size={20} />
                            <span className="text-gray-300">
                                {student.semester} Semester - Section {student.section}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideMapPin className="text-red-400" size={20} />
                            <span className="text-gray-300">Room {student.room}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Teacher Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30"
                >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <LucideBookOpen className="mr-2" size={24} />
                        Your Teacher
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <LucideUser className="text-green-400" size={20} />
                            <span className="text-white font-medium">{teacher.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideMail className="text-blue-400" size={20} />
                            <span className="text-gray-300">{teacher.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <LucideBookOpen className="text-yellow-400" size={20} />
                            <span className="text-gray-300">{teacher.subject}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Class Statistics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 mt-6 border border-purple-500/30"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">{classInfo.totalStudents}</div>
                        <div className="text-gray-300">Total Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{classmates.length + 1}</div>
                        <div className="text-gray-300">Including You</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">{classInfo.section}</div>
                        <div className="text-gray-300">Section</div>
                    </div>
                </div>
            </motion.div>

            {/* Classmates */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 mt-6 border border-yellow-500/30"
            >
                <button
                    onClick={() => setShowClassmates(!showClassmates)}
                    className="w-full flex items-center justify-between text-2xl font-bold text-white mb-4 hover:text-yellow-400 transition-colors"
                >
                    <div className="flex items-center">
                        <LucideUsers className="mr-2" size={24} />
                        Your Classmates ({classmates.length})
                    </div>
                    {showClassmates ? <LucideChevronUp size={24} /> : <LucideChevronDown size={24} />}
                </button>

                {showClassmates && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                    >
                        {classmates.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No other students in your class yet.</p>
                        ) : (
                            classmates.map((classmate, index) => (
                                <motion.div
                                    key={classmate._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                            <LucideUser className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{classmate.name}</p>
                                            <p className="text-gray-400 text-sm">{classmate.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-sm">{classmate.registrationNumber}</div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}
