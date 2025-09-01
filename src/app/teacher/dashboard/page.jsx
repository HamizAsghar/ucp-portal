"use client"
import { useState } from "react"
import Sidebar from "@/components/teacher/dashboard/Sidebar"
import Header from "@/components/teacher/dashboard/Header"
import DashboardOverview from "@/components/teacher/dashboard/DashboardOverview"
import StudentManagement from "@/components/teacher/dashboard/StudentManagement"
import ClassManagement from "@/components/teacher/dashboard/ClassManagement"
import AssignmentManagement from "@/components/teacher/dashboard/AssignmentManagement"
import QuizManagement from "@/components/teacher/dashboard/QuizManagement"
import ContentSharing from "@/components/teacher/dashboard/ContentSharing"
import Communications from "@/components/teacher/dashboard/Communications"

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "students":
        return <StudentManagement />
      case "classes":
        return <ClassManagement />
      case "assignments":
        return <AssignmentManagement />
      case "quizzes":
        return <QuizManagement />
      case "content":
        return <ContentSharing />
      case "communications":
        return <Communications />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="teacher-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <Header activeSection={activeSection} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  )
}
