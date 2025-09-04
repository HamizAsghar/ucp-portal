// "use client"

// export default function Header({ activeSection, toggleSidebar }) {
//   const getSectionTitle = () => {
//     const titles = {
//       dashboard: "Dashboard Overview",
//       students: "Student Management",
//       classes: "Class Management",
//       assignments: "Assignment Management",
//       quizzes: "Quiz Management",
//       content: "Content & Resources",
//       communications: "Communications",
//     }
//     return titles[activeSection] || "Dashboard"
//   }

//   return (
//     <header className="header">
//       <div className="header-left">
//         <button className="sidebar-toggle" onClick={toggleSidebar}>
//           ☰
//         </button>
//         <h1 className="page-title">{getSectionTitle()}</h1>
//       </div>

//       <div className="header-right">
//         <div className="header-actions">
//           <button className="notification-btn">
//             🔔<span className="notification-badge">3</span>
//           </button>
//           {/* <div className="user-menu">
//             <button className="user-menu-btn">
//               <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="user-avatar" />
//               <span>John Doe</span>
//               <span className="dropdown-arrow">▼</span>
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </header>
//   )
// }






"use client";

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
    };
    return titles[activeSection] || "Dashboard";
  };

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-blue-500/30 text-white sticky top-0 z-40 flex justify-between items-center p-4 sm:p-6 shadow-md">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="text-lg sm:text-xl p-2 rounded-md hover:bg-black/30 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
          {getSectionTitle()}
        </h1>
      </div>
      <div className="flex items-center">
        <button className="relative p-2 rounded-md hover:bg-black/30 transition-colors duration-200">
          🔔
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 sm:w-5 h-4 sm:h-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}