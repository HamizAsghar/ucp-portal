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
// //         const { activity } = await request.json()

// //         await connectToDatabase()

// //         const activeSession = await Session.findOne({ isActive: true })
// //         if (!activeSession) {
// //             return NextResponse.json({ message: "No active session" }, { status: 404 })
// //         }

// //         activeSession.activities.push({
// //             ...activity,
// //             timestamp: new Date(),
// //         })

// //         await activeSession.save()

// //         return NextResponse.json({ message: "Activity logged" }, { status: 200 })
// //     } catch (error) {
// //         console.error("Error logging activity:", error)
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

//         const { type, description, details } = await request.json()

//         if (!type || !description) {
//             return NextResponse.json({ message: "Type and description are required" }, { status: 400 })
//         }

//         const activeSession = await Session.findOne({ isActive: true })

//         if (!activeSession) {
//             return NextResponse.json({ message: "No active session found" }, { status: 404 })
//         }

//         activeSession.activities.push({
//             type,
//             description,
//             details: details || {},
//             timestamp: new Date(),
//         })

//         await activeSession.save()

//         return NextResponse.json({ message: "Activity logged successfully" }, { status: 200 })
//     } catch (error) {
//         console.error("Error logging activity:", error)
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

        const { type, description, details } = await request.json()

        if (!type || !description) {
            return NextResponse.json({ message: "Type and description are required" }, { status: 400 })
        }

        const activeSession = await Session.findOne({ isActive: true })

        if (!activeSession) {
            return NextResponse.json({ message: "No active session found" }, { status: 404 })
        }

        activeSession.activities.push({
            type,
            description,
            details: details || {},
            timestamp: new Date(),
        })

        await activeSession.save()

        return NextResponse.json({ message: "Activity logged successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error logging activity:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
