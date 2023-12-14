const router = require("express").Router();
const {
  addAdmin,
  editOrder,
  editProduct,
  editUser,
  getOrders,
  getUsers,
} = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");

router.post("/add", authUser, authAdmin, addAdmin);
router.get("/orders", authUser, authAdmin, getOrders);
router.get("/users", authUser, authAdmin, getUsers);

router.patch("/:orderid/edit/order", authUser, authAdmin, editOrder);
router.patch("/:productid/edit/product", authUser, authAdmin, editProduct);
router.patch("/:userid/edit/user", authUser, authAdmin, editUser);

module.exports = router;
