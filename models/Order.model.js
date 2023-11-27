const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },

  customer_details: {
    customer_name: {
      type: String,
      required: true,
    },

    customer_email: {
      type: String,
      required: true,
    },

    customer_phone: {
      type: String,
      required: true,
    },

    customer_address: {
      city: { type: String, trim: true, required: true },
      street: { type: String, trim: true, required: true },
      building: { type: String, trim: true, required: true },
      apartment: { type: String, trim: true, required: true },
    },
  },

  total_price: { type: Number, min: 1 },

  payment_details: {
    terminal_number: {
      type: String,
      required: true,
      match: /^[0-9]+$/,
    },

    transaction_number: {
      type: String,
      required: true,
      match: /^[0-9]+$/,
      unique: true,
    },

    last_digits: {
      type: String,
      required: true,
      match: /^[0-9]+$/,
    },

    transaction_date: {
      type: Date,
      default: function () {
        return Date.now();
      },
    },
  },

  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
      },
      RTP: {
        type: Number,
        required: true,
        min: 1,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],

  order_status: {
    type: Number,
    default: 1,
    min: [1, "minimum is 1"],
    max: [4, "maximum is 4"],
  },

  created_at: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },

  order_number: {
    type: Number,
    default: function () {
      return Date.now();
    },
  },
});

orderSchema.pre("save", function (next) {
  this.total_price = this.products.reduce(
    (total, product) => total + product.RTP * product.quantity,
    0
  );
  next();
});

orderSchema.post("save", (next) => {
  console.log("Order Saved!");
});

module.exports = mongoose.model("order", orderSchema);
