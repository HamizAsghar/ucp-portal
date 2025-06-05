// "use client"

// import { useState } from "react"
// import { Users, BookOpen, Send, Key, User, CheckCircle, AlertCircle } from "lucide-react"

// export default function AssignClasses({ allTeachers, sections, fetchData }) {
//     const [selectedTeacher, setSelectedTeacher] = useState("")
//     const [selectedClass, setSelectedClass] = useState("")
//     const [subject, setSubject] = useState("")
//     const [classCredentials, setClassCredentials] = useState({
//         username: "",
//         password: "",
//     })
//     const [loading, setLoading] = useState(false)
//     const [assignedClasses, setAssignedClasses] = useState([])

//     // Get available teachers (approved and not assigned)
//     const availableTeachers = allTeachers?.filter((teacher) => teacher.isApproved && !teacher.assignedClass) || []

//     // Get available classes (not assigned to any teacher)
//     const availableClasses =
//         sections?.filter((section) => !assignedClasses.some((assigned) => assigned.classId === section.classId)) || []

//     const generateCredentials = () => {
//         const username = `class_${selectedClass?.replace(/\s+/g, "_").toLowerCase()}`
//         const password = Math.random().toString(36).slice(-8)
//         setClassCredentials({ username, password })
//     }

//     const handleAssignClass = async () => {
//         if (!selectedTeacher || !selectedClass || !subject || !classCredentials.username || !classCredentials.password) {
//             alert("Please fill all fields and generate credentials")
//             return
//         }

//         setLoading(true)
//         try {
//             const response = await fetch("/api/admin/assign-class", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     teacherId: selectedTeacher,
//                     classId: selectedClass,
//                     subject,
//                     credentials: classCredentials,
//                 }),
//             })

//             const data = await response.json()

//             if (response.ok) {
//                 alert("Class assigned successfully! Email sent to teacher with credentials.")
//                 setSelectedTeacher("")
//                 setSelectedClass("")
//                 setSubject("")
//                 setClassCredentials({ username: "", password: "" })
//                 await fetchData()
//             } else {
//                 alert(`Error: ${data.message}`)
//             }
//         } catch (error) {
//             console.error("Error assigning class:", error)
//             alert("Error assigning class. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const selectedTeacherData = allTeachers?.find((t) => t._id === selectedTeacher)
//     const selectedClassData = sections?.find((s) => s.classId === selectedClass)

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-white">Assign Classes</h1>
//                 <div className="text-gray-400">
//                     {availableTeachers.length} unassigned teachers • {availableClasses.length} available classes
//                 </div>
//             </div>

//             {/* Assignment Form */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
//                     <Users className="mr-2" size={24} />
//                     Assign Teacher to Class
//                 </h2>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Left Column */}
//                     <div className="space-y-4">
//                         {/* Available Teachers */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
//                                 <User className="mr-2" size={16} />
//                                 Available Teachers
//                             </label>
//                             <select
//                                 value={selectedTeacher}
//                                 onChange={(e) => setSelectedTeacher(e.target.value)}
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select Teacher</option>
//                                 {availableTeachers.map((teacher) => (
//                                     <option key={teacher._id} value={teacher._id}>
//                                         {teacher.name} - {teacher.email}
//                                     </option>
//                                 ))}
//                             </select>
//                             {availableTeachers.length === 0 && (
//                                 <p className="text-yellow-400 text-sm mt-1 flex items-center">
//                                     <AlertCircle className="mr-1" size={14} />
//                                     No unassigned teachers available
//                                 </p>
//                             )}
//                         </div>

//                         {/* Available Classes */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
//                                 <BookOpen className="mr-2" size={16} />
//                                 Available Classes
//                             </label>
//                             <select
//                                 value={selectedClass}
//                                 onChange={(e) => setSelectedClass(e.target.value)}
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select Class</option>
//                                 {availableClasses.map((section) => (
//                                     <option key={section._id} value={section.classId}>
//                                         {section.semester} Semester - Section {section.section} (Room {section.room})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Subject */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
//                             <input
//                                 type="text"
//                                 value={subject}
//                                 onChange={(e) => setSubject(e.target.value)}
//                                 placeholder="Enter subject name"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Right Column - Class Credentials */}
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <label className="block text-sm font-medium text-gray-300 flex items-center">
//                                 <Key className="mr-2" size={16} />
//                                 Class Credentials
//                             </label>
//                             <button
//                                 onClick={generateCredentials}
//                                 disabled={!selectedClass}
//                                 className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
//                             >
//                                 Generate
//                             </button>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
//                             <input
//                                 type="text"
//                                 value={classCredentials.username}
//                                 onChange={(e) => setClassCredentials({ ...classCredentials, username: e.target.value })}
//                                 placeholder="Class username"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
//                             <input
//                                 type="text"
//                                 value={classCredentials.password}
//                                 onChange={(e) => setClassCredentials({ ...classCredentials, password: e.target.value })}
//                                 placeholder="Class password"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Assignment Preview */}
//                         {selectedTeacherData && selectedClassData && (
//                             <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
//                                 <h3 className="text-blue-400 font-medium mb-2">Assignment Preview</h3>
//                                 <div className="text-sm text-gray-300 space-y-1">
//                                     <p>
//                                         <strong>Teacher:</strong> {selectedTeacherData.name}
//                                     </p>
//                                     <p>
//                                         <strong>Class:</strong> {selectedClassData.semester} Semester - Section {selectedClassData.section}
//                                     </p>
//                                     <p>
//                                         <strong>Room:</strong> {selectedClassData.room}
//                                     </p>
//                                     <p>
//                                         <strong>Students:</strong> {selectedClassData.enrolledStudents}
//                                     </p>
//                                     {subject && (
//                                         <p>
//                                             <strong>Subject:</strong> {subject}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Assign Button */}
//                 <div className="mt-6">
//                     <button
//                         onClick={handleAssignClass}
//                         disabled={
//                             loading ||
//                             !selectedTeacher ||
//                             !selectedClass ||
//                             !subject ||
//                             !classCredentials.username ||
//                             !classCredentials.password
//                         }
//                         className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
//                     >
//                         {loading ? (
//                             "Assigning..."
//                         ) : (
//                             <>
//                                 <Send className="mr-2" size={20} />
//                                 Assign Class
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {/* Currently Assigned Classes */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//                     <CheckCircle className="mr-2" size={24} />
//                     Currently Assigned Classes
//                 </h2>

//                 <div className="space-y-3">
//                     {allTeachers
//                         ?.filter((teacher) => teacher.assignedClass)
//                         .map((teacher) => (
//                             <div key={teacher._id} className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-white font-medium">{teacher.name}</p>
//                                     <p className="text-gray-400 text-sm">{teacher.email}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-green-400 font-medium">{teacher.assignedClass}</p>
//                                     <p className="text-gray-400 text-sm">{teacher.subject || "Subject not specified"}</p>
//                                 </div>
//                             </div>
//                         ))}

//                     {allTeachers?.filter((teacher) => teacher.assignedClass).length === 0 && (
//                         <p className="text-gray-400 text-center py-4">No classes assigned yet</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Users, BookOpen, Send, Key, User, CheckCircle, AlertCircle } from "lucide-react"

// export default function AssignClasses({ allTeachers, sections, fetchData }) {
//     const [selectedTeacher, setSelectedTeacher] = useState("")
//     const [selectedClass, setSelectedClass] = useState("")
//     const [subject, setSubject] = useState("")
//     const [classCredentials, setClassCredentials] = useState({
//         username: "",
//         password: "",
//     })
//     const [loading, setLoading] = useState(false)
//     const [assignedClasses, setAssignedClasses] = useState([])

//     useEffect(() => {
//         // This will ensure the component shows updated data when allTeachers changes
//     }, [allTeachers])

//     // Get available teachers (approved and not assigned)
//     const availableTeachers = allTeachers?.filter((teacher) => teacher.isApproved && !teacher.assignedClass) || []

//     // Get available classes (not assigned to any teacher)
//     const availableClasses =
//         sections?.filter((section) => !assignedClasses.some((assigned) => assigned.classId === section.classId)) || []

//     const generateCredentials = () => {
//         const username = `class_${selectedClass?.replace(/\s+/g, "_").toLowerCase()}`
//         const password = Math.random().toString(36).slice(-8)
//         setClassCredentials({ username, password })
//     }

//     const handleAssignClass = async () => {
//         if (!selectedTeacher || !selectedClass || !subject || !classCredentials.username || !classCredentials.password) {
//             alert("Please fill all fields and generate credentials")
//             return
//         }

//         setLoading(true)
//         try {
//             const response = await fetch("/api/admin/assign-class", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     teacherId: selectedTeacher,
//                     classId: selectedClass,
//                     subject,
//                     credentials: classCredentials,
//                 }),
//             })

//             const data = await response.json()

//             if (response.ok) {
//                 alert("Class assigned successfully! Email sent to teacher with credentials.")
//                 setSelectedTeacher("")
//                 setSelectedClass("")
//                 setSubject("")
//                 setClassCredentials({ username: "", password: "" })

//                 // Force refresh the data
//                 console.log("Assignment successful, refreshing data...")
//                 await fetchData()
//             } else {
//                 alert(`Error: ${data.message}`)
//             }
//         } catch (error) {
//             console.error("Error assigning class:", error)
//             alert("Error assigning class. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const selectedTeacherData = allTeachers?.find((t) => t._id === selectedTeacher)
//     const selectedClassData = sections?.find((s) => s.classId === selectedClass)

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-white">Assign Classes</h1>
//                 <div className="text-gray-400">
//                     {availableTeachers.length} unassigned teachers • {availableClasses.length} available classes
//                 </div>
//             </div>

//             {/* Assignment Form */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
//                     <Users className="mr-2" size={24} />
//                     Assign Teacher to Class
//                 </h2>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Left Column */}
//                     <div className="space-y-4">
//                         {/* Available Teachers */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
//                                 <User className="mr-2" size={16} />
//                                 Available Teachers
//                             </label>
//                             <select
//                                 value={selectedTeacher}
//                                 onChange={(e) => setSelectedTeacher(e.target.value)}
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select Teacher</option>
//                                 {availableTeachers.map((teacher) => (
//                                     <option key={teacher._id} value={teacher._id}>
//                                         {teacher.name} - {teacher.email}
//                                     </option>
//                                 ))}
//                             </select>
//                             {availableTeachers.length === 0 && (
//                                 <p className="text-yellow-400 text-sm mt-1 flex items-center">
//                                     <AlertCircle className="mr-1" size={14} />
//                                     No unassigned teachers available
//                                 </p>
//                             )}
//                         </div>

//                         {/* Available Classes */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
//                                 <BookOpen className="mr-2" size={16} />
//                                 Available Classes
//                             </label>
//                             <select
//                                 value={selectedClass}
//                                 onChange={(e) => setSelectedClass(e.target.value)}
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select Class</option>
//                                 {availableClasses.map((section) => (
//                                     <option key={section._id} value={section.classId}>
//                                         {section.semester} Semester - Section {section.section} (Room {section.room})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Subject */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
//                             <input
//                                 type="text"
//                                 value={subject}
//                                 onChange={(e) => setSubject(e.target.value)}
//                                 placeholder="Enter subject name"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Right Column - Class Credentials */}
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <label className="block text-sm font-medium text-gray-300 flex items-center">
//                                 <Key className="mr-2" size={16} />
//                                 Class Credentials
//                             </label>
//                             <button
//                                 onClick={generateCredentials}
//                                 disabled={!selectedClass}
//                                 className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
//                             >
//                                 Generate
//                             </button>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
//                             <input
//                                 type="text"
//                                 value={classCredentials.username}
//                                 onChange={(e) => setClassCredentials({ ...classCredentials, username: e.target.value })}
//                                 placeholder="Class username"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
//                             <input
//                                 type="text"
//                                 value={classCredentials.password}
//                                 onChange={(e) => setClassCredentials({ ...classCredentials, password: e.target.value })}
//                                 placeholder="Class password"
//                                 className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Assignment Preview */}
//                         {selectedTeacherData && selectedClassData && (
//                             <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
//                                 <h3 className="text-blue-400 font-medium mb-2">Assignment Preview</h3>
//                                 <div className="text-sm text-gray-300 space-y-1">
//                                     <p>
//                                         <strong>Teacher:</strong> {selectedTeacherData.name}
//                                     </p>
//                                     <p>
//                                         <strong>Class:</strong> {selectedClassData.semester} Semester - Section {selectedClassData.section}
//                                     </p>
//                                     <p>
//                                         <strong>Room:</strong> {selectedClassData.room}
//                                     </p>
//                                     <p>
//                                         <strong>Students:</strong> {selectedClassData.enrolledStudents}
//                                     </p>
//                                     {subject && (
//                                         <p>
//                                             <strong>Subject:</strong> {subject}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Assign Button */}
//                 <div className="mt-6">
//                     <button
//                         onClick={handleAssignClass}
//                         disabled={
//                             loading ||
//                             !selectedTeacher ||
//                             !selectedClass ||
//                             !subject ||
//                             !classCredentials.username ||
//                             !classCredentials.password
//                         }
//                         className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
//                     >
//                         {loading ? (
//                             "Assigning..."
//                         ) : (
//                             <>
//                                 <Send className="mr-2" size={20} />
//                                 Assign Class
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {/* Debug Section - Remove this after testing */}
//             {process.env.NODE_ENV === "development" && (
//                 <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
//                     <h3 className="text-yellow-400 font-medium mb-2">Debug Info:</h3>
//                     <p className="text-yellow-200 text-sm">Total Teachers: {allTeachers?.length || 0}</p>
//                     <p className="text-yellow-200 text-sm">
//                         Approved Teachers: {allTeachers?.filter((t) => t.isApproved).length || 0}
//                     </p>
//                     <p className="text-yellow-200 text-sm">
//                         Teachers with assignedClass: {allTeachers?.filter((t) => t.assignedClass).length || 0}
//                     </p>
//                     <p className="text-yellow-200 text-sm">
//                         Approved + Assigned: {allTeachers?.filter((t) => t.isApproved && t.assignedClass).length || 0}
//                     </p>
//                     {allTeachers
//                         ?.filter((t) => t.assignedClass)
//                         .map((teacher) => (
//                             <div key={teacher._id} className="text-yellow-200 text-xs mt-1">
//                                 {teacher.name}: {teacher.assignedClass} (Approved: {teacher.isApproved ? "Yes" : "No"})
//                             </div>
//                         ))}
//                 </div>
//             )}

//             {/* Currently Assigned Classes */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//                     <CheckCircle className="mr-2" size={24} />
//                     Currently Assigned Classes
//                 </h2>

//                 <div className="space-y-3">
//                     {allTeachers
//                         ?.filter((teacher) => teacher.isApproved && teacher.assignedClass)
//                         .map((teacher) => (
//                             <div key={teacher._id} className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-white font-medium">{teacher.name}</p>
//                                     <p className="text-gray-400 text-sm">{teacher.email}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-green-400 font-medium">{teacher.assignedClass}</p>
//                                     <p className="text-gray-400 text-sm">{teacher.subject || "Subject not specified"}</p>
//                                     {teacher.classCredentials && (
//                                         <div className="text-xs text-blue-400 mt-1">
//                                             <span>👤 {teacher.classCredentials.username}</span>
//                                             <span className="ml-2">🔑 {teacher.classCredentials.password}</span>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )) || []}

//                     {!allTeachers?.filter((teacher) => teacher.isApproved && teacher.assignedClass).length && (
//                         <p className="text-gray-400 text-center py-4">No classes assigned yet</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }











"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, Send, Key, User, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function AssignClasses({ allTeachers, sections, fetchData }) {
    const [selectedTeacher, setSelectedTeacher] = useState("")
    const [selectedClass, setSelectedClass] = useState("")
    const [subject, setSubject] = useState("")
    const [classCredentials, setClassCredentials] = useState({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [assignedClasses, setAssignedClasses] = useState([])
    const [loadingAssigned, setLoadingAssigned] = useState(false)
    const [error, setError] = useState(null)

    // Fetch assigned classes on component mount and when needed
    const fetchAssignedClasses = async () => {
        setLoadingAssigned(true)
        setError(null)
        try {
            console.log("🔄 Fetching assigned classes from API...")
            const response = await fetch("/api/admin/assigned-classes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            console.log("📡 API Response status:", response.status)

            const data = await response.json()
            console.log("📊 API Response data:", data)

            if (response.ok) {
                setAssignedClasses(data.assignedClasses || [])
                console.log("✅ Assigned classes fetched:", data.assignedClasses?.length || 0)
            } else {
                const errorMsg = data.message || `HTTP ${response.status}`
                console.error("❌ Failed to fetch assigned classes:", errorMsg)
                setError(errorMsg)

                // Show detailed error in development
                if (data.error) {
                    console.error("❌ Detailed error:", data.error)
                }
                if (data.stack) {
                    console.error("❌ Error stack:", data.stack)
                }
            }
        } catch (error) {
            console.error("❌ Network error fetching assigned classes:", error)
            setError(`Network error: ${error.message}`)
        } finally {
            setLoadingAssigned(false)
        }
    }

    useEffect(() => {
        fetchAssignedClasses()
    }, [])

    // Get available teachers (approved and not assigned)
    const availableTeachers = allTeachers?.filter((teacher) => teacher.isApproved && !teacher.assignedClass) || []

    // Get available classes (not assigned to any teacher)
    const assignedClassIds = assignedClasses.map((ac) => ac.classDetails?.classId).filter(Boolean)
    const availableClasses = sections?.filter((section) => !assignedClassIds.includes(section.classId)) || []

    const generateCredentials = () => {
        const selectedSection = sections?.find((s) => s.classId === selectedClass)
        if (selectedSection) {
            const username = `class_${selectedSection.semester}_${selectedSection.section}`.toLowerCase()
            const password = Math.random().toString(36).slice(-8)
            setClassCredentials({ username, password })
        }
    }

    const handleAssignClass = async () => {
        if (!selectedTeacher || !selectedClass || !subject || !classCredentials.username || !classCredentials.password) {
            alert("Please fill all fields and generate credentials")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/admin/assign-class", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    teacherId: selectedTeacher,
                    classId: selectedClass,
                    subject,
                    credentials: classCredentials,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                alert("Class assigned successfully! Email sent to teacher with credentials.")
                setSelectedTeacher("")
                setSelectedClass("")
                setSubject("")
                setClassCredentials({ username: "", password: "" })

                // Refresh both main data and assigned classes
                console.log("🔄 Assignment successful, refreshing data...")
                await Promise.all([fetchData(), fetchAssignedClasses()])
            } else {
                alert(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error("Error assigning class:", error)
            alert("Error assigning class. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const selectedTeacherData = allTeachers?.find((t) => t._id === selectedTeacher)
    const selectedClassData = sections?.find((s) => s.classId === selectedClass)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Assign Classes</h1>
                <div className="text-gray-400">
                    {availableTeachers.length} unassigned teachers • {availableClasses.length} available classes
                </div>
            </div>

            {/* Assignment Form */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Users className="mr-2" size={24} />
                    Assign Teacher to Class
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Available Teachers */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                <User className="mr-2" size={16} />
                                Available Teachers
                            </label>
                            <select
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Teacher</option>
                                {availableTeachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.name} - {teacher.email}
                                    </option>
                                ))}
                            </select>
                            {availableTeachers.length === 0 && (
                                <p className="text-yellow-400 text-sm mt-1 flex items-center">
                                    <AlertCircle className="mr-1" size={14} />
                                    No unassigned teachers available
                                </p>
                            )}
                        </div>

                        {/* Available Classes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                <BookOpen className="mr-2" size={16} />
                                Available Classes
                            </label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Class</option>
                                {availableClasses.map((section) => (
                                    <option key={section._id} value={section.classId}>
                                        {section.semester} Semester - Section {section.section} (Room {section.room})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter subject name"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column - Class Credentials */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-300 flex items-center">
                                <Key className="mr-2" size={16} />
                                Class Credentials
                            </label>
                            <button
                                onClick={generateCredentials}
                                disabled={!selectedClass}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                            >
                                Generate
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                            <input
                                type="text"
                                value={classCredentials.username}
                                onChange={(e) => setClassCredentials({ ...classCredentials, username: e.target.value })}
                                placeholder="Class username"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                type="text"
                                value={classCredentials.password}
                                onChange={(e) => setClassCredentials({ ...classCredentials, password: e.target.value })}
                                placeholder="Class password"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Assignment Preview */}
                        {selectedTeacherData && selectedClassData && (
                            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                                <h3 className="text-blue-400 font-medium mb-2">Assignment Preview</h3>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p>
                                        <strong>Teacher:</strong> {selectedTeacherData.name}
                                    </p>
                                    <p>
                                        <strong>Class:</strong> {selectedClassData.semester} Semester - Section {selectedClassData.section}
                                    </p>
                                    <p>
                                        <strong>Room:</strong> {selectedClassData.room}
                                    </p>
                                    <p>
                                        <strong>Students:</strong> {selectedClassData.enrolledStudents}
                                    </p>
                                    {subject && (
                                        <p>
                                            <strong>Subject:</strong> {subject}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Assign Button */}
                <div className="mt-6">
                    <button
                        onClick={handleAssignClass}
                        disabled={
                            loading ||
                            !selectedTeacher ||
                            !selectedClass ||
                            !subject ||
                            !classCredentials.username ||
                            !classCredentials.password
                        }
                        className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            "Assigning..."
                        ) : (
                            <>
                                <Send className="mr-2" size={20} />
                                Assign Class
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Currently Assigned Classes */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                        <CheckCircle className="mr-2" size={24} />
                        Currently Assigned Classes ({assignedClasses.length})
                    </h2>
                    <button
                        onClick={fetchAssignedClasses}
                        disabled={loadingAssigned}
                        className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                    >
                        <RefreshCw className={`${loadingAssigned ? "animate-spin" : ""}`} size={16} />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
                        <p className="text-red-400">❌ Error: {error}</p>
                        <button
                            onClick={fetchAssignedClasses}
                            className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {loadingAssigned ? (
                        <div className="text-center py-8">
                            <div className="text-gray-400">Loading assigned classes...</div>
                        </div>
                    ) : assignedClasses.length === 0 ? (
                        <div className="text-center py-8">
                            <CheckCircle className="mx-auto text-gray-500 mb-4" size={48} />
                            <p className="text-gray-400">No classes assigned yet</p>
                        </div>
                    ) : (
                        assignedClasses.map((assignment) => (
                            <div key={assignment.teacherId} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Teacher & Class Info */}
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-3">👨‍🏫 Teacher Information</h3>
                                        <div className="space-y-2 text-sm">
                                            <p>
                                                <span className="text-gray-400">Name:</span>{" "}
                                                <span className="text-white font-medium">{assignment.teacherName}</span>
                                            </p>
                                            <p>
                                                <span className="text-gray-400">Email:</span>{" "}
                                                <span className="text-gray-300">{assignment.teacherEmail}</span>
                                            </p>
                                            <p>
                                                <span className="text-gray-400">Subject:</span>{" "}
                                                <span className="text-green-400 font-medium">{assignment.subject}</span>
                                            </p>
                                            <p>
                                                <span className="text-gray-400">Assigned:</span>{" "}
                                                <span className="text-gray-300">{new Date(assignment.assignedAt).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Class Details */}
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-3">📚 Class Information</h3>
                                        <div className="space-y-2 text-sm">
                                            <p>
                                                <span className="text-gray-400">Class:</span>{" "}
                                                <span className="text-blue-400 font-medium">{assignment.assignedClass}</span>
                                            </p>
                                            {assignment.classDetails && (
                                                <>
                                                    <p>
                                                        <span className="text-gray-400">Room:</span>{" "}
                                                        <span className="text-gray-300">Room {assignment.classDetails.room}</span>
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-400">Students:</span>{" "}
                                                        <span className="text-gray-300">{assignment.classDetails.enrolledStudents} enrolled</span>
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-400">Class ID:</span>{" "}
                                                        <span className="text-gray-300 font-mono text-xs">{assignment.classDetails.classId}</span>
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Credentials */}
                                {assignment.classCredentials && (
                                    <div className="mt-4 pt-4 border-t border-gray-600">
                                        <h3 className="text-white font-semibold text-lg mb-3">🔐 Student Login Credentials</h3>
                                        <div className="bg-gray-800/50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-400 text-sm">Username:</span>
                                                <div className="bg-gray-900 rounded px-3 py-2 font-mono text-blue-400 text-sm mt-1">
                                                    {assignment.classCredentials.username}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 text-sm">Password:</span>
                                                <div className="bg-gray-900 rounded px-3 py-2 font-mono text-green-400 text-sm mt-1">
                                                    {assignment.classCredentials.password}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
