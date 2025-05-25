import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"

export async function POST(request) {
    try {
        const { name, email, phone, password, image } = await request.json()

        await connectDB()

        // Check if user already exists
        const existingRequest = await RegistrationRequest.findOne({ email })
        if (existingRequest) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create registration request
        const registrationRequest = new RegistrationRequest({
            name,
            email,
            phone,
            password: hashedPassword,
            image,
            status: "pending",
            createdAt: new Date(),
        })

        await registrationRequest.save()

        return NextResponse.json({ message: "Registration request submitted successfully" }, { status: 201 })
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
