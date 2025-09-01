"use client"
import { useState } from "react"

export default function ContentSharing() {
  const [activeTab, setActiveTab] = useState("materials")
  const [showUploadForm, setShowUploadForm] = useState(false)

  const materials = [
    {
      id: 1,
      title: "Data Structures Lecture Notes",
      type: "PDF",
      class: "BSCS-6A",
      uploadDate: "2024-01-10",
      downloads: 25,
      size: "2.5 MB",
    },
    {
      id: 2,
      title: "Marketing Strategy Presentation",
      type: "PPT",
      class: "BBA-4B",
      uploadDate: "2024-01-12",
      downloads: 18,
      size: "5.2 MB",
    },
    // Add more materials...
  ]

  const announcements = [
    {
      id: 1,
      title: "Assignment Deadline Extended",
      class: "BSCS-6A",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      title: "New Study Material Available",
      class: "BBA-4B",
      date: "2024-01-14",
      priority: "medium",
    },
    // Add more announcements...
  ]

  return (
    <div className="content-sharing">
      <div className="management-header">
        <h2>Content & Resources</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowUploadForm(true)}>
            Upload Content
          </button>
        </div>
      </div>

      <div className="content-tabs">
        <button
          className={`tab ${activeTab === "materials" ? "active" : ""}`}
          onClick={() => setActiveTab("materials")}
        >
          Study Materials
        </button>
        <button
          className={`tab ${activeTab === "announcements" ? "active" : ""}`}
          onClick={() => setActiveTab("announcements")}
        >
          Announcements
        </button>
      </div>

      {activeTab === "materials" && (
        <div className="materials-list">
          {materials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-icon">
                {material.type === "PDF" && "📄"}
                {material.type === "PPT" && "📊"}
                {material.type === "DOC" && "📝"}
              </div>

              <div className="material-info">
                <h3 className="material-title">{material.title}</h3>
                <div className="material-details">
                  <span className="material-class">{material.class}</span>
                  <span className="material-date">{material.uploadDate}</span>
                  <span className="material-size">{material.size}</span>
                </div>
                <div className="material-stats">
                  <span className="download-count">{material.downloads} downloads</span>
                </div>
              </div>

              <div className="material-actions">
                <button className="btn btn-outline btn-sm">Edit</button>
                <button className="btn btn-outline btn-sm">Download</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "announcements" && (
        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <div className={`announcement-priority ${announcement.priority}`}>
                {announcement.priority === "high" && "🔴"}
                {announcement.priority === "medium" && "🟡"}
                {announcement.priority === "low" && "🟢"}
              </div>

              <div className="announcement-info">
                <h3 className="announcement-title">{announcement.title}</h3>
                <div className="announcement-details">
                  <span className="announcement-class">{announcement.class}</span>
                  <span className="announcement-date">{announcement.date}</span>
                </div>
              </div>

              <div className="announcement-actions">
                <button className="btn btn-outline btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadForm && (
        <div className="modal-overlay" onClick={() => setShowUploadForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Content</h3>
              <button className="modal-close" onClick={() => setShowUploadForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <form className="upload-form">
                <div className="form-group">
                  <label>Content Title</label>
                  <input type="text" className="form-input" placeholder="Enter content title" />
                </div>

                <div className="form-group">
                  <label>Select Class</label>
                  <select className="form-select">
                    <option>BSCS-6A</option>
                    <option>BBA-4B</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Content Type</label>
                  <select className="form-select">
                    <option>Study Material</option>
                    <option>Announcement</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>File Upload</label>
                  <input type="file" className="form-input" />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" rows="3" placeholder="Content description..."></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowUploadForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload
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
