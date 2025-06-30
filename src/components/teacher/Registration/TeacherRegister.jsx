"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideUser, LucideCamera, LucideLock, LucideMail, LucidePhone, LucideArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        image: null,
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
                setFormData({
                    ...formData,
                    image: reader.result,
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Missing Information",
                text: "All fields are required",
                confirmButtonColor: "#3b82f6",
            })
            setLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Passwords do not match",
                confirmButtonColor: "#3b82f6",
            })
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 6 characters",
                confirmButtonColor: "#3b82f6",
            })
            setLoading(false)
            return
        }

        try {
            // const response = await fetch("/api/register", {
            const response = await fetch("/api/teacher/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Submitted!",
                    text: "Please check your email to verify your account. Admin approval required.",
                    confirmButtonColor: "#10b981",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    router.push("/")
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: data.message || "Registration failed",
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
                {/* Header */}
                <motion.div variants={item} className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <LucideArrowLeft className="mr-2" size={20} />
                        Back to Login
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Teacher Registration</h1>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
                </motion.div>

                {/* Profile Image Upload */}
                <motion.div variants={item} className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                {imagePreview ? (
                                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <LucideUser size={32} className="text-gray-400" />
                                )}
                            </div>
                        </div>
                        <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer transition-colors">
                            <LucideCamera size={16} className="text-white" />
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                    </div>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={item} className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideUser className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideMail className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucidePhone className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    <motion.div variants={item} className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
                    </motion.div>

                    <motion.button
                        variants={item}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? "Submitting..." : "Submit Registration"}
                    </motion.button>
                </form>

                <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium">
                        Login here
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    )
}
