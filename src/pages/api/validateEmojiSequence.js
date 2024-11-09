const bcrypt = require("bcrypt");
import dbConnect from "../../lib/dbConnect";
import Users from "../../models/Users";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, emojiSequence } = req.body;

  try {
    await dbConnect();

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { hashed_emoji_sequence, salt } = user;

    const isMatch = await bcrypt.compare(
      emojiSequence + salt,
      hashed_emoji_sequence
    );

    if (isMatch) {
      return res.status(200).json({ message: "Authentication successful" });
    } else {
      return res.status(401).json({ message: "Invalid emoji sequence" });
    }
  } catch (error) {
    console.error("Error validating emoji sequence:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
