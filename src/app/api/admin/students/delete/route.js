import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Student from "@/models/Student"
import ClassSection from "@/models/ClassSection"

export async function DELETE(request) {
    try {
        await connectDB()

        const { studentId } = await request.json()

        if (!studentId) {
            return NextResponse.json({ message: "Student ID is required" }, { status: 400 })
        }

        const student = await Student.findById(studentId)
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 })
        }

        // Remove student from class section
        const classSection = await ClassSection.findOne({
            semester: student.semester,
            section: student.section,
        })

        if (classSection) {
            classSection.students = classSection.students.filter((id) => id.toString() !== studentId)
            classSection.enrolledStudents = classSection.students.length
            await classSection.save()
        }

        // Delete student
        await Student.findByIdAndDelete(studentId)

        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting student:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
