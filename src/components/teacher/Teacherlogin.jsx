// "use client"

// import { motion } from "framer-motion"
// import { useState } from "react"
// import { LucideLock, LucideMail, LucideArrowLeft, LucideEye, LucideEyeOff } from "lucide-react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields")
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await fetch("/api/teacher/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         router.push("/dashboard")
//       } else {
//         setError(data.message || "Login failed")
//       }
//     } catch (error) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-white/5"
//             style={{
//               width: Math.random() * 60 + 20,
//               height: Math.random() * 60 + 20,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50],
//               x: [0, Math.random() * 100 - 50],
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Number.POSITIVE_INFINITY,
//               repeatType: "reverse",
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated background SVG */}
//       <div className="absolute inset-0 background-animation">
//         <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M100,200 Q300,100 500,200 T900,200"
//             stroke="url(#gradient)"
//             strokeWidth="2"
//             fill="none"
//             className="background-animation"
//           />
//           <path
//             d="M100,400 Q300,300 500,400 T900,400"
//             stroke="url(#gradient)"
//             strokeWidth="2"
//             fill="none"
//             className="background-animation"
//           />
//           <path
//             d="M100,600 Q300,500 500,600 T900,600"
//             stroke="url(#gradient)"
//             strokeWidth="2"
//             fill="none"
//             className="background-animation"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#3b82f6" />
//               <stop offset="50%" stopColor="#8b5cf6" />
//               <stop offset="100%" stopColor="#3b82f6" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>

//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="show"
//         className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative z-10"
//       >
//         {/* Header */}
//         <motion.div variants={item} className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
//             <LucideArrowLeft className="mr-2" size={20} />
//             Back to Home
//           </Link>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400 mb-4">Sign in to your account</p>
//           <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
//         </motion.div>

//         {/* Login Icon */}
//         <motion.div variants={item} className="flex justify-center mb-6">
//           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
//             <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
//               <LucideLock size={32} className="text-blue-400" />
//             </div>
//           </div>
//         </motion.div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.div variants={item} className="relative">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//             <LucideMail className="absolute right-3 top-3.5 text-gray-400" size={20} />
//           </motion.div>

//           <motion.div variants={item} className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
//             >
//               {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
//             </button>
//           </motion.div>

//           {/* Remember Me & Forgot Password */}
//           <motion.div variants={item} className="flex items-center justify-between">
//             <label className="flex items-center text-sm text-gray-400">
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleInputChange}
//                 className="mr-2 rounded border-gray-600 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
//               />
//               Remember me
//             </label>
//             <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
//               Forgot password?
//             </Link>
//           </motion.div>

//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm"
//             >
//               {error}
//             </motion.div>
//           )}

//           <motion.button
//             variants={item}
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </motion.button>
//         </form>

//         {/* Divider */}
//         {/* <motion.div variants={item} className="my-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/20"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-black/50 text-gray-400">Or continue with</span>
//             </div>
//           </div>
//         </motion.div> */}

//         {/* Social Login Buttons */}
//         {/* <motion.div variants={item} className="grid grid-cols-2 gap-3">
//           <button className="flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Google
//           </button>
//           <button className="flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//             </svg>
//             Facebook
//           </button>
//         </motion.div> */}

//         <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
//           Don't have an account?{" "}
//           <Link href="/teacherRegister" className="text-blue-400 hover:text-blue-300 font-medium">
//             Sign up here
//           </Link>
//         </motion.p>
//       </motion.div>

//       <style jsx>{`
//                 @keyframes dash {
//                     to {
//                         stroke-dashoffset: 0;
//                     }
//                 }

//                 .background-animation path {
//                     stroke-dasharray: 1000;
//                     stroke-dashoffset: 1000;
//                     animation: dash 20s linear infinite;
//                 }

//                 @keyframes float {
//                     0%, 100% {
//                         transform: translateY(0);
//                     }
//                     50% {
//                         transform: translateY(-20px);
//                     }
//                 }

//                 .background-animation {
//                     animation: float 10s ease-in-out infinite;
//                 }
//             `}</style>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { LucideLock, LucideMail, LucideArrowLeft, LucideEye, LucideEyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const message = searchParams.get("message")
        if (message) {
            setSuccess(message)
        }
    }, [searchParams])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/teacher/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                if (formData.rememberMe) {
                    localStorage.setItem("user", JSON.stringify(data.user))
                } else {
                    sessionStorage.setItem("user", JSON.stringify(data.user))
                }
                router.push("/teacher/dashboard")
            } else {
                setError(data.message || "Login failed")
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
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <LucideArrowLeft className="mr-2" size={20} />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400 mb-4">Sign in to your account</p>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
                </motion.div>

                <motion.div variants={item} className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                            <LucideLock size={32} className="text-blue-400" />
                        </div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
                        </button>
                    </motion.div>

                    <motion.div variants={item} className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-400">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="mr-2 rounded border-gray-600 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                            />
                            Remember me
                        </label>
                        <Link href="/teacherForgotpassword" className="text-sm text-blue-400 hover:text-blue-300">
                            Forgot password?
                        </Link>
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
                        {loading ? "Signing in..." : "Sign In"}
                    </motion.button>
                </form>

                <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link href="/teacherRegister" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign up here
                    </Link>
                </motion.p>
            </motion.div>

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
        </div>
    )
}