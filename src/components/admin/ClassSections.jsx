// "use client"

// import { motion } from "framer-motion"
// import { LucideUsers } from "lucide-react"

// export default function ClassSections({ sections }) {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   }

//   return (
//     <motion.div variants={container} initial="hidden" animate="show">
//       <motion.div variants={item} className="mb-8">
//         <h1 className="text-4xl font-bold text-white mb-2">Class Sections</h1>
//         <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
//       </motion.div>

//       <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sections.length === 0 ? (
//           <div className="col-span-full text-center text-gray-400 py-12">
//             <LucideUsers size={48} className="mx-auto mb-4 opacity-50" />
//             <p className="text-xl">No sections found</p>
//           </div>
//         ) : (
//           sections.map((section) => (
//             <motion.div
//               key={`${section.semester}-${section.section}`}
//               className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <LucideUsers size={24} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">{section.semester} Semester</h3>
//                 <p className="text-purple-400 font-semibold mb-4">Section {section.section}</p>
//                 <div className="bg-white/10 rounded-lg p-3">
//                   <p className="text-2xl font-bold text-white">{section.enrolledStudents}</p>
//                   <p className="text-gray-400 text-sm">Enrolled Students</p>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   <p className="text-sm text-gray-300">Class ID: {section.classId}</p>
//                   <p className="text-sm text-gray-300">Room: {section.room}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>
//     </motion.div>
//   )
// }






"use client"

import { useState } from "react"
import { BookOpen, Users, MapPin, Hash, ChevronDown, ChevronUp, User, Mail, Edit, Trash2 } from "lucide-react"

export default function ClassSections({ sections, allStudents, handleDeleteStudent, handleUpdateStudent }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const getStudentsInSection = (semester, section) => {
    return allStudents?.filter((student) => student.semester === semester && student.section === section) || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Class Sections</h1>
        <div className="text-gray-400">Total: {sections?.length || 0} sections</div>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections?.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-500 mb-4" size={64} />
            <p className="text-gray-400 text-lg">No class sections found</p>
          </div>
        ) : (
          sections?.map((section) => {
            const studentsInSection = getStudentsInSection(section.semester, section.section)
            const isExpanded = expandedSection === section._id

            return (
              <div
                key={section._id}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden"
              >
                {/* Section Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => toggleSection(section._id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="text-blue-400" size={20} />
                        <span className="text-white font-semibold">
                          {section.semester} Semester - Section {section.section}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hash className="text-green-400" size={16} />
                        <span className="text-gray-300">ID: {section.classId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-yellow-400" size={16} />
                        <span className="text-gray-300">Room {section.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="text-purple-400" size={16} />
                        <span className="text-gray-300">{studentsInSection.length} students</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {isExpanded ? (
                        <ChevronUp className="text-gray-400" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Students List */}
                {isExpanded && (
                  <div className="border-t border-gray-700 bg-gray-900/30">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Users className="mr-2" size={20} />
                        Students in this Section ({studentsInSection.length})
                      </h3>

                      {studentsInSection.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No students in this section</p>
                      ) : (
                        <div className="space-y-3">
                          {studentsInSection.map((student) => (
                            <div
                              key={student._id}
                              className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center"
                            >
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                  <User className="text-blue-400" size={16} />
                                  <span className="text-white font-medium">{student.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Mail className="text-green-400" size={16} />
                                  <span className="text-gray-300">{student.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Hash className="text-purple-400" size={16} />
                                  <span className="text-gray-300">{student.registrationNumber}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => {
                                    // You can implement edit functionality here
                                    const newSemester = prompt("Enter new semester:", student.semester)
                                    const newSection = prompt("Enter new section:", student.section)
                                    if (newSemester && newSection) {
                                      handleUpdateStudent(student._id, {
                                        semester: newSemester,
                                        section: newSection,
                                      })
                                    }
                                  }}
                                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                  title="Edit Student"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(student._id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                  title="Delete Student"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
