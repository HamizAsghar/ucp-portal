// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "@/components/admin/Sidebar"
// import DashboardOverview from "@/components/admin/DasboardOverview"
// import TeacherRequests from "@/components/admin/TeacherRequests"
// import StudentRequests from "@/components/admin/StudentRequests"
// import ClassSections from "@/components/admin/ClassSection"
// import RejectModal from "@/components/admin/RejectModel"
// import BackgroundParticles from "@/components/admin/BackgroundParticles"

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard")
//   const [teacherRequests, setTeacherRequests] = useState([])
//   const [studentRequests, setStudentRequests] = useState([])
//   const [sections, setSections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [showRejectModal, setShowRejectModal] = useState(false)
//   const [rejectReason, setRejectReason] = useState("")
//   const [selectedRequest, setSelectedRequest] = useState(null)
//   const [processingRequests, setProcessingRequests] = useState(new Set())

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       console.log("🔄 Fetching dashboard data...")
//       const [teachersRes, studentsRes, sectionsRes] = await Promise.all([
//         fetch("/api/admin/teachers"),
//         fetch("/api/admin/students"),
//         fetch("/api/admin/sections"),
//       ])

//       const teachersData = await teachersRes.json()
//       const studentsData = await studentsRes.json()
//       const sectionsData = await sectionsRes.json()

//       console.log("📊 Teachers data:", teachersData)
//       console.log("📊 Students data:", studentsData)
//       console.log("📊 Sections data:", sectionsData)

//       setTeacherRequests(teachersData.requests || [])
//       setStudentRequests(studentsData.requests || [])
//       setSections(sectionsData.sections || [])
//       console.log("✅ Dashboard data loaded")
//     } catch (error) {
//       console.error("❌ Error fetching data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (request, type) => {
//     const requestId = request._id || request.id
//     console.log("🔄 Approving request:", { requestId, type, request })

//     if (!requestId) {
//       console.error("❌ No request ID found")
//       alert("Error: Request ID not found")
//       return
//     }

//     if (processingRequests.has(requestId)) return

//     setProcessingRequests((prev) => new Set(prev).add(requestId))

//     try {
//       console.log(`🔄 Approving ${type} request:`, requestId)

//       const response = await fetch(`/api/admin/${type}/approve`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ requestId }),
//       })

//       const data = await response.json()
//       console.log("📡 API Response:", data)

//       if (response.ok) {
//         console.log("✅ Request approved successfully!")
//         alert(
//           `${type === "students" ? "Student" : "Teacher"} request approved successfully! ${data.emailSent ? "Email sent." : "SMS will be sent to phone."}`,
//         )
//         await fetchData()
//       } else {
//         console.error("❌ Approval failed:", data)
//         alert(`Error: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error approving request:", error)
//       alert("Error approving request. Please try again.")
//     } finally {
//       setProcessingRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(requestId)
//         return newSet
//       })
//     }
//   }

//   const handleRejectClick = (request, type) => {
//     const requestId = request._id || request.id
//     console.log("🔄 Preparing to reject:", { requestId, type, request })
//     setSelectedRequest({ ...request, type, requestId })
//     setShowRejectModal(true)
//   }

//   const handleRejectSubmit = async () => {
//     if (!rejectReason.trim()) {
//       alert("Please provide a reason for rejection")
//       return
//     }

//     try {
//       console.log(`🔄 Rejecting ${selectedRequest.type} request:`, selectedRequest.requestId)

//       const response = await fetch(`/api/admin/${selectedRequest.type}/reject`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           requestId: selectedRequest.requestId,
//           reason: rejectReason,
//         }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         console.log("✅ Request rejected successfully!")
//         alert("Request rejected successfully!")
//         setShowRejectModal(false)
//         setRejectReason("")
//         setSelectedRequest(null)
//         await fetchData()
//       } else {
//         console.error("❌ Rejection failed:", data)
//         alert(`Error: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error rejecting request:", error)
//       alert("Error rejecting request. Please try again.")
//     }
//   }

//   const handleDeleteStudent = async (request) => {
//     const studentId = request._id || request.id
//     if (confirm("Are you sure you want to delete this student?")) {
//       try {
//         const response = await fetch(`/api/admin/students/delete`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ studentId }),
//         })

//         if (response.ok) {
//           alert("Student deleted successfully!")
//           await fetchData()
//         }
//       } catch (error) {
//         console.error("❌ Error deleting student:", error)
//       }
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     )
//   }

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return (
//           <DashboardOverview teacherRequests={teacherRequests} studentRequests={studentRequests} sections={sections} />
//         )
//       case "teachers":
//         return (
//           <TeacherRequests
//             teacherRequests={teacherRequests}
//             handleApprove={handleApprove}
//             handleRejectClick={handleRejectClick}
//             processingRequests={processingRequests}
//           />
//         )
//       case "students":
//         return (
//           <StudentRequests
//             studentRequests={studentRequests}
//             handleApprove={handleApprove}
//             handleRejectClick={handleRejectClick}
//             handleDeleteStudent={handleDeleteStudent}
//             processingRequests={processingRequests}
//           />
//         )
//       case "sections":
//         return <ClassSections sections={sections} />
//       default:
//         return (
//           <DashboardOverview teacherRequests={teacherRequests} studentRequests={studentRequests} sections={sections} />
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
//       <BackgroundParticles />

//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         teacherRequests={teacherRequests}
//         studentRequests={studentRequests}
//         sections={sections}
//       />

//       <div className="flex-1 p-6 relative z-10 min-w-0">{renderActiveComponent()}</div>

//       <RejectModal
//         showRejectModal={showRejectModal}
//         setShowRejectModal={setShowRejectModal}
//         rejectReason={rejectReason}
//         setRejectReason={setRejectReason}
//         handleRejectSubmit={handleRejectSubmit}
//         setSelectedRequest={setSelectedRequest}
//       />
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "@/components/admin/Sidebar"
// import DashboardOverview from "@/components/admin/DashboardOverview"
// import TeacherRequests from "@/components/admin/TeacherRequests"
// import AllStudents from "@/components/admin/AllStudents"
// import AllTeachers from "@/components/admin/AllTeachers"
// import ClassSections from "@/components/admin/ClassSections"
// import AssignClasses from "@/components/admin/AssignClasses"
// import RejectModal from "@/components/admin/RejectModal"
// import BackgroundParticles from "@/components/admin/BackgroundParticles"
// import MakeClass from "@/components/admin/MakeClass"

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard")
//   const [classes, setClasses] = useState([]);
//   const [teacherRequests, setTeacherRequests] = useState([])
//   const [allStudents, setAllStudents] = useState([])
//   const [allTeachers, setAllTeachers] = useState([])
//   const [sections, setSections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [showRejectModal, setShowRejectModal] = useState(false)
//   const [rejectReason, setRejectReason] = useState("")
//   const [selectedRequest, setSelectedRequest] = useState(null)
//   const [processingRequests, setProcessingRequests] = useState(new Set())

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       console.log("🔄 Fetching dashboard data...")
//       const [teachersRes, studentsRes, sectionsRes, allTeachersRes] = await Promise.all([
//         fetch("/api/admin/teachers/requests"),
//         fetch("/api/admin/students"),
//         fetch("/api/admin/sections"),
//         fetch("/api/admin/teachers"),
//         fetch("/api/admin/classes"),
//       ])
   
//       const teachersData = await teachersRes.json()
//       const studentsData = await studentsRes.json()
//       const sectionsData = await sectionsRes.json()
//       const allTeachersData = await allTeachersRes.json()

//       setTeacherRequests(teachersData.requests || [])
//       setAllStudents(studentsData.students || [])
//       setSections(sectionsData.sections || [])
//       setAllTeachers(allTeachersData.teachers || [])
//       // setClasses(classesData.classes || []);
//       console.log("✅ Dashboard data loaded")
//     } catch (error) {
//       console.error("❌ Error fetching data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (request, type) => {
//     const requestId = request._id || request.id
//     console.log("🔄 Approving request:", { requestId, type, request })

//     if (!requestId) {
//       console.error("❌ No request ID found")
//       alert("Error: Request ID not found")
//       return
//     }

//     if (processingRequests.has(requestId)) return

//     setProcessingRequests((prev) => new Set(prev).add(requestId))

//     try {
//       console.log(`🔄 Approving ${type} request:`, requestId)

//       const response = await fetch(`/api/admin/${type}/approve`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ requestId }),
//       })

//       const data = await response.json()
//       console.log("📡 API Response:", data)

//       if (response.ok) {
//         console.log("✅ Request approved successfully!")
//         alert(`Teacher request approved successfully! ${data.emailSent ? "Email sent." : "SMS will be sent to phone."}`)
//         await fetchData()
//       } else {
//         console.error("❌ Approval failed:", data)
//         alert(`Error: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error approving request:", error)
//       alert("Error approving request. Please try again.")
//     } finally {
//       setProcessingRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(requestId)
//         return newSet
//       })
//     }
//   }

//   const handleRejectClick = (request, type) => {
//     const requestId = request._id || request.id
//     console.log("🔄 Preparing to reject:", { requestId, type, request })
//     setSelectedRequest({ ...request, type, requestId })
//     setShowRejectModal(true)
//   }

//   const handleRejectSubmit = async () => {
//     if (!rejectReason.trim()) {
//       alert("Please provide a reason for rejection")
//       return
//     }

//     try {
//       console.log(`🔄 Rejecting ${selectedRequest.type} request:`, selectedRequest.requestId)

//       const response = await fetch(`/api/admin/${selectedRequest.type}/reject`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           requestId: selectedRequest.requestId,
//           reason: rejectReason,
//         }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         console.log("✅ Request rejected successfully!")
//         alert("Request rejected successfully!")
//         setShowRejectModal(false)
//         setRejectReason("")
//         setSelectedRequest(null)
//         await fetchData()
//       } else {
//         console.error("❌ Rejection failed:", data)
//         alert(`Error: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error rejecting request:", error)
//       alert("Error rejecting request. Please try again.")
//     }
//   }

//   const handleDeleteStudent = async (studentId) => {
//     if (confirm("Are you sure you want to delete this student? They can register again with the same email.")) {
//       try {
//         const response = await fetch(`/api/admin/students/delete`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ studentId }),
//         })

//         if (response.ok) {
//           alert("Student deleted successfully!")
//           await fetchData()
//         }
//       } catch (error) {
//         console.error("❌ Error deleting student:", error)
//       }
//     }
//   }

//   const handleDeleteTeacher = async (teacherId) => {
//     if (confirm("Are you sure you want to delete this teacher?")) {
//       try {
//         const response = await fetch(`/api/admin/teachers/delete`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ teacherId }),
//         })

//         if (response.ok) {
//           alert("Teacher deleted successfully!")
//           await fetchData()
//         }
//       } catch (error) {
//         console.error("❌ Error deleting teacher:", error)
//       }
//     }
//   }

//   const handleUpdateStudent = async (studentId, updateData) => {
//     try {
//       const response = await fetch(`/api/admin/students/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ studentId, updateData }),
//       })

//       if (response.ok) {
//         alert("Student updated successfully!")
//         await fetchData()
//       }
//     } catch (error) {
//       console.error("❌ Error updating student:", error)
//     }
//   }

//   const handleUpdateTeacher = async (teacherId, updateData) => {
//     try {
//       const response = await fetch(`/api/admin/teachers/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ teacherId, updateData }),
//       })

//       if (response.ok) {
//         alert("Teacher updated successfully!")
//         await fetchData()
//       }
//     } catch (error) {
//       console.error("❌ Error updating teacher:", error)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     )
//   }

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return (
//           <DashboardOverview
//             teacherRequests={teacherRequests}
//             allStudents={allStudents}
//             allTeachers={allTeachers}
//             sections={sections}
//             setActiveTab={setActiveTab}
//           />
//         )
//       case "pending-teachers":
//         return (
//           <TeacherRequests
//             teacherRequests={teacherRequests}
//             handleApprove={handleApprove}
//             handleRejectClick={handleRejectClick}
//             processingRequests={processingRequests}
//           />
//         )
//       case "all-students":
//         return (
//           <AllStudents
//             allStudents={allStudents}
//             handleDeleteStudent={handleDeleteStudent}
//             handleUpdateStudent={handleUpdateStudent}
//             sections={sections}
//           />
//         )
//       case "all-teachers":
//         return (
//           <AllTeachers
//             allTeachers={allTeachers}
//             handleDeleteTeacher={handleDeleteTeacher}
//             handleUpdateTeacher={handleUpdateTeacher}
//           />
//         )
// case "make-class":
//         return (
//           <MakeClass
//             fetchData={fetchData} // Pass fetchData to refresh sections after creating a class
//             sections={sections} // Pass sections if needed for validation or display
//           />
//         )
//       case "assign-classes":
//         return <AssignClasses allTeachers={allTeachers} sections={sections} fetchData={fetchData} />
//       case "class-sections":
//         return (
//           <ClassSections
//             sections={sections}
//             allStudents={allStudents}
//             handleDeleteStudent={handleDeleteStudent}
//             handleUpdateStudent={handleUpdateStudent}
//           />
//         )
//       default:
//         return (
//           <DashboardOverview
//             teacherRequests={teacherRequests}
//             allStudents={allStudents}
//             allTeachers={allTeachers}
//             sections={sections}
//             setActiveTab={setActiveTab}
//           />
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
//       <BackgroundParticles />

//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         teacherRequests={teacherRequests}
//         allStudents={allStudents}
//         allTeachers={allTeachers}
//         sections={sections}
//       />

//       <div className="flex-1 p-6 relative z-10 min-w-0">{renderActiveComponent()}</div>

//       <RejectModal
//         showRejectModal={showRejectModal}
//         setShowRejectModal={setShowRejectModal}
//         rejectReason={rejectReason}
//         setRejectReason={setRejectReason}
//         handleRejectSubmit={handleRejectSubmit}
//         setSelectedRequest={setSelectedRequest}
//       />
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/admin/Sidebar"
import DashboardOverview from "@/components/admin/DashboardOverview"
import TeacherRequests from "@/components/admin/TeacherRequests"
import AllStudents from "@/components/admin/AllStudents"
import AllTeachers from "@/components/admin/AllTeachers"
import ClassSections from "@/components/admin/ClassSections"
import AssignClasses from "@/components/admin/AssignClasses"
import RejectModal from "@/components/admin/RejectModal"
import BackgroundParticles from "@/components/admin/BackgroundParticles"
import MakeClass from "@/components/admin/MakeClass"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [classes, setClasses] = useState([])
  const [teacherRequests, setTeacherRequests] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [allTeachers, setAllTeachers] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [processingRequests, setProcessingRequests] = useState(new Set())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log("🔄 Fetching dashboard data...")
      const [teachersRes, studentsRes, sectionsRes, allTeachersRes, classesRes] = await Promise.all([
        fetch("/api/admin/teachers/requests"),
        fetch("/api/admin/students"),
        fetch("/api/admin/sections"),
        fetch("/api/admin/teachers"),
        fetch("/api/admin/classes"),
      ])

      const teachersData = await teachersRes.json()
      const studentsData = await studentsRes.json()
      const sectionsData = await sectionsRes.json()
      const allTeachersData = await allTeachersRes.json()
      const classesData = await classesRes.json()

      setTeacherRequests(teachersData.requests || [])
      setAllStudents(studentsData.students || [])
      setSections(sectionsData.sections || [])
      setAllTeachers(allTeachersData.teachers || [])
      setClasses(classesData.classes || [])
      console.log("✅ Dashboard data loaded")
    } catch (error) {
      console.error("❌ Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (request, type) => {
    const requestId = request._id || request.id
    console.log("🔄 Approving request:", { requestId, type, request })

    if (!requestId) {
      console.error("❌ No request ID found")
      alert("Error: Request ID not found")
      return
    }

    if (processingRequests.has(requestId)) return

    setProcessingRequests((prev) => new Set(prev).add(requestId))

    try {
      console.log(`🔄 Approving ${type} request:`, requestId)

      const response = await fetch(`/api/admin/${type}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      })

      const data = await response.json()
      console.log("📡 API Response:", data)

      if (response.ok) {
        console.log("✅ Request approved successfully!")
        alert(`Teacher request approved successfully! ${data.emailSent ? "Email sent." : "SMS will be sent to phone."}`)
        await fetchData()
      } else {
        console.error("❌ Approval failed:", data)
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("❌ Error approving request:", error)
      alert("Error approving request. Please try again.")
    } finally {
      setProcessingRequests((prev) => {
        const newSet = new Set(prev)
        newSet.delete(requestId)
        return newSet
      })
    }
  }

  const handleRejectClick = (request, type) => {
    const requestId = request._id || request.id
    console.log("🔄 Preparing to reject:", { requestId, type, request })
    setSelectedRequest({ ...request, type, requestId })
    setShowRejectModal(true)
  }

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    try {
      console.log(`🔄 Rejecting ${selectedRequest.type} request:`, selectedRequest.requestId)

      const response = await fetch(`/api/admin/${selectedRequest.type}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: selectedRequest.requestId,
          reason: rejectReason,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("✅ Request rejected successfully!")
        alert("Request rejected successfully!")
        setShowRejectModal(false)
        setRejectReason("")
        setSelectedRequest(null)
        await fetchData()
      } else {
        console.error("❌ Rejection failed:", data)
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("❌ Error rejecting request:", error)
      alert("Error rejecting request. Please try again.")
    }
  }

  const handleDeleteStudent = async (studentId) => {
    if (confirm("Are you sure you want to delete this student? They can register again with the same email.")) {
      try {
        const response = await fetch(`/api/admin/students/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId }),
        })

        if (response.ok) {
          alert("Student deleted successfully!")
          await fetchData()
        }
      } catch (error) {
        console.error("❌ Error deleting student:", error)
      }
    }
  }

  const handleDeleteTeacher = async (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        const response = await fetch(`/api/admin/teachers/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId }),
        })

        if (response.ok) {
          alert("Teacher deleted successfully!")
          await fetchData()
        }
      } catch (error) {
        console.error("❌ Error deleting teacher:", error)
      }
    }
  }

  const handleUpdateStudent = async (studentId, updateData) => {
    try {
      const response = await fetch(`/api/admin/students/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, updateData }),
      })

      if (response.ok) {
        alert("Student updated successfully!")
        await fetchData()
      }
    } catch (error) {
      console.error("❌ Error updating student:", error)
    }
  }

  const handleUpdateTeacher = async (teacherId, updateData) => {
    try {
      const response = await fetch(`/api/admin/teachers/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId, updateData }),
      })

      if (response.ok) {
        alert("Teacher updated successfully!")
        await fetchData()
      }
    } catch (error) {
      console.error("❌ Error updating teacher:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardOverview
            teacherRequests={teacherRequests}
            allStudents={allStudents}
            allTeachers={allTeachers}
            classes={classes} // Updated to use classes
            setActiveTab={setActiveTab}
          />
        )
      case "pending-teachers":
        return (
          <TeacherRequests
            teacherRequests={teacherRequests}
            handleApprove={handleApprove}
            handleRejectClick={handleRejectClick}
            processingRequests={processingRequests}
          />
        )
      case "all-students":
        return (
          <AllStudents
            allStudents={allStudents}
            handleDeleteStudent={handleDeleteStudent}
            handleUpdateStudent={handleUpdateStudent}
            sections={sections}
          />
        )
      case "all-teachers":
        return (
          <AllTeachers
            allTeachers={allTeachers}
            handleDeleteTeacher={handleDeleteTeacher}
            handleUpdateTeacher={handleUpdateTeacher}
          />
        )
      case "make-class":
        return (
          <MakeClass
            fetchData={fetchData}
            sections={sections}
          />
        )
      case "assign-classes":
        return <AssignClasses allTeachers={allTeachers} classes={classes} fetchData={fetchData} /> // Updated to use classes
      case "class-sections":
        return (
          <ClassSections
            classes={classes} // Updated to use classes
            allStudents={allStudents}
            handleDeleteStudent={handleDeleteStudent}
            handleUpdateStudent={handleUpdateStudent}
          />
        )
      default:
        return (
          <DashboardOverview
            teacherRequests={teacherRequests}
            allStudents={allStudents}
            allTeachers={allTeachers}
            classes={classes} // Updated to use classes
            setActiveTab={setActiveTab}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
      <BackgroundParticles />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        teacherRequests={teacherRequests}
        allStudents={allStudents}
        allTeachers={allTeachers}
        sections={sections}
      />

      <div className="flex-1 p-6 relative z-10 min-w-0">{renderActiveComponent()}</div>

      <RejectModal
        showRejectModal={showRejectModal}
        setShowRejectModal={setShowRejectModal}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        handleRejectSubmit={handleRejectSubmit}
        setSelectedRequest={setSelectedRequest}
      />
    </div>
  )
}