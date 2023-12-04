const {
  createCustomerOrder,
  updateOrderStatus,
} = require("../controllers/orders.controllers");

const router = require("express").Router();

router.post("/customer-order", createCustomerOrder);
router.patch("/:order/status", updateOrderStatus);

module.exports = router;
