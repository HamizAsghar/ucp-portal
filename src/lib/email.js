import nodemailer from "nodemailer"

export async function sendEmail({ to, subject, html }) {
    try {
        console.log("📧 Creating email transporter...")

        // Fixed: createTransport instead of createTransporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "hamizasghar@gmail.com",
                pass: "hfra fdvu qpgp veom",
            },
        })

        console.log("📧 Transporter created successfully")

        const mailOptions = {
            from: "hamizasghar@gmail.com",
            to,
            subject,
            html,
        }

        console.log("📧 Sending email to:", to)
        const result = await transporter.sendMail(mailOptions)
        console.log("✅ Email sent successfully:", result.messageId)

        return true
    } catch (error) {
        console.error("❌ Error sending email:", error)
        throw error
    }
}
