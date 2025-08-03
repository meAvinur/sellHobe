import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <section className="products">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
