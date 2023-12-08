const router = require("express").Router();
const {
  addAdmin,
  getOrders,
  getUsers,
  loginAdmin,
} = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/authAdmin");

router.post("/login", loginAdmin);
router.post("/add", authAdmin, addAdmin);
router.get("/orders", authAdmin, getOrders);
router.get("/users", authAdmin, getUsers);

module.exports = router;
