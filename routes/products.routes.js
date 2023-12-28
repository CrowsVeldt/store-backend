const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  // getProductById,
  editProductById,
  removeProductById,
} = require("../controllers/products.controller");
const authUser = require("../middlewares/authUser");
const authAdmin = require("../middlewares/authAdmin");
const {
  nameValid,
  descriptionValid,
  priceValid,
  imageValid,
  categoriesValid,
} = require("../middlewares/validation/validateProduct");

router.get("/customers/all", getAllProducts);
//router.get("/customers/:productId", getProductById);

router.get("/managers/all", getAllProducts);

router.post(
  "/admin",
  nameValid(),
  descriptionValid(),
  priceValid(),
  imageValid(),
  categoriesValid(),
  authUser,
  authAdmin,
  addProduct
);

router.patch("/admin/:productid/edit", authUser, authAdmin, editProductById);

router.delete(
  "/admin/:productId/delete",
  authUser,
  authAdmin,
  removeProductById
);

module.exports = router;
