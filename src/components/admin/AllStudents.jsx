"use client"

import { useState, useMemo } from "react"
import { Search, Edit, Trash2, User, Mail, Phone, GraduationCap, Hash, MapPin, Calendar } from "lucide-react"

export default function AllStudents({ allStudents, handleDeleteStudent, handleUpdateStudent, sections }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [semesterFilter, setSemesterFilter] = useState("")
    const [sectionFilter, setSectionFilter] = useState("")
    const [editingStudent, setEditingStudent] = useState(null)
    const [editForm, setEditForm] = useState({})

    const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
    const sectionsOptions = ["A", "B", "C", "D", "E", "F"]

    const filteredStudents = useMemo(() => {
        return (
            allStudents?.filter((student) => {
                const matchesSearch =
                    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())

                const matchesSemester = !semesterFilter || student.semester === semesterFilter
                const matchesSection = !sectionFilter || student.section === sectionFilter

                return matchesSearch && matchesSemester && matchesSection
            }) || []
        )
    }, [allStudents, searchTerm, semesterFilter, sectionFilter])

    const handleEditClick = (student) => {
        setEditingStudent(student._id)
        setEditForm({
            name: student.name,
            email: student.email,
            phone: student.phone,
            semester: student.semester,
            section: student.section,
            registrationNumber: student.registrationNumber,
        })
    }

    const handleSaveEdit = async () => {
        await handleUpdateStudent(editingStudent, editForm)
        setEditingStudent(null)
        setEditForm({})
    }

    const handleCancelEdit = () => {
        setEditingStudent(null)
        setEditForm({})
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">All Students</h1>
                <div className="text-gray-400">Total: {filteredStudents.length} students</div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or registration number"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Semester Filter */}
                    <div className="relative">
                        <select
                            value={semesterFilter}
                            onChange={(e) => setSemesterFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="">All Semesters</option>
                            {semesters.map((sem) => (
                                <option key={sem} value={sem}>
                                    {sem} Semester
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Section Filter */}
                    <div className="relative">
                        <select
                            value={sectionFilter}
                            onChange={(e) => setSectionFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="">All Sections</option>
                            {sectionsOptions.map((sec) => (
                                <option key={sec} value={sec}>
                                    Section {sec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="space-y-4">
                {filteredStudents.length === 0 ? (
                    <div className="text-center py-12">
                        <GraduationCap className="mx-auto text-gray-500 mb-4" size={64} />
                        <p className="text-gray-400 text-lg">No students found</p>
                    </div>
                ) : (
                    filteredStudents.map((student) => (
                        <div key={student._id} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                            {editingStudent === student._id ? (
                                // Edit Mode
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            placeholder="Name"
                                        />
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            placeholder="Email"
                                        />
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            placeholder="Phone"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.registrationNumber}
                                            onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            placeholder="Registration Number"
                                        />
                                        <select
                                            value={editForm.semester}
                                            onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        >
                                            {semesters.map((sem) => (
                                                <option key={sem} value={sem}>
                                                    {sem} Semester
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={editForm.section}
                                            onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        >
                                            {sectionsOptions.map((sec) => (
                                                <option key={sec} value={sec}>
                                                    Section {sec}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <User className="text-blue-400" size={16} />
                                            <span className="text-white font-medium">{student.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="text-green-400" size={16} />
                                            <span className="text-gray-300">{student.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="text-yellow-400" size={16} />
                                            <span className="text-gray-300">{student.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Hash className="text-purple-400" size={16} />
                                            <span className="text-gray-300">{student.registrationNumber}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <GraduationCap className="text-indigo-400" size={16} />
                                            <span className="text-gray-300">{student.semester} Semester</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="text-red-400" size={16} />
                                            <span className="text-gray-300">Section {student.section}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="text-orange-400" size={16} />
                                            <span className="text-gray-300">{new Date(student.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEditClick(student)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            title="Edit Student"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStudent(student._id)}
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                            title="Delete Student"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
