const router = require("express").Router();
const { addCategory } = require("../controllers/categories.controller");

router.post("/managers", addCategory);

module.exports = router;
