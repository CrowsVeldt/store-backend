const router = require("express").Router();
const {
  deleteCustomer,
  logoutCustomer,
  loginCustomer,
  registerCustomer,
  updateCustomer,
} = require("../controllers/users.controller");
const authUser = require("../middlewares/authUser");

/* GET users listing. */
router.post("/customers/register", registerCustomer);
router.post("/customers/login", loginCustomer);
router.post("/customers/logout", authUser, logoutCustomer);

router.put("/customers/:id", authUser, updateCustomer);

router.delete("/customers/:id", authUser, deleteCustomer);
// router.get("/customers/me", authUser, getUserInfo);

module.exports = router;
