// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(request) {
//     try {
//         const { email, password } = await request.json();

//         await connectDB();

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Compare provided password with stored hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Check if registration is approved
//         if (user.status !== "approved") {
//             return NextResponse.json({ message: "Registration pending approval" }, { status: 403 });
//         }

//         // Return success response with basic user info (excluding password)
//         return NextResponse.json({
//             message: "Login successful",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 image: user.image
//             }
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(request) {
//     try {
//         const { email, password } = await request.json();

//         await connectDB();

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Check if email is verified
//         if (!user.isVerified) {
//             return NextResponse.json({ message: "Please verify your email before logging in" }, { status: 403 });
//         }

//         // Compare provided password with stored hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Check if registration is approved
//         if (user.status !== "approved") {
//             return NextResponse.json({ message: "Registration pending approval" }, { status: 403 });
//         }

//         // Return success response with basic user info (excluding password)
//         return NextResponse.json({
//             message: "Login successful",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 image: user.image,
//             },
//         }, { status: 200 });
//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import jwt from "jsonwebtoken";

// export async function POST(request) {
//     try {
//         const { email, password } = await request.json();

//         await connectDB();

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Check if email is verified
//         if (!user.isVerified) {
//             return NextResponse.json({ message: "Please verify your email before logging in" }, { status: 403 });
//         }

//         // Compare provided password with stored hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
//         }

//         // Check if registration is approved
//         if (user.status !== "approved") {
//             return NextResponse.json({ message: "Registration pending approval" }, { status: 403 });
//         }

//         // Generate JWT
//         const tokenPayload = {
//             id: user._id.toString(),
//             email: user.email,
//             role: user.role || "teacher",
//         };
//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "fallback-secret", {
//             expiresIn: "1h", // Token expires in 1 hour
//         });

//         // Create response
//         const response = NextResponse.json({
//             message: "Login successful",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 image: user.image,
//             },
//         }, { status: 200 });

//         // Set JWT as HTTP-only cookie
//         response.cookies.set({
//             name: "auth_token",
//             value: token,
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // Secure in production
//             sameSite: "strict",
//             maxAge: 60 * 60, // 1 hour in seconds
//             path: "/",
//         });

//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import RegistrationRequest from "@/models/RegistrationRequest";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connectDB();

        // Find user by email in User collection
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        // Find registration request to check verification status
        const regRequest = await RegistrationRequest.findOne({ email });
        if (!regRequest) {
            return NextResponse.json({ message: "Registration request not found" }, { status: 404 });
        }

        // Check if email is verified
        if (!regRequest.isVerified) {
            return NextResponse.json({ message: "Please verify your email before logging in" }, { status: 403 });
        }

        // Compare provided password with stored hashed password from User
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        // Check if registration is approved in User
        if (!user.isApproved) {
            return NextResponse.json({ message: "Registration pending approval" }, { status: 403 });
        }

        // Generate JWT using User data
        const tokenPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role || "teacher",
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "fallback-secret", {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Create response
        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            },
        }, { status: 200 });

        // Set JWT as HTTP-only cookie
        response.cookies.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            maxAge: 60 * 60, // 1 hour in seconds
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}