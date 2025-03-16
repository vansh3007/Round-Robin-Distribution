const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Coupon = require("../models/Coupon");
const ClaimHistory = require("../models/ClaimHistory");

const JWT_SECRET = process.env.JWT_SECRET;

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email!=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: "admin" }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Fetch all coupons
router.get("/coupons", async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

// Add a coupon
router.post("/coupons", async (req, res) => {
  const { code } = req.body;
  await new Coupon({ code }).save();
  res.json({ message: "Coupon added!" });
});
router.get("/coupons/claimed", async (req, res) => {
  const coupons = await ClaimHistory.find();
  res.json(coupons);
});

router.delete("/coupons/:id", async (req, res) => {
  const { id } = req.params;
  await Coupon.findByIdAndDelete(id);
  res.json({ message: "Coupon deleted!" });
});

module.exports = router;
