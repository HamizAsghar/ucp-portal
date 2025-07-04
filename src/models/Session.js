import mongoose from "mongoose"

const ActivitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "teacher_assigned",
            "class_created",
            "student_enrolled",
            "teacher_approved",
            "class_deleted",
            "session_started",
            "session_ended",
        ],
    },
    description: {
        type: String,
        required: true,
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

const SessionSchema = new mongoose.Schema(
    {
        sessionType: {
            type: String,
            required: true,
            enum: ["Spring", "Fall"],
        },
        year: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        activities: [ActivitySchema],
        sessionData: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

// Compound index to prevent duplicate sessions
SessionSchema.index({ sessionType: 1, year: 1 }, { unique: true })

export default mongoose.models.Session || mongoose.model("Session", SessionSchema)
