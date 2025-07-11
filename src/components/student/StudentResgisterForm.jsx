"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  LucideUser,
  LucideCamera,
  LucideMail,
  LucidePhone,
  LucideArrowLeft,
  LucideGraduationCap,
  LucideUsers,
  LucideHash,
  LucideCheckCircle,
  LucideLock,
  LucideX,
  LucideBookOpen,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function StudentRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    registrationNumber: "",
    program: "",
    semester: "",
    section: "",
    image: null,
    password: "",
    confirmPassword: "",
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
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
    setError("")

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.registrationNumber ||
      !formData.program ||
      !formData.semester ||
      !formData.section ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setShowModal(true)
      } else {
        setError(data.message || "Registration failed")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    router.push("/student")
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  }

  const programs = ["BSCS", "BSSE", "BSEE", "BSME", "BBA", "MBA"]
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
  const sections = ["A", "B", "C", "D", "E", "F"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 150 - 75],
              x: [0, Math.random() * 150 - 75],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
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
        className="w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-500/30 relative z-10"
      >
        <motion.div variants={item} className="text-center mb-8">
          <Link href="/student" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <LucideArrowLeft className="mr-2" size={20} />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Student Registration</h1>
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto rounded-full w-24"></div>
          <p className="text-purple-200 mt-2 text-sm">Join our academic community</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm mb-6"
          >
            {error}
          </motion.div>
        )}

        <motion.div variants={item} className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <LucideGraduationCap size={36} className="text-purple-400" />
                )}
              </div>
            </div>
            <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 rounded-full p-2 cursor-pointer transition-colors shadow-lg">
              <LucideCamera size={18} className="text-white" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={item} className="relative">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucideUser className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucideMail className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucidePhone className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="relative">
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number (e.g., F1F22UBSCS060)"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucideHash className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucideLock className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <LucideLock className="absolute right-3 top-3.5 text-purple-400" size={20} />
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="" className="bg-gray-800">
                  Select Program
                </option>
                {programs.map((prog) => (
                  <option key={prog} value={prog} className="bg-gray-800">
                    {prog}
                  </option>
                ))}
              </select>
              <LucideBookOpen className="absolute right-3 top-3.5 text-purple-400" size={20} />
            </div>

            <div className="relative">
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="" className="bg-gray-800">
                  Select Semester
                </option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem} className="bg-gray-800">
                    {sem} Semester
                  </option>
                ))}
              </select>
              <LucideGraduationCap className="absolute right-3 top-3.5 text-purple-400" size={20} />
            </div>

            <div className="relative">
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="" className="bg-gray-800">
                  Select Section
                </option>
                {sections.map((sec) => (
                  <option key={sec} value={sec} className="bg-gray-800">
                    Section {sec}
                  </option>
                ))}
              </select>
              <LucideUsers className="absolute right-3 top-3.5 text-purple-400" size={20} />
            </div>
          </motion.div>

          <motion.button
            variants={item}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Registering..." : "Register Now"}
          </motion.button>
        </form>

        <motion.p variants={item} className="text-center text-purple-200 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/student" className="text-purple-400 hover:text-purple-300 font-medium">
            Login here
          </Link>
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Registration Successful</h2>
                <button
                  onClick={handleModalClose}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <LucideX size={24} />
                </button>
              </div>
              <div className="flex items-center mb-6">
                <LucideCheckCircle className="text-green-300 mr-2" size={24} />
                <p className="text-green-300 text-sm">
                  Email sent successfully! Please check your email to verify your account.
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Go to Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}