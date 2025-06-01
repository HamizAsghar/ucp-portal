import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const token = searchParams.get("token")

        if (!token) {
            return NextResponse.json({ message: "Invalid or missing token" }, { status: 400 })
        }

        await connectDB()

        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
        }

        const { email } = decoded
        const user = await RegistrationRequest.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        if (user.isVerified) {
            return NextResponse.redirect(new URL("/teacherlogin?message=Email already verified", process.env.NEXT_PUBLIC_BASE_URL))
        }

        if (user.verificationToken !== token) {
            return NextResponse.json({ message: "Invalid verification link" }, { status: 400 })
        }

        user.isVerified = true
        user.verificationToken = null
        await user.save()

        return NextResponse.redirect(new URL("/teacherlogin?message=Email verified successfully", process.env.NEXT_PUBLIC_BASE_URL))

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
