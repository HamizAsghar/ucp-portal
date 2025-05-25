"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
    LucideCheck,
    LucideX,
    LucideUser,
    LucideMail,
    LucidePhone,
    LucideCalendar,
    LucideGraduationCap,
    LucideUsers,
    LucideMenu,
    LucideChevronRight,
    LucideBookOpen,
    LucideUserCheck,
    LucideTrash2,
    LucideMessageSquare,
} from "lucide-react"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("teachers")
    const [teacherRequests, setTeacherRequests] = useState([])
    const [studentRequests, setStudentRequests] = useState([])
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectReason, setRejectReason] = useState("")
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [processingRequests, setProcessingRequests] = useState(new Set())

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            console.log("🔄 Fetching dashboard data...")
            const [teachersRes, studentsRes, sectionsRes] = await Promise.all([
                fetch("/api/admin/teachers"),
                fetch("/api/admin/students"),
                fetch("/api/admin/sections"),
            ])

            const teachersData = await teachersRes.json()
            const studentsData = await studentsRes.json()
            const sectionsData = await sectionsRes.json()

            console.log("📊 Teachers data:", teachersData)
            console.log("📊 Students data:", studentsData)
            console.log("📊 Sections data:", sectionsData)

            setTeacherRequests(teachersData.requests || [])
            setStudentRequests(studentsData.requests || [])
            setSections(sectionsData.sections || [])
            console.log("✅ Dashboard data loaded")
        } catch (error) {
            console.error("❌ Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (request, type) => {
        const requestId = request._id || request.id
        console.log("🔄 Approving request:", { requestId, type, request })

        if (!requestId) {
            console.error("❌ No request ID found")
            alert("Error: Request ID not found")
            return
        }

        if (processingRequests.has(requestId)) return

        setProcessingRequests((prev) => new Set(prev).add(requestId))

        try {
            console.log(`🔄 Approving ${type} request:`, requestId)

            const response = await fetch(`/api/admin/${type}/approve`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ requestId }),
            })

            const data = await response.json()
            console.log("📡 API Response:", data)

            if (response.ok) {
                console.log("✅ Request approved successfully!")
                alert(
                    `${type === "students" ? "Student" : "Teacher"} request approved successfully! ${data.emailSent ? "Email sent." : "SMS will be sent to phone."}`,
                )
                await fetchData() // Refresh data
            } else {
                console.error("❌ Approval failed:", data)
                alert(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error("❌ Error approving request:", error)
            alert("Error approving request. Please try again.")
        } finally {
            setProcessingRequests((prev) => {
                const newSet = new Set(prev)
                newSet.delete(requestId)
                return newSet
            })
        }
    }

    const handleRejectClick = (request, type) => {
        const requestId = request._id || request.id
        console.log("🔄 Preparing to reject:", { requestId, type, request })
        setSelectedRequest({ ...request, type, requestId })
        setShowRejectModal(true)
    }

    const handleRejectSubmit = async () => {
        if (!rejectReason.trim()) {
            alert("Please provide a reason for rejection")
            return
        }

        try {
            console.log(`🔄 Rejecting ${selectedRequest.type} request:`, selectedRequest.requestId)

            const response = await fetch(`/api/admin/${selectedRequest.type}/reject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestId: selectedRequest.requestId,
                    reason: rejectReason,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                console.log("✅ Request rejected successfully!")
                alert("Request rejected successfully!")
                setShowRejectModal(false)
                setRejectReason("")
                setSelectedRequest(null)
                await fetchData()
            } else {
                console.error("❌ Rejection failed:", data)
                alert(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error("❌ Error rejecting request:", error)
            alert("Error rejecting request. Please try again.")
        }
    }

    const handleDeleteStudent = async (request) => {
        const studentId = request._id || request.id
        if (confirm("Are you sure you want to delete this student?")) {
            try {
                const response = await fetch(`/api/admin/students/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ studentId }),
                })

                if (response.ok) {
                    alert("Student deleted successfully!")
                    await fetchData()
                }
            } catch (error) {
                console.error("❌ Error deleting student:", error)
            }
        }
    }

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    const sidebarItems = [
        {
            id: "teachers",
            label: "Teacher Requests",
            icon: LucideUserCheck,
            count: teacherRequests.filter((r) => r.status === "pending").length,
        },
        {
            id: "students",
            label: "Student Requests",
            icon: LucideGraduationCap,
            count: studentRequests.filter((r) => r.status === "pending").length,
        },
        { id: "sections", label: "Class Sections", icon: LucideUsers, count: sections.length },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                            width: Math.random() * 60 + 20,
                            height: Math.random() * 60 + 20,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            {/* Sidebar - Fixed with proper collapse behavior */}
            <motion.div
                initial={false}
                animate={{
                    width: sidebarOpen ? 320 : 80,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-black/50 backdrop-blur-md border-r border-white/10 relative z-10 flex-shrink-0"
            >
                <div className="p-6 h-full">
                    <div className="flex items-center justify-between mb-8">
                        {sidebarOpen && (
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: sidebarOpen ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-2xl font-bold text-white"
                            >
                                Admin Panel
                            </motion.h2>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                        >
                            <LucideMenu size={24} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 rounded-xl transition-all ${activeTab === item.id
                                        ? "bg-blue-600/30 border border-blue-500/50 text-white"
                                        : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                title={!sidebarOpen ? item.label : undefined}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon size={20} />
                                    {sidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="font-medium"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </div>
                                {sidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: sidebarOpen ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center space-x-2"
                                    >
                                        {item.count > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.count}</span>
                                        )}
                                        <LucideChevronRight size={16} />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </nav>
                </div>
            </motion.div>

            {/* Main Content - Responsive to sidebar state */}
            <div className="flex-1 p-6 relative z-10 min-w-0">
                <motion.div variants={container} initial="hidden" animate="show">
                    {/* Header */}
                    <motion.div variants={item} className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            {activeTab === "teachers" && "Teacher Requests"}
                            {activeTab === "students" && "Student Requests"}
                            {activeTab === "sections" && "Class Sections"}
                        </h1>
                        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
                    </motion.div>

                    {/* Teacher Requests */}
                    {activeTab === "teachers" && (
                        <motion.div variants={item} className="space-y-4">
                            {teacherRequests.length === 0 ? (
                                <div className="text-center text-gray-400 py-12">
                                    <LucideBookOpen size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-xl">No teacher requests found</p>
                                </div>
                            ) : (
                                teacherRequests.map((request) => {
                                    const requestId = request._id || request.id
                                    return (
                                        <motion.div
                                            key={requestId}
                                            className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                                                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                                            {request.image ? (
                                                                <img
                                                                    src={request.image || "/placeholder.svg"}
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <LucideUser size={24} className="text-gray-400" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-white">{request.name}</h3>
                                                        <div className="flex items-center text-gray-400 text-sm mt-1">
                                                            <LucideMail size={16} className="mr-2" />
                                                            {request.email}
                                                        </div>
                                                        <div className="flex items-center text-gray-400 text-sm mt-1">
                                                            <LucidePhone size={16} className="mr-2" />
                                                            {request.phone}
                                                        </div>
                                                        <div className="flex items-center text-gray-400 text-sm mt-1">
                                                            <LucideCalendar size={16} className="mr-2" />
                                                            {new Date(request.createdAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-xs text-purple-400 mt-1">ID: {requestId}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === "pending"
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
                                                                onClick={() => handleApprove(request, "teachers")}
                                                                disabled={processingRequests.has(requestId)}
                                                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                                                                whileHover={{ scale: processingRequests.has(requestId) ? 1 : 1.1 }}
                                                                whileTap={{ scale: processingRequests.has(requestId) ? 1 : 0.9 }}
                                                            >
                                                                <LucideCheck size={20} />
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={() => handleRejectClick(request, "teachers")}
                                                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <LucideX size={20} />
                                                            </motion.button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            )}
                        </motion.div>
                    )}

                    {/* Student Requests */}
                    {activeTab === "students" && (
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
                                                        <div className="text-purple-400 font-mono text-sm mb-1">
                                                            Reg: {request.registrationNumber}
                                                        </div>
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
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === "pending"
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
                    )}

                    {/* Class Sections */}
                    {activeTab === "sections" && (
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sections.length === 0 ? (
                                <div className="col-span-full text-center text-gray-400 py-12">
                                    <LucideUsers size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-xl">No sections found</p>
                                </div>
                            ) : (
                                sections.map((section) => (
                                    <motion.div
                                        key={`${section.semester}-${section.section}`}
                                        className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <LucideUsers size={24} className="text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{section.semester} Semester</h3>
                                            <p className="text-purple-400 font-semibold mb-4">Section {section.section}</p>
                                            <div className="bg-white/10 rounded-lg p-3">
                                                <p className="text-2xl font-bold text-white">{section.enrolledStudents}</p>
                                                <p className="text-gray-400 text-sm">Enrolled Students</p>
                                            </div>
                                            <div className="mt-4 space-y-2">
                                                <p className="text-sm text-gray-300">Class ID: {section.classId}</p>
                                                <p className="text-sm text-gray-300">Room: {section.room}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Reject Modal */}
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
        </div>
    )
}
