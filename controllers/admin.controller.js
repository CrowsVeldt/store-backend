const Admin = require("../models/Admin.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  const { admin_name, admin_email, admin_password, admin_phone } = req.body;

  try {
    const admin = await Admin.create({
      admin_name,
      admin_email,
      admin_password,
      admin_phone,
    });

    const userUpdate = await User.findOneAndUpdate(
      { user_email: admin_email },
      { admin_id: admin._id },
      { new: true }
    );

    if (!admin) {
      throw new Error("Failed to create admin");
    }

    return res.status(200).send({ message: "Success", admin });
  } catch (error) {
    res.error("Failed to change user status");
  }
};

const editProduct = async (req, res, next) => {
  const { productid } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productid, req.body, {
      new: true,
    }).populate("categories");

    if (!product) {
      throw new Error("No such product");
    }

    res
      .status(200)
      .send({ success: true, message: "Product updated", product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAdmin,
  editProduct,
};
