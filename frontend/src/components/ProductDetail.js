import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const found = res.data.find((item) => item._id === id);
        setProduct(found);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCashOnDelivery = () => {
    const codItem = { ...product, quantity: 1 };
    navigate("/checkout", { state: { codItem } });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "8801303215720";
    const message = `Hello, I'm interested in buying: ${product.name} (৳${product.price})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.details}>
          <h2 style={styles.title}>{product.name}</h2>
          <p style={styles.price}>৳ {product.price}</p>
          <p style={styles.description}>{product.description}</p>

          <button
            onClick={() => onAddToCart(product)}
            style={styles.cartButton}
          >
            Add to Cart
          </button>

          <button onClick={handleCashOnDelivery} style={styles.codButton}>
            Cash on Delivery
          </button>

          <button onClick={handleWhatsApp} style={styles.whatsappButton}>
            WhatsApp Us
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  imageSection: {
    flex: "1 1 300px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "10px",
    objectFit: "contain",
    border: "1px solid #ccc",
  },
  details: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: "20px",
    color: "#e91e63",
    marginBottom: "15px",
    textAlign: "center",
  },
  description: {
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "center",
  },
  cartButton: {
    padding: "10px 20px",
    marginTop: "20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  codButton: {
    padding: "10px 20px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  whatsappButton: {
    padding: "10px 20px",
    marginTop: "10px",
    backgroundColor: "#25d366",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ProductDetail;
