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

// //         const sessions = await Session.find({ isActive: false }).sort({ endDate: -1 }).lean()

// //         return NextResponse.json({ sessions }, { status: 200 })
// //     } catch (error) {
// //         console.error("Error fetching session history:", error)
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

//         const sessions = await Session.find({ isActive: false }).sort({ endDate: -1 }).limit(10).lean()

//         return NextResponse.json({
//             sessions: sessions || [],
//         })
//     } catch (error) {
//         console.error("Error fetching session history:", error)
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

        const sessions = await Session.find({ isActive: false }).sort({ endDate: -1 }).limit(10).lean()

        return NextResponse.json({
            sessions: sessions || [],
        })
    } catch (error) {
        console.error("Error fetching session history:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
