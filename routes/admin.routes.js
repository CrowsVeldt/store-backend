const router = require("express").Router();
const {
  addAdmin,
  getOrders,
  getUsers,
} = require("../controllers/admin.controller");
const authUser = require("../middlewares/authUser");

router.post("/add", addAdmin);
router.get("/orders", getOrders);
router.get("/users", getUsers);

module.exports = router;
