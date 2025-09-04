// "use client"
// import { useState } from "react"

// export default function StudentManagement() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterProgram, setFilterProgram] = useState("")
//   const [filterSemester, setFilterSemester] = useState("")
//   const [filterSection, setFilterSection] = useState("")
//   const [selectedStudent, setSelectedStudent] = useState(null)

//   // Mock data - replace with actual API calls
//   const students = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       email: "alice@example.com",
//       phone: "+1234567890",
//       program: "BSCS",
//       semester: 6,
//       section: "A",
//       registrationNumber: "BSCS-2021-001",
//       classId: "CS-6A",
//       room: "Room 101",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     {
//       id: 2,
//       name: "Bob Smith",
//       email: "bob@example.com",
//       phone: "+1234567891",
//       program: "BBA",
//       semester: 4,
//       section: "B",
//       registrationNumber: "BBA-2022-002",
//       classId: "BBA-4B",
//       room: "Room 102",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     // Add more mock students...
//   ]

//   const filteredStudents = students.filter((student) => {
//     return (
//       student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterProgram === "" || student.program === filterProgram) &&
//       (filterSemester === "" || student.semester.toString() === filterSemester) &&
//       (filterSection === "" || student.section === filterSection)
//     )
//   })

//   return (
//     <div className="student-management">
//       <div className="management-header">
//         <h2>Student Management</h2>
//         <div className="header-actions">
//           <button className="btn btn-primary">Export Students</button>
//         </div>
//       </div>

//       <div className="filters-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search students by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//         </div>

//         <div className="filters">
//           <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} className="filter-select">
//             <option value="">All Programs</option>
//             <option value="BSCS">BSCS</option>
//             <option value="BBA">BBA</option>
//             <option value="ADP CS">ADP CS</option>
//           </select>

//           <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="filter-select">
//             <option value="">All Semesters</option>
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//               <option key={sem} value={sem}>
//                 {sem}
//               </option>
//             ))}
//           </select>

//           <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="filter-select">
//             <option value="">All Sections</option>
//             {["A", "B", "C", "D", "E", "F"].map((sec) => (
//               <option key={sec} value={sec}>
//                 {sec}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="students-grid">
//         {filteredStudents.map((student) => (
//           <div key={student.id} className="student-card">
//             <div className="student-avatar">
//               <img src={student.image || "/placeholder.svg"} alt={student.name} />
//             </div>
//             <div className="student-info">
//               <h3 className="student-name">{student.name}</h3>
//               <p className="student-details">
//                 {student.program} - Semester {student.semester}
//                 {student.section}
//               </p>
//               <p className="student-reg">{student.registrationNumber}</p>
//               <div className="student-actions">
//                 <button className="btn btn-sm btn-outline" onClick={() => setSelectedStudent(student)}>
//                   View Details
//                 </button>
//                 <button className="btn btn-sm btn-primary">Send Message</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedStudent && (
//         <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Student Details</h3>
//               <button className="modal-close" onClick={() => setSelectedStudent(null)}>
//                 ×
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="student-detail-info">
//                 <img
//                   src={selectedStudent.image || "/placeholder.svg"}
//                   alt={selectedStudent.name}
//                   className="detail-avatar"
//                 />
//                 <div className="detail-text">
//                   <h4>{selectedStudent.name}</h4>
//                   <p>
//                     <strong>Email:</strong> {selectedStudent.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {selectedStudent.phone}
//                   </p>
//                   <p>
//                     <strong>Program:</strong> {selectedStudent.program}
//                   </p>
//                   <p>
//                     <strong>Semester:</strong> {selectedStudent.semester}
//                   </p>
//                   <p>
//                     <strong>Section:</strong> {selectedStudent.section}
//                   </p>
//                   <p>
//                     <strong>Registration:</strong> {selectedStudent.registrationNumber}
//                   </p>
//                   <p>
//                     <strong>Class ID:</strong> {selectedStudent.classId}
//                   </p>
//                   <p>
//                     <strong>Room:</strong> {selectedStudent.room}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// "use client"
// import { useState, useEffect } from "react"

// export default function StudentManagement() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterProgram, setFilterProgram] = useState("")
//   const [filterSemester, setFilterSemester] = useState("")
//   const [filterSection, setFilterSection] = useState("")
//   const [selectedStudent, setSelectedStudent] = useState(null)
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)

//   // ✅ Fetch all students from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch("/api/teacher/dashboard/students")
//         const data = await res.json()
//         if (data.success) {
//           setStudents(data.data)
//         }
//       } catch (err) {
//         console.error("Error fetching students:", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStudents()
//   }, [])

//   // ✅ Fetch individual student when clicked
//   const handleViewDetails = async (studentId) => {
//     try {
//       const res = await fetch(`/api/teacher/dashboard/students/${studentId}`)
//       const data = await res.json()
//       if (data.success) {
//         setSelectedStudent(data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching student detail:", err)
//     }
//   }

//   const filteredStudents = students.filter((student) => {
//     return (
//       student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterProgram === "" || student.program === filterProgram) &&
//       (filterSemester === "" || student.semester.toString() === filterSemester) &&
//       (filterSection === "" || student.section === filterSection)
//     )
//   })

//   if (loading) {
//     return <p>Loading students...</p>
//   }

//   return (
//     <div className="student-management">
//       <div className="management-header">
//         <h2>Student Management</h2>
//         <div className="header-actions">
//           <button className="btn btn-primary">Export Students</button>
//         </div>
//       </div>

//       <div className="filters-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search students by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//         </div>

//         <div className="filters">
//           <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} className="filter-select">
//             <option value="">All Programs</option>
//             <option value="BSCS">BSCS</option>
//             <option value="BBA">BBA</option>
//             <option value="ADP CS">ADP CS</option>
//           </select>

//           <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="filter-select">
//             <option value="">All Semesters</option>
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//               <option key={sem} value={sem}>
//                 {sem}
//               </option>
//             ))}
//           </select>

//           <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="filter-select">
//             <option value="">All Sections</option>
//             {["A", "B", "C", "D", "E", "F"].map((sec) => (
//               <option key={sec} value={sec}>
//                 {sec}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="students-grid">
//         {filteredStudents.length > 0 ? (
//           filteredStudents.map((student) => (
//             <div key={student._id} className="student-card">
//               <div className="student-avatar">
//                 <img src={student.image || "/placeholder.svg"} alt={student.name} />
//               </div>
//               <div className="student-info">
//                 <h3 className="student-name">{student.name}</h3>
//                 <p className="student-details">
//                   {student.program} - Semester {student.semester}
//                   {student.section}
//                 </p>
//                 <p className="student-reg">{student.registrationNumber}</p>
//                 <div className="student-actions">
//                   <button className="btn btn-sm btn-outline" onClick={() => handleViewDetails(student._id)}>
//                     View Details
//                   </button>
//                   <button className="btn btn-sm btn-primary">Send Message</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No students found</p>
//         )}
//       </div>

//       {selectedStudent && (
//         <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Student Details</h3>
//               <button className="modal-close" onClick={() => setSelectedStudent(null)}>
//                 ×
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="student-detail-info">
//                 <img
//                   src={selectedStudent.image || "/placeholder.svg"}
//                   alt={selectedStudent.name}
//                   className="detail-avatar"
//                 />
//                 <div className="detail-text">
//                   <h4>{selectedStudent.name}</h4>
//                   <p><strong>Email:</strong> {selectedStudent.email}</p>
//                   <p><strong>Phone:</strong> {selectedStudent.phone}</p>
//                   <p><strong>Program:</strong> {selectedStudent.program}</p>
//                   <p><strong>Semester:</strong> {selectedStudent.semester}</p>
//                   <p><strong>Section:</strong> {selectedStudent.section}</p>
//                   <p><strong>Registration:</strong> {selectedStudent.registrationNumber}</p>
//                   <p><strong>Class ID:</strong> {selectedStudent.classId}</p>
//                   <p><strong>Room:</strong> {selectedStudent.room}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProgram, setFilterProgram] = useState("")
  const [filterSemester, setFilterSemester] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/teacher/dashboard/students")
        const data = await res.json()
        if (data.success) {
          setStudents(data.data)
        }
      } catch (err) {
        console.error("Error fetching students:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const handleViewDetails = async (studentId) => {
    try {
      const res = await fetch(`/api/teacher/dashboard/students/${studentId}`)
      const data = await res.json()
      if (data.success) {
        setSelectedStudent(data.data)
      }
    } catch (err) {
      console.error("Error fetching student detail:", err)
    }
  }

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterProgram === "" || student.program === filterProgram) &&
      (filterSemester === "" || student.semester.toString() === filterSemester) &&
      (filterSection === "" || student.section === filterSection)
    )
  })

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading students...</p>
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">🎓 Student Management</h2>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Export Students
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Programs</option>
            <option value="BSCS">BSCS</option>
            <option value="BBA">BBA</option>
            <option value="ADP CS">ADP CS</option>
          </select>

          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sections</option>
            {["A", "B", "C", "D", "E", "F"].map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <motion.div
              key={student._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow hover:shadow-lg p-5 flex flex-col items-center text-center transition transform hover:-translate-y-1"
            >
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.name}
                className="w-20 h-20 rounded-full border mb-4 object-cover"
              />
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-600">
                {student.program} - Semester {student.semester}
                {student.section}
              </p>
              <p className="text-xs text-gray-500 mb-4">{student.registrationNumber}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
                <button
                  className="flex-1 px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition"
                  onClick={() => handleViewDetails(student._id)}
                >
                  View Details
                </button>
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Send Message
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white col-span-full text-center">No students found</p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              className="bg-gray-800 text-white rounded-xl shadow-lg max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Student Details</h3>
                <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-white text-xl">
                  ✕
                </button>
              </div>
              <div className="flex gap-4 items-start">
                <img
                  src={selectedStudent.image || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">{selectedStudent.name}</h4>
                  <p><strong className="text-gray-300">Email:</strong> {selectedStudent.email}</p>
                  <p><strong className="text-gray-300">Phone:</strong> {selectedStudent.phone}</p>
                  <p><strong className="text-gray-300">Program:</strong> {selectedStudent.program}</p>
                  <p><strong className="text-gray-300">Semester:</strong> {selectedStudent.semester}</p>
                  <p><strong className="text-gray-300">Section:</strong> {selectedStudent.section}</p>
                  <p><strong className="text-gray-300">Registration:</strong> {selectedStudent.registrationNumber}</p>
                  <p><strong className="text-gray-300">Class ID:</strong> {selectedStudent.classId}</p>
                  <p><strong className="text-gray-300">Room:</strong> {selectedStudent.room}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
