const Product = require("../models/Product.model");
const mongoose = require("mongoose");
const objectName = "product";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("categories");

    return res.status(200).json({
      success: true,
      message: `success to find all ${objectName}s - for managers`,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const products = await Product.find(productId).populate(
      "categories.category"
    );

    return res.status(200).json({
      success: true,
      message: `success to find all ${objectName} - for managers`,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  const {
    product_name,
    product_description,
    product_price,
    product_image,
    categories, // [id,id,id, "category name"]
  } = req.body;

  try {
    // map over categories to return only the ObjecId
    const categoriesObjectsArray = await Promise.all(
      categories.map(async (category) => {
        // Check is ObjectId valid
        if (mongoose.Types.ObjectId.isValid(category._id)) {
          return category._id;
        }
        // else
        // {
        //   const newCategory = await Category.findOneAndUpdate(
        //     { category_name: category },
        //     { category_name: category },
        //     { upsert: true }
        //   );
        //   return { category: newCategory._id };
        // }
      })
    );

    const newProduct = await Product.create({
      product_name,
      product_description,
      product_price,
      product_image,
      categories: categoriesObjectsArray,
    });

    if (!newProduct) throw new Error("Failed to create new product");

    return res.send({
      success: true,
      message: `Created new product successfully`,
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate(
      "categories.category"
    );

    return res.status(200).json({
      success: true,
      message: `success to find Product - for managers`,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: `error in get Product - for managers`,
      error: error.message,
    });
  }
};

const editProduct = async (req, res, next) => {
  const { productid } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productid, req.body, {
      new: true,
    }).populate("categories");

    if (!product) {
      throw new Error("No such product");
    }

    res
      .status(200)
      .send({ success: true, message: "Product updated", product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProductById,
  getAllProducts,
  getProductById,
  editProduct,
};
