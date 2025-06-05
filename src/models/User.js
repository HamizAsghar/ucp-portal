// import mongoose from "mongoose"

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         default: null,
//     },
//     role: {
//         type: String,
//         enum: ["teacher", "student", "admin"],
//         default: "teacher",
//     },
//     isApproved: {
//         type: Boolean,
//         default: false,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// })

// export default mongoose.models.User || mongoose.model("User", UserSchema)









import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ["teacher", "admin"],
            default: "teacher",
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        // Class assignment fields
        assignedClass: {
            type: String,
            default: null,
        },
        subject: {
            type: String,
            default: null,
        },
        classId: {
            type: String,
            default: null,
        },
        classCredentials: {
            username: {
                type: String,
                default: null,
            },
            password: {
                type: String,
                default: null,
            },
        },
        assignedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
