const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    required: true,
    unique: true,
  },
  admin_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_phone: {
    type: String,
    required: true,
    match: /^([0]\d{1,3}[-])?\d{7,10}$/,
  },

  token: { type: String },
});

adminSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.admin_password, 10);
  this.admin_password = hash;

  next();
});

module.exports = mongoose.model("admin", adminSchema);
