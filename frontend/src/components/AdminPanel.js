import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminUploadForm from "./AdminUploadForm";
import ComboDealForm from "./ComboDealForm";
import ManageCombos from "./ManageCombos";
import "./AdminPanel.css";

const AdminPanel = ({ products, onDeleteProduct }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        onDeleteProduct(id);
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const handleDownloadOrdersCSV = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/download",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download CSV:", error);
      alert("Error downloading orders. Please try again.");
    }
  };

  const handleEditRedirect = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel: Manage Products</h2>

      {/* ✅ Upload Section */}
      <div className="upload-section">
        <AdminUploadForm />
        <ComboDealForm />
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* ✅ Download Orders */}
      <button className="download-btn" onClick={handleDownloadOrdersCSV}>
        Download Orders CSV
      </button>

      {/* ✅ Product List */}
      <div className="admin-product-list">
        <h3>All Products</h3>
        {products.map((product) => (
          <div key={product._id} className="admin-product-card">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <button onClick={() => handleEditRedirect(product._id)}>
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* ✅ Combo Management Section */}
      <div className="admin-combo-section">
        <h3>Manage Combo Deals</h3>
        <ManageCombos />
      </div>
    </div>
  );
};

export default AdminPanel;
