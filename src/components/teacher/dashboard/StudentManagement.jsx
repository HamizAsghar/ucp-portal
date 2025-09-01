"use client"
import { useState } from "react"

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProgram, setFilterProgram] = useState("")
  const [filterSemester, setFilterSemester] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Mock data - replace with actual API calls
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1234567890",
      program: "BSCS",
      semester: 6,
      section: "A",
      registrationNumber: "BSCS-2021-001",
      classId: "CS-6A",
      room: "Room 101",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1234567891",
      program: "BBA",
      semester: 4,
      section: "B",
      registrationNumber: "BBA-2022-002",
      classId: "BBA-4B",
      room: "Room 102",
      image: "/placeholder.svg?height=40&width=40",
    },
    // Add more mock students...
  ]

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterProgram === "" || student.program === filterProgram) &&
      (filterSemester === "" || student.semester.toString() === filterSemester) &&
      (filterSection === "" || student.section === filterSection)
    )
  })

  return (
    <div className="student-management">
      <div className="management-header">
        <h2>Student Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary">Export Students</button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} className="filter-select">
            <option value="">All Programs</option>
            <option value="BSCS">BSCS</option>
            <option value="BBA">BBA</option>
            <option value="ADP CS">ADP CS</option>
          </select>

          <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="filter-select">
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="filter-select">
            <option value="">All Sections</option>
            {["A", "B", "C", "D", "E", "F"].map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-avatar">
              <img src={student.image || "/placeholder.svg"} alt={student.name} />
            </div>
            <div className="student-info">
              <h3 className="student-name">{student.name}</h3>
              <p className="student-details">
                {student.program} - Semester {student.semester}
                {student.section}
              </p>
              <p className="student-reg">{student.registrationNumber}</p>
              <div className="student-actions">
                <button className="btn btn-sm btn-outline" onClick={() => setSelectedStudent(student)}>
                  View Details
                </button>
                <button className="btn btn-sm btn-primary">Send Message</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Details</h3>
              <button className="modal-close" onClick={() => setSelectedStudent(null)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="student-detail-info">
                <img
                  src={selectedStudent.image || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="detail-avatar"
                />
                <div className="detail-text">
                  <h4>{selectedStudent.name}</h4>
                  <p>
                    <strong>Email:</strong> {selectedStudent.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedStudent.phone}
                  </p>
                  <p>
                    <strong>Program:</strong> {selectedStudent.program}
                  </p>
                  <p>
                    <strong>Semester:</strong> {selectedStudent.semester}
                  </p>
                  <p>
                    <strong>Section:</strong> {selectedStudent.section}
                  </p>
                  <p>
                    <strong>Registration:</strong> {selectedStudent.registrationNumber}
                  </p>
                  <p>
                    <strong>Class ID:</strong> {selectedStudent.classId}
                  </p>
                  <p>
                    <strong>Room:</strong> {selectedStudent.room}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
