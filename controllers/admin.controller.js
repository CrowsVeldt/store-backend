const Admin = require("../models/Admin.model");

const addAdmin = async (req, res, next) => {
  const { admin_name, admin_email, admin_password, admin_phone } = req.body;

  const admin = await Admin.create({
    admin_name,
    admin_email,
    admin_password,
    admin_phone,
  });

  if (!admin) {
    throw new Error("Failed to create admin");
  }

  return res.status(200).send({ message: "Success", admin });
};

const getUsers = () => {};
const getOrders = () => {};

module.exports = {
  addAdmin,
  getUsers,
  getOrders,
};
