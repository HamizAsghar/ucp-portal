"use client"
import { useState } from "react"

export default function Communications() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [showComposeForm, setShowComposeForm] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "Assignment Reminder",
      message: "Data Structures assignment due tomorrow",
      recipients: "BSCS-6A (35 students)",
      sentDate: "2024-01-14",
      status: "sent",
    },
    {
      id: 2,
      title: "Quiz Announcement",
      message: "Marketing quiz scheduled for next week",
      recipients: "BBA-4B (28 students)",
      sentDate: "2024-01-13",
      status: "sent",
    },
    // Add more notifications...
  ]

  const messages = [
    {
      id: 1,
      from: "Alice Johnson",
      subject: "Assignment Extension Request",
      message: "Can I get an extension for the Data Structures assignment?",
      date: "2024-01-15",
      status: "unread",
    },
    {
      id: 2,
      from: "Bob Smith",
      subject: "Quiz Question Clarification",
      message: "I need clarification on question 5 from the last quiz.",
      date: "2024-01-14",
      status: "read",
    },
    // Add more messages...
  ]

  return (
    <div className="communications">
      <div className="management-header">
        <h2>Communications</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowComposeForm(true)}>
            Send Notification
          </button>
        </div>
      </div>

      <div className="communication-tabs">
        <button
          className={`tab ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          Sent Notifications
        </button>
        <button className={`tab ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
          Student Messages
        </button>
      </div>

      {activeTab === "notifications" && (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <div className="notification-header">
                <h3 className="notification-title">{notification.title}</h3>
                <span className={`notification-status ${notification.status}`}>{notification.status}</span>
              </div>

              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <div className="notification-details">
                  <span className="notification-recipients">{notification.recipients}</span>
                  <span className="notification-date">{notification.sentDate}</span>
                </div>
              </div>

              <div className="notification-actions">
                <button className="btn btn-outline btn-sm">View Details</button>
                <button className="btn btn-outline btn-sm">Resend</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "messages" && (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message-card ${message.status}`}>
              <div className="message-header">
                <div className="message-from">
                  <strong>{message.from}</strong>
                  {message.status === "unread" && <span className="unread-indicator">●</span>}
                </div>
                <span className="message-date">{message.date}</span>
              </div>

              <div className="message-content">
                <h4 className="message-subject">{message.subject}</h4>
                <p className="message-text">{message.message}</p>
              </div>

              <div className="message-actions">
                <button className="btn btn-outline btn-sm">Reply</button>
                <button className="btn btn-outline btn-sm">Mark as Read</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showComposeForm && (
        <div className="modal-overlay" onClick={() => setShowComposeForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Send Notification</h3>
              <button className="modal-close" onClick={() => setShowComposeForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <form className="compose-form">
                <div className="form-group">
                  <label>Recipients</label>
                  <select className="form-select">
                    <option>BSCS-6A (All Students)</option>
                    <option>BBA-4B (All Students)</option>
                    <option>Individual Student</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" className="form-input" placeholder="Notification subject" />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-textarea" rows="5" placeholder="Type your message here..."></textarea>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select className="form-select">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowComposeForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Notification
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
