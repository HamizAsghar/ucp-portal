import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"
import nodemailer from "nodemailer"

// Email configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export async function POST(request) {
    try {
        await connectDB()

        const { requestId, reason } = await request.json()

        if (!requestId || !reason) {
            return NextResponse.json({ message: "Request ID and reason are required" }, { status: 400 })
        }

        // Find the registration request
        const registrationRequest = await RegistrationRequest.findById(requestId)
        if (!registrationRequest) {
            return NextResponse.json({ message: "Registration request not found" }, { status: 404 })
        }

        // Send rejection email
        try {
            const emailContent = `
        <h2>Registration Request Rejected</h2>
        <p>Dear ${registrationRequest.name},</p>
        <p>We regret to inform you that your teacher registration request has been rejected.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>You can register again with the same email address if you wish to reapply.</p>
        <p>Best regards,<br>Admin Team</p>
      `

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: registrationRequest.email,
                subject: "Teacher Registration Rejected",
                html: emailContent,
            })
        } catch (emailError) {
            console.error("Email sending failed:", emailError)
        }

        // Delete the registration request (so they can register again)
        await RegistrationRequest.findByIdAndDelete(requestId)

        return NextResponse.json({ message: "Teacher request rejected and deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error rejecting teacher request:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
