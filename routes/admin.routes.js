const router = require("express").Router();
const { getOrders, getUsers } = require("../controllers/admin.controller");
const authUser = require("../middlewares/authUser");

router.get("/orders", getOrders);
router.get("/users", getUsers);

module.exports = router;
