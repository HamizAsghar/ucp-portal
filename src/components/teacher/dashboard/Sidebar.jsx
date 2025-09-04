// "use client"

// export default function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }) {
//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: "📊" },
//     { id: "students", label: "Student Management", icon: "👥" },
//     { id: "classes", label: "Class Management", icon: "🏫" },
//     { id: "assignments", label: "Assignments", icon: "📝" },
//     { id: "quizzes", label: "Quiz Management", icon: "✅" },
//     { id: "content", label: "Content & Resources", icon: "📚" },
//     { id: "communications", label: "Communications", icon: "🔔" },
//   ]

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         <div className="logo">
//           <span className="logo-icon">🎓</span>
//           {!collapsed && <span className="logo-text">Teacher Portal</span>}
//         </div>
//       </div>

//       <nav className="sidebar-nav">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             className={`nav-item ${activeSection === item.id ? "active" : ""}`}
//             onClick={() => setActiveSection(item.id)}
//             title={collapsed ? item.label : ""}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             {!collapsed && <span className="nav-label">{item.label}</span>}
//           </button>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="user-info">
//           <div className="user-avatar">👨‍🏫</div>
//           {!collapsed && (
//             <div className="user-details">
//               <div className="user-name">John Doe</div>
//               <div className="user-role">Teacher</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client";

// import { useState, useEffect } from "react";

// export default function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }) {
//   const [teacher, setTeacher] = useState({ name: "Loading...", department: "Teacher" });

//   // Fetch teacher data
//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         console.log("Sidebar: Starting fetch to /api/teacher/me");
//         const response = await fetch("/api/teacher/me", {
//           method: "GET",
//           credentials: "include", // Include cookies for JWT
//         });
//         console.log("Sidebar: Response status:", response.status);
//         const data = await response.json();
//         console.log("Sidebar: Response data:", data);

//         if (response.ok) {
//           console.log("Sidebar: Setting teacher data:", {
//             name: data.teacher.name,
//             department: data.teacher.department,
//           });
//           setTeacher({
//             name: data.teacher.name || "Unknown Teacher",
//             department: data.teacher.department || "Teacher",
//           });
//         } else {
//           console.error("Sidebar: Failed to fetch teacher data:", data.message);
//           setTeacher({ name: "Error", department: "Teacher" });
//         }
//       } catch (error) {
//         console.error("Sidebar: Error fetching teacher data:", error.message);
//         setTeacher({ name: "Error", department: "Teacher" });
//       }
//     };

//     fetchTeacherData();
//   }, []);

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: "📊" },
//     { id: "students", label: "Student Management", icon: "👥" },
//     { id: "classes", label: "Class Management", icon: "🏫" },
//     { id: "assignments", label: "Assignments", icon: "📝" },
//     { id: "quizzes", label: "Quiz Management", icon: "✅" },
//     { id: "content", label: "Content & Resources", icon: "📚" },
//     { id: "communications", label: "Communications", icon: "🔔" },
//   ];

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         <div className="logo">
//           <span className="logo-icon">🎓</span>
//           {!collapsed && <span className="logo-text">Teacher Portal</span>}
//         </div>
//       </div>

//       <nav className="sidebar-nav">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             className={`nav-item ${activeSection === item.id ? "active" : ""}`}
//             onClick={() => setActiveSection(item.id)}
//             title={collapsed ? item.label : ""}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             {!collapsed && <span className="nav-label">{item.label}</span>}
//           </button>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="user-info">
//           <div className="user-avatar">👨‍🏫</div>
//           {!collapsed && (
//             <div className="user-details">
//               <div className="user-name">{teacher.name}</div>
//               <div className="user-role">{teacher.department}</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";

export default function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }) {
  const [teacher, setTeacher] = useState({ name: "Loading...", department: "Teacher" });
  const sidebarRef = useRef(null);

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        console.log("Sidebar: Starting fetch to /api/teacher/me");
        const response = await fetch("/api/teacher/me", {
          method: "GET",
          credentials: "include",
        });
        console.log("Sidebar: Response status:", response.status);
        const data = await response.json();
        console.log("Sidebar: Response data:", data);

        if (response.ok) {
          console.log("Sidebar: Setting teacher data:", {
            name: data.teacher.name,
            department: data.teacher.department,
          });
          setTeacher({
            name: data.teacher.name || "Unknown Teacher",
            department: data.teacher.department || "Teacher",
          });
        } else {
          console.error("Sidebar: Failed to fetch teacher data:", data.message);
          setTeacher({ name: "Error", department: "Teacher" });
        }
      } catch (error) {
        console.error("Sidebar: Error fetching teacher data:", error.message);
        setTeacher({ name: "Error", department: "Teacher" });
      }
    };

    fetchTeacherData();
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCollapsed]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "students", label: "Student Management", icon: "👥" },
    { id: "classes", label: "Class Management", icon: "🏫" },
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "quizzes", label: "Quiz Management", icon: "✅" },
    { id: "content", label: "Content & Resources", icon: "📚" },
    { id: "communications", label: "Communications", icon: "🔔" },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-black/20 backdrop-blur-2xl border-r border-blue-500/30 text-white transition-all duration-300 ease-in-out z-50 ${
        collapsed ? "w-16 sm:w-20" : "w-64 sm:w-72 lg:w-80"
      } shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="p-4 sm:p-6 border-b border-blue-500/30 bg-black/20">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl">🎓</span>
          {!collapsed && (
            <span className="text-lg sm:text-xl font-semibold tracking-tight">
              Teacher Portal
            </span>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 p-2 sm:p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 w-full py-2 sm:py-3 px-2 sm:px-4 text-left text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-md ${
              activeSection === item.id
                ? "bg-white/15 text-white border-r-4 border-white"
                : ""
            }`}
            onClick={() => setActiveSection(item.id)}
            title={collapsed ? item.label : ""}
          >
            <span className="text-base sm:text-lg min-w-[20px]">{item.icon}</span>
            {!collapsed && (
              <span className="text-sm sm:text-base">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-2 sm:p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-base sm:text-lg">
            👨‍🏫
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{teacher.name}</span>
              <span className="text-xs opacity-80">{teacher.department}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}