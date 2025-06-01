import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
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
    classId: {
        type: String,
        required: true,
    },
    room: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: "student",
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Student || mongoose.model("Student", StudentSchema)
