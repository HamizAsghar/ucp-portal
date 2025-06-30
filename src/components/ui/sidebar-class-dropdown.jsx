"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, BookOpen } from "lucide-react"

export default function SidebarClassDropdown({ classes, onClassSelect, selectedClass }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-blue-500/20 bg-black/20 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-gray-300" />
          <span>My Classes</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-300" /> : <ChevronDown className="h-4 w-4 text-gray-300" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-4 space-y-1">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => onClassSelect(cls)}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                    selectedClass?.id === cls.id
                      ? "bg-blue-500/30 text-white"
                      : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${cls.color}`}></div>
                  <span className="truncate text-sm">{cls.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
