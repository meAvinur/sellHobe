import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoriesSection.css";

const CategoriesSection = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        // ✅ Filter out empty or whitespace-only categories
        const uniqueCategories = [
          ...new Set(
            res.data
              .map((product) => product.category)
              .filter((category) => category && category.trim() !== "")
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <div className="categories-section">
      <h2>Shop by Categories</h2>
      <div className="category-buttons">
        <button onClick={() => handleClick("All")}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => handleClick(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
