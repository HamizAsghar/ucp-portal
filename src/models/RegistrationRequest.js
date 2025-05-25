import mongoose from "mongoose"

const RegistrationRequestSchema = new mongoose.Schema({
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
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.RegistrationRequest || mongoose.model("RegistrationRequest", RegistrationRequestSchema)
