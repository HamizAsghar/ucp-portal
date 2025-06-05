import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"

export async function GET(request) {
    try {
         await connectDB();

        const requests = await RegistrationRequest.find({
            status: "pending",
        })
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json(
            {
                requests,
                count: requests.length,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error fetching teacher requests:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
