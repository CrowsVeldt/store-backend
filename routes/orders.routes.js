const { createCustomerOrder } = require("../controllers/orders.controllers");
const router = require("express").Router();

router.post("/customer-order", createCustomerOrder);

module.exports = router;
