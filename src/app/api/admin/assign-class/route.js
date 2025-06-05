// import { NextResponse } from "next/server"
// import connectDB from "@/lib/mongodb"
// import User from "@/models/User"
// import ClassSection from "@/models/ClassSection"
// import nodemailer from "nodemailer"

// // Email configuration
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// })

// export async function POST(request) {
//     try {
//         await connectDB()

//         const { teacherId, classId, subject, credentials } = await request.json()

//         if (!teacherId || !classId || !subject || !credentials) {
//             return NextResponse.json({ message: "All fields are required" }, { status: 400 })
//         }

//         // Find teacher
//         const teacher = await User.findById(teacherId)
//         if (!teacher) {
//             return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
//         }

//         // Find class section
//         const classSection = await ClassSection.findOne({ classId })
//         if (!classSection) {
//             return NextResponse.json({ message: "Class section not found" }, { status: 404 })
//         }

//         // Check if teacher is already assigned
//         if (teacher.assignedClass) {
//             return NextResponse.json({ message: "Teacher is already assigned to a class" }, { status: 400 })
//         }

//         // Update teacher with assignment
//         teacher.assignedClass = `${classSection.semester} Semester - Section ${classSection.section}`
//         teacher.subject = subject
//         teacher.classCredentials = credentials
//         await teacher.save()

//         // Update class section with teacher info
//         classSection.assignedTeacher = teacherId
//         classSection.subject = subject
//         await classSection.save()

//         // Send professional email to teacher
//         try {
//             const emailContent = `
//         <div style="max-width: 700px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 20px;">
//             <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
//                 <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🎓 UCP Portal</h1>
//                 <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">University of Central Punjab</p>
//             </div>
            
//             <div style="background-color: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
//                 <div style="text-align: center; margin-bottom: 30px;">
//                     <h2 style="color: #1a202c; margin: 0; font-size: 28px;">🎉 Class Assignment Notification</h2>
//                     <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 15px auto; border-radius: 2px;"></div>
//                 </div>
                
//                 <p style="color: #2d3748; font-size: 18px; margin-bottom: 25px;">Dear <strong>${teacher.name}</strong>,</p>
                
//                 <div style="background: linear-gradient(135deg, #e6fffa 0%, #f0fff4 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #38a169; margin: 25px 0;">
//                     <p style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px;">
//                         🎊 <strong>Congratulations!</strong> You have been successfully assigned to teach the following class:
//                     </p>
//                 </div>
                
//                 <div style="background-color: #f7fafc; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #e2e8f0;">
//                     <h3 style="color: #2b6cb0; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
//                         📚 Class Details
//                     </h3>
//                     <table style="width: 100%; border-collapse: collapse;">
//                         <tr>
//                             <td style="padding: 10px 0; color: #4a5568; font-weight: bold; width: 30%;">📖 Class:</td>
//                             <td style="padding: 10px 0; color: #2d3748;">${classSection.semester} Semester - Section ${classSection.section}</td>
//                         </tr>
//                         <tr>
//                             <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">📝 Subject:</td>
//                             <td style="padding: 10px 0; color: #2d3748;">${subject}</td>
//                         </tr>
//                         <tr>
//                             <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">🏫 Room:</td>
//                             <td style="padding: 10px 0; color: #2d3748;">Room ${classSection.room}</td>
//                         </tr>
//                         <tr>
//                             <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">👥 Students:</td>
//                             <td style="padding: 10px 0; color: #2d3748;">${classSection.enrolledStudents} enrolled</td>
//                         </tr>
//                     </table>
//                 </div>
                
//                 <div style="background: linear-gradient(135deg, #fef5e7 0%, #fefcf3 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #ed8936; margin: 25px 0;">
//                     <h3 style="color: #c05621; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
//                         🔐 Student Login Credentials
//                     </h3>
//                     <p style="color: #744210; margin: 0 0 15px 0;">Please share these credentials with your students for class access:</p>
//                     <div style="background-color: white; padding: 20px; border-radius: 8px; border: 2px dashed #ed8936;">
//                         <table style="width: 100%; border-collapse: collapse;">
//                             <tr>
//                                 <td style="padding: 8px 0; color: #744210; font-weight: bold; width: 30%;">👤 Username:</td>
//                                 <td style="padding: 8px 0; color: #2d3748; font-family: 'Courier New', monospace; background-color: #f7fafc; padding: 8px; border-radius: 4px;">${credentials.username}</td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 8px 0; color: #744210; font-weight: bold;">🔑 Password:</td>
//                                 <td style="padding: 8px 0; color: #2d3748; font-family: 'Courier New', monospace; background-color: #f7fafc; padding: 8px; border-radius: 4px;">${credentials.password}</td>
//                             </tr>
//                         </table>
//                     </div>
//                 </div>
                
//                 <div style="background: linear-gradient(135deg, #ebf8ff 0%, #f0f9ff 100%); padding: 20px; border-radius: 12px; border-left: 5px solid #3182ce; margin: 25px 0;">
//                     <p style="color: #2c5282; margin: 0; font-size: 14px;">
//                         💡 <strong>Note:</strong> Students will use their registered email along with these credentials to access the class portal.
//                     </p>
//                 </div>
                
//                 <div style="text-align: center; margin: 30px 0;">
//                     <p style="color: #4a5568; font-size: 16px; margin: 0;">
//                         We wish you all the best in your teaching journey! 🌟
//                     </p>
//                 </div>
                
//                 <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 30px 0;">
                
//                 <div style="text-align: center;">
//                     <p style="color: #718096; font-size: 14px; margin: 0;">
//                         Best regards,<br>
//                         <strong style="color: #2d3748;">Academic Administration Team</strong><br>
//                         University of Central Punjab
//                     </p>
//                     <p style="color: #a0aec0; font-size: 12px; margin: 15px 0 0 0;">
//                         © 2024 UCP Portal. All rights reserved.
//                     </p>
//                 </div>
//             </div>
//         </div>
//       `

//             await transporter.sendMail({
//                 from: process.env.EMAIL_USER,
//                 to: teacher.email,
//                 subject: "🎓 Class Assignment - Student Login Credentials | UCP Portal",
//                 html: emailContent,
//             })

//             return NextResponse.json(
//                 {
//                     message: "Class assigned successfully and email sent to teacher",
//                     assignment: {
//                         teacher: teacher.name,
//                         class: `${classSection.semester} Semester - Section ${classSection.section}`,
//                         subject,
//                         credentials,
//                     },
//                 },
//                 { status: 200 },
//             )
//         } catch (emailError) {
//             console.error("Email sending failed:", emailError)

//             return NextResponse.json(
//                 {
//                     message: "Class assigned successfully but email failed to send",
//                     assignment: {
//                         teacher: teacher.name,
//                         class: `${classSection.semester} Semester - Section ${classSection.section}`,
//                         subject,
//                         credentials,
//                     },
//                 },
//                 { status: 200 },
//             )
//         }
//     } catch (error) {
//         console.error("Error assigning class:", error)
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//     }
// }

import { NextResponse } from "next/server"
import mongoose from "mongoose"
import nodemailer from "nodemailer"

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
        const { teacherId, classId, subject, credentials } = await request.json()

        if (!teacherId || !classId || !subject || !credentials) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        console.log("🔄 Starting class assignment process...")
        console.log("Teacher ID:", teacherId)
        console.log("Class ID:", classId)
        console.log("Subject:", subject)
        console.log("Credentials:", credentials)

        // Connect to database
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

        // Find teacher
        const teacher = await User.findById(teacherId)
        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
        }
        console.log("✅ Teacher found:", teacher.name)

        // Find class section
        const classSection = await ClassSection.findOne({ classId })
        if (!classSection) {
            return NextResponse.json({ message: "Class section not found" }, { status: 404 })
        }
        console.log("✅ Class section found:", classSection.semester, "Semester - Section", classSection.section)

        // Check if teacher is already assigned
        if (teacher.assignedClass) {
            return NextResponse.json({ message: "Teacher is already assigned to a class" }, { status: 400 })
        }

        // Update teacher with assignment - FIXED: Using proper field updates
        const classDisplayName = `${classSection.semester} Semester - Section ${classSection.section}`

        const updatedTeacher = await User.findByIdAndUpdate(
            teacherId,
            {
                $set: {
                    assignedClass: classDisplayName,
                    subject: subject,
                    classCredentials: {
                        username: credentials.username,
                        password: credentials.password,
                    },
                    classId: classId,
                    assignedAt: new Date(),
                },
            },
            { new: true },
        )

        console.log("✅ Teacher updated with assignment:", updatedTeacher.assignedClass)

        // Update class section with teacher info
        const updatedClassSection = await ClassSection.findOneAndUpdate(
            { classId },
            {
                $set: {
                    assignedTeacher: teacherId,
                    subject: subject,
                    assignedAt: new Date(),
                },
            },
            { new: true },
        )

        console.log("✅ Class section updated with teacher assignment")

        // Send professional email to teacher
        try {
            const emailContent = `
        <div style="max-width: 700px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🎓 UCP Portal</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">University of Central Punjab</p>
            </div>
            
            <div style="background-color: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #1a202c; margin: 0; font-size: 28px;">🎉 Class Assignment Notification</h2>
                    <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 15px auto; border-radius: 2px;"></div>
                </div>
                
                <p style="color: #2d3748; font-size: 18px; margin-bottom: 25px;">Dear <strong>${teacher.name}</strong>,</p>
                
                <div style="background: linear-gradient(135deg, #e6fffa 0%, #f0fff4 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #38a169; margin: 25px 0;">
                    <p style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px;">
                        🎊 <strong>Congratulations!</strong> You have been successfully assigned to teach the following class:
                    </p>
                </div>
                
                <div style="background-color: #f7fafc; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #e2e8f0;">
                    <h3 style="color: #2b6cb0; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                        📚 Class Details
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #4a5568; font-weight: bold; width: 30%;">📖 Class:</td>
                            <td style="padding: 10px 0; color: #2d3748;">${classDisplayName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">📝 Subject:</td>
                            <td style="padding: 10px 0; color: #2d3748;">${subject}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">🏫 Room:</td>
                            <td style="padding: 10px 0; color: #2d3748;">Room ${classSection.room}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #4a5568; font-weight: bold;">👥 Students:</td>
                            <td style="padding: 10px 0; color: #2d3748;">${classSection.enrolledStudents} enrolled</td>
                        </tr>
                    </table>
                </div>
                
                <div style="background: linear-gradient(135deg, #fef5e7 0%, #fefcf3 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #ed8936; margin: 25px 0;">
                    <h3 style="color: #c05621; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                        🔐 Student Login Credentials
                    </h3>
                    <p style="color: #744210; margin: 0 0 15px 0;">Please share these credentials with your students for class access:</p>
                    <div style="background-color: white; padding: 20px; border-radius: 8px; border: 2px dashed #ed8936;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #744210; font-weight: bold; width: 30%;">👤 Username:</td>
                                <td style="padding: 8px 0; color: #2d3748; font-family: 'Courier New', monospace; background-color: #f7fafc; padding: 8px; border-radius: 4px;">${credentials.username}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #744210; font-weight: bold;">🔑 Password:</td>
                                <td style="padding: 8px 0; color: #2d3748; font-family: 'Courier New', monospace; background-color: #f7fafc; padding: 8px; border-radius: 4px;">${credentials.password}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #ebf8ff 0%, #f0f9ff 100%); padding: 20px; border-radius: 12px; border-left: 5px solid #3182ce; margin: 25px 0;">
                    <p style="color: #2c5282; margin: 0; font-size: 14px;">
                        💡 <strong>Note:</strong> Students will use their registered email along with these credentials to access the class portal.
                    </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #4a5568; font-size: 16px; margin: 0;">
                        We wish you all the best in your teaching journey! 🌟
                    </p>
                </div>
                
                <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 30px 0;">
                
                <div style="text-align: center;">
                    <p style="color: #718096; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #2d3748;">Academic Administration Team</strong><br>
                        University of Central Punjab
                    </p>
                    <p style="color: #a0aec0; font-size: 12px; margin: 15px 0 0 0;">
                        © 2024 UCP Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
      `

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: teacher.email,
                subject: "🎓 Class Assignment - Student Login Credentials | UCP Portal",
                html: emailContent,
            })

            console.log("✅ Email sent successfully to teacher")

            return NextResponse.json(
                {
                    message: "Class assigned successfully and email sent to teacher",
                    assignment: {
                        teacher: teacher.name,
                        class: classDisplayName,
                        subject,
                        credentials,
                    },
                },
                { status: 200 },
            )
        } catch (emailError) {
            console.error("❌ Email sending failed:", emailError)

            return NextResponse.json(
                {
                    message: "Class assigned successfully but email failed to send",
                    assignment: {
                        teacher: teacher.name,
                        class: classDisplayName,
                        subject,
                        credentials,
                    },
                },
                { status: 200 },
            )
        }
    } catch (error) {
        console.error("❌ Error assigning class:", error)
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
    }
}


