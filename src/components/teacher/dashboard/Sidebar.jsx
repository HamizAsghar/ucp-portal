"use client"

export default function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "students", label: "Student Management", icon: "👥" },
    { id: "classes", label: "Class Management", icon: "🏫" },
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "quizzes", label: "Quiz Management", icon: "✅" },
    { id: "content", label: "Content & Resources", icon: "📚" },
    { id: "communications", label: "Communications", icon: "🔔" },
  ]

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          {!collapsed && <span className="logo-text">Teacher Portal</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => setActiveSection(item.id)}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👨‍🏫</div>
          {!collapsed && (
            <div className="user-details">
              <div className="user-name">John Doe</div>
              <div className="user-role">Teacher</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
