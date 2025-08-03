import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import FeaturedDeals from "./components/FeaturedDeals";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import AdminPanelWrapper from "./components/AdminPanelWrapper";
import EditProductPage from "./components/EditProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import ContactPage from "./components/ContactPage";
import DealsPage from "./components/DealsPage";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleIncrement = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <Header />
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CategoriesSection onSelectCategory={handleCategorySelect} />
              <FeaturedDeals />
              <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                Showing: {selectedCategory}
              </h2>
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route path="/admin" element={<AdminPanelWrapper />} />
        <Route path="/admin/edit/:id" element={<EditProductPage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage cartItems={cartItems} onClearCart={handleClearCart} />
          }
        />
        <Route path="/contact" element={<ContactPage />} />

        {/* ✅ Fixed: now DealsPage gets onAddToCart */}
        <Route
          path="/deals"
          element={<DealsPage onAddToCart={handleAddToCart} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
