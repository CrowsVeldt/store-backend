const router = require("express").Router();
const {
  addCategory,
  getCategories,
} = require("../controllers/categories.controller");

router.get("/", getCategories);
router.post("/managers", addCategory);

module.exports = router;
