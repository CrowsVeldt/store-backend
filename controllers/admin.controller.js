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

const editOrder = async (req, res, next) => {
  const { orderid } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(orderid, req.body, {
      new: true,
    });

    if (!order) {
      throw new Error("No such order");
    }

    res.status(200).send({ success: true, message: "Order updated", order });
  } catch (error) {
    next(error);
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

const editUser = async (req, res, next) => {
  const { userid } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userid, req.body, {
      new: true,
    }).select(`-user_password -email_verify_token`);

    if (!user) {
      throw new Error("No such user");
    }

    res.status(200).send({ success: true, message: "User updated", user });
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

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAdmin,
  editOrder,
  editProduct,
  editUser,
  getOrders,
  getUsers,
};
