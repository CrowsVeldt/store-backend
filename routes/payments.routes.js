const router = require("express").Router();
const { makePayment } = require("../controllers/payments.controller");

router.post("/pay", makePayment);

module.exports = router;
