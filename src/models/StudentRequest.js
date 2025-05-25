import mongoose from "mongoose"

const StudentRequestSchema = new mongoose.Schema({
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
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    rejectionReason: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.StudentRequest || mongoose.model("StudentRequest", StudentRequestSchema)
