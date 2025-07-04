// // // import { NextResponse } from "next/server"
// // // import mongoose from "mongoose"
// // // import Session from "@/models/Session"
// // // import User from "@/models/User"
// // // import Student from "@/models/Student"
// // // import Class from "@/models/ClassSchema"
// // // import ClassSection from "@/models/ClassSection"
// // // import RegistrationRequest from "@/models/RegistrationRequest"

// // // const MONGODB_URI = process.env.MONGODB_URI

// // // async function connectToDatabase() {
// // //     if (mongoose.connection.readyState >= 1) return mongoose.connection
// // //     await mongoose.connect(MONGODB_URI)
// // //     return mongoose.connection
// // // }

// // // export async function POST(request) {
// // //     try {
// // //         await connectToDatabase()

// // //         // Find active session
// // //         const activeSession = await Session.findOne({ isActive: true })
// // //         if (!activeSession) {
// // //             return NextResponse.json({ message: "No active session found" }, { status: 404 })
// // //         }

// // //         console.log("🔄 Collecting session data before clearing...")

// // //         // Collect all session data before clearing
// // //         const sessionData = {
// // //             sessionInfo: {
// // //                 sessionType: activeSession.sessionType,
// // //                 year: activeSession.year,
// // //                 startDate: activeSession.startDate,
// // //                 endDate: new Date(),
// // //             },
// // //             teachers: await User.find({ role: "teacher", isApproved: true }).lean(),
// // //             students: await Student.find({}).lean(),
// // //             classes: await Class.find({}).lean(),
// // //             classSections: await ClassSection.find({}).lean(),
// // //             activities: activeSession.activities || [],
// // //             statistics: {
// // //                 totalTeachers: await User.countDocuments({ role: "teacher", isApproved: true }),
// // //                 totalStudents: await Student.countDocuments({}),
// // //                 totalClasses: await Class.countDocuments({}),
// // //                 totalSections: await ClassSection.countDocuments({}),
// // //                 sessionDuration: Math.ceil((new Date() - new Date(activeSession.startDate)) / (1000 * 60 * 60 * 24)),
// // //             },
// // //         }

// // //         console.log("📊 Session data collected:", {
// // //             teachers: sessionData.teachers.length,
// // //             students: sessionData.students.length,
// // //             classes: sessionData.classes.length,
// // //             activities: sessionData.activities.length,
// // //         })

// // //         // Update session as ended
// // //         activeSession.isActive = false
// // //         activeSession.endDate = new Date()
// // //         activeSession.sessionData = sessionData
// // //         await activeSession.save()

// // //         console.log("🗑️ Starting database cleanup...")

// // //         // Clear all data from collections with proper error handling
// // //         const deleteResults = await Promise.allSettled([
// // //             User.deleteMany({ role: "teacher" }),
// // //             Student.deleteMany({}),
// // //             Class.deleteMany({}),
// // //             ClassSection.deleteMany({}),
// // //             RegistrationRequest.deleteMany({}),
// // //         ])

// // //         // Log delete results
// // //         deleteResults.forEach((result, index) => {
// // //             const collections = ["Teachers", "Students", "Classes", "ClassSections", "RegistrationRequests"]
// // //             if (result.status === "fulfilled") {
// // //                 console.log(`✅ ${collections[index]} deleted: ${result.value.deletedCount} records`)
// // //             } else {
// // //                 console.error(`❌ Error deleting ${collections[index]}:`, result.reason)
// // //             }
// // //         })

// // //         // Verify deletion
// // //         const remainingCounts = {
// // //             teachers: await User.countDocuments({ role: "teacher" }),
// // //             students: await Student.countDocuments({}),
// // //             classes: await Class.countDocuments({}),
// // //             sections: await ClassSection.countDocuments({}),
// // //             requests: await RegistrationRequest.countDocuments({}),
// // //         }

// // //         console.log("🔍 Remaining records after cleanup:", remainingCounts)

// // //         return NextResponse.json(
// // //             {
// // //                 message: "Session ended successfully and data cleared",
// // //                 sessionData,
// // //                 cleanupResults: remainingCounts,
// // //             },
// // //             { status: 200 },
// // //         )
// // //     } catch (error) {
// // //         console.error("❌ Error ending session:", error)
// // //         return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
// // //     }
// // // }





// // import { NextResponse } from "next/server"
// // import mongoose from "mongoose"
// // import Session from "@/models/Session"
// // import User from "@/models/User"
// // import Student from "@/models/Student"
// // import Class from "@/models/ClassSchema"
// // import ClassSection from "@/models/ClassSection"
// // import RegistrationRequest from "@/models/RegistrationRequest"

// // const MONGODB_URI = process.env.MONGODB_URI

// // async function connectToDatabase() {
// //     if (mongoose.connection.readyState >= 1) return mongoose.connection
// //     await mongoose.connect(MONGODB_URI)
// //     return mongoose.connection
// // }

// // export async function POST(request) {
// //     try {
// //         await connectToDatabase()

// //         // Find active session
// //         const activeSession = await Session.findOne({ isActive: true })
// //         if (!activeSession) {
// //             return NextResponse.json({ message: "No active session found" }, { status: 404 })
// //         }

// //         console.log("🔄 Starting session end process...")

// //         // Collect all session data before clearing
// //         const sessionData = {
// //             sessionInfo: {
// //                 sessionType: activeSession.sessionType,
// //                 year: activeSession.year,
// //                 startDate: activeSession.startDate,
// //                 endDate: new Date(),
// //             },
// //             teachers: await User.find({ role: "teacher", isApproved: true }).lean(),
// //             students: await Student.find({}).lean(),
// //             classes: await Class.find({}).lean(),
// //             classSections: await ClassSection.find({}).lean(),
// //             activities: activeSession.activities || [],
// //             statistics: {
// //                 totalTeachers: await User.countDocuments({ role: "teacher", isApproved: true }),
// //                 totalStudents: await Student.countDocuments({}),
// //                 totalClasses: await Class.countDocuments({}),
// //                 totalSections: await ClassSection.countDocuments({}),
// //                 sessionDuration: Math.ceil((new Date() - new Date(activeSession.startDate)) / (1000 * 60 * 60 * 24)),
// //             },
// //         }

// //         console.log("📊 Session data collected:", {
// //             teachers: sessionData.teachers.length,
// //             students: sessionData.students.length,
// //             classes: sessionData.classes.length,
// //             activities: sessionData.activities.length,
// //         })

// //         // Update session as ended
// //         activeSession.isActive = false
// //         activeSession.endDate = new Date()
// //         activeSession.sessionData = sessionData
// //         await activeSession.save()

// //         console.log("🔄 Starting data cleanup process...")

// //         // 1. Unassign all teachers from classes (clear classAssignments)
// //         console.log("👨‍🏫 Unassigning teachers from classes...")
// //         const teacherUpdateResult = await User.updateMany({ role: "teacher" }, { $set: { classAssignments: [] } })
// //         console.log(`✅ Teachers unassigned: ${teacherUpdateResult.modifiedCount}`)

// //         // 2. Clear student enrollments and increment semester
// //         console.log("🎓 Processing student enrollments and semester increment...")
// //         const students = await Student.find({})

// //         for (const student of students) {
// //             // Clear enrollments
// //             student.enrollments = []
// //             student.enrollmentCount = 0

// //             // Increment semester (1-8 cycle, then back to 1)
// //             const currentSemester = Number.parseInt(student.semester)
// //             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
// //             student.semester = newSemester.toString()

// //             await student.save()
// //             console.log(`📚 Student ${student.name}: Semester ${currentSemester} → ${newSemester}, Enrollments cleared`)
// //         }

// //         // 3. Clear class section assignments but keep the sections
// //         console.log("📋 Clearing class section assignments...")
// //         const classSectionUpdateResult = await ClassSection.updateMany(
// //             {},
// //             {
// //                 $set: {
// //                     assignedTeacher: null,
// //                     assignedAt: null,
// //                     students: [],
// //                     enrolledStudents: 0,
// //                 },
// //             },
// //         )
// //         console.log(`✅ Class sections cleared: ${classSectionUpdateResult.modifiedCount}`)

// //         // 4. Update class sections for semester increment
// //         console.log("🔄 Updating class sections for new semester...")
// //         const classSections = await ClassSection.find({})

// //         for (const section of classSections) {
// //             const currentSemester = Number.parseInt(section.semester)
// //             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
// //             section.semester = newSemester.toString()
// //             await section.save()
// //         }

// //         // 5. Update classes for semester increment
// //         console.log("📚 Updating classes for new semester...")
// //         const classes = await Class.find({})

// //         for (const classItem of classes) {
// //             const currentSemester = Number.parseInt(classItem.semester)
// //             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
// //             classItem.semester = newSemester

// //             // Update class name to reflect new semester
// //             const nameParts = classItem.className.split(" ")
// //             if (nameParts.length >= 2) {
// //                 nameParts[1] = newSemester.toString()
// //                 classItem.className = nameParts.join(" ")
// //             }

// //             await classItem.save()
// //         }

// //         // 6. Clear registration requests
// //         console.log("🗑️ Clearing registration requests...")
// //         const requestDeleteResult = await RegistrationRequest.deleteMany({})
// //         console.log(`✅ Registration requests deleted: ${requestDeleteResult.deletedCount}`)

// //         // Verify cleanup
// //         const remainingCounts = {
// //             teachersWithAssignments: await User.countDocuments({
// //                 role: "teacher",
// //                 classAssignments: { $exists: true, $ne: [] },
// //             }),
// //             studentsWithEnrollments: await Student.countDocuments({
// //                 enrollments: { $exists: true, $ne: [] },
// //             }),
// //             assignedSections: await ClassSection.countDocuments({
// //                 assignedTeacher: { $ne: null },
// //             }),
// //             totalStudents: await Student.countDocuments({}),
// //             totalTeachers: await User.countDocuments({ role: "teacher" }),
// //             totalClasses: await Class.countDocuments({}),
// //             totalSections: await ClassSection.countDocuments({}),
// //         }

// //         console.log("🔍 Cleanup verification:", remainingCounts)

// //         return NextResponse.json(
// //             {
// //                 message: "Session ended successfully! All students moved to next semester.",
// //                 sessionData,
// //                 cleanupResults: remainingCounts,
// //                 semesterIncremented: true,
// //             },
// //             { status: 200 },
// //         )
// //     } catch (error) {
// //         console.error("❌ Error ending session:", error)
// //         return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
// //     }
// // }


// import { NextResponse } from "next/server"
// import mongoose from "mongoose"
// import Session from "@/models/Session"
// import User from "@/models/User"
// import Student from "@/models/Student"
// import Class from "@/models/ClassSchema"
// import ClassSection from "@/models/ClassSection"
// import RegistrationRequest from "@/models/RegistrationRequest"

// const MONGODB_URI = process.env.MONGODB_URI

// async function connectToDatabase() {
//     if (mongoose.connection.readyState >= 1) return mongoose.connection
//     await mongoose.connect(MONGODB_URI)
//     return mongoose.connection
// }

// export async function POST(request) {
//     try {
//         await connectToDatabase()

//         // Find active session
//         const activeSession = await Session.findOne({ isActive: true })
//         if (!activeSession) {
//             return NextResponse.json({ message: "No active session found" }, { status: 404 })
//         }

//         console.log("🔄 Starting session end process...")

//         // Collect all session data before clearing
//         const sessionData = {
//             sessionInfo: {
//                 sessionType: activeSession.sessionType,
//                 year: activeSession.year,
//                 startDate: activeSession.startDate,
//                 endDate: new Date(),
//             },
//             teachers: await User.find({ role: "teacher", isApproved: true }).lean(),
//             students: await Student.find({}).lean(),
//             classes: await Class.find({}).lean(),
//             classSections: await ClassSection.find({}).lean(),
//             activities: activeSession.activities || [],
//             statistics: {
//                 totalTeachers: await User.countDocuments({ role: "teacher", isApproved: true }),
//                 totalStudents: await Student.countDocuments({}),
//                 totalClasses: await Class.countDocuments({}),
//                 totalSections: await ClassSection.countDocuments({}),
//                 sessionDuration: Math.ceil((new Date() - new Date(activeSession.startDate)) / (1000 * 60 * 60 * 24)),
//             },
//         }

//         console.log("📊 Session data collected:", {
//             teachers: sessionData.teachers.length,
//             students: sessionData.students.length,
//             classes: sessionData.classes.length,
//             activities: sessionData.activities.length,
//         })

//         // Update session as ended
//         activeSession.isActive = false
//         activeSession.endDate = new Date()
//         activeSession.sessionData = sessionData
//         await activeSession.save()

//         console.log("🔄 Starting data cleanup process...")

//         // 1. Unassign all teachers from classes (clear classAssignments)
//         console.log("👨‍🏫 Unassigning teachers from classes...")
//         const teacherUpdateResult = await User.updateMany({ role: "teacher" }, { $set: { classAssignments: [] } })
//         console.log(`✅ Teachers unassigned: ${teacherUpdateResult.modifiedCount}`)

//         // 2. Clear student enrollments and increment semester
//         console.log("🎓 Processing student enrollments and semester increment...")
//         const students = await Student.find({})

//         for (const student of students) {
//             // Clear enrollments
//             student.enrollments = []
//             student.enrollmentCount = 0

//             // Increment semester (1-8 cycle, then back to 1)
//             const currentSemester = Number.parseInt(student.semester)
//             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
//             student.semester = newSemester.toString()

//             await student.save()
//             console.log(`📚 Student ${student.name}: Semester ${currentSemester} → ${newSemester}, Enrollments cleared`)
//         }

//         // 3. Clear class section assignments but keep the sections
//         console.log("📋 Clearing class section assignments...")
//         const classSectionUpdateResult = await ClassSection.updateMany(
//             {},
//             {
//                 $set: {
//                     assignedTeacher: null,
//                     assignedAt: null,
//                     students: [],
//                     enrolledStudents: 0,
//                 },
//             },
//         )
//         console.log(`✅ Class sections cleared: ${classSectionUpdateResult.modifiedCount}`)

//         // 4. Update class sections for semester increment
//         console.log("🔄 Updating class sections for new semester...")
//         const classSections = await ClassSection.find({})

//         for (const section of classSections) {
//             const currentSemester = Number.parseInt(section.semester)
//             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
//             section.semester = newSemester.toString()
//             await section.save()
//         }

//         // 5. Update classes for semester increment
//         console.log("📚 Updating classes for new semester...")
//         const classes = await Class.find({})

//         for (const classItem of classes) {
//             const currentSemester = Number.parseInt(classItem.semester)
//             const newSemester = currentSemester >= 8 ? 1 : currentSemester + 1
//             classItem.semester = newSemester

//             // Update class name to reflect new semester
//             const nameParts = classItem.className.split(" ")
//             if (nameParts.length >= 2) {
//                 nameParts[1] = newSemester.toString()
//                 classItem.className = nameParts.join(" ")
//             }

//             await classItem.save()
//         }

//         // 6. Clear registration requests
//         console.log("🗑️ Clearing registration requests...")
//         const requestDeleteResult = await RegistrationRequest.deleteMany({})
//         console.log(`✅ Registration requests deleted: ${requestDeleteResult.deletedCount}`)

//         // Verify cleanup
//         const remainingCounts = {
//             teachersWithAssignments: await User.countDocuments({
//                 role: "teacher",
//                 classAssignments: { $exists: true, $ne: [] },
//             }),
//             studentsWithEnrollments: await Student.countDocuments({
//                 enrollments: { $exists: true, $ne: [] },
//             }),
//             assignedSections: await ClassSection.countDocuments({
//                 assignedTeacher: { $ne: null },
//             }),
//             totalStudents: await Student.countDocuments({}),
//             totalTeachers: await User.countDocuments({ role: "teacher" }),
//             totalClasses: await Class.countDocuments({}),
//             totalSections: await ClassSection.countDocuments({}),
//         }

//         console.log("🔍 Cleanup verification:", remainingCounts)

//         return NextResponse.json(
//             {
//                 message: "Session ended successfully! All students moved to next semester.",
//                 sessionData,
//                 cleanupResults: remainingCounts,
//                 semesterIncremented: true,
//             },
//             { status: 200 },
//         )
//     } catch (error) {
//         console.error("❌ Error ending session:", error)
//         return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
//     }
// }


import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Session from "@/models/Session"
import User from "@/models/User"
import Student from "@/models/Student"
import ClassSection from "@/models/ClassSection"
import Class from "@/models/ClassSchema"
import RegistrationRequest from "@/models/RegistrationRequest"
import mongoose from "mongoose"
import * as XLSX from "xlsx"

export async function POST(request) {
    try {
        await connectDB()

        // Check if there's an active session
        const activeSession = await Session.findOne({ isActive: true })
        if (!activeSession) {
            return NextResponse.json({ message: "No active session found" }, { status: 400 })
        }

        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            // 1. Collect all data for Excel report before clearing
            const [teachers, students, classes, classSections] = await Promise.all([
                User.find({ role: "teacher" }).lean(),
                Student.find({}).lean(),
                Class.find({}).lean(),
                ClassSection.find({}).lean(),
            ])

            // 2. Clear teacher class assignments
            await User.updateMany({ role: "teacher" }, { $set: { classAssignments: [] } }, { session })

            // 3. Process students - clear enrollments and increment semester
            const studentsToUpdate = await Student.find({}, null, { session })

            for (const student of studentsToUpdate) {
                let newSemester = Number.parseInt(student.semester)

                // Increment semester (1-8 cycle, after 8 goes to 1)
                if (newSemester >= 8) {
                    newSemester = 1
                } else {
                    newSemester += 1
                }

                await Student.findByIdAndUpdate(
                    student._id,
                    {
                        $set: {
                            enrollments: [],
                            enrollmentCount: 0,
                            semester: newSemester.toString(),
                        },
                    },
                    { session },
                )
            }

            // 4. Update ClassSections - clear assignments and increment semester
            const sectionsToUpdate = await ClassSection.find({}, null, { session })

            for (const classSection of sectionsToUpdate) {
                let newSemester = Number.parseInt(classSection.semester)

                // Increment semester (1-8 cycle)
                if (newSemester >= 8) {
                    newSemester = 1
                } else {
                    newSemester += 1
                }

                await ClassSection.findByIdAndUpdate(
                    classSection._id,
                    {
                        $set: {
                            assignedTeacher: null,
                            assignedAt: null,
                            students: [],
                            enrolledStudents: 0,
                            semester: newSemester.toString(),
                        },
                    },
                    { session },
                )
            }

            // 5. Update Classes - increment semester, update className, and CLEAR SUBJECTS
            const classesToUpdate = await Class.find({}, null, { session })

            for (const classItem of classesToUpdate) {
                let newSemester = Number.parseInt(classItem.semester)

                // Increment semester (1-8 cycle)
                if (newSemester >= 8) {
                    newSemester = 1
                } else {
                    newSemester += 1
                }

                // Update className to reflect new semester
                const newClassName = `${classItem.program} ${newSemester} ${classItem.sections.sort().join("")}`

                await Class.findByIdAndUpdate(
                    classItem._id,
                    {
                        $set: {
                            semester: newSemester,
                            className: newClassName,
                            subjects: [], // Clear subjects for new semester
                            updatedAt: new Date(),
                        },
                    },
                    { session },
                )
            }

            // 6. Clear old registration requests
            await RegistrationRequest.deleteMany({}, { session })

            // 7. End the session
            await Session.findByIdAndUpdate(
                activeSession._id,
                {
                    $set: {
                        isActive: false,
                        endDate: new Date(),
                        sessionData: {
                            teachers: teachers.length,
                            students: students.length,
                            classes: classes.length,
                            classSections: classSections.length,
                            endedAt: new Date(),
                            subjectsCleared: true, // Flag to indicate subjects were cleared
                        },
                    },
                },
                { session },
            )

            await session.commitTransaction()

            // 8. Generate Excel report
            const workbook = XLSX.utils.book_new()

            // Session Info Sheet
            const sessionInfo = [
                ["Session Information"],
                ["Session Type", activeSession.sessionType],
                ["Year", activeSession.year],
                ["Start Date", activeSession.startDate.toLocaleDateString()],
                ["End Date", new Date().toLocaleDateString()],
                ["Total Teachers", teachers.length],
                ["Total Students", students.length],
                ["Total Classes", classes.length],
                ["Total Class Sections", classSections.length],
                ["Subjects Cleared", "Yes - Ready for new semester subjects"],
            ]
            const sessionSheet = XLSX.utils.aoa_to_sheet(sessionInfo)
            XLSX.utils.book_append_sheet(workbook, sessionSheet, "Session Info")

            // Teachers Sheet
            const teacherData = [["Name", "Email", "Phone", "Role", "Approved", "Previous Class Assignments"]]
            teachers.forEach((teacher) => {
                teacherData.push([
                    teacher.name,
                    teacher.email,
                    teacher.phone,
                    teacher.role,
                    teacher.isApproved ? "Yes" : "No",
                    teacher.classAssignments?.length || 0,
                ])
            })
            const teacherSheet = XLSX.utils.aoa_to_sheet(teacherData)
            XLSX.utils.book_append_sheet(workbook, teacherSheet, "Teachers")

            // Students Sheet
            const studentData = [
                [
                    "Name",
                    "Email",
                    "Registration Number",
                    "Program",
                    "Previous Semester",
                    "New Semester",
                    "Section",
                    "Previous Enrollments",
                ],
            ]
            students.forEach((student) => {
                const prevSemester = Number.parseInt(student.semester)
                const newSemester = prevSemester >= 8 ? 1 : prevSemester + 1
                studentData.push([
                    student.name,
                    student.email,
                    student.registrationNumber,
                    student.program,
                    prevSemester,
                    newSemester,
                    student.section,
                    student.enrollmentCount || 0,
                ])
            })
            const studentSheet = XLSX.utils.aoa_to_sheet(studentData)
            XLSX.utils.book_append_sheet(workbook, studentSheet, "Students")

            // Classes Sheet
            const classData = [
                [
                    "Program",
                    "Previous Class Name",
                    "New Class Name",
                    "Previous Semester",
                    "New Semester",
                    "Sections",
                    "Previous Subjects",
                    "New Subjects Status",
                ],
            ]
            classes.forEach((cls) => {
                const prevSemester = Number.parseInt(cls.semester)
                const newSemester = prevSemester >= 8 ? 1 : prevSemester + 1
                const newClassName = `${cls.program} ${newSemester} ${cls.sections.sort().join("")}`
                classData.push([
                    cls.program,
                    cls.className,
                    newClassName,
                    prevSemester,
                    newSemester,
                    cls.sections.join(", "),
                    cls.subjects.join(", "),
                    "Cleared - Ready for new subjects",
                ])
            })
            const classSheet = XLSX.utils.aoa_to_sheet(classData)
            XLSX.utils.book_append_sheet(workbook, classSheet, "Classes")

            // Class Sections Sheet
            const sectionData = [
                [
                    "Class ID",
                    "Program",
                    "Previous Semester",
                    "New Semester",
                    "Section",
                    "Previous Subject",
                    "Room",
                    "Previous Enrolled Students",
                    "Had Teacher",
                    "Status",
                ],
            ]
            classSections.forEach((section) => {
                const prevSemester = Number.parseInt(section.semester)
                const newSemester = prevSemester >= 8 ? 1 : prevSemester + 1
                sectionData.push([
                    section.classId,
                    section.program,
                    prevSemester,
                    newSemester,
                    section.section,
                    section.subject || "N/A",
                    section.room,
                    section.enrolledStudents || 0,
                    section.assignedTeacher ? "Yes" : "No",
                    "Reset for new semester",
                ])
            })
            const sectionSheet = XLSX.utils.aoa_to_sheet(sectionData)
            XLSX.utils.book_append_sheet(workbook, sectionSheet, "Class Sections")

            // Activities Sheet
            const activityData = [["Type", "Description", "Timestamp", "Details"]]
            activeSession.activities?.forEach((activity) => {
                activityData.push([
                    activity.type,
                    activity.description,
                    activity.timestamp.toLocaleString(),
                    JSON.stringify(activity.details || {}),
                ])
            })
            const activitySheet = XLSX.utils.aoa_to_sheet(activityData)
            XLSX.utils.book_append_sheet(workbook, activitySheet, "Activities")

            // Convert to buffer
            const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })
            const base64Excel = excelBuffer.toString("base64")

            return NextResponse.json({
                message: "Session ended successfully - All subjects cleared for new semester",
                sessionData: {
                    sessionType: activeSession.sessionType,
                    year: activeSession.year,
                    startDate: activeSession.startDate,
                    endDate: new Date(),
                    teachersProcessed: teachers.length,
                    studentsProcessed: students.length,
                    classesProcessed: classes.length,
                    sectionsProcessed: classSections.length,
                    subjectsCleared: true,
                },
                excelReport: base64Excel,
            })
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    } catch (error) {
        console.error("Error ending session:", error)
        return NextResponse.json({ message: "Failed to end session", error: error.message }, { status: 500 })
    }
}
