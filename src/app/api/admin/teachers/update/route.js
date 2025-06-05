import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function PUT(request) {
    try {
        await connectDB()

        const { teacherId, updateData } = await request.json()

        if (!teacherId) {
            return NextResponse.json({ message: "Teacher ID is required" }, { status: 400 })
        }

        const teacher = await User.findById(teacherId)
        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
        }

        // Update teacher
        const updatedTeacher = await User.findByIdAndUpdate(teacherId, updateData, { new: true })

        return NextResponse.json(
            {
                message: "Teacher updated successfully",
                teacher: updatedTeacher,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error updating teacher:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
