import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import StudentRequest from "@/models/StudentRequest"

export async function GET() {
  try {
    await connectDB()

    const requests = await StudentRequest.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Error fetching student requests:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
