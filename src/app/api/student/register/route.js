// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import { connectDB } from "@/lib/mongodb"
// import StudentRequest from "@/models/StudentRequest"

// export async function POST(request) {
//     try {
//         const { name, email, phone, registrationNumber, password, semester, section, image } = await request.json()

//         await connectDB()

//         // Check if student already exists
//         const existingRequest = await StudentRequest.findOne({
//             $or: [{ email }, { registrationNumber }],
//         })

//         if (existingRequest) {
//             return NextResponse.json(
//                 { message: "Student with this email or registration number already exists" },
//                 { status: 400 },
//             )
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 12)

//         // Create student request
//         const studentRequest = new StudentRequest({
//             name,
//             email,
//             phone,
//             password: hashedPassword,
//             semester,
//             section,
//             registrationNumber,
//             image,
//             status: "pending",
//             createdAt: new Date(),
//         })

//         await studentRequest.save()

//         return NextResponse.json(
//             {
//                 message: "Student registration request submitted successfully",
//                 registrationNumber,
//             },
//             { status: 201 },
//         )
//     } catch (error) {
//         console.error("Student registration error:", error)
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//     }
// }





import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import ClassSection from "@/models/ClassSection";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, phone, registrationNumber, semester, section, image } =
            await request.json();

        if (
            !name ||
            !email ||
            !phone ||
            !registrationNumber ||
            !semester ||
            !section
        ) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return NextResponse.json(
                { message: "Student with this email already exists" },
                { status: 400 }
            );
        }

        const existingRegNumber = await Student.findOne({ registrationNumber });
        if (existingRegNumber) {
            return NextResponse.json(
                { message: "Registration number already exists" },
                { status: 400 }
            );
        }

        let classSection = await ClassSection.findOne({ semester, section });

        if (!classSection) {
            const classId = `${semester}_${section}_${Date.now()}`;
            const room = Math.floor(Math.random() * 100) + 1;

            classSection = new ClassSection({
                semester,
                section,
                classId,
                room,
                enrolledStudents: 0,
                students: [],
            });
            await classSection.save();
        }

        const defaultPassword = `${registrationNumber.slice(-4)}@${semester}`;
        const hashedPassword = await bcrypt.hash(defaultPassword, 12);

        const newStudent = new Student({
            name,
            email,
            phone,
            password: hashedPassword,
            semester,
            section,
            registrationNumber,
            classId: classSection.classId,
            room: classSection.room,
            image,
            role: "student",
            isApproved: true,
        });

        await newStudent.save();

        classSection.students.push(newStudent._id);
        classSection.enrolledStudents = classSection.students.length;
        await classSection.save();

        return NextResponse.json(
            {
                message:
                    "Student registered successfully and added to class section",
                student: {
                    id: newStudent._id,
                    name: newStudent.name,
                    email: newStudent.email,
                    semester: newStudent.semester,
                    section: newStudent.section,
                    classId: newStudent.classId,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Student registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

