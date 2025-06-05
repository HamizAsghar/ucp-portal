import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Student from "@/models/Student"
import ClassSection from "@/models/ClassSection"

export async function PUT(request) {
    try {
        await connectDB()

        const { studentId, updateData } = await request.json()

        if (!studentId) {
            return NextResponse.json({ message: "Student ID is required" }, { status: 400 })
        }

        const student = await Student.findById(studentId)
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 })
        }

        // If semester or section is being updated, handle class section changes
        if (updateData.semester || updateData.section) {
            const oldSemester = student.semester
            const oldSection = student.section
            const newSemester = updateData.semester || student.semester
            const newSection = updateData.section || student.section

            // Remove from old class section if semester/section changed
            if (oldSemester !== newSemester || oldSection !== newSection) {
                const oldClassSection = await ClassSection.findOne({
                    semester: oldSemester,
                    section: oldSection,
                })

                if (oldClassSection) {
                    oldClassSection.students = oldClassSection.students.filter((id) => id.toString() !== studentId)
                    oldClassSection.enrolledStudents = oldClassSection.students.length
                    await oldClassSection.save()
                }

                // Add to new class section
                let newClassSection = await ClassSection.findOne({
                    semester: newSemester,
                    section: newSection,
                })

                if (!newClassSection) {
                    // Create new class section if it doesn't exist
                    const classId = `${newSemester}_${newSection}_${Date.now()}`
                    const room = Math.floor(Math.random() * 100) + 1

                    newClassSection = new ClassSection({
                        semester: newSemester,
                        section: newSection,
                        classId,
                        room,
                        enrolledStudents: 0,
                        students: [],
                    })
                }

                newClassSection.students.push(studentId)
                newClassSection.enrolledStudents = newClassSection.students.length
                await newClassSection.save()

                // Update student's classId and room
                updateData.classId = newClassSection.classId
                updateData.room = newClassSection.room
            }
        }

        // Update student
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true })

        return NextResponse.json(
            {
                message: "Student updated successfully",
                student: updatedStudent,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error updating student:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
