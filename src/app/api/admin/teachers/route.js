import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"

export async function GET() {
    try {
        await connectDB()

        const requests = await RegistrationRequest.find({}).sort({ createdAt: -1 }).lean()

        return NextResponse.json({ requests }, { status: 200 })
    } catch (error) {
        console.error("Error fetching teacher requests:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
