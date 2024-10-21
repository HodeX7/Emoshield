const dbConnect = require("../../lib/dbConnect");
const User = require("../../models/Users");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.query;

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      hashed_emoji_sequence: user.hashed_emoji_sequence,
      login_websites: user.login_websites,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
}
