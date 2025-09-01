"use client"
import { useState } from "react"

export default function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState(null)

  // Mock data - replace with actual API calls
  const assignedClasses = [
    {
      id: 1,
      classId: "BSCS-6A",
      program: "BSCS",
      semester: 6,
      section: "A",
      subject: "Data Structures",
      studentCount: 35,
      room: "Room 101",
      schedule: "Mon, Wed, Fri - 9:00 AM",
    },
    {
      id: 2,
      classId: "BBA-4B",
      program: "BBA",
      semester: 4,
      section: "B",
      subject: "Marketing Management",
      studentCount: 28,
      room: "Room 205",
      schedule: "Tue, Thu - 11:00 AM",
    },
    // Add more classes...
  ]

  return (
    <div className="class-management">
      <div className="management-header">
        <h2>Class Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary">Request New Class</button>
        </div>
      </div>

      <div className="classes-overview">
        <div className="overview-stats">
          <div className="stat-item">
            <span className="stat-number">{assignedClasses.length}</span>
            <span className="stat-label">Assigned Classes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{assignedClasses.reduce((sum, cls) => sum + cls.studentCount, 0)}</span>
            <span className="stat-label">Total Students</span>
          </div>
        </div>
      </div>

      <div className="classes-grid">
        {assignedClasses.map((classItem) => (
          <div key={classItem.id} className="class-card">
            <div className="class-header">
              <h3 className="class-title">{classItem.classId}</h3>
              <span className="class-subject">{classItem.subject}</span>
            </div>

            <div className="class-details">
              <div className="detail-row">
                <span className="detail-label">Program:</span>
                <span className="detail-value">{classItem.program}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Semester:</span>
                <span className="detail-value">{classItem.semester}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Section:</span>
                <span className="detail-value">{classItem.section}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Students:</span>
                <span className="detail-value">{classItem.studentCount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Room:</span>
                <span className="detail-value">{classItem.room}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Schedule:</span>
                <span className="detail-value">{classItem.schedule}</span>
              </div>
            </div>

            <div className="class-actions">
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedClass(classItem)}>
                View Students
              </button>
              <button className="btn btn-primary btn-sm">Manage Class</button>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Students in {selectedClass.classId}</h3>
              <button className="modal-close" onClick={() => setSelectedClass(null)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="students-list">
                {/* Mock student list for selected class */}
                {Array.from({ length: selectedClass.studentCount }, (_, i) => (
                  <div key={i} className="student-row">
                    <img src="/placeholder.svg?height=32&width=32" alt="Student" className="student-thumb" />
                    <div className="student-info">
                      <span className="student-name">Student {i + 1}</span>
                      <span className="student-reg">
                        REG-{selectedClass.program}-{i + 1}
                      </span>
                    </div>
                    <div className="student-actions">
                      <button className="btn btn-sm btn-outline">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
