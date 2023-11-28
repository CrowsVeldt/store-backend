const router = require("express").Router();
const { createPayment } = require("../controllers/payments.controller");

router.post("/pay", createPayment);

module.exports = router;
