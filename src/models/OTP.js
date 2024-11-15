const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
});

module.exports = mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
