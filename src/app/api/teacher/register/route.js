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

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import RegistrationRequest from "@/models/RegistrationRequest";

export async function POST(request) {
    try {
        const { name, email, phone, password, image } = await request.json();

        await connectDB();

        // Check if user already exists
        const existingRequest = await RegistrationRequest.findOne({ email });
        if (existingRequest) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate JWT verification token
        const verificationToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 1 day
        );

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
        });

        await registrationRequest.save();

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verification email content
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email - UCP Portal",
            html: `
                <h2>Welcome to UCP Portal, ${name}!</h2>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>This link will expire in 24 hours.</p>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        // Send verification email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Registration request submitted successfully. Please check your email to verify your account." }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}