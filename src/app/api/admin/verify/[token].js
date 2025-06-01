// pages/api/verify/[token]/route.js
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import RegistrationRequest from "@/models/RegistrationRequest"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { token } = params

  try {
    await connectDB()

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const user = await RegistrationRequest.findById(userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "User already verified" }, { status: 400 })
    }

    user.isVerified = true
    await user.save()

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/teacherlogin?verified=1`)
  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
  }
}
