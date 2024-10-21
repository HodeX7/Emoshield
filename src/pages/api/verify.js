const dbConnect = require("../../lib/dbConnect");
const OTP = require("../../models/OTP");
const User = require("../../models/Users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  try {
    await dbConnect();

    const record = await OTP.findOne({ email, otp });

    if (record) {
      await OTP.deleteOne({ _id: record._id });

      let user = await User.findOne({ email });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashed_emoji_sequence = await bcrypt.hash("", salt);
        user = new User({
          userid: crypto.randomBytes(16).toString("hex"),
          email,
          hashed_emoji_sequence,
          salt,
          login_websites: [],
        });
        await user.save();
      }

      return res.status(200).json({ message: "OTP verified successfully" });
    }

    res.status(400).json({ message: "Invalid or expired OTP" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
}
