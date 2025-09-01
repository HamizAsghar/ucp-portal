"use client"

export default function Header({ activeSection, toggleSidebar }) {
  const getSectionTitle = () => {
    const titles = {
      dashboard: "Dashboard Overview",
      students: "Student Management",
      classes: "Class Management",
      assignments: "Assignment Management",
      quizzes: "Quiz Management",
      content: "Content & Resources",
      communications: "Communications",
    }
    return titles[activeSection] || "Dashboard"
  }

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="page-title">{getSectionTitle()}</h1>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button className="notification-btn">
            🔔<span className="notification-badge">3</span>
          </button>
          {/* <div className="user-menu">
            <button className="user-menu-btn">
              <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="user-avatar" />
              <span>John Doe</span>
              <span className="dropdown-arrow">▼</span>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  )
}
