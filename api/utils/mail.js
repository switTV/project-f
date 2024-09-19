import nodemailer from "nodemailer"
import dotenv from  "dotenv"

dotenv.config()

class Mail {
    constructor(from, to, subject, text){
        this.from = from,
        this.to = to,
        this.subject = subject,
        this.text = text
    }

    send(mail) {
        transporter.sendMail(mail)
    }
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})

export const sendVerificationMail = (mail, code) => {
    const verificationMail = new Mail(
        process.env.GMAIL_USER, // flora mail
        mail, // user mail
        "[Flora] Verification code", // subject
        `your verification code is ${code}` // text
    )

    return verificationMail.send(verificationMail)
}

export const sendMail = (mail, subject, text) => {
    const userMail = new Mail(
        process.env.GMAIL_USER, // flora mail
        mail, // user mail
        subject, // subject
        text // text
    )

    return userMail.send(userMail)
}