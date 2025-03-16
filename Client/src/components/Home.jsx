import { useState } from "react";
import axios from "axios";
import "../styles/home.css";

export default function Home() {
  const [message, setMessage] = useState("");
const [coupon, setCoupon] = useState("");
  const claimCoupon = async () => {
    try {
      const res = await axios.get("https://round-robin-distribution.onrender.com/api/coupons/claim");
      setMessage(res.data.message);
      setCoupon(res.data.coupon);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div id="homepage">
      <a href="/admin" style={{ position: "absolute", top: 30, right: 30 }}>
        Go to Admin Dashboard <i className="fa-solid fa-right-long admin-icon"></i>
      </a>
      <div className="home-container">
        <p className="title">Round-Robin Distribution System</p>
        <h1>Claim Your Coupon</h1>
        <div className="coupon-wrapper">
          <button className="claim-button" onClick={claimCoupon}>
            Claim Coupon
          </button>
        </div>

        {message && <p className="message success">{message}</p>}
        {coupon && <label className="coupon-label">Coupon: {coupon}</label>}
      </div>
    </div>
  );
}
