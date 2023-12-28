const router = require("express").Router();
const { addAdmin } = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");
const {
  nameValid,
  emailValid,
  passwordValid,
  phoneValid,
} = require("../middlewares/validation/validateAdmin");

router.post(
  "/add",
  nameValid(),
  emailValid(),
  passwordValid(),
  phoneValid(),
  authUser,
  authAdmin,
  addAdmin
);

module.exports = router;
