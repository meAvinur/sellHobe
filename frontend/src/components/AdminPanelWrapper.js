import React, { useState } from "react";
import axios from "axios";
import AdminPanel from "./AdminPanel";
import "./AdminPanelWrapper.css";

const AdminPanelWrapper = () => {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "Mr.Avinur021") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <h2>Admin Panel Login</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return <AdminPanel products={products} onDelete={handleDelete} />;
};

export default AdminPanelWrapper;
