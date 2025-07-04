// // import { NextResponse } from "next/server"
// // import mongoose from "mongoose"
// // import Session from "@/models/Session"

// // const MONGODB_URI = process.env.MONGODB_URI

// // async function connectToDatabase() {
// //     if (mongoose.connection.readyState >= 1) return mongoose.connection
// //     await mongoose.connect(MONGODB_URI)
// //     return mongoose.connection
// // }

// // export async function POST(request) {
// //     try {
// //         const { sessionType, year } = await request.json()

// //         if (!sessionType || !year) {
// //             return NextResponse.json({ message: "Session type and year are required" }, { status: 400 })
// //         }

// //         await connectToDatabase()

// //         // Check if there's already an active session
// //         const activeSession = await Session.findOne({ isActive: true })
// //         if (activeSession) {
// //             return NextResponse.json(
// //                 { message: "A session is already active. Please end the current session first." },
// //                 { status: 400 },
// //             )
// //         }

// //         // Create new session
// //         const newSession = new Session({
// //             sessionType,
// //             year,
// //             startDate: new Date(),
// //             isActive: true,
// //             activities: [],
// //         })

// //         await newSession.save()

// //         return NextResponse.json(
// //             {
// //                 message: "Session started successfully",
// //                 session: newSession,
// //             },
// //             { status: 200 },
// //         )
// //     } catch (error) {
// //         console.error("Error starting session:", error)
// //         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
// //     }
// // }





// import { NextResponse } from "next/server"
// import mongoose from "mongoose"
// import Session from "@/models/Session"

// const MONGODB_URI = process.env.MONGODB_URI

// async function connectToDatabase() {
//     if (mongoose.connection.readyState >= 1) return mongoose.connection
//     await mongoose.connect(MONGODB_URI)
//     return mongoose.connection
// }

// export async function POST(request) {
//     try {
//         await connectToDatabase()

//         const { sessionType, year } = await request.json()

//         if (!sessionType || !year) {
//             return NextResponse.json({ message: "Session type and year are required" }, { status: 400 })
//         }

//         // Check if there's already an active session
//         const activeSession = await Session.findOne({ isActive: true })
//         if (activeSession) {
//             return NextResponse.json({ message: "There is already an active session. Please end it first." }, { status: 400 })
//         }

//         // Check if this exact session already exists
//         const existingSession = await Session.findOne({
//             sessionType,
//             year,
//             isActive: false,
//         })

//         if (existingSession) {
//             return NextResponse.json(
//                 {
//                     message: `${sessionType} ${year} session already exists. Cannot create duplicate sessions.`,
//                 },
//                 { status: 400 },
//             )
//         }

//         // Create new session
//         const newSession = new Session({
//             sessionType,
//             year,
//             startDate: new Date(),
//             isActive: true,
//             activities: [
//                 {
//                     type: "session_started",
//                     description: `${sessionType} ${year} session started`,
//                     timestamp: new Date(),
//                 },
//             ],
//         })

//         await newSession.save()

//         return NextResponse.json(
//             {
//                 message: "Session started successfully",
//                 session: {
//                     id: newSession._id,
//                     sessionType: newSession.sessionType,
//                     year: newSession.year,
//                     startDate: newSession.startDate,
//                 },
//             },
//             { status: 201 },
//         )
//     } catch (error) {
//         console.error("Error starting session:", error)
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//     }
// }


import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Session from "@/models/Session"

const MONGODB_URI = process.env.MONGODB_URI

async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) return mongoose.connection
    await mongoose.connect(MONGODB_URI)
    return mongoose.connection
}

export async function POST(request) {
    try {
        await connectToDatabase()

        const { sessionType, year } = await request.json()

        if (!sessionType || !year) {
            return NextResponse.json({ message: "Session type and year are required" }, { status: 400 })
        }

        // Check if there's already an active session
        const activeSession = await Session.findOne({ isActive: true })
        if (activeSession) {
            return NextResponse.json({ message: "There is already an active session. Please end it first." }, { status: 400 })
        }

        // Check if this exact session already exists
        const existingSession = await Session.findOne({
            sessionType,
            year,
            isActive: false,
        })

        if (existingSession) {
            return NextResponse.json(
                {
                    message: `${sessionType} ${year} session already exists. Cannot create duplicate sessions.`,
                },
                { status: 400 },
            )
        }

        // Create new session
        const newSession = new Session({
            sessionType,
            year,
            startDate: new Date(),
            isActive: true,
            activities: [
                {
                    type: "session_started",
                    description: `${sessionType} ${year} session started`,
                    timestamp: new Date(),
                },
            ],
        })

        await newSession.save()

        return NextResponse.json(
            {
                message: "Session started successfully",
                session: {
                    id: newSession._id,
                    sessionType: newSession.sessionType,
                    year: newSession.year,
                    startDate: newSession.startDate,
                },
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Error starting session:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

