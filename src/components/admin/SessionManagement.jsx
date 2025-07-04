// "use client"

// import { useState, useEffect } from "react"
// import { Play, Square, Download, Clock, FileText, AlertCircle, CheckCircle, Trash2 } from "lucide-react"

// export default function SessionManagement({ onSessionChange }) {
//   const [sessionStatus, setSessionStatus] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [sessionForm, setSessionForm] = useState({
//     sessionType: "",
//     year: new Date().getFullYear(),
//   })
//   const [sessionHistory, setSessionHistory] = useState([])
//   const [showEndConfirm, setShowEndConfirm] = useState(false)
//   const [deletingSession, setDeletingSession] = useState(null)

//   useEffect(() => {
//     checkSessionStatus()
//     fetchSessionHistory()
//   }, [])

//   const checkSessionStatus = async () => {
//     try {
//       const response = await fetch("/api/admin/session/status")
//       const data = await response.json()
//       setSessionStatus(data)
//       if (onSessionChange) {
//         onSessionChange(data.hasActiveSession)
//       }
//     } catch (error) {
//       console.error("Error checking session status:", error)
//     }
//   }

//   const fetchSessionHistory = async () => {
//     try {
//       const response = await fetch("/api/admin/session/history")
//       const data = await response.json()
//       setSessionHistory(data.sessions || [])
//     } catch (error) {
//       console.error("Error fetching session history:", error)
//     }
//   }

//   const startSession = async () => {
//     if (!sessionForm.sessionType || !sessionForm.year) {
//       alert("Please fill all fields")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch("/api/admin/session/start", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(sessionForm),
//       })

//       const data = await response.json()
//       if (response.ok) {
//         alert("Session started successfully!")
//         checkSessionStatus()
//         setSessionForm({ sessionType: "", year: new Date().getFullYear() })
//       } else {
//         alert(data.message)
//       }
//     } catch (error) {
//       alert("Error starting session")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const endSession = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch("/api/admin/session/end", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       })

//       const data = await response.json()
//       if (response.ok) {
//         try {
//           // Generate and download PDF
//           await generateSessionPDF(data.sessionData)
//           alert("Session ended successfully! PDF report has been downloaded.")
//         } catch (pdfError) {
//           console.error("PDF Error:", pdfError)
//           alert(
//             "Session ended successfully, but there was an error generating the PDF report. Please try downloading from session history.",
//           )
//         }

//         checkSessionStatus()
//         fetchSessionHistory()
//         setShowEndConfirm(false)
//       } else {
//         alert(data.message)
//       }
//     } catch (error) {
//       console.error("Error ending session:", error)
//       alert("Error ending session. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const generateSessionPDF = async (sessionData) => {
//     try {
//       console.log("Starting PDF generation...", sessionData)

//       // Proper dynamic import for jsPDF and autoTable
//       const { default: jsPDF } = await import("jspdf")
//       const autoTableModule = await import("jspdf-autotable")

//       // Create new PDF instance
//       const doc = new jsPDF()

//       // Title and Header
//       doc.setFontSize(24)
//       doc.setTextColor(40, 40, 40)
//       doc.text("Academic Session Report", 20, 25)

//       // Session Info Box
//       doc.setFontSize(14)
//       doc.setTextColor(60, 60, 60)
//       doc.text("Session Information", 20, 45)

//       doc.setFontSize(12)
//       doc.setTextColor(80, 80, 80)
//       doc.text(`Session Type: ${sessionData.sessionInfo.sessionType}`, 25, 55)
//       doc.text(`Academic Year: ${sessionData.sessionInfo.year}`, 25, 65)
//       doc.text(`Start Date: ${new Date(sessionData.sessionInfo.startDate).toLocaleDateString()}`, 25, 75)
//       doc.text(`End Date: ${new Date(sessionData.sessionInfo.endDate).toLocaleDateString()}`, 25, 85)

//       // Calculate session duration
//       const duration = Math.ceil(
//         (new Date(sessionData.sessionInfo.endDate) - new Date(sessionData.sessionInfo.startDate)) /
//         (1000 * 60 * 60 * 24),
//       )
//       doc.text(`Duration: ${duration} days`, 25, 95)

//       let yPosition = 110

//       // Summary Statistics
//       doc.setFontSize(16)
//       doc.setTextColor(40, 40, 40)
//       doc.text("Session Summary", 20, yPosition)
//       yPosition += 15

//       const totalTeachers = sessionData.teachers ? sessionData.teachers.length : 0
//       const totalStudents = sessionData.students ? sessionData.students.length : 0
//       const totalClasses = sessionData.classes ? sessionData.classes.length : 0
//       const totalActivities = sessionData.activities ? sessionData.activities.length : 0

//       doc.setFontSize(12)
//       doc.setTextColor(80, 80, 80)
//       doc.text(`Total Teachers: ${totalTeachers}`, 25, yPosition)
//       doc.text(`Total Students: ${totalStudents}`, 25, yPosition + 10)
//       doc.text(`Total Classes: ${totalClasses}`, 25, yPosition + 20)
//       doc.text(`Total Activities: ${totalActivities}`, 25, yPosition + 30)

//       yPosition += 50

//       // Teachers Section
//       if (sessionData.teachers && sessionData.teachers.length > 0) {
//         if (yPosition > 250) {
//           doc.addPage()
//           yPosition = 20
//         }

//         doc.setFontSize(16)
//         doc.setTextColor(40, 40, 40)
//         doc.text("Teachers Details", 20, yPosition)
//         yPosition += 10

//         const teacherData = sessionData.teachers.map((teacher, index) => [
//           index + 1,
//           teacher.name || "N/A",
//           teacher.email || "N/A",
//           teacher.classAssignments ? teacher.classAssignments.length : 0,
//           teacher.classAssignments
//             ? teacher.classAssignments.map((a) => a.subject || a.classDisplayName).join(", ")
//             : "No assignments",
//         ])

//         // Use autoTable correctly
//         doc.autoTable({
//           startY: yPosition,
//           head: [["#", "Teacher Name", "Email", "Classes Assigned", "Subjects/Classes"]],
//           body: teacherData,
//           theme: "striped",
//           headStyles: { fillColor: [41, 128, 185] },
//           styles: { fontSize: 10 },
//           columnStyles: {
//             0: { cellWidth: 15 },
//             1: { cellWidth: 40 },
//             2: { cellWidth: 50 },
//             3: { cellWidth: 25 },
//             4: { cellWidth: 60 },
//           },
//         })

//         yPosition = doc.lastAutoTable.finalY + 20
//       }

//       // Class Assignments Details
//       if (
//         sessionData.teachers &&
//         sessionData.teachers.some((t) => t.classAssignments && t.classAssignments.length > 0)
//       ) {
//         if (yPosition > 250) {
//           doc.addPage()
//           yPosition = 20
//         }

//         doc.setFontSize(16)
//         doc.setTextColor(40, 40, 40)
//         doc.text("Class Assignments", 20, yPosition)
//         yPosition += 10

//         const assignmentData = []
//         sessionData.teachers.forEach((teacher) => {
//           if (teacher.classAssignments && teacher.classAssignments.length > 0) {
//             teacher.classAssignments.forEach((assignment) => {
//               assignmentData.push([
//                 teacher.name || "N/A",
//                 assignment.classDisplayName || assignment.className || "N/A",
//                 assignment.subject || "N/A",
//                 assignment.sections ? assignment.sections.join(", ") : "N/A",
//                 assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleDateString() : "N/A",
//               ])
//             })
//           }
//         })

//         if (assignmentData.length > 0) {
//           doc.autoTable({
//             startY: yPosition,
//             head: [["Teacher", "Class", "Subject", "Sections", "Assigned Date"]],
//             body: assignmentData,
//             theme: "striped",
//             headStyles: { fillColor: [46, 204, 113] },
//             styles: { fontSize: 10 },
//           })
//           yPosition = doc.lastAutoTable.finalY + 20
//         }
//       }

//       // Students Section
//       if (sessionData.students && sessionData.students.length > 0) {
//         if (yPosition > 250) {
//           doc.addPage()
//           yPosition = 20
//         }

//         doc.setFontSize(16)
//         doc.setTextColor(40, 40, 40)
//         doc.text("Students Details", 20, yPosition)
//         yPosition += 10

//         const studentData = sessionData.students.map((student, index) => [
//           index + 1,
//           student.name || "N/A",
//           student.registrationNumber || "N/A",
//           student.program || "N/A",
//           student.semester || "N/A",
//           student.section || "N/A",
//           student.email || "N/A",
//         ])

//         doc.autoTable({
//           startY: yPosition,
//           head: [["#", "Student Name", "Reg Number", "Program", "Semester", "Section", "Email"]],
//           body: studentData,
//           theme: "striped",
//           headStyles: { fillColor: [231, 76, 60] },
//           styles: { fontSize: 9 },
//           columnStyles: {
//             0: { cellWidth: 15 },
//             1: { cellWidth: 35 },
//             2: { cellWidth: 30 },
//             3: { cellWidth: 25 },
//             4: { cellWidth: 20 },
//             5: { cellWidth: 20 },
//             6: { cellWidth: 45 },
//           },
//         })
//         yPosition = doc.lastAutoTable.finalY + 20
//       }

//       // Classes Section
//       if (sessionData.classes && sessionData.classes.length > 0) {
//         if (yPosition > 250) {
//           doc.addPage()
//           yPosition = 20
//         }

//         doc.setFontSize(16)
//         doc.setTextColor(40, 40, 40)
//         doc.text("Classes Created", 20, yPosition)
//         yPosition += 10

//         const classData = sessionData.classes.map((classItem, index) => [
//           index + 1,
//           classItem.className || classItem.name || "N/A",
//           classItem.subject || "N/A",
//           classItem.semester || "N/A",
//           classItem.sections ? classItem.sections.join(", ") : "N/A",
//           classItem.createdAt ? new Date(classItem.createdAt).toLocaleDateString() : "N/A",
//         ])

//         doc.autoTable({
//           startY: yPosition,
//           head: [["#", "Class Name", "Subject", "Semester", "Sections", "Created Date"]],
//           body: classData,
//           theme: "striped",
//           headStyles: { fillColor: [155, 89, 182] },
//           styles: { fontSize: 10 },
//         })
//         yPosition = doc.lastAutoTable.finalY + 20
//       }

//       // Activities Log
//       if (sessionData.activities && sessionData.activities.length > 0) {
//         if (yPosition > 250) {
//           doc.addPage()
//           yPosition = 20
//         }

//         doc.setFontSize(16)
//         doc.setTextColor(40, 40, 40)
//         doc.text("Session Activities Log", 20, yPosition)
//         yPosition += 10

//         const activityData = sessionData.activities
//           .slice(0, 20)
//           .map((activity, index) => [
//             index + 1,
//             activity.type || "N/A",
//             activity.description || "N/A",
//             activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
//           ])

//         doc.autoTable({
//           startY: yPosition,
//           head: [["#", "Activity Type", "Description", "Date"]],
//           body: activityData,
//           theme: "striped",
//           headStyles: { fillColor: [52, 152, 219] },
//           styles: { fontSize: 9 },
//         })
//       }

//       // Footer
//       const pageCount = doc.internal.getNumberOfPages()
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i)
//         doc.setFontSize(8)
//         doc.setTextColor(128, 128, 128)
//         doc.text(
//           `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
//           20,
//           doc.internal.pageSize.height - 10,
//         )
//       }

//       // Save PDF with proper filename
//       const fileName = `Session_Report_${sessionData.sessionInfo.sessionType}_${sessionData.sessionInfo.year}_${new Date().getTime()}.pdf`
//       doc.save(fileName)

//       console.log("PDF generated successfully:", fileName)
//       return true
//     } catch (error) {
//       console.error("Detailed PDF generation error:", error)
//       throw new Error(`PDF Generation Failed: ${error.message}`)
//     }
//   }

//   const downloadHistoryPDF = async (session) => {
//     if (session.sessionData) {
//       try {
//         await generateSessionPDF(session.sessionData)
//       } catch (error) {
//         alert("Error generating PDF. Please try again.")
//       }
//     } else {
//       alert("No data available for this session")
//     }
//   }

//   const deleteSession = async (sessionId) => {
//     if (!confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
//       return
//     }

//     setDeletingSession(sessionId)
//     try {
//       const response = await fetch("/api/admin/session/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId }),
//       })

//       const data = await response.json()
//       if (response.ok) {
//         alert("Session deleted successfully!")
//         fetchSessionHistory()
//       } else {
//         alert(data.message)
//       }
//     } catch (error) {
//       alert("Error deleting session. Please try again.")
//     } finally {
//       setDeletingSession(null)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-white">Session Management</h1>
//         <div className="flex items-center space-x-2">
//           {sessionStatus?.hasActiveSession ? (
//             <div className="flex items-center text-green-400">
//               <CheckCircle className="mr-2" size={20} />
//               Active Session
//             </div>
//           ) : (
//             <div className="flex items-center text-red-400">
//               <AlertCircle className="mr-2" size={20} />
//               No Active Session
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Current Session Status */}
//       <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//         <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//           <Clock className="mr-2" size={24} />
//           Current Session
//         </h2>

//         {sessionStatus?.hasActiveSession ? (
//           <div className="space-y-4">
//             <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
//               <h3 className="text-green-400 font-medium mb-2">Active Session</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-400">Type:</span>
//                   <span className="text-white ml-2">{sessionStatus.session.sessionType}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-400">Year:</span>
//                   <span className="text-white ml-2">{sessionStatus.session.year}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-400">Started:</span>
//                   <span className="text-white ml-2">
//                     {new Date(sessionStatus.session.startDate).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setShowEndConfirm(true)}
//               disabled={loading}
//               className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
//             >
//               <Square className="mr-2" size={20} />
//               {loading ? "Ending Session..." : "End Session"}
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Session Type</label>
//                 <select
//                   value={sessionForm.sessionType}
//                   onChange={(e) => setSessionForm({ ...sessionForm, sessionType: e.target.value })}
//                   className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Session Type</option>
//                   <option value="Spring">Spring</option>
//                   <option value="Fall">Fall</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
//                 <input
//                   type="number"
//                   value={sessionForm.year}
//                   onChange={(e) => setSessionForm({ ...sessionForm, year: Number.parseInt(e.target.value) })}
//                   className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   min="2020"
//                   max="2030"
//                 />
//               </div>
//             </div>

//             <button
//               onClick={startSession}
//               disabled={loading}
//               className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
//             >
//               <Play className="mr-2" size={20} />
//               {loading ? "Starting Session..." : "Start Session"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Session History */}
//       <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//         <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//           <FileText className="mr-2" size={24} />
//           Session History ({sessionHistory.length})
//         </h2>

//         {sessionHistory.length === 0 ? (
//           <p className="text-gray-400 text-center py-8">No previous sessions found</p>
//         ) : (
//           <div className="space-y-4">
//             {sessionHistory.map((session) => (
//               <div key={session._id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
//                 <div className="flex justify-between items-center">
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
//                     <div>
//                       <span className="text-gray-400 text-sm">Session:</span>
//                       <div className="text-white font-medium">
//                         {session.sessionType} {session.year}
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-gray-400 text-sm">Started:</span>
//                       <div className="text-white">{new Date(session.startDate).toLocaleDateString()}</div>
//                     </div>
//                     <div>
//                       <span className="text-gray-400 text-sm">Ended:</span>
//                       <div className="text-white">
//                         {session.endDate ? new Date(session.endDate).toLocaleDateString() : "N/A"}
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-gray-400 text-sm">Duration:</span>
//                       <div className="text-white">
//                         {session.endDate
//                           ? Math.ceil(
//                             (new Date(session.endDate) - new Date(session.startDate)) / (1000 * 60 * 60 * 24),
//                           ) + " days"
//                           : "N/A"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2 ml-4">
//                     <button
//                       onClick={() => downloadHistoryPDF(session)}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
//                     >
//                       <Download className="mr-2" size={16} />
//                       Download PDF
//                     </button>
//                     <button
//                       onClick={() => deleteSession(session._id)}
//                       disabled={deletingSession === session._id}
//                       className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
//                     >
//                       <Trash2 className="mr-2" size={16} />
//                       {deletingSession === session._id ? "Deleting..." : "Delete"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* End Session Confirmation Modal */}
//       {showEndConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
//             <h3 className="text-xl font-semibold text-white mb-4">End Session Confirmation</h3>
//             <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
//               <p className="text-red-400 text-sm">
//                 ⚠️ Warning: Ending this session will permanently delete all current data including:
//               </p>
//               <ul className="text-red-400 text-sm mt-2 ml-4 list-disc">
//                 <li>All teachers and their assignments</li>
//                 <li>All students and enrollments</li>
//                 <li>All classes and sections</li>
//                 <li>All pending requests</li>
//               </ul>
//               <p className="text-red-400 text-sm mt-2">
//                 A PDF report will be generated and downloaded before data deletion.
//               </p>
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 onClick={endSession}
//                 disabled={loading}
//                 className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
//               >
//                 {loading ? "Ending..." : "Yes, End Session"}
//               </button>
//               <button
//                 onClick={() => setShowEndConfirm(false)}
//                 className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Play, Square, Download, Clock, FileText, AlertCircle, CheckCircle, Trash2 } from "lucide-react"

export default function SessionManagement({ onSessionChange }) {
  const [sessionStatus, setSessionStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sessionForm, setSessionForm] = useState({
    sessionType: "",
    year: new Date().getFullYear(),
  })
  const [sessionHistory, setSessionHistory] = useState([])
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [deletingSession, setDeletingSession] = useState(null)

  useEffect(() => {
    checkSessionStatus()
    fetchSessionHistory()
  }, [])

  const checkSessionStatus = async () => {
    try {
      const response = await fetch("/api/admin/session/status")
      const data = await response.json()
      setSessionStatus(data)
      if (onSessionChange) {
        onSessionChange(data.hasActiveSession)
      }
    } catch (error) {
      console.error("Error checking session status:", error)
    }
  }

  const fetchSessionHistory = async () => {
    try {
      const response = await fetch("/api/admin/session/history")
      const data = await response.json()
      setSessionHistory(data.sessions || [])
    } catch (error) {
      console.error("Error fetching session history:", error)
    }
  }

  const startSession = async () => {
    if (!sessionForm.sessionType || !sessionForm.year) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionForm),
      })

      const data = await response.json()
      if (response.ok) {
        alert("Session started successfully!")
        checkSessionStatus()
        setSessionForm({ sessionType: "", year: new Date().getFullYear() })
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Error starting session")
    } finally {
      setLoading(false)
    }
  }

  const endSession = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/session/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      if (response.ok) {
        try {
          // Generate and download Excel file
          await generateSessionExcel(data.sessionData)
          alert("Session ended successfully! Excel report has been downloaded.")
        } catch (excelError) {
          console.error("Excel Error:", excelError)
          alert(
            "Session ended successfully, but there was an error generating the Excel report. Please try downloading from session history.",
          )
        }

        checkSessionStatus()
        fetchSessionHistory()
        setShowEndConfirm(false)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Error ending session:", error)
      alert("Error ending session. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSessionExcel = async (sessionData) => {
    try {
      console.log("Starting Excel generation...", sessionData)

      // Dynamic import for xlsx
      const XLSX = await import("xlsx")

      // Create a new workbook
      const workbook = XLSX.utils.book_new()

      // Session Info Sheet
      const sessionInfo = [
        ["Academic Session Report"],
        [""],
        ["Session Information"],
        ["Session Type", sessionData.sessionInfo.sessionType],
        ["Academic Year", sessionData.sessionInfo.year],
        ["Start Date", new Date(sessionData.sessionInfo.startDate).toLocaleDateString()],
        ["End Date", new Date(sessionData.sessionInfo.endDate).toLocaleDateString()],
        [
          "Duration (Days)",
          Math.ceil(
            (new Date(sessionData.sessionInfo.endDate) - new Date(sessionData.sessionInfo.startDate)) /
            (1000 * 60 * 60 * 24),
          ),
        ],
        [""],
        ["Summary Statistics"],
        ["Total Teachers", sessionData.teachers ? sessionData.teachers.length : 0],
        ["Total Students", sessionData.students ? sessionData.students.length : 0],
        ["Total Classes", sessionData.classes ? sessionData.classes.length : 0],
        ["Total Activities", sessionData.activities ? sessionData.activities.length : 0],
      ]

      const sessionInfoSheet = XLSX.utils.aoa_to_sheet(sessionInfo)
      XLSX.utils.book_append_sheet(workbook, sessionInfoSheet, "Session Info")

      // Teachers Sheet
      if (sessionData.teachers && sessionData.teachers.length > 0) {
        const teachersData = [
          ["#", "Teacher Name", "Email", "Classes Assigned", "Subjects/Classes"],
          ...sessionData.teachers.map((teacher, index) => [
            index + 1,
            teacher.name || "N/A",
            teacher.email || "N/A",
            teacher.classAssignments ? teacher.classAssignments.length : 0,
            teacher.classAssignments
              ? teacher.classAssignments.map((a) => a.subject || a.classDisplayName).join(", ")
              : "No assignments",
          ]),
        ]

        const teachersSheet = XLSX.utils.aoa_to_sheet(teachersData)
        XLSX.utils.book_append_sheet(workbook, teachersSheet, "Teachers")
      }

      // Students Sheet
      if (sessionData.students && sessionData.students.length > 0) {
        const studentsData = [
          ["#", "Student Name", "Registration Number", "Program", "Semester", "Section", "Email"],
          ...sessionData.students.map((student, index) => [
            index + 1,
            student.name || "N/A",
            student.registrationNumber || "N/A",
            student.program || "N/A",
            student.semester || "N/A",
            student.section || "N/A",
            student.email || "N/A",
          ]),
        ]

        const studentsSheet = XLSX.utils.aoa_to_sheet(studentsData)
        XLSX.utils.book_append_sheet(workbook, studentsSheet, "Students")
      }

      // Class Assignments Sheet
      if (
        sessionData.teachers &&
        sessionData.teachers.some((t) => t.classAssignments && t.classAssignments.length > 0)
      ) {
        const assignmentsData = [["Teacher", "Class", "Subject", "Sections", "Assigned Date"]]

        sessionData.teachers.forEach((teacher) => {
          if (teacher.classAssignments && teacher.classAssignments.length > 0) {
            teacher.classAssignments.forEach((assignment) => {
              assignmentsData.push([
                teacher.name || "N/A",
                assignment.classDisplayName || assignment.className || "N/A",
                assignment.subject || "N/A",
                assignment.sections ? assignment.sections.join(", ") : "N/A",
                assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleDateString() : "N/A",
              ])
            })
          }
        })

        const assignmentsSheet = XLSX.utils.aoa_to_sheet(assignmentsData)
        XLSX.utils.book_append_sheet(workbook, assignmentsSheet, "Class Assignments")
      }

      // Classes Sheet
      if (sessionData.classes && sessionData.classes.length > 0) {
        const classesData = [
          ["#", "Class Name", "Subject", "Semester", "Sections", "Created Date"],
          ...sessionData.classes.map((classItem, index) => [
            index + 1,
            classItem.className || classItem.name || "N/A",
            classItem.subject || "N/A",
            classItem.semester || "N/A",
            classItem.sections ? classItem.sections.join(", ") : "N/A",
            classItem.createdAt ? new Date(classItem.createdAt).toLocaleDateString() : "N/A",
          ]),
        ]

        const classesSheet = XLSX.utils.aoa_to_sheet(classesData)
        XLSX.utils.book_append_sheet(workbook, classesSheet, "Classes")
      }

      // Activities Sheet
      if (sessionData.activities && sessionData.activities.length > 0) {
        const activitiesData = [
          ["#", "Activity Type", "Description", "Date", "Time"],
          ...sessionData.activities.map((activity, index) => [
            index + 1,
            activity.type || "N/A",
            activity.description || "N/A",
            activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
            activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : "N/A",
          ]),
        ]

        const activitiesSheet = XLSX.utils.aoa_to_sheet(activitiesData)
        XLSX.utils.book_append_sheet(workbook, activitiesSheet, "Activities")
      }

      // Generate Excel file
      const fileName = `Session_Report_${sessionData.sessionInfo.sessionType}_${sessionData.sessionInfo.year}_${new Date().getTime()}.xlsx`
      XLSX.writeFile(workbook, fileName)

      console.log("Excel generated successfully:", fileName)
      return true
    } catch (error) {
      console.error("Detailed Excel generation error:", error)
      throw new Error(`Excel Generation Failed: ${error.message}`)
    }
  }

  const downloadHistoryExcel = async (session) => {
    if (session.sessionData) {
      try {
        await generateSessionExcel(session.sessionData)
      } catch (error) {
        alert("Error generating Excel file. Please try again.")
      }
    } else {
      alert("No data available for this session")
    }
  }

  const deleteSession = async (sessionId) => {
    if (!confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      return
    }

    setDeletingSession(sessionId)
    try {
      const response = await fetch("/api/admin/session/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      const data = await response.json()
      if (response.ok) {
        alert("Session deleted successfully!")
        fetchSessionHistory()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Error deleting session. Please try again.")
    } finally {
      setDeletingSession(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Session Management</h1>
        <div className="flex items-center space-x-2">
          {sessionStatus?.hasActiveSession ? (
            <div className="flex items-center text-green-400">
              <CheckCircle className="mr-2" size={20} />
              Active Session
            </div>
          ) : (
            <div className="flex items-center text-red-400">
              <AlertCircle className="mr-2" size={20} />
              No Active Session
            </div>
          )}
        </div>
      </div>

      {/* Current Session Status */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Clock className="mr-2" size={24} />
          Current Session
        </h2>

        {sessionStatus?.hasActiveSession ? (
          <div className="space-y-4">
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-medium mb-2">Active Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{sessionStatus.session.sessionType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white ml-2">{sessionStatus.session.year}</span>
                </div>
                <div>
                  <span className="text-gray-400">Started:</span>
                  <span className="text-white ml-2">
                    {new Date(sessionStatus.session.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowEndConfirm(true)}
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Square className="mr-2" size={20} />
              {loading ? "Ending Session..." : "End Session"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Type</label>
                <select
                  value={sessionForm.sessionType}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Session Type</option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <input
                  type="number"
                  value={sessionForm.year}
                  onChange={(e) => setSessionForm({ ...sessionForm, year: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="2020"
                  max="2030"
                />
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Play className="mr-2" size={20} />
              {loading ? "Starting Session..." : "Start Session"}
            </button>
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="mr-2" size={24} />
          Session History ({sessionHistory.length})
        </h2>

        {sessionHistory.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No previous sessions found</p>
        ) : (
          <div className="space-y-4">
            {sessionHistory.map((session) => (
              <div key={session._id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <span className="text-gray-400 text-sm">Session:</span>
                      <div className="text-white font-medium">
                        {session.sessionType} {session.year}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Started:</span>
                      <div className="text-white">{new Date(session.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Ended:</span>
                      <div className="text-white">
                        {session.endDate ? new Date(session.endDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Duration:</span>
                      <div className="text-white">
                        {session.endDate
                          ? Math.ceil(
                            (new Date(session.endDate) - new Date(session.startDate)) / (1000 * 60 * 60 * 24),
                          ) + " days"
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => downloadHistoryExcel(session)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Download className="mr-2" size={16} />
                      Download Excel
                    </button>
                    <button
                      onClick={() => deleteSession(session._id)}
                      disabled={deletingSession === session._id}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Trash2 className="mr-2" size={16} />
                      {deletingSession === session._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* End Session Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">End Session Confirmation</h3>
            <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">
                ⚠️ Warning: Ending this session will permanently delete all current data including:
              </p>
              <ul className="text-red-400 text-sm mt-2 ml-4 list-disc">
                <li>All teachers and their assignments</li>
                <li>All students and enrollments</li>
                <li>All classes and sections</li>
                <li>All pending requests</li>
              </ul>
              <p className="text-red-400 text-sm mt-2">
                An Excel report will be generated and downloaded before data deletion.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={endSession}
                disabled={loading}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {loading ? "Ending..." : "Yes, End Session"}
              </button>
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
