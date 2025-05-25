import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import StudentRequest from "@/models/StudentRequest"

export async function POST(request) {
    try {
        const { name, email, phone, registrationNumber, password, semester, section, image } = await request.json()

        await connectDB()

        // Check if student already exists
        const existingRequest = await StudentRequest.findOne({
            $or: [{ email }, { registrationNumber }],
        })

        if (existingRequest) {
            return NextResponse.json(
                { message: "Student with this email or registration number already exists" },
                { status: 400 },
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create student request
        const studentRequest = new StudentRequest({
            name,
            email,
            phone,
            password: hashedPassword,
            semester,
            section,
            registrationNumber,
            image,
            status: "pending",
            createdAt: new Date(),
        })

        await studentRequest.save()

        return NextResponse.json(
            {
                message: "Student registration request submitted successfully",
                registrationNumber,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Student registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
