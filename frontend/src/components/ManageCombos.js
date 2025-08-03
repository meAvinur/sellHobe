import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageCombos.css";

const ManageCombos = () => {
  const [combos, setCombos] = useState([]);
  const [editingCombo, setEditingCombo] = useState(null);
  const [updatedCombo, setUpdatedCombo] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/combos");
      setCombos(res.data);
    } catch (err) {
      console.error("Failed to fetch combos:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/combos/${id}`);
      fetchCombos();
    } catch (err) {
      console.error("Failed to delete combo:", err);
    }
  };

  const handleEdit = (combo) => {
    setEditingCombo(combo._id);
    setUpdatedCombo({
      name: combo.name,
      price: combo.price,
      description: combo.description,
      image: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedCombo.name);
    formData.append("price", updatedCombo.price);
    formData.append("description", updatedCombo.description);
    if (updatedCombo.image) {
      formData.append("image", updatedCombo.image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/combos/${editingCombo}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setEditingCombo(null);
      fetchCombos();
    } catch (err) {
      console.error("Failed to update combo:", err);
    }
  };

  return (
    <div className="manage-combos">
      <h2>Manage Combo Deals</h2>
      {combos.map((combo) =>
        editingCombo === combo._id ? (
          <form onSubmit={handleUpdate} key={combo._id} className="edit-form">
            <input
              type="text"
              value={updatedCombo.name}
              onChange={(e) =>
                setUpdatedCombo({ ...updatedCombo, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              value={updatedCombo.price}
              onChange={(e) =>
                setUpdatedCombo({ ...updatedCombo, price: e.target.value })
              }
              required
            />
            <textarea
              value={updatedCombo.description}
              onChange={(e) =>
                setUpdatedCombo({
                  ...updatedCombo,
                  description: e.target.value,
                })
              }
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setUpdatedCombo({ ...updatedCombo, image: e.target.files[0] })
              }
            />
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={() => setEditingCombo(null)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="combo-item" key={combo._id}>
            <img
              src={`http://localhost:5000${combo.image}`}
              alt={combo.name}
              className="combo-thumb"
            />
            <div>
              <h4>{combo.name}</h4>
              <p>{combo.description}</p>
              <p>৳{combo.price}</p>
            </div>
            <button onClick={() => handleEdit(combo)}>Edit</button>
            <button onClick={() => handleDelete(combo._id)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
};

export default ManageCombos;
