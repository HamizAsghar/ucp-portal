import { NextResponse } from "next/server"
import mongoose from "mongoose"

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
}

// Connect to MongoDB
async function connectToDatabase() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection
        }

        console.log("🔄 Connecting to MongoDB...")
        await mongoose.connect(MONGODB_URI)
        console.log("✅ MongoDB connected successfully")
        return mongoose.connection
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        throw error
    }
}

export async function GET(request) {
    try {
        console.log("🔄 Starting assigned classes fetch...")

        // Connect to database directly
        await connectToDatabase()
        console.log("✅ Database connected")

        // Import models after database connection
        const User =
            mongoose.models.User ||
            mongoose.model(
                "User",
                new mongoose.Schema({
                    name: String,
                    email: String,
                    phone: String,
                    role: String,
                    isApproved: Boolean,
                    assignedClass: String,
                    subject: String,
                    classId: String,
                    classCredentials: {
                        username: String,
                        password: String,
                    },
                    assignedAt: Date,
                    createdAt: Date,
                    updatedAt: Date,
                }),
            )

        const ClassSection =
            mongoose.models.ClassSection ||
            mongoose.model(
                "ClassSection",
                new mongoose.Schema({
                    semester: String,
                    section: String,
                    classId: String,
                    room: String,
                    enrolledStudents: Number,
                    students: [mongoose.Schema.Types.ObjectId],
                    assignedTeacher: mongoose.Schema.Types.ObjectId,
                    subject: String,
                    assignedAt: Date,
                    createdAt: Date,
                    updatedAt: Date,
                }),
            )

        console.log("✅ Models imported")

        // Get all teachers with assigned classes
        const assignedTeachers = await User.find({
            role: "teacher",
            isApproved: true,
            assignedClass: { $exists: true, $ne: null, $ne: "" },
        })
            .sort({ assignedAt: -1 })
            .lean()

        console.log("📊 Found assigned teachers:", assignedTeachers.length)
        console.log("📊 Sample teacher data:", assignedTeachers[0] || "No teachers found")

        // Get class sections for additional details
        const assignedClassesWithDetails = []

        for (const teacher of assignedTeachers) {
            try {
                let classSection = null

                if (teacher.classId) {
                    classSection = await ClassSection.findOne({ classId: teacher.classId }).lean()
                    console.log(`📚 Class section for ${teacher.name}:`, classSection ? "Found" : "Not found")
                }

                const assignmentData = {
                    teacherId: teacher._id,
                    teacherName: teacher.name,
                    teacherEmail: teacher.email,
                    assignedClass: teacher.assignedClass,
                    subject: teacher.subject,
                    classCredentials: teacher.classCredentials,
                    assignedAt: teacher.assignedAt || teacher.createdAt,
                    classDetails: classSection
                        ? {
                            semester: classSection.semester,
                            section: classSection.section,
                            room: classSection.room,
                            enrolledStudents: classSection.enrolledStudents,
                            classId: classSection.classId,
                        }
                        : null,
                }

                assignedClassesWithDetails.push(assignmentData)
            } catch (innerError) {
                console.error(`❌ Error processing teacher ${teacher.name}:`, innerError)
                // Continue with other teachers even if one fails
            }
        }

        console.log("✅ Returning assigned classes:", assignedClassesWithDetails.length)

        return NextResponse.json(
            {
                success: true,
                assignedClasses: assignedClassesWithDetails,
                count: assignedClassesWithDetails.length,
                debug: {
                    totalTeachers: assignedTeachers.length,
                    processedAssignments: assignedClassesWithDetails.length,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("❌ Error fetching assigned classes:", error)
        console.error("❌ Error stack:", error.stack)

        return NextResponse.json(
            {
                message: "Internal server error",
                error: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            },
            { status: 500 },
        )
    }
}
