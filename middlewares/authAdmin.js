const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    const adminToken = req.headers.authorization.split(" ")[1];

    try {
      const payload = jwt.verify(adminToken, process.env.JWT_SECRET);
      const admin = await Admin.findById(payload._id);

      if (!admin) {
        return res.json({ success: false, message: "unauthorized access!" });
      }

      req.admin._id = payload._id;

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ success: false, message: "unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired try sign in!",
        });
      }

      res.json({ success: false, message: "Internal server error!" });
    }
  } else {
    res.json({ success: false, message: "unauthorized access!" });
  }
};
