const router = require("express").Router();
const {
  addAdmin,
  editUser,
  getOrders,
  getUsers,
} = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");

router.post("/add", authUser, authAdmin, addAdmin);
router.get("/orders", authUser, authAdmin, getOrders);
router.get("/users", authUser, authAdmin, getUsers);

router.patch("/:userid/edit", authUser, authAdmin, editUser);

module.exports = router;
