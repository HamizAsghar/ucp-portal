


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
