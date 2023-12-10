const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
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

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAdmin,
  getUsers,
  getOrders,
};
