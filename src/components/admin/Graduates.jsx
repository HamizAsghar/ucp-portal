"use client"

import { useState } from "react"
import { Download, Users, Calendar, GraduationCap, Search, Filter } from "lucide-react"

export default function Graduates({ graduates, fetchGraduates }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [loading, setLoading] = useState(false)

  // Get unique graduation years
  const graduationYears = [...new Set(graduates.map((grad) => grad.graduationYear))].sort((a, b) => b - a)

  // Filter graduates based on search and year
  const filteredGraduates = graduates.filter((graduate) => {
    const matchesSearch =
      graduate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === "" || graduate.graduationYear.toString() === selectedYear
    return matchesSearch && matchesYear
  })

  const downloadGraduatesReport = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/graduates/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: selectedYear || "all",
          searchTerm: searchTerm,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `graduates-report-${selectedYear || "all"}-${new Date().toISOString().split("T")[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        alert("Graduates report downloaded successfully!")
      } else {
        alert("Error downloading report. Please try again.")
      }
    } catch (error) {
      console.error("Error downloading report:", error)
      alert("Error downloading report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Graduates Management</h1>
          </div>
          <button
            onClick={downloadGraduatesReport}
            disabled={loading}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>{loading ? "Generating..." : "Download Report"}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-blue-200 text-sm">Total Graduates</p>
                <p className="text-white text-xl font-bold">{graduates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-green-200 text-sm">This Year</p>
                <p className="text-white text-xl font-bold">
                  {graduates.filter((g) => g.graduationYear === new Date().getFullYear()).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-purple-200 text-sm">Years Active</p>
                <p className="text-white text-xl font-bold">{graduationYears.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Graduates List */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Graduation Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Final CGPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Graduation Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredGraduates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    {graduates.length === 0 ? "No graduates found" : "No graduates match your search criteria"}
                  </td>
                </tr>
              ) : (
                filteredGraduates.map((graduate) => (
                  <tr key={graduate._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{graduate.name}</div>
                        <div className="text-sm text-gray-400">{graduate.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{graduate.rollNumber}</td>
                    <td className="px-6 py-4 text-sm text-white">{graduate.department}</td>
                    <td className="px-6 py-4 text-sm text-white">{graduate.graduationYear}</td>
                    <td className="px-6 py-4 text-sm text-white">
                      {graduate.finalCGPA ? graduate.finalCGPA.toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {new Date(graduate.graduationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
