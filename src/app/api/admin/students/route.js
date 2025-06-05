import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Student from "@/models/Student"

export async function GET(request) {
  try {
    await connectDB()

    const students = await Student.find({ role: "student" }).sort({ createdAt: -1 }).lean()

    return NextResponse.json(
      {
        students,
        count: students.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
