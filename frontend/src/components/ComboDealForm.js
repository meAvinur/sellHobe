import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComboDealForm.css";

const ComboDealForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [comboName, setComboName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [comboImage, setComboImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : prev.length < 3
        ? [...prev, productId]
        : prev
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProductIds.length < 2 || selectedProductIds.length > 3) {
      setMessage("⚠️ Please select 2 or 3 products for the combo.");
      return;
    }
    if (!comboName || !comboImage) {
      setMessage("⚠️ Combo name and image are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", comboName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", comboImage);

      // ✅ Append each product ID separately
      selectedProductIds.forEach((id) => {
        formData.append("products", id);
      });

      await axios.post("http://localhost:5000/api/combos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Combo deal created successfully!");
      setSelectedProductIds([]);
      setComboName("");
      setPrice("");
      setDescription("");
      setComboImage(null);
    } catch (err) {
      console.error("Error creating combo deal:", err);
      setMessage("❌ Error creating combo deal.");
    }
  };

  return (
    <div className="combo-form-wrapper">
      <h3>Create Combo Deal</h3>
      {message && <p className="combo-message">{message}</p>}
      <form onSubmit={handleSubmit} className="combo-form">
        <input
          type="text"
          placeholder="Combo Deal Name"
          value={comboName}
          onChange={(e) => setComboName(e.target.value)}
          required
        />

        <label>Select 2-3 Products:</label>
        <div className="combo-product-list">
          {products.map((product) => (
            <label key={product._id} className="combo-product-item">
              <input
                type="checkbox"
                value={product._id}
                onChange={handleProductSelect}
                checked={selectedProductIds.includes(product._id)}
              />
              {product.name}
            </label>
          ))}
        </div>

        <input
          type="number"
          placeholder="Combo Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Combo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setComboImage(e.target.files[0])}
          required
        />

        <button type="submit">Create Deal</button>
      </form>
    </div>
  );
};

export default ComboDealForm;
