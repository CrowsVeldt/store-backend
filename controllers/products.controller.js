const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const mongoose = require("mongoose");
const objectName = "product";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("categories");

    return res.status(200).json({
      success: true,
      message: `success to find all ${objectName}s - for managers`,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: `error in get all ${objectName}s - for managers`,
      error: error.message,
    });
  }
};

const getAllProductById = async (req, res) => {
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
    return res.status(500).json({
      message: `error in get all ${objectName} - for managers`,
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  const {
    product_name,
    product_description,
    product_price,
    product_image,
    categories, // [id,id,id, "category name"]
  } = req.body;

  try {
    // Using map to transform categories
    const categoriesObjectsArray = await Promise.all(
      categories.map(async (category) => {
        // Check if it's a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(category)) {
          return { category: category };
        } else {
          const newCategory = await Category.findOneAndUpdate(
            { category_name: category },
            { category_name: category },
            { upsert: true }
          );
          return { category: newCategory._id };
        }
      })
    );

    const newProduct = await Product.create({
      product_name,
      product_description,
      product_price,
      product_image,
      categories: categoriesObjectsArray,
    });

    if (!newProduct) throw new Error("Couldn't create new product");

    return res.send({
      success: true,
      message: `Success to create product`,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in creating product`,
      error: error.message,
    });
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
  editProduct
};
