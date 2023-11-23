const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    unique: true,
  },

  product_description: {
    type: String,
  },

  product_price: {
    type: Number,
    required: true,
    min: [1, "Must be from 1 and above"],
  },

  product_image: { type: String },

  categories: [
    {
      category: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
      },
    },
  ],
});

module.exports = mongoose.model("product", productSchema);
