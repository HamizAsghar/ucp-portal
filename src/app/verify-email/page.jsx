"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LucideCheckCircle, LucideXCircle, LucideArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyEmail() {
    const [status, setStatus] = useState("verifying") // verifying, success, error
    const [message, setMessage] = useState("Verifying your email...")
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error")
                setMessage("Invalid or missing verification token")
                return
            }

            try {
                const response = await fetch(`/api/teacher/verify-email?token=${token}`)
                if (response.ok) {
                    setStatus("success")
                    setMessage("Email verified successfully! Redirecting to login...")
                    setTimeout(() => router.push("/teacherlogin"), 3000)
                } else {
                    const data = await response.json()
                    setStatus("error")
                    setMessage(data.message || "Verification failed")
                }
            } catch (error) {
                setStatus("error")
                setMessage("Something went wrong. Please try again.")
            }
        }

        verifyEmail()
    }, [token, router])

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
            {/* Background particles */}
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

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative z-10"
            >
                <motion.div variants={item} className="text-center mb-8">
                    <Link href="/teacherlogin" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <LucideArrowLeft className="mr-2" size={20} />
                        Back to Login
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Email Verification</h1>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
                </motion.div>

                <motion.div variants={item} className="flex justify-center mb-6">
                    {status === "verifying" && (
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {status === "success" && (
                        <LucideCheckCircle className="text-green-500" size={64} />
                    )}
                    {status === "error" && (
                        <LucideXCircle className="text-red-500" size={64} />
                    )}
                </motion.div>

                <motion.div
                    variants={item}
                    className={`text-center text-lg ${
                        status === "success" ? "text-green-300" : status === "error" ? "text-red-300" : "text-gray-300"
                    }`}
                >
                    {message}
                </motion.div>

                {status === "error" && (
                    <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
                        Please try registering again or contact support if the issue persists.
                    </motion.p>
                )}
            </motion.div>
        </div>
    )
}