const mongoose = require("mongoose");

const comboDealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // ✅ path to uploaded image
    required: true,
  },
});

module.exports = mongoose.model("ComboDeal", comboDealSchema);
