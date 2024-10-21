const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dbConnect = require("../../lib/dbConnect");
const OTP = require("../../models/OTP");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aksharotp@gmail.com",
    pass: "igip xvgz dcia vmoo ",
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999);

  try {
    await dbConnect();

    await OTP.create({ email, otp });

    await transporter.sendMail({
      from: "aksharotp@gmail.com",
      to: email,
      subject: "Your One-Time Password (OTP) Code",
      html: `
              <p>Dear User,</p>
              <p>We have received a request for an OTP to verify your identity. Please use the following One-Time Password (OTP) to proceed:</p>
              <h2>${otp}</h2>
              <p>Please note that this OTP is valid for a limited time and can only be used once. For security purposes, do not share this code with anyone.</p>
              <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
              <br />
              <p>Thank you,</p>
              <p>Akshar Mehta</p>
              <p>Support Team @ EmoShield</p>
              <p><i>This is an automated email, please do not reply to this message.</i></p>
            `,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
}
