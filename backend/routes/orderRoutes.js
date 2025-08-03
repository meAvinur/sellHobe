const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { Parser } = require("json2csv");

// Save a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download all orders as CSV
router.get("/download", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // Flatten items correctly
    const formattedOrders = orders.map((order) => {
      const items = (order.items || [])
        .map(
          (item) =>
            `${item.name} (x${item.quantity}) @ $${item.price} = $${
              item.quantity * item.price
            }`
        )
        .join(" | ");

      const total = (order.items || []).reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        name: order.name,
        mobile: order.mobile,
        address: order.address,
        items,
        total,
        createdAt: order.createdAt.toISOString(),
      };
    });

    const fields = ["name", "mobile", "address", "items", "total", "createdAt"];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(formattedOrders);

    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csv);
  } catch (err) {
    console.error("CSV generation failed:", err);
    res.status(500).json({ error: "Failed to generate CSV" });
  }
});

module.exports = router;
