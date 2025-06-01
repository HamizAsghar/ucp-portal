import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import StudentRequest from "@/models/StudentRequest"
import Student from "@/models/Student"
import ClassSection from "@/models/ClassSection"

export async function DELETE(request) {
    try {
        const { studentId } = await request.json()

        await connectDB()

        // Find the student request
        const studentRequest = await StudentRequest.findById(studentId)
        if (!studentRequest) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 })
        }

        // Find and delete from Student collection if approved
        if (studentRequest.status === "approved") {
            const student = await Student.findOne({ email: studentRequest.email })
            if (student) {
                // Remove from class section
                await ClassSection.updateOne(
                    { semester: student.semester, section: student.section },
                    {
                        $pull: { students: student._id },
                        $inc: { enrolledStudents: -1 },
                    },
                )

                await Student.findByIdAndDelete(student._id)
            }
        }

        // Delete the student request
        await StudentRequest.findByIdAndDelete(studentId)

        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Student deletion error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
