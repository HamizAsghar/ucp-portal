// // import { NextResponse } from "next/server"
// // import mongoose from "mongoose"
// // import Session from "@/models/Session"

// // const MONGODB_URI = process.env.MONGODB_URI

// // async function connectToDatabase() {
// //     if (mongoose.connection.readyState >= 1) return mongoose.connection
// //     await mongoose.connect(MONGODB_URI)
// //     return mongoose.connection
// // }

// // export async function DELETE(request) {
// //     try {
// //         const { sessionId } = await request.json()

// //         if (!sessionId) {
// //             return NextResponse.json({ message: "Session ID is required" }, { status: 400 })
// //         }

// //         await connectToDatabase()

// //         // Find and delete the session
// //         const deletedSession = await Session.findByIdAndDelete(sessionId)

// //         if (!deletedSession) {
// //             return NextResponse.json({ message: "Session not found" }, { status: 404 })
// //         }

// //         return NextResponse.json(
// //             {
// //                 message: "Session deleted successfully",
// //             },
// //             { status: 200 },
// //         )
// //     } catch (error) {
// //         console.error("Error deleting session:", error)
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

// export async function DELETE(request) {
//     try {
//         await connectToDatabase()

//         const { sessionId } = await request.json()

//         if (!sessionId) {
//             return NextResponse.json({ message: "Session ID is required" }, { status: 400 })
//         }

//         // Find and delete the session
//         const deletedSession = await Session.findByIdAndDelete(sessionId)

//         if (!deletedSession) {
//             return NextResponse.json({ message: "Session not found" }, { status: 404 })
//         }

//         return NextResponse.json({ message: "Session deleted successfully" }, { status: 200 })
//     } catch (error) {
//         console.error("Error deleting session:", error)
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

export async function DELETE(request) {
    try {
        await connectToDatabase()

        const { sessionId } = await request.json()

        if (!sessionId) {
            return NextResponse.json({ message: "Session ID is required" }, { status: 400 })
        }

        // Find and delete the session
        const deletedSession = await Session.findByIdAndDelete(sessionId)

        if (!deletedSession) {
            return NextResponse.json({ message: "Session not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Session deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting session:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
