import React, { useState } from "react";
import axios from "axios";
import "./AdminUploadForm.css";

const AdminUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "", // ✅ Added category field
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("category", formData.category); // ✅ Add category to form data

    try {
      const res = await axios.post("http://localhost:5000/api/products", data);
      alert("✅ Product uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("❌ Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{ maxWidth: 500, margin: "auto" }}
    >
      <h2>Admin Upload Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (in ৳)"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />

      <select
        name="category"
        onChange={handleChange}
        value={formData.category}
        required
      >
        <option value="">-- Select Category --</option>
        <option value="Oil">Oil</option>
        <option value="Ghee">Ghee</option>
        <option value="Dates">Dates</option>
        <option value="Masala">Masala</option>
        <option value="Honey">Honey</option>
        <option value="Tea">Tea</option>
        <option value="FoodSupliment">FoodSupliment</option>
        <option value="Seeds">Seeds</option>
        {/* You can add more as needed */}
      </select>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <button type="submit">Upload Product</button>
    </form>
  );
};

export default AdminUploadForm;
