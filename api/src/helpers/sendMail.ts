import nodemailer from "nodemailer"

export const sendEmail = async (email:string, token:string, userName:string) => {
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
    from: `"Weather App"   <${process.env.EMAIL}>`,
    to: email,
    subject: "Forgot password 🌤️",
    html: ` 
            <img src="https://images.squarespace-cdn.com/content/v1/5572b7b4e4b0a20071d407d4/1487090874274-FH2ZNWOTRU90UAF5TA2B/Weather+Targeting" style="width: 100px;"/>
            <h3>Hello ${userName}: You have requested to reset your password.</h3>
            <p>Follow the next link to generate your new password:
            <a rel="noopener noreferrer" target="_blank" href="http://localhost:3000/${token}">Change Password</a></p>
            <p><strong>If you didn't request this, ignore this message</strong></p>`,
  })
}