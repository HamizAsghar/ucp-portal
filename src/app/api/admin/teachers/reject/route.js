// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import RegistrationRequest from "@/models/RegistrationRequest"
// import nodemailer from "nodemailer"

// // SMS function
// async function sendSMS(phone, message) {
//     try {
//         console.log(`📱 SMS to ${phone}: ${message}`)

//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 console.log("✅ SMS sent successfully (simulated)")
//                 resolve(true)
//             }, 1000)
//         })
//     } catch (error) {
//         console.error("❌ Error sending SMS:", error)
//         return false
//     }
// }

// export async function POST(request) {
//     try {
//         const { requestId, reason } = await request.json()
//         console.log("🔄 Rejecting teacher request:", requestId, "Reason:", reason)

//         if (!requestId) {
//             return NextResponse.json({ message: "Request ID is required" }, { status: 400 })
//         }

//         await connectDB()

//         const registrationRequest = await RegistrationRequest.findById(requestId)
//         if (!registrationRequest) {
//             return NextResponse.json({ message: "Request not found" }, { status: 404 })
//         }

//         // Update request status
//         registrationRequest.status = "rejected"
//         registrationRequest.rejectionReason = reason
//         await registrationRequest.save()

//         // Try email first, then SMS
//         let emailSent = false
//         let smsSent = false

//         try {
//             const transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false,
//                 auth: {
//                     user: "ucpedua@gmail.com",
//                     pass: "ywxk djgl cgch ivmq",
//                 },
//             })

//             await transporter.sendMail({
//                 from: "ucpedua@gmail.com",
//                 to: registrationRequest.email,
//                 subject: "❌ Teacher Registration Update - UCP Portal",
//                 html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2 style="color: #DC2626;">Registration Request Rejected</h2>
//             <p>We regret to inform you that your teacher registration request has been rejected.</p>
//             <div style="background: #FEF2F2; padding: 15px; border-radius: 8px; margin: 15px 0;">
//               <h4 style="color: #DC2626;">Reason:</h4>
//               <p style="font-style: italic;">"${reason}"</p>
//             </div>
//             <p>If you have questions, please contact our support team.</p>
//           </div>
//         `,
//             })
//             emailSent = true
//         } catch (emailError) {
//             console.log("⚠️ Email failed, sending SMS...")
//             const smsMessage = `❌ Your UCP Portal teacher registration has been REJECTED. Reason: ${reason}. Contact support for more info.`
//             smsSent = await sendSMS(registrationRequest.phone, smsMessage)
//         }

//         return NextResponse.json(
//             {
//                 message: "Teacher request rejected successfully",
//                 emailSent,
//                 smsSent,
//             },
//             { status: 200 },
//         )
//     } catch (error) {
//         console.error("❌ Teacher rejection error:", error)
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//     }
// }





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
