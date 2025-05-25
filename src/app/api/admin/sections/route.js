import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ClassSection from "@/models/ClassSection"

export async function GET() {
    try {
        await connectDB()

        // Get all class sections
        const classSections = await ClassSection.find({}).lean()

        return NextResponse.json({ sections: classSections }, { status: 200 })
    } catch (error) {
        console.error("Error fetching sections:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
