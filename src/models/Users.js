const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  hashed_emoji_sequence: { type: String },
  salt: { type: String },
  login_websites: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
