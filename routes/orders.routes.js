const {
  createCustomerOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orders.controllers");
const authUser = require("../middlewares/authUser");

const router = require("express").Router();

router.post("/customer-order", createCustomerOrder);
router.patch("/:order/status", updateOrderStatus);

router.get("/:userid/orders", authUser, getUserOrders);

module.exports = router;
