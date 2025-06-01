"use client"

import { motion } from "framer-motion"
import { LucideUsers } from "lucide-react"

export default function ClassSections({ sections }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Class Sections</h1>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32"></div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            <LucideUsers size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">No sections found</p>
          </div>
        ) : (
          sections.map((section) => (
            <motion.div
              key={`${section.semester}-${section.section}`}
              className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LucideUsers size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{section.semester} Semester</h3>
                <p className="text-purple-400 font-semibold mb-4">Section {section.section}</p>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">{section.enrolledStudents}</p>
                  <p className="text-gray-400 text-sm">Enrolled Students</p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-300">Class ID: {section.classId}</p>
                  <p className="text-sm text-gray-300">Room: {section.room}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}
