import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import mongoose from "mongoose"
import Class from "@/models/ClassSchema"
import ClassSection from "@/models/ClassSection"

export async function PUT(request) {
    try {
        const { classId, program, semester, sections, subjects } = await request.json()

        // Validate input
        if (!classId || !program || !semester || !sections || !subjects) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        if (!["BSCS", "BBA", "ADP CS"].includes(program)) {
            return NextResponse.json({ message: "Invalid program" }, { status: 400 })
        }

        if (!Number.isInteger(Number(semester)) || semester < 1 || semester > 8) {
            return NextResponse.json({ message: "Invalid semester (must be 1-8)" }, { status: 400 })
        }

        if (
            !Array.isArray(sections) ||
            sections.length === 0 ||
            !sections.every((s) => ["A", "B", "C", "D", "E", "F"].includes(s))
        ) {
            return NextResponse.json(
                { message: "Sections must be non-empty and contain valid values (A-F)" },
                { status: 400 },
            )
        }

        if (!Array.isArray(subjects) || subjects.length === 0 || subjects.some((s) => !s.trim())) {
            return NextResponse.json({ message: "At least one valid subject is required" }, { status: 400 })
        }

        // Generate class name
        const className = `${program} ${semester} ${sections.sort().join("")}`

        await connectDB()

        // Start a transaction
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            // Check if class exists
            const existingClass = await Class.findById(classId).session(session)
            if (!existingClass) {
                await session.abortTransaction()
                return NextResponse.json({ message: "Class not found" }, { status: 404 })
            }

            // Check for duplicate class name (excluding current class)
            const duplicateClass = await Class.findOne({
                className,
                _id: { $ne: classId },
            }).session(session)

            if (duplicateClass) {
                await session.abortTransaction()
                return NextResponse.json({ message: `Class '${className}' already exists` }, { status: 400 })
            }

            // Update the main class document with new subjects
            await Class.findByIdAndUpdate(
                classId,
                {
                    program,
                    className,
                    semester,
                    sections,
                    subjects, // New subjects for the current semester
                    updatedAt: new Date(),
                },
                { session },
            )

            // Delete existing ClassSection documents for this class
            await ClassSection.deleteMany({ classId: classId.toString() }, { session })

            // Create new ClassSection documents for each section-subject pair
            const classSections = []
            for (const section of sections) {
                for (const subject of subjects) {
                    classSections.push({
                        semester: semester.toString(),
                        section,
                        classId: classId.toString(),
                        room: "TBD",
                        enrolledStudents: 0,
                        students: [],
                        program,
                        subject: subject.trim(),
                        assignedTeacher: null, // Reset teacher assignment
                        assignedAt: null,
                        createdAt: new Date(),
                    })
                }
            }

            await ClassSection.insertMany(classSections, { session })

            // Commit the transaction
            await session.commitTransaction()

            return NextResponse.json(
                {
                    message: "Class updated successfully with new semester subjects",
                    classId,
                    updatedSubjects: subjects.length,
                    updatedSections: classSections.length,
                },
                { status: 200 },
            )
        } catch (error) {
            // Rollback transaction on error
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    } catch (error) {
        console.error("Error updating class:", error)

        if (error.code === 11000) {
            return NextResponse.json(
                { message: "Duplicate key error. A class section with this configuration already exists." },
                { status: 400 },
            )
        }

        if (error.name === "ValidationError") {
            return NextResponse.json({ message: `Validation error: ${error.message}` }, { status: 400 })
        }

        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
    }
}
