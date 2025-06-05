"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideUser, LucideLock, LucideMail, LucideArrowLeft, LucideGraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"

export default function StudentLoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.email || !formData.username || !formData.password) {
            Swal.fire({
                icon: "error",
                title: "Missing Information",
                text: "Please fill in all fields",
                confirmButtonColor: "#3b82f6",
            })
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/student/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                // Store student data in localStorage
                localStorage.setItem("studentData", JSON.stringify(data))

                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: `Welcome ${data.student.name}!`,
                    confirmButtonColor: "#10b981",
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    router.push("/student/dashboard")
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message,
                    confirmButtonColor: "#ef4444",
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Connection Error",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#ef4444",
            })
        } finally {
            setLoading(false)
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            width: Math.random() * 100 + 40,
                            height: Math.random() * 100 + 40,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 200 - 100],
                            x: [0, Math.random() * 200 - 100],
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-500/30 relative z-10"
            >
                {/* Header */}
                <motion.div variants={item} className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <LucideArrowLeft className="mr-2" size={20} />
                        Back to Main Login
                    </Link>
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                            <LucideGraduationCap size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Student Portal</h1>
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto rounded-full w-24"></div>
                    <p className="text-blue-200 mt-3 text-sm">Login with your class credentials</p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div variants={item} className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Registered Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideMail className="absolute right-3 top-3.5 text-blue-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="text"
                            name="username"
                            placeholder="Class Username (from teacher)"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideUser className="absolute right-3 top-3.5 text-blue-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Class Password (from teacher)"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideLock className="absolute right-3 top-3.5 text-blue-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                        <p className="text-blue-200 text-sm text-center">
                            💡 <strong>Note:</strong> Use the username and password provided by your teacher along with your
                            registered email address.
                        </p>
                    </motion.div>

                    <motion.button
                        variants={item}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? "Logging in..." : "Login to Class"}
                    </motion.button>
                </form>

                <motion.div variants={item} className="text-center mt-6">
                    <p className="text-blue-200 text-sm">
                        Not registered yet?{" "}
                        <Link href="/student/register" className="text-blue-400 hover:text-blue-300 font-medium">
                            Register here
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
