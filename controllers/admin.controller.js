const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  const { admin_name, admin_email, admin_password, admin_phone } = req.body;

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
  console.log(userUpdate);

  if (!admin) {
    throw new Error("Failed to create admin");
  }

  return res.status(200).send({ message: "Success", admin });
};

const loginAdmin = async (req, res, next) => {
  try {
    const { admin_email, admin_password } = req.body;

    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      throw new Error("Bad credentials");
    }

    const equal = await bcrypt.compare(admin_password, admin.admin_password);
    if (!equal) {
      throw new Error("Bad credentials");
    }

    let payload = {
      _id: admin._id,
    };

    const adminToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 30,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const updateUser = await Admin.findByIdAndUpdate(
      admin._id,
      {
        token: refreshToken,
      },
      { new: true }
    );

    // sending refresh token as cookie
    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "None", // required if domain of api and store/site is different
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "user login successfully - for admin",
      adminToken,
      admin: {
        _id: admin._id,
        admin_name: admin.admin_name,
        admin_email: admin.admin_email,
        admin_avatar: admin.admin_avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = () => {};
const getOrders = () => {};

module.exports = {
  addAdmin,
  getUsers,
  getOrders,
  loginAdmin,
};
