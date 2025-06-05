import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Student from "@/models/Student"
import ClassSection from "@/models/ClassSection"

export async function POST(request) {
    try {
        await connectDB()

        const { email, username, password } = await request.json()

        if (!email || !username || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        // Find student by email
        const student = await Student.findOne({ email })
        if (!student) {
            return NextResponse.json({ message: "Student not found with this email" }, { status: 404 })
        }

        // Find the class section
        const classSection = await ClassSection.findOne({
            semester: student.semester,
            section: student.section,
        }).populate("assignedTeacher")

        if (!classSection || !classSection.assignedTeacher) {
            return NextResponse.json({ message: "No teacher assigned to your class yet" }, { status: 404 })
        }

        // Get teacher details
        const teacher = classSection.assignedTeacher

        // Verify credentials match teacher's provided credentials
        if (
            !teacher.classCredentials ||
            teacher.classCredentials.username !== username ||
            teacher.classCredentials.password !== password
        ) {
            return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
        }

        // Get all classmates
        const classmates = await Student.find({
            semester: student.semester,
            section: student.section,
            _id: { $ne: student._id }, // Exclude current student
        }).select("name email registrationNumber")

        return NextResponse.json(
            {
                message: "Login successful",
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    registrationNumber: student.registrationNumber,
                    semester: student.semester,
                    section: student.section,
                    classId: student.classId,
                    room: student.room,
                },
                teacher: {
                    name: teacher.name,
                    email: teacher.email,
                    subject: classSection.subject,
                },
                classmates,
                classInfo: {
                    semester: classSection.semester,
                    section: classSection.section,
                    room: classSection.room,
                    totalStudents: classSection.enrolledStudents,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Student login error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
