const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
