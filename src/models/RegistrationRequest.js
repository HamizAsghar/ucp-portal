<<<<<<< HEAD
// import mongoose from "mongoose"

// const RegistrationRequestSchema = new mongoose.Schema({
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
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending",
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// })

// export default mongoose.models.RegistrationRequest || mongoose.model("RegistrationRequest", RegistrationRequestSchema)

// import mongoose from "mongoose"

// const RegistrationRequestSchema = new mongoose.Schema({
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
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending",
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     verificationToken: {
//         type: String,
//         default: null,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// })

// export default mongoose.models.RegistrationRequest || mongoose.model("RegistrationRequest", RegistrationRequestSchema)

=======
>>>>>>> 80b69a8aef87a0fc8697f8b4f0e9b9241f3ac29e
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
<<<<<<< HEAD
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
    },
=======
>>>>>>> 80b69a8aef87a0fc8697f8b4f0e9b9241f3ac29e
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

<<<<<<< HEAD
export default mongoose.models.RegistrationRequest || mongoose.model("RegistrationRequest", RegistrationRequestSchema)
=======
export default mongoose.models.RegistrationRequest || mongoose.model("RegistrationRequest", RegistrationRequestSchema)
>>>>>>> 80b69a8aef87a0fc8697f8b4f0e9b9241f3ac29e
