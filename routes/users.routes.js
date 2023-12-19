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

router.post("/customers/register", registerCustomer);
router.post("/customers/login", loginCustomer);
router.post("/customers/logout", authUser, logoutCustomer);

router.put("/customers/:id", authUser, updateCustomer);

router.delete("/customers/:id", authUser, deleteCustomer);

router.get("/admin", authUser, authAdmin, getUsers);
router.patch("/:userid/admin/edit", authUser, authAdmin, editUser);

module.exports = router;
