const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const authUser = require("./authUser");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      res.send({ success: false, message: "User not found" });
    }

    const admin = await Admin.findById(user.admin_id);

    if (!admin) {
      res
        .status(400)
        .send({ success: false, message: "User is not authorized" });
    }

    req.admin = { _id: admin._id };
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
};
