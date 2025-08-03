// src/components/ContactPage.js
import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or need support, feel free to reach out:</p>

      <div className="contact-info">
        <p>
          <strong>Phone:</strong> +8801303215720
        </p>
        <p>
          <strong>Email:</strong> support@bottolarbazar.com
        </p>
        <p>
          <strong>Support Hours:</strong> 24 Hours (Everyday)
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
