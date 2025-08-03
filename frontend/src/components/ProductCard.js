import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ _id, name, price, image, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${_id}`} className="product-link">
        <img
          src={`http://localhost:5000${image}`}
          alt={name}
          className="product-image"
        />
        <h3 className="product-name">{name}</h3>
        <p className="product-price">৳{price}</p>
      </Link>

      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart({ _id, name, price, image })}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
