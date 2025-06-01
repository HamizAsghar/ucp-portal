import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import RegistrationRequest from "@/models/RegistrationRequest";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            console.error("No token provided in request");
            return NextResponse.json({ message: "Invalid or missing token" }, { status: 400 });
        }

        await connectDB();

        // Verify JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decoded);
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        const { email } = decoded;

        // Find user by email
        const user = await RegistrationRequest.findOne({ email });
        if (!user) {
            console.error("User not found for email:", email);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check if already verified
        if (user.isVerified) {
            console.log("User already verified:", email);
            return NextResponse.redirect(new URL("/teacherlogin?message=Email already verified", process.env.NEXT_PUBLIC_BASE_URL));
        }

        // Check if token matches
        if (user.verificationToken !== token) {
            console.error("Token mismatch for user:", email, "Stored token:", user.verificationToken);
            return NextResponse.json({ message: "Invalid verification link" }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        console.log("User verified successfully:", email);

        // Redirect to login page with success message
        return NextResponse.redirect(new URL("/teacherlogin?message=Email verified successfully", process.env.NEXT_PUBLIC_BASE_URL));
    } catch (error) {
        console.error("Verification error:", error.message, error.stack);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}