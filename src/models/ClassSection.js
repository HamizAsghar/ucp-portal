// import mongoose from "mongoose"

// const ClassSectionSchema = new mongoose.Schema({
//     semester: {
//         type: String,
//         required: true,
//     },
//     section: {
//         type: String,
//         required: true,
//     },
//     classId: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     room: {
//         type: Number,
//         required: true,
//     },
//     enrolledStudents: {
//         type: Number,
//         default: 0,
//     },
//     students: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Student",
//         },
//     ],
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// })

// // Create compound index for semester and section
// ClassSectionSchema.index({ semester: 1, section: 1 }, { unique: true })

// export default mongoose.models.ClassSection || mongoose.model("ClassSection", ClassSectionSchema)




import mongoose from "mongoose"

const ClassSectionSchema = new mongoose.Schema(
    {
        semester: {
            type: String,
            required: true,
        },
        section: {
            type: String,
            required: true,
        },
        classId: {
            type: String,
            required: true,
            unique: true,
        },
        room: {
            type: String,
            required: true,
        },
        enrolledStudents: {
            type: Number,
            default: 0,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        // Teacher assignment fields
        assignedTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        subject: {
            type: String,
            default: null,
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

export default mongoose.models.ClassSection || mongoose.model("ClassSection", ClassSectionSchema)
