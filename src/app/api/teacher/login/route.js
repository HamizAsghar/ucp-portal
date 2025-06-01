// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import RegistrationRequest from "@/models/RegistrationRequest";

// export async function POST(request) {
//     try {
//         const { email, password } = await request.json();

//         await connectDB();

//         // Find user by email
//         const user = await RegistrationRequest.findOne({ email });
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

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import RegistrationRequest from "@/models/RegistrationRequest";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connectDB();

        // Find user by email
        const user = await RegistrationRequest.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return NextResponse.json({ message: "Please verify your email before logging in" }, { status: 403 });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        // Check if registration is approved
        if (user.status !== "approved") {
            return NextResponse.json({ message: "Registration pending approval" }, { status: 403 });
        }

        // Return success response with basic user info (excluding password)
        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}