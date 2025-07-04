// // import { NextResponse } from "next/server"
// // import mongoose from "mongoose"
// // import Session from "@/models/Session"

// // const MONGODB_URI = process.env.MONGODB_URI

// // async function connectToDatabase() {
// //     if (mongoose.connection.readyState >= 1) return mongoose.connection
// //     await mongoose.connect(MONGODB_URI)
// //     return mongoose.connection
// // }

// // export async function GET() {
// //     try {
// //         await connectToDatabase()

// //         const activeSession = await Session.findOne({ isActive: true })

// //         return NextResponse.json(
// //             {
// //                 hasActiveSession: !!activeSession,
// //                 session: activeSession,
// //             },
// //             { status: 200 },
// //         )
// //     } catch (error) {
// //         console.error("Error checking session status:", error)
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

// export async function GET() {
//     try {
//         await connectToDatabase()

//         const activeSession = await Session.findOne({ isActive: true })

//         if (activeSession) {
//             return NextResponse.json({
//                 hasActiveSession: true,
//                 session: {
//                     id: activeSession._id,
//                     sessionType: activeSession.sessionType,
//                     year: activeSession.year,
//                     startDate: activeSession.startDate,
//                 },
//             })
//         } else {
//             return NextResponse.json({
//                 hasActiveSession: false,
//                 session: null,
//             })
//         }
//     } catch (error) {
//         console.error("Error checking session status:", error)
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

export async function GET() {
    try {
        await connectToDatabase()

        const activeSession = await Session.findOne({ isActive: true })

        if (activeSession) {
            return NextResponse.json({
                hasActiveSession: true,
                session: {
                    id: activeSession._id,
                    sessionType: activeSession.sessionType,
                    year: activeSession.year,
                    startDate: activeSession.startDate,
                },
            })
        } else {
            return NextResponse.json({
                hasActiveSession: false,
                session: null,
            })
        }
    } catch (error) {
        console.error("Error checking session status:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
