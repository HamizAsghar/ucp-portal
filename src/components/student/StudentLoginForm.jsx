
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideMail, LucideLock, LucideArrowLeft, LucideGraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"

export default function StudentLoginForm() {
    const [formData, setFormData] = useState({
        email: "",
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

        if (!formData.email || !formData.password) {
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
                credentials: "include",
            })

            const data = await response.json()

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: `Welcome ${data.student.name}!`,
                    confirmButtonColor: "#10b981",
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    // Force a full page reload to ensure fresh data
                    window.location.href = "/student/dashboard"
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
        hidden: { y: 10, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
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
                className="w-full max-w-md bg-black/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-blue-500/20 relative z-10"
            >
                {/* Header */}
                <motion.div variants={item} className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-3">
                        <LucideArrowLeft className="mr-2" size={18} />
                        Back to Main
                    </Link>
                    <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                            <LucideGraduationCap size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Student Portal</h1>
                    <p className="text-blue-200 text-sm">Login to access your dashboard</p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={item} className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                            required
                        />
                        <LucideMail className="absolute right-3 top-2.5 text-blue-400" size={18} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                            required
                        />
                        <LucideLock className="absolute right-3 top-2.5 text-blue-400" size={18} />
                    </motion.div>

                    <motion.button
                        variants={item}
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                <motion.div variants={item} className="text-center mt-4">
                    <p className="text-blue-200 text-sm">
                        Not registered?{" "}
                        <Link href="/student/register" className="text-blue-400 hover:text-blue-300">
                            Register
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}