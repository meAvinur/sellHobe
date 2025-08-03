import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DealsPage.css";

const Deals = ({ onAddToCart }) => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/combos")
      .then((res) => setCombos(res.data))
      .catch((err) => console.error("Failed to load combo deals:", err));
  }, []);

  const handleAddToCart = (combo) => {
    const comboItem = {
      _id: combo._id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
      quantity: 1,
      type: "combo",
    };
    onAddToCart(comboItem);
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:5000${imagePath}`;
    }
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  return (
    <div className="deals-container">
      <h2>Combo Deals</h2>
      <div className="deal-list">
        {combos.map((combo) => (
          <div className="deal-card" key={combo._id}>
            {combo.image ? (
              <img
                src={getImageUrl(combo.image)}
                alt={combo.name}
                className="deal-image"
                onError={(e) => {
                  e.target.src = "/fallback.jpg";
                  console.error(`❌ Failed to load image: ${combo.image}`);
                }}
              />
            ) : (
              <p>No image available</p>
            )}
            <h3 className="deal-name">{combo.name}</h3>
            <p className="deal-description">{combo.description}</p>
            <p>
              <strong>Combo Price:</strong> ৳{combo.price}
            </p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(combo)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
