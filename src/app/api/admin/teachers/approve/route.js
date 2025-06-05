// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import RegistrationRequest from "@/models/RegistrationRequest"
// import User from "@/models/User"
// import nodemailer from "nodemailer"

// // SMS function
// async function sendSMS(phone, message) {
//     try {
//         console.log(`📱 SMS to ${phone}: ${message}`)

//         // Simulate SMS sending
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

// // Email function
// async function sendTeacherApprovalEmail(teacherData) {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false,
//             auth: {
//                 user: "ucpedua@gmail.com",
//                 pass: "ywxk djgl cgch ivmq",
//             },
//         })

//         const mailOptions = {
//             from: "ucpedua@gmail.com",
//             to: teacherData.email,
//             subject: "🎉 Teacher Registration Approved - UCP Portal",
//             html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 20px; border-radius: 15px;">
//           <div style="background: white; padding: 30px; border-radius: 10px;">
//             <div style="text-align: center; margin-bottom: 30px;">
//               <h1 style="color: #4F46E5; margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
//               <p style="color: #6B7280; font-size: 16px; margin: 10px 0;">Your teacher registration has been approved!</p>
//             </div>
            
//             <div style="background: #F8FAFC; padding: 25px; border-radius: 10px; margin: 20px 0;">
//               <h3 style="color: #1F2937; margin-top: 0;">📋 Your Account Details:</h3>
//               <table style="width: 100%; border-collapse: collapse;">
//                 <tr><td style="padding: 8px 0; color: #4B5563;"><strong>Name:</strong></td><td style="color: #1F2937;">${teacherData.name}</td></tr>
//                 <tr><td style="padding: 8px 0; color: #4B5563;"><strong>Email:</strong></td><td style="color: #1F2937;">${teacherData.email}</td></tr>
//                 <tr><td style="padding: 8px 0; color: #4B5563;"><strong>Phone:</strong></td><td style="color: #1F2937;">${teacherData.phone}</td></tr>
//                 <tr><td style="padding: 8px 0; color: #4B5563;"><strong>Role:</strong></td><td style="color: #4F46E5; font-weight: bold;">Teacher</td></tr>
//               </table>
//             </div>
            
//             <div style="text-align: center; margin: 30px 0;">
//               <p style="color: #059669; font-size: 18px; font-weight: bold;">✅ You can now login to the UCP Portal!</p>
//               <p style="color: #6B7280;">Welcome to our educational platform!</p>
//             </div>
//           </div>
//         </div>
//       `,
//         }

//         await transporter.sendMail(mailOptions)
//         console.log("✅ Teacher approval email sent successfully")
//         return true
//     } catch (error) {
//         console.error("❌ Error sending teacher approval email:", error)
//         return false
//     }
// }

// export async function POST(request) {
//     try {
//         console.log("🔄 Starting teacher approval process...")

//         const { requestId } = await request.json()
//         console.log("📝 Request ID received:", requestId)

//         if (!requestId) {
//             console.log("❌ No request ID provided")
//             return NextResponse.json({ message: "Request ID is required" }, { status: 400 })
//         }

//         await connectDB()
//         console.log("✅ Database connected")

//         const registrationRequest = await RegistrationRequest.findById(requestId)
//         if (!registrationRequest) {
//             console.log("❌ Teacher request not found for ID:", requestId)
//             return NextResponse.json({ message: "Request not found" }, { status: 404 })
//         }

//         console.log("👨‍🏫 Teacher request found:", registrationRequest.name)

//         // Create user account
//         const user = new User({
//             name: registrationRequest.name,
//             email: registrationRequest.email,
//             phone: registrationRequest.phone,
//             password: registrationRequest.password,
//             image: registrationRequest.image,
//             role: "teacher",
//             isApproved: true,
//         })

//         await user.save()
//         console.log("✅ Teacher account created")

//         // Update request status
//         registrationRequest.status = "approved"
//         await registrationRequest.save()
//         console.log("✅ Request status updated to approved")

//         // Try to send email first, if fails then send SMS
//         console.log("📧 Attempting to send teacher approval email...")
//         let emailSent = false
//         let smsSent = false

//         try {
//             emailSent = await sendTeacherApprovalEmail(registrationRequest)
//         } catch (emailError) {
//             console.log("⚠️ Email failed, trying SMS...")
//         }

//         // If email fails, send SMS
//         if (!emailSent) {
//             console.log("📱 Sending SMS notification...")
//             const smsMessage = `🎉 Congratulations ${registrationRequest.name}! Your UCP Portal teacher registration has been APPROVED. You can now login to the portal and start teaching.`
//             smsSent = await sendSMS(registrationRequest.phone, smsMessage)
//         }

//         const notificationStatus = emailSent
//             ? "Email sent successfully"
//             : smsSent
//                 ? "SMS sent successfully"
//                 : "Notification failed"
//         console.log("📬 Notification status:", notificationStatus)

//         return NextResponse.json(
//             {
//                 message: "Teacher request approved successfully",
//                 emailSent: emailSent,
//                 smsSent: smsSent,
//                 notificationStatus: notificationStatus,
//             },
//             { status: 200 },
//         )
//     } catch (error) {
//         console.error("❌ Teacher approval error:", error)
//         return NextResponse.json(
//             {
//                 message: "Internal server error",
//                 error: error.message,
//             },
//             { status: 500 },
//         )
//     }
// }





import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"
import User from "@/models/User"
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

        const { requestId } = await request.json()

        if (!requestId) {
            return NextResponse.json({ message: "Request ID is required" }, { status: 400 })
        }

        // Find the registration request
        const registrationRequest = await RegistrationRequest.findById(requestId)
        if (!registrationRequest) {
            return NextResponse.json({ message: "Registration request not found" }, { status: 404 })
        }

        // Check if already processed
        if (registrationRequest.status !== "pending") {
            return NextResponse.json({ message: "Request has already been processed" }, { status: 400 })
        }

        // Create new user from registration request
        const newUser = new User({
            name: registrationRequest.name,
            email: registrationRequest.email,
            phone: registrationRequest.phone,
            password: registrationRequest.password,
            image: registrationRequest.image,
            role: "teacher",
            isApproved: true,
        })

        await newUser.save()

        // Update registration request status
        registrationRequest.status = "approved"
        await registrationRequest.save()

        // Send approval email
        let emailSent = false
        try {
            const emailContent = `
        <h2>Registration Approved!</h2>
        <p>Dear ${registrationRequest.name},</p>
        <p>Your teacher registration has been approved. You can now login to the system.</p>
        <p>Login Details:</p>
        <ul>
          <li><strong>Email:</strong> ${registrationRequest.email}</li>
          <li><strong>Password:</strong> Use the password you provided during registration</li>
        </ul>
        <p>Welcome to our teaching platform!</p>
        <p>Best regards,<br>Admin Team</p>
      `

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: registrationRequest.email,
                subject: "Teacher Registration Approved",
                html: emailContent,
            })

            emailSent = true
        } catch (emailError) {
            console.error("Email sending failed:", emailError)
        }

        return NextResponse.json(
            {
                message: "Teacher request approved successfully",
                emailSent,
                teacher: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error approving teacher request:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
