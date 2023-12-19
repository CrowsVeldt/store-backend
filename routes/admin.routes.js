const router = require("express").Router();
const {
  addAdmin,
  editProduct,
} = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");

router.post("/add", authUser, authAdmin, addAdmin);

router.patch("/:productid/edit/product", authUser, authAdmin, editProduct);

module.exports = router;
