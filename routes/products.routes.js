const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  editProduct
} = require("../controllers/products.controller");
const authUser = require("../middlewares/authUser")
const authAdmin = require("../middlewares/authAdmin")

router.get("/customers/all", getAllProducts);
router.get("/customers/:productId", getProductById);

router.get("/managers/all", getAllProducts);
router.post("/admin", addProduct);

router.patch("/:productid/admin/edit", authUser, authAdmin, editProduct);



module.exports = router;
