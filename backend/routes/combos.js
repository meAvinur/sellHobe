const express = require("express");
const router = express.Router();
const multer = require("multer");
const ComboDeal = require("../models/ComboDeal");
const fs = require("fs");
const path = require("path");

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Where images go
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Create combo
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, productIds } = req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const newCombo = new ComboDeal({
      name,
      price,
      description,
      products: Array.isArray(productIds) ? productIds : productIds?.split(","),
      image: `/uploads/${req.file.filename}`,
    });

    await newCombo.save();
    res.status(201).json(newCombo);
  } catch (err) {
    console.error("❌ Combo creation error:", err);
    res.status(500).json({ error: "Failed to create combo deal." });
  }
});

// ✅ Get all combos
router.get("/", async (req, res) => {
  try {
    const combos = await ComboDeal.find().populate("products");
    res.json(combos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch combos." });
  }
});

// ✅ Update combo
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updateData = { name, price, description };

    const combo = await ComboDeal.findById(req.params.id);
    if (!combo) return res.status(404).json({ error: "Combo not found" });

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;

      // Delete old image
      if (combo.image) {
        const oldPath = path.resolve(__dirname, "..", combo.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("⚠️ Failed to delete old image:", err.message);
        });
      }
    }

    const updated = await ComboDeal.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating combo:", err);
    res.status(500).json({ error: "Failed to update combo." });
  }
});

// ✅ Delete combo
router.delete("/:id", async (req, res) => {
  try {
    const combo = await ComboDeal.findById(req.params.id);
    if (!combo) return res.status(404).json({ error: "Combo not found" });

    // Delete image
    if (combo.image) {
      const imagePath = path.resolve(__dirname, "..", combo.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("⚠️ Could not delete image:", err.message);
      });
    }

    await ComboDeal.findByIdAndDelete(req.params.id);
    res.json({ message: "Combo deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting combo:", err);
    res.status(500).json({ error: "Failed to delete combo." });
  }
});

module.exports = router;
