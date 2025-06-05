"use client"

import { useState, useMemo } from "react"
import { Search, Edit, Trash2, User, Mail, Phone, Calendar, CheckCircle, XCircle, Users } from "lucide-react"

export default function AllTeachers({ allTeachers, handleDeleteTeacher, handleUpdateTeacher }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [editingTeacher, setEditingTeacher] = useState(null)
    const [editForm, setEditForm] = useState({})

    const filteredTeachers = useMemo(() => {
        return (
            allTeachers?.filter((teacher) => {
                const matchesSearch =
                    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())

                return matchesSearch
            }) || []
        )
    }, [allTeachers, searchTerm])

    const handleEditClick = (teacher) => {
        setEditingTeacher(teacher._id)
        setEditForm({
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
        })
    }

    const handleSaveEdit = async () => {
        await handleUpdateTeacher(editingTeacher, editForm)
        setEditingTeacher(null)
        setEditForm({})
    }

    const handleCancelEdit = () => {
        setEditingTeacher(null)
        setEditForm({})
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">All Teachers</h1>
                <div className="text-gray-400">Total: {filteredTeachers.length} teachers</div>
            </div>

            {/* Search */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Teachers List */}
            <div className="space-y-4">
                {filteredTeachers.length === 0 ? (
                    <div className="text-center py-12">
                        <Users className="mx-auto text-gray-500 mb-4" size={64} />
                        <p className="text-gray-400 text-lg">No teachers found</p>
                    </div>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <div key={teacher._id} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                            {editingTeacher === teacher._id ? (
                                // Edit Mode
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                            <span className="text-white font-medium">{teacher.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="text-green-400" size={16} />
                                            <span className="text-gray-300">{teacher.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="text-yellow-400" size={16} />
                                            <span className="text-gray-300">{teacher.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {teacher.isApproved ? (
                                                <CheckCircle className="text-green-400" size={16} />
                                            ) : (
                                                <XCircle className="text-red-400" size={16} />
                                            )}
                                            <span className={teacher.isApproved ? "text-green-400" : "text-red-400"}>
                                                {teacher.isApproved ? "Approved" : "Pending"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="text-orange-400" size={16} />
                                            <span className="text-gray-300">{new Date(teacher.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        {teacher.assignedClass && (
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="text-purple-400" size={16} />
                                                <span className="text-purple-400">Assigned: {teacher.assignedClass}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEditClick(teacher)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            title="Edit Teacher"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTeacher(teacher._id)}
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                            title="Delete Teacher"
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
