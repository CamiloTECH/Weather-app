import nodemailer from "nodemailer"

export const sendEmail = async (email:string, token:number, userName:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.KEY,
    },
    from: process.env.EMAIL,
  })
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Weather App ",
    text: `Hello ${userName}: You have requested to reset your password.`,
    html: `  <p>Follow the next link to generate your new password:
             <a rel="noopener noreferrer" target="_blank" href="http://localhost:3000/home/forgotPassword/${token}">http://localhost:3000/home/forgotPassword/${token}</a></p>
             <p>If you didn't request this, ignore this message</p>`,
  })
}