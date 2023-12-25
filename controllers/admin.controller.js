const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const emailStructureValid = require("../validation/emailValidation");

const addAdmin = async (req, res, next) => {
  const { admin_name, admin_email, admin_password, admin_phone } = req.body;

  if (!emailStructureValid(admin_email)) throw new Error("Validation error")
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

module.exports = {
  addAdmin,
};
