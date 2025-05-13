import nodemailer from "nodemailer";
import { verifyEmailTemplate } from "./emailtemplates.js";

export const sendEmail = async (name , email , link , subject , msg) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });


  const info = await transporter.sendMail({
    from: `${process.env.SMTP_SENDNAME} 👻" <${process.env.SMTP_USER}>`, // sender address
    to: email || "emailstormfacts@gmail.com", // list of receivers
    subject: subject || "Hello ✔", // Subject line
    html: verifyEmailTemplate(name || "Haider" , link || "http://localhost:5000/" , msg), // html body
  });
}