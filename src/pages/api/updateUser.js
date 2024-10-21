const dbConnect = require("../../lib/dbConnect");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, emojiSequence } = req.body;

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedEmojiSequence = await bcrypt.hash(
      emojiSequence + user.salt,
      user.salt
    );

    user.hashed_emoji_sequence = hashedEmojiSequence;
    user.updated_at = new Date();

    if (!user.login_websites.includes("Emoshield")) {
      user.login_websites.push("Emoshield");
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
}
