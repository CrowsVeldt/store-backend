const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const managerSchema = new mongoose.Schema({
  managers_name: {
    type: String,
    required: true,
    unique: true,
  },
  managers_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  managers_password: {
    type: String,
    required: true,
  },
  managers_phone: {
    type: String,
    required: true,
    match: /^([0]\d{1,3}[-])?\d{7,10}$/,
  },

  token: { type: String },
});

managerSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.user_password, 10);
  this.user_password = hash;

  next();
});

module.exports = mongoose.model("manager", managerSchema);
