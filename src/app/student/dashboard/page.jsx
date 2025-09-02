"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Home,
  Plus,
  FileText,
  Calendar,
  Award,
  User,
  GraduationCap,
  Bell,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useStudent } from "@/app/context/StudentContext";
import SidebarClassDropdown from "@/components/ui/sidebar-class-dropdown";
import OverviewSection from "@/components/student/dashboard/overview-section";
import ClassDetailView from "@/components/student/dashboard/class-detail-view";
import EnrollSection from "@/components/student/dashboard/enroll-section";

const recentAssignments = [
  {
    id: 1,
    title: "Binary Search Tree Implementation",
    subject: "Data Structures",
    dueDate: "2024-01-15",
    status: "pending",
    type: "Programming",
    priority: "high",
  },
  {
    id: 2,
    title: "Database Normalization Report",
    subject: "DBMS",
    dueDate: "2024-01-18",
    status: "submitted",
    type: "Report",
    priority: "medium",
  },
  {
    id: 3,
    title: "UML Diagrams Project",
    subject: "Software Engineering",
    dueDate: "2024-01-20",
    status: "in-progress",
    type: "Design",
    priority: "medium",
  },
];

const notifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    message: "Binary Search Tree Implementation has been posted in Data Structures",
    time: "2 hours ago",
    type: "assignment",
    read: false,
  },
  {
    id: 2,
    title: "Quiz Scheduled",
    message: "Database quiz scheduled for January 22nd",
    time: "1 day ago",
    type: "quiz",
    read: false,
  },
  {
    id: 3,
    title: "Grade Updated",
    message: "Your Software Engineering project has been graded",
    time: "2 days ago",
    type: "grade",
    read: true,
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const { studentData, loading, setStudentData } = useStudent();
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showClassmates, setShowClassmates] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  // Fetch student data on component mount
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Fetch enrolled classes
  useEffect(() => {
    async function fetchEnrolledClasses() {
      try {
        const response = await fetch("/api/student/enrolled-classes", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEnrolledClasses(data.enrolledClasses);
        } else {
          toast.error("Failed to fetch enrolled classes");
        }
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
        toast.error("Error fetching enrolled classes");
      }
    }
    if (studentData) fetchEnrolledClasses();
  }, [studentData]);

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      const response = await fetch("/api/student/me", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
      } else {
        toast.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("Error fetching student data");
    }
  };

  // Show welcome toast
  useEffect(() => {
    if (studentData && !loading) {
      toast.success(`Welcome back, ${studentData.student.name}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [studentData, loading]);

  // Handle logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will be redirected to the login page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch("/api/student/logout", {
          method: "POST",
          credentials: "include",
        });
        router.push("/student");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Error during logout");
      }
    }
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setActiveSection("class-detail");
    setIsSidebarOpen(false);
  };

  const handleBackToOverview = () => {
    setSelectedClass(null);
    setActiveSection("overview");
  };

  const navigationItems = [
    { id: "overview", label: "Home", icon: Home },
    { id: "enroll", label: "Enroll Class", icon: Plus },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "grades", label: "Grades", icon: Award },
    { id: "profile", label: "Profile", icon: User },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderContent = () => {
    if (loading) return <div className="text-white text-center">Loading...</div>;
    if (!studentData) return <div className="text-white text-center">Please log in</div>;

    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection
            studentData={studentData.student}
            enrolledClasses={enrolledClasses}
            notifications={notifications}
            recentAssignments={recentAssignments}
          />
        );
      case "enroll":
        return <EnrollSection fetchStudentData={fetchStudentData} />;
      case "class-detail":
        return (
          <ClassDetailView
            selectedClass={selectedClass}
            recentAssignments={recentAssignments}
            onBack={handleBackToOverview}
          />
        );
      case "assignments":
        return (
          <motion.div
            key="assignments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">All Assignments</h2>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                        <p className="text-gray-300">{assignment.subject}</p>
                        <p className="text-sm text-gray-400">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            assignment.priority === "high" ? "bg-red-600 text-white" : "bg-gray-600 text-white"
                          }`}
                        >
                          {assignment.priority}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            assignment.status === "submitted"
                              ? "bg-green-500 text-white"
                              : assignment.status === "in-progress"
                              ? "bg-yellow-500 text-black"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case "calendar":
        return (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Academic Calendar</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-white">Mid-term Exams</p>
                        <p className="text-sm text-gray-400">Jan 25 - Feb 5</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-white">Project Presentations</p>
                        <p className="text-sm text-gray-400">Feb 10 - Feb 15</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Important Dates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-white">Registration Deadline</p>
                        <p className="text-sm text-gray-400">Jan 30</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-white">Semester Break</p>
                        <p className="text-sm text-gray-400">Mar 1 - Mar 15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "grades":
        return (
          <motion.div
            key="grades"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Grades & Performance</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">3.8</div>
                  <div className="text-gray-300">Current GPA</div>
                </div>
                <div className="bg-gray-800/50 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">85%</div>
                  <div className="text-gray-300">Average Score</div>
                </div>
                <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">{studentData.student.enrollmentCount}</div>
                  <div className="text-gray-300">Enrolled Courses</div>
                </div>
              </div>
              <div className="space-y-4">
                {enrolledClasses.map((cls) => (
                  <div key={cls.id} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{`${cls.program} - ${cls.subject} (${cls.section})`}</h3>
                        <p className="text-gray-300">{cls.teacher?.name || "N/A"}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">A-</div>
                          <div className="text-xs text-gray-400">Current Grade</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">88%</div>
                          <div className="text-xs text-gray-400">Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case "profile":
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Student Profile</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {studentData.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{studentData.student.name}</h3>
                    <p className="text-blue-200">{studentData.student.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration Number:</span>
                    <span className="text-white">{studentData.student.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Program:</span>
                    <span className="text-white">{studentData.student.program || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Semester:</span>
                    <span className="text-white">{studentData.student.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Section:</span>
                    <span className="text-white">{studentData.student.section}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Enrolled Classes:</span>
                    <span className="text-white">{studentData.student.enrollmentCount}</span>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Class Information</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Room:</span>
                    <span className="text-white">{studentData.classInfo?.room || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Students:</span>
                    <span className="text-white">{studentData.classInfo?.totalStudents || "N/A"}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Class Teacher</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-white font-medium">{studentData.teacher?.name || "N/A"}</p>
                    <p className="text-blue-200">{studentData.teacher?.email || "N/A"}</p>
                    <p className="text-gray-300">{studentData.teacher?.subject || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setShowClassmates(!showClassmates)}
                    className="flex items-center justify-between w-full text-lg font-semibold text-white mb-3 hover:text-blue-200"
                  >
                    Classmates ({studentData.classmates?.length || 0})
                    {showClassmates ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {showClassmates && (
                    <div className="space-y-2">
                      {studentData.classmates?.map((classmate) => (
                        <div key={classmate._id} className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-white font-medium">{classmate.name}</p>
                          <p className="text-blue-200 text-sm">{classmate.email}</p>
                          <p className="text-gray-300 text-sm">{classmate.registrationNumber}</p>
                        </div>
                      )) || <p className="text-gray-300">No classmates found</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="flex h-screen">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/20 backdrop-blur-xl border-r border-blue-500/30 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:inset-0`}
        >
          <div className="flex items-center gap-3 p-4 border-b border-blue-500/30 bg-black/20">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Student Portal</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeSection === item.id ? "bg-blue-500/30 text-white" : "text-white hover:bg-blue-500/20"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <SidebarClassDropdown
              classes={enrolledClasses}
              onClassSelect={handleClassSelect}
              selectedClass={selectedClass}
            />
            <div className="mt-2 px-4 py-2 text-gray-300 text-sm">
              Enrolled Classes: {studentData?.student.enrollmentCount || 0}
            </div>
          </nav>
          <div className="p-4 border-t border-blue-500/30">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-blue-500/20 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {studentData?.student.name
                    ? studentData.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "?"}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium truncate">{studentData?.student.name || "Guest"}</p>
                  <p className="text-xs text-gray-300 truncate">{studentData?.student.email || "N/A"}</p>
                </div>
              </button>
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setActiveSection("profile");
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-blue-500/20 rounded-t-lg"
                  >
                    <UserCircle className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-blue-500/20">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-500/20 rounded-b-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-black/20 backdrop-blur-xl border-b border-blue-500/30 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden p-2 text-white hover:bg-blue-500/20 rounded-lg"
                >
                  {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-white capitalize">
                  {activeSection === "class-detail" && selectedClass
                    ? `${selectedClass.program} - ${selectedClass.subject} (${selectedClass.section})`
                    : activeSection.replace("-", " ")}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-white hover:bg-blue-500/20 rounded-lg">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <motion.div
              key={activeSection + (selectedClass?.id || "")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}