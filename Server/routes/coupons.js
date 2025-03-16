const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const ClaimHistory = require("../models/ClaimHistory");

const cooldownTime = 60 * 1000; // 1-minute cooldown
const claimHistoryCache = new Map(); // Store IP/session claims temporarily

router.get("/claim", async (req, res) => {
  const ip = req.ip;
  const sessionID = req.headers["user-agent"] || "unknown"; // Use User-Agent as a basic session identifier

  // Check cooldown
  if (
    claimHistoryCache.has(ip) &&
    Date.now() - claimHistoryCache.get(ip) < cooldownTime
  ) {
    return res.status(429).json({ message: "Wait before claiming again!" });
  }

  // Find an unclaimed coupon
  const coupon = await Coupon.findOne({ isClaimed: false });

  if (!coupon) return res.status(400).json({ message: "No coupons left!" });

  // Mark coupon as claimed
  coupon.isClaimed = true;
  coupon.claimedBy = ip;
  await coupon.save();

  // Save claim history in the database
  await new ClaimHistory({
    couponCode: coupon.code,
    userIP: ip,
    sessionID: sessionID,
  }).save();

  // Update cooldown
  claimHistoryCache.set(ip, Date.now());

  res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
});

module.exports = router;
