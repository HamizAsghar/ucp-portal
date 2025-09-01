"use client"
import { useState } from "react"

export default function AssignmentManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const assignments = [
    {
      id: 1,
      title: "Data Structures Assignment 1",
      class: "BSCS-6A",
      subject: "Data Structures",
      dueDate: "2024-01-15",
      submissions: 28,
      totalStudents: 35,
      status: "active",
    },
    {
      id: 2,
      title: "Marketing Research Project",
      class: "BBA-4B",
      subject: "Marketing Management",
      dueDate: "2024-01-20",
      submissions: 15,
      totalStudents: 28,
      status: "active",
    },
    // Add more assignments...
  ]

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return assignment.status === "active"
    if (activeTab === "completed") return assignment.status === "completed"
    if (activeTab === "overdue") return new Date(assignment.dueDate) < new Date()
    return true
  })

  return (
    <div className="assignment-management">
      <div className="management-header">
        <h2>Assignment Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
            Create Assignment
          </button>
        </div>
      </div>

      <div className="assignment-tabs">
        <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          All Assignments
        </button>
        <button className={`tab ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>
          Active
        </button>
        <button
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button className={`tab ${activeTab === "overdue" ? "active" : ""}`} onClick={() => setActiveTab("overdue")}>
          Overdue
        </button>
      </div>

      <div className="assignments-list">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <h3 className="assignment-title">{assignment.title}</h3>
              <span className={`assignment-status ${assignment.status}`}>{assignment.status}</span>
            </div>

            <div className="assignment-details">
              <div className="detail-row">
                <span className="detail-label">Class:</span>
                <span className="detail-value">{assignment.class}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Subject:</span>
                <span className="detail-value">{assignment.subject}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">{assignment.dueDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Submissions:</span>
                <span className="detail-value">
                  {assignment.submissions}/{assignment.totalStudents}
                </span>
              </div>
            </div>

            <div className="assignment-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {Math.round((assignment.submissions / assignment.totalStudents) * 100)}% submitted
              </span>
            </div>

            <div className="assignment-actions">
              <button className="btn btn-outline btn-sm">View Submissions</button>
              <button className="btn btn-outline btn-sm">Edit</button>
              <button className="btn btn-primary btn-sm">Grade</button>
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Assignment</h3>
              <button className="modal-close" onClick={() => setShowCreateForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <form className="assignment-form">
                <div className="form-group">
                  <label>Assignment Title</label>
                  <input type="text" className="form-input" placeholder="Enter assignment title" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Select Class</label>
                    <select className="form-select">
                      <option>BSCS-6A</option>
                      <option>BBA-4B</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select className="form-select">
                      <option>Data Structures</option>
                      <option>Marketing Management</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" rows="4" placeholder="Assignment description..."></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Due Time</label>
                    <input type="time" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Attachment (Optional)</label>
                  <input type="file" className="form-input" />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
