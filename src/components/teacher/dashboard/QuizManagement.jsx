"use client"
import { useState } from "react"

export default function QuizManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [quizType, setQuizType] = useState("mcq")

  const quizzes = [
    {
      id: 1,
      title: "Data Structures Quiz 1",
      class: "BSCS-6A",
      type: "MCQ",
      questions: 20,
      duration: 60,
      scheduledDate: "2024-01-18",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Marketing Concepts Quiz",
      class: "BBA-4B",
      type: "Subjective",
      questions: 5,
      duration: 90,
      scheduledDate: "2024-01-22",
      status: "active",
    },
    // Add more quizzes...
  ]

  return (
    <div className="quiz-management">
      <div className="management-header">
        <h2>Quiz Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
            Create Quiz
          </button>
        </div>
      </div>

      <div className="quiz-tabs">
        <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          All Quizzes
        </button>
        <button
          className={`tab ${activeTab === "scheduled" ? "active" : ""}`}
          onClick={() => setActiveTab("scheduled")}
        >
          Scheduled
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
      </div>

      <div className="quizzes-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-header">
              <h3 className="quiz-title">{quiz.title}</h3>
              <span className={`quiz-status ${quiz.status}`}>{quiz.status}</span>
            </div>

            <div className="quiz-details">
              <div className="detail-row">
                <span className="detail-label">Class:</span>
                <span className="detail-value">{quiz.class}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{quiz.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Questions:</span>
                <span className="detail-value">{quiz.questions}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{quiz.duration} minutes</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Scheduled:</span>
                <span className="detail-value">{quiz.scheduledDate}</span>
              </div>
            </div>

            <div className="quiz-actions">
              <button className="btn btn-outline btn-sm">Edit</button>
              <button className="btn btn-outline btn-sm">View Results</button>
              <button className="btn btn-primary btn-sm">Start Quiz</button>
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Quiz</h3>
              <button className="modal-close" onClick={() => setShowCreateForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <form className="quiz-form">
                <div className="form-group">
                  <label>Quiz Title</label>
                  <input type="text" className="form-input" placeholder="Enter quiz title" />
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
                    <label>Quiz Type</label>
                    <select className="form-select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                      <option value="mcq">MCQ</option>
                      <option value="subjective">Subjective</option>
                      <option value="document">Document Upload</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" className="form-input" placeholder="60" />
                  </div>
                  <div className="form-group">
                    <label>Total Marks</label>
                    <input type="number" className="form-input" placeholder="100" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Scheduled Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Scheduled Time</label>
                    <input type="time" className="form-input" />
                  </div>
                </div>

                {quizType === "mcq" && (
                  <div className="questions-section">
                    <h4>Questions</h4>
                    <div className="question-item">
                      <input type="text" className="form-input" placeholder="Question 1" />
                      <div className="options">
                        <input type="text" className="form-input" placeholder="Option A" />
                        <input type="text" className="form-input" placeholder="Option B" />
                        <input type="text" className="form-input" placeholder="Option C" />
                        <input type="text" className="form-input" placeholder="Option D" />
                      </div>
                      <select className="form-select">
                        <option>Correct Answer</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                      </select>
                    </div>
                    <button type="button" className="btn btn-outline">
                      Add Question
                    </button>
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Quiz
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
