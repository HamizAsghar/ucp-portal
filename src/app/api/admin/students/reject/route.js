import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import StudentRequest from "@/models/StudentRequest"
import nodemailer from "nodemailer"

// SMS function
async function sendSMS(phone, message) {
    try {
        console.log(`📱 SMS to ${phone}: ${message}`)

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("✅ SMS sent successfully (simulated)")
                resolve(true)
            }, 1000)
        })
    } catch (error) {
        console.error("❌ Error sending SMS:", error)
        return false
    }
}

export async function POST(request) {
    try {
        const { requestId, reason } = await request.json()
        console.log("🔄 Rejecting student request:", requestId, "Reason:", reason)

        if (!requestId) {
            return NextResponse.json({ message: "Request ID is required" }, { status: 400 })
        }

        await connectDB()

        const studentRequest = await StudentRequest.findById(requestId)
        if (!studentRequest) {
            return NextResponse.json({ message: "Request not found" }, { status: 404 })
        }

        // Update request status
        studentRequest.status = "rejected"
        studentRequest.rejectionReason = reason
        await studentRequest.save()

        // Try email first, then SMS
        let emailSent = false
        let smsSent = false

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "hamizasghar@gmail.com",
                    pass: "hfra fdvu qpgp veom",
                },
            })

            await transporter.sendMail({
                from: "hamizasghar@gmail.com",
                to: studentRequest.email,
                subject: "❌ Student Registration Update - UCP Portal",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #DC2626;">Registration Request Rejected</h2>
            <p>We regret to inform you that your student registration request has been rejected.</p>
            <div style="background: #FEF2F2; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h4 style="color: #DC2626;">Reason:</h4>
              <p style="font-style: italic;">"${reason}"</p>
            </div>
            <p>If you have questions, please contact our support team.</p>
          </div>
        `,
            })
            emailSent = true
        } catch (emailError) {
            console.log("⚠️ Email failed, sending SMS...")
            const smsMessage = `❌ Your UCP Portal student registration has been REJECTED. Reason: ${reason}. Contact support for more info.`
            smsSent = await sendSMS(studentRequest.phone, smsMessage)
        }

        return NextResponse.json(
            {
                message: "Student request rejected successfully",
                emailSent,
                smsSent,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("❌ Student rejection error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
