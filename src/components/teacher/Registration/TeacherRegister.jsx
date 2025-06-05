// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FaUser, FaCamera } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { MdEmail } from "react-icons/md";
// import { CldUploadWidget } from "next-cloudinary";
// import Swal from "sweetalert2";
// import './RegisterForm.css'
// const RegisterForm = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const [image, setImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleImageUploadSuccess = (results) => {
//         if (results.info?.secure_url && results.event === "success") {
//             setImage(results.info.secure_url);
//             setImagePreview(results.info.secure_url);
//         }
//     };

//     const handleImageUploadError = (error) => {
//         console.error("Cloudinary upload error:", error);
//         setError("Error uploading the image. Please try again.");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         if (!name || !email || !password || !confirmPassword || !image) {
//             setError("All fields are necessary.");
//             setLoading(false);
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             setLoading(false);
//             return;
//         }

//         try {
//             const resUserExists = await fetch("api/userExists", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             const { user } = await resUserExists.json();
//             if (user) {
//                 setError("User already exists.");
//                 setLoading(false);
//                 return;
//             }

//             const res = await fetch("api/teacher/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name,
//                     email,
//                     password,
//                     image,
//                 }),
//             });

//             if (res.ok) {
//                 const form = e.target;
//                 form.reset();
//                 Swal.fire({
//                     icon: "success",
//                     title: "Registration Successful",
//                     text: "You have been successfully registered!",
//                     confirmButtonText: "OK",
//                 }).then(() => {
//                     router.push("/");
//                 });
//             } else {
//                 setError("Registration failed");
//             }
//         } catch (error) {
//             console.error("Error during registration", error);
//             setError("Registration failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
//             <BackgroundAnimation />
//             {/* Left side - Welcome Message */}
//             <div className="hidden md:flex flex-col justify-center p-12 relative z-10">
//                 <div>
//                     <h1 className="text-4xl font-bold text-purple-500 mb-4">Teachers <span className=" text-white">Registration Form</span></h1>
//                 </div>
//             </div>

//             {/* Right side - Form */}
//             <div className="flex items-center justify-center p-6 relative z-10">
//                 <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-xl p-8">
//                     <h2 className="text-2xl font-bold text-center text-purple-500 mb-8"> <span className=" text-white">Create</span> Account</h2>

//                     <div className="flex justify-center mb-6">
//                         <div className="relative">
//                             {imagePreview ? (
//                                 <img
//                                     src={imagePreview}
//                                     alt="Profile preview"
//                                     className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
//                                 />
//                             ) : (
//                                 <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center border-4 border-amber-500">
//                                     <FaUser className="w-12 h-12 text-purple-500" />
//                                 </div>
//                             )}
//                             <CldUploadWidget
//                                 uploadPreset="hwlqikvn"
//                                 onSuccess={handleImageUploadSuccess}
//                                 onError={handleImageUploadError}
//                                 options={{
//                                     cloudName: "dpuw5wqyp",
//                                     multiple: false,
//                                 }}
//                             >
//                                 {({ open }) => (
//                                     <button
//                                         type="button"
//                                         className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-amber-700 transition-colors"
//                                         onClick={open}
//                                     >
//                                         <FaCamera className="text-black" />
//                                     </button>
//                                 )}
//                             </CldUploadWidget>
//                         </div>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="relative">
//                             <input
//                                 onChange={(e) => setName(e.target.value)}
//                                 type="text"
//                                 name="username"
//                                 placeholder="Username"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-black bg-opacity-50 text-white"
//                                 required
//                             />
//                             <FaUser className="absolute top-3.5 right-3 text-gray-400" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-black bg-opacity-50 text-white"
//                                 required
//                             />
//                             <MdEmail className="absolute top-3.5 right-3 text-gray-400" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-black bg-opacity-50 text-white"
//                                 required
//                             />
//                             <RiLockPasswordFill className="absolute top-3.5 right-3 text-gray-400" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-black bg-opacity-50 text-white"
//                                 required
//                             />
//                             <RiLockPasswordFill className="absolute top-3.5 right-3 text-gray-400" />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full py-3 text-black bg-amber-600 rounded-lg hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
//                         >
//                             {loading ? "Creating Account..." : "Create Account"}
//                         </button>
//                     </form>

//                     {error && (
//                         <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
//                             {error}
//                         </div>
//                     )}

//                     <p className="mt-6 text-sm text-white text-center">
//                         Already have an account?{" "}
//                         <Link href="/login" className="font-semibold text-white hover:text-amber-600 hover:underline">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const BackgroundAnimation = () => {
//     useEffect(() => {
//         const svg = document.querySelector('.background-animation');
//         const animate = () => {
//             const paths = svg.querySelectorAll('path');
//             paths.forEach((path, index) => {
//                 const length = path.getTotalLength();
//                 path.style.strokeDasharray = length;
//                 path.style.strokeDashoffset = length;
//                 path.style.animation = `dash ${10 + index * 2}s linear infinite`;
//             });
//         };
//         animate();
//     }, []);

//     return (
//         <svg className="background-animation absolute top-10  inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
//             <path d="M0,0 Q100,200 200,0 T400,0" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="4" fill="none" />
//             <path d="M0,40 Q120,240 240,40 T480,40" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="4" fill="none" />
//             <path d="M0,80 Q140,280 280,80 T560,80" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="4" fill="none" />
//             <path d="M0,120 Q160,320 320,120 T640,120" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="4" fill="none" />
//             <path d="M0,160 Q180,360 360,160 T720,160" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="4" fill="none" />
//         </svg>
//     );
// };

// export default RegisterForm;







// "use client"

// import { motion } from "framer-motion"
// import { useState } from "react"
// import { LucideUser, LucideCamera, LucideLock, LucideMail, LucidePhone, LucideArrowLeft } from "lucide-react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function RegisterForm() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         image: null,
//     })
//     const [imagePreview, setImagePreview] = useState(null)
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             const reader = new FileReader()
//             reader.onloadend = () => {
//                 setImagePreview(reader.result)
//                 setFormData({
//                     ...formData,
//                     image: reader.result,
//                 })
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         setError("")

//         if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
//             setError("All fields are required")
//             setLoading(false)
//             return
//         }

//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match")
//             setLoading(false)
//             return
//         }

//         if (formData.password.length < 6) {
//             setError("Password must be at least 6 characters")
//             setLoading(false)
//             return
//         }

//         try {
//             const response = await fetch("/api/teacher/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()

//             if (response.ok) {
//                 alert("Registration request submitted successfully! Please wait for admin approval.")
//                 router.push("/")
//             } else {
//                 setError(data.message || "Registration failed")
//             }
//         } catch (error) {
//             setError("Something went wrong. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     }

//     const item = {
//         hidden: { y: 20, opacity: 0 },
//         show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
//             {/* Background particles */}
//             <div className="absolute inset-0 overflow-hidden">
//                 {[...Array(20)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute rounded-full bg-white/5"
//                         style={{
//                             width: Math.random() * 60 + 20,
//                             height: Math.random() * 60 + 20,
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                             y: [0, Math.random() * 100 - 50],
//                             x: [0, Math.random() * 100 - 50],
//                             opacity: [0.1, 0.3, 0.1],
//                         }}
//                         transition={{
//                             duration: Math.random() * 10 + 10,
//                             repeat: Number.POSITIVE_INFINITY,
//                             repeatType: "reverse",
//                         }}
//                     />
//                 ))}
//             </div>

//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative z-10"
//             >
//                 {/* Header */}
//                 <motion.div variants={item} className="text-center mb-8">
//                     <Link href="/teacherlogin" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
//                         <LucideArrowLeft className="mr-2" size={20} />
//                         Back to Login
//                     </Link>
//                     <h1 className="text-3xl font-bold text-white mb-2">Teacher Registration</h1>
//                     <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
//                 </motion.div>

//                 {/* Profile Image Upload */}
//                 <motion.div variants={item} className="flex justify-center mb-6">
//                     <div className="relative">
//                         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
//                             <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
//                                 {imagePreview ? (
//                                     <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
//                                 ) : (
//                                     <LucideUser size={32} className="text-gray-400" />
//                                 )}
//                             </div>
//                         </div>
//                         <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer transition-colors">
//                             <LucideCamera size={16} className="text-white" />
//                             <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                         </label>
//                     </div>
//                 </motion.div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Full Name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideUser className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email Address"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideMail className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="tel"
//                             name="phone"
//                             placeholder="Phone Number"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucidePhone className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm"
//                         >
//                             {error}
//                         </motion.div>
//                     )}

//                     <motion.button
//                         variants={item}
//                         type="submit"
//                         disabled={loading}
//                         className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         {loading ? "Submitting..." : "Submit Registration"}
//                     </motion.button>
//                 </form>

//                 <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
//                     Already have an account?{" "}
//                     <Link href="/teacherlogin" className="text-blue-400 hover:text-blue-300 font-medium">
//                         Login here
//                     </Link>
//                 </motion.p>
//             </motion.div>
//         </div>
//     )
// }

// "use client"

// import { motion } from "framer-motion"
// import { useState } from "react"
// import { LucideUser, LucideCamera, LucideLock, LucideMail, LucidePhone, LucideArrowLeft } from "lucide-react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function RegisterForm() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         image: null,
//     })
//     const [imagePreview, setImagePreview] = useState(null)
//     const [error, setError] = useState("")
//     const [success, setSuccess] = useState("")
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             const reader = new FileReader()
//             reader.onloadend = () => {
//                 setImagePreview(reader.result)
//                 setFormData({
//                     ...formData,
//                     image: reader.result,
//                 })
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         setError("")
//         setSuccess("")

//         if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
//             setError("All fields are required")
//             setLoading(false)
//             return
//         }

//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match")
//             setLoading(false)
//             return
//         }

//         if (formData.password.length < 6) {
//             setError("Password must be at least 6 characters")
//             setLoading(false)
//             return
//         }

//         try {
//             const response = await fetch("/api/teacher/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()

//             if (response.ok) {
//                 setSuccess(data.message)
//                 setTimeout(() => router.push("/teacherlogin"), 3000) // Redirect to login after 3 seconds
//             } else {
//                 setError(data.message || "Registration failed")
//             }
//         } catch (error) {
//             setError("Something went wrong. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     }

//     const item = {
//         hidden: { y: 20, opacity: 0 },
//         show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
//             {/* Background particles */}
//             <div className="absolute inset-0 overflow-hidden">
//                 {[...Array(20)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute rounded-full bg-white/5"
//                         style={{
//                             width: Math.random() * 60 + 20,
//                             height: Math.random() * 60 + 20,
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                             y: [0, Math.random() * 100 - 50],
//                             x: [0, Math.random() * 100 - 50],
//                             opacity: [0.1, 0.3, 0.1],
//                         }}
//                         transition={{
//                             duration: Math.random() * 10 + 10,
//                             repeat: Number.POSITIVE_INFINITY,
//                             repeatType: "reverse",
//                         }}
//                     />
//                 ))}
//             </div>

//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative z-10"
//             >
//                 {/* Header */}
//                 <motion.div variants={item} className="text-center mb-8">
//                     <Link href="/teacherlogin" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
//                         <LucideArrowLeft className="mr-2" size={20} />
//                         Back to Login
//                     </Link>
//                     <h1 className="text-3xl font-bold text-white mb-2">Teacher Registration</h1>
//                     <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-20"></div>
//                 </motion.div>

//                 {/* Profile Image Upload */}
//                 <motion.div variants={item} className="flex justify-center mb-6">
//                     <div className="relative">
//                         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
//                             <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
//                                 {imagePreview ? (
//                                     <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
//                                 ) : (
//                                     <LucideUser size={32} className="text-gray-400" />
//                                 )}
//                             </div>
//                         </div>
//                         <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer transition-colors">
//                             <LucideCamera size={16} className="text-white" />
//                             <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                         </label>
//                     </div>
//                 </motion.div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Full Name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideUser className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email Address"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideMail className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="tel"
//                             name="phone"
//                             placeholder="Phone Number"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucidePhone className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     <motion.div variants={item} className="relative">
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                         />
//                         <LucideLock className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                     </motion.div>

//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm"
//                         >
//                             {error}
//                         </motion.div>
//                     )}

//                     {success && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-sm"
//                         >
//                             {success}
//                         </motion.div>
//                     )}

//                     <motion.button
//                         variants={item}
//                         type="submit"
//                         disabled={loading}
//                         className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         {loading ? "Submitting..." : "Submit Registration"}
//                     </motion.button>
//                 </form>

//                 <motion.p variants={item} className="text-center text-gray-400 text-sm mt-6">
//                     Already have an account?{" "}
//                     <Link href="/teacherlogin" className="text-blue-400 hover:text-blue-300 font-medium">
//                         Login here
//                     </Link>
//                 </motion.p>
//             </motion.div>
//         </div>
//     )
// }

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
            const response = await fetch("/api/register", {
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
