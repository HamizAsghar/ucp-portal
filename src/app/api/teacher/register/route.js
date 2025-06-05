// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import { connectDB } from "@/lib/mongodb"
// import RegistrationRequest from "@/models/RegistrationRequest"

// export async function POST(request) {
//     try {
//         const { name, email, phone, password, image } = await request.json()

//         await connectDB()

//         // Check if user already exists
//         const existingRequest = await RegistrationRequest.findOne({ email })
//         if (existingRequest) {
//             return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 12)

//         // Create registration request
//         const registrationRequest = new RegistrationRequest({
//             name,
//             email,
//             phone,
//             password: hashedPassword,
//             image,
//             status: "pending",
//             createdAt: new Date(),
//         })

//         await registrationRequest.save()

//         return NextResponse.json({ message: "Registration request submitted successfully" }, { status: 201 })
//     } catch (error) {
//         console.error("Registration error:", error)
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//     }
// }

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import RegistrationRequest from "@/models/RegistrationRequest"
import connectDB from "@/lib/mongodb"

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

        // Generate JWT verification token
        const verificationToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET || "fallback-secret", { expiresIn: "1d" })

        // Create registration request
        const registrationRequest = new RegistrationRequest({
            name,
            email,
            phone,
            password: hashedPassword,
            image,
            status: "pending",
            isVerified: false,
            verificationToken,
            createdAt: new Date(),
        })

        await registrationRequest.save()

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransporter({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Verification email content
        const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000"
        const verificationUrl = `${baseURL}/verify-email?token=${verificationToken}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email - UCP Portal",
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">🎓 UCP Portal</h1>
                            <p style="color: #6b7280; margin: 5px 0 0 0;">University of Central Punjab</p>
                        </div>
                        
                        <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome ${name}!</h2>
                        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 25px;">
                            Thank you for registering as a teacher at UCP Portal. To complete your registration, 
                            please verify your email address by clicking the button below:
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationUrl}" 
                               style="display: inline-block; padding: 15px 30px; background-color: #2563eb; 
                                      color: white; text-decoration: none; border-radius: 8px; font-weight: bold;
                                      box-shadow: 0 2px 5px rgba(37, 99, 235, 0.3);">
                                ✅ Verify Email Address
                            </a>
                        </div>
                        
                        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #92400e; margin: 0; font-size: 14px;">
                                ⏰ <strong>Important:</strong> This verification link will expire in 24 hours.
                            </p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            If you did not request this registration, please ignore this email.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                        
                        <div style="text-align: center;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                © 2024 University of Central Punjab. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            `,
        }

        // Send verification email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            {
                message: "Registration request submitted successfully. Please check your email to verify your account.",
                success: true,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

