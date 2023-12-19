const {
  createCustomerOrder,
  getOrders,
  getUserOrders,
  editOrder,
  updateOrderStatus,
} = require("../controllers/orders.controllers");
const authUser = require("../middlewares/authUser");
const authAdmin = require("../middlewares/authAdmin")

const router = require("express").Router();

router.post("/customer-order", createCustomerOrder);
router.patch("/:order/status", updateOrderStatus);

router.get("/:userid/orders", authUser, getUserOrders);

router.get("/admin", authUser, authAdmin, getOrders);
router.patch("/:orderid/admin/edit", authUser, authAdmin, editOrder);

module.exports = router;
