import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/coupons");
    const claimed = await axios.get(
      "http://localhost:5000/api/admin//coupons/claimed"
    );
    setCoupons(res.data);
    setClaimedCoupons(claimed.data);
    console.log(res.data);
    console.log(claimed.data);
  };

  const addCoupon = async () => {
    if (!newCoupon) return;
    await axios.post("http://localhost:5000/api/admin/coupons", {
      code: newCoupon,
    });
    setNewCoupon("");
    fetchCoupons();
  };

  const deleteCoupon = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/coupons/${id}`);
    fetchCoupons();
  };

  return (
    <div id="homepage">
      <div className="home-container">
        <a href="/" style={{ position: "absolute", top: 30, left: 30 }}>
          <i className="fa-solid fa-left-long admin-icon"></i> Back to User
          Dashboard
        </a>
        <div className="admin-dashboard">
          <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
          <div className="addCouponContainer">
            <input
              type="text"
              placeholder="New Coupon Code"
              value={newCoupon}
              onChange={(e) => setNewCoupon(e.target.value)}
            />
            <button onClick={addCoupon}>Add Coupon</button>
          </div>

          <h3>Available Coupons</h3>
          {coupons.map((coupon) => (
            <div className="couponBox" key={coupon._id}>
              {!coupon.isClaimed && (
                <>
                  {" "}
                  <div className="couponCode">{coupon.code}</div>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteCoupon(coupon._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}

          <h3>Claimed Coupons</h3>

          <table>
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Claimed At</th>
                <th>Session ID</th>
              </tr>
            </thead>
            <tbody>
              {claimedCoupons.map((claimedCoupon) => (
                <tr key={claimedCoupon._id}>
                  <td>{claimedCoupon.couponCode}</td>
                  <td>{new Date(claimedCoupon.claimedAt).toLocaleString()}</td>
                  <td>{claimedCoupon.sessionID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
