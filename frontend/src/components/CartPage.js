import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = ({ cartItems, onRemove, onIncrement, onDecrement }) => {
  const navigate = useNavigate();

  const handlePlaceOrderClick = () => {
    navigate("/checkout");
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="cart-item-left">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-right">
                  <h4>
                    {item.name}
                    {item.type === "combo" && (
                      <span style={{ color: "green" }}> (Combo Deal)</span>
                    )}
                  </h4>
                  <p>Price: ৳{item.price}</p>
                  <div>
                    Quantity:
                    <button onClick={() => onDecrement(item._id)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button onClick={() => onIncrement(item._id)}>+</button>
                  </div>
                  <button onClick={() => onRemove(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total Price: ৳{getTotalPrice()}</h3>
          <button onClick={handlePlaceOrderClick}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
