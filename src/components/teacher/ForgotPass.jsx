"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideMail, LucideArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (!email) {
            setError("Please enter your email address")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/teacher/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(data.message)
                setEmail("")
            } else {
                setError(data.message || "Failed to send reset link")
            }
        } catch (error) {
            setError("Something went wrong. Please try again.")
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
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

            <div className="absolute inset-0 background-animation">
                <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100,200 Q300,100 500,200 T900,200"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        fill="none"
                        className="background-animation"
                    />
                    <path
                        d="M100,400 Q300,300 500,400 T900,400"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        fill="none"
                        className="background-animation"
                    />
                    <path
                        d="M100,600 Q300,500 500,600 T900,600"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        fill="none"
                        className="background-animation"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative z-10"
            >
                <motion.div variants={item} className="text-center mb-8">
                    <Link href="/teacher" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <LucideArrowLeft className="mr-2" size={20} />
                        Back to Login
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400 mb-4">Enter your email to receive a password reset link</p>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={item} className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideMail className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-sm"
                        >
                            {success}
                        </motion.div>
                    )}

                    <motion.button
                        variants={item}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                </form>

                <style jsx>{`
                    @keyframes dash {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }

                    .background-animation path {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: dash 20s linear infinite;
                    }

                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }

                    .background-animation {
                        animation: float 10s ease-in-out infinite;
                    }
                `}</style>
            </motion.div>
        </div>
    )
}