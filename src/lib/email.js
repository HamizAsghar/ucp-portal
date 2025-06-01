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
                user: "ucpedua@gmail.com",
                pass: "ywxk djgl cgch ivmq",
            },
        })

        console.log("📧 Transporter created successfully")

        const mailOptions = {
            from: "ucpedua@gmail.com",
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
