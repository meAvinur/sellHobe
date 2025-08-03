import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CheckoutPage.css";

const CheckoutPage = ({ cartItems, onClearCart }) => {
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Check if COD item is passed via navigation state
  const codItem = location.state?.codItem || null;

  const orderItems = useMemo(() => {
    return codItem ? [{ ...codItem, quantity: 1 }] : cartItems;
  }, [codItem, cartItems]);

  // ✅ Clear cart once if COD
  useEffect(() => {
    if (codItem) {
      onClearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile, address } = checkoutData;

    if (!name || !mobile || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const orderPayload = {
      name,
      mobile,
      address,
      items: orderItems,
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderPayload);
      alert("Order placed successfully!");

      setCheckoutData({ name: "", mobile: "", address: "" });

      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={checkoutData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={checkoutData.mobile}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={checkoutData.address}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
