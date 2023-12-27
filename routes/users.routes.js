const router = require("express").Router();
const {
  deleteCustomer,
  getUsers,
  editUser,
  logoutCustomer,
  loginCustomer,
  registerCustomer,
  updateCustomer,
} = require("../controllers/users.controller");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");
const {emailValid, passwordValid, nameValid, phoneValid} = require("../middlewares/validateUser");

router.post("/customers/register", emailValid(), passwordValid(), nameValid(), phoneValid(), registerCustomer);
router.post("/customers/login", emailValid(), passwordValid(), loginCustomer);
router.post("/customers/logout", authUser, logoutCustomer);

router.put("/customers/:id", emailValid(), nameValid(), phoneValid(), authUser, updateCustomer);

router.delete("/customers/:id", authUser, deleteCustomer);

router.get("/admin", authUser, authAdmin, getUsers);
router.patch("/:userid/admin/edit", authUser, authAdmin, editUser);

module.exports = router;
