import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function DELETE(request) {
    try {
        await connectDB()

        const { teacherId } = await request.json()

        if (!teacherId) {
            return NextResponse.json({ message: "Teacher ID is required" }, { status: 400 })
        }

        const teacher = await User.findById(teacherId)
        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
        }

        // Delete teacher
        await User.findByIdAndDelete(teacherId)

        return NextResponse.json({ message: "Teacher deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting teacher:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
