const mongoose = require("mongoose");

const ClaimHistorySchema = new mongoose.Schema({
  couponCode: { type: String, required: true },
  userIP: { type: String, required: true },
  sessionID: { type: String, required: true },
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClaimHistory", ClaimHistorySchema);
