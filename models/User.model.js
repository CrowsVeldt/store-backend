const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    min: 8,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_phone: {
    type: String,
    required: true,
    match: /^([0]\d{1,3}[-])?\d{7,10}$/,
  },
  user_address: {
    city: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    building: {
      type: String,
      trim: true,
    },
    apartment: {
      type: String,
      trim: true,
    },
  },
  // :אופציונלי כי אפשר לשמור את המידע אצל המשתמש בצד קליינט (לוקאלסטורג')
  // user_cart: {
  //   type: mongoose.Types.ObjectId, ref: 'carts'
  // },
  user_orders: [
    {
      order: {
        type: mongoose.Types.ObjectId,
        ref: "orders",
      },
    },
  ],

  user_avatar: {
    type: String,
  },

  token: { type: String },

  email_verify_token: { type: String },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.user_password, 10);
  this.user_password = hash;

  next();
});

module.exports = mongoose.model("user", userSchema);
