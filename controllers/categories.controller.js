const Category = require("../models/Category.model");

const addCategory = async (req, res) => {
  const name = req.body.categoryName;

  try {
    const category = await Category.create({ category_name: name });

    if (!category) throw new Error("Unable to create category"); // Unexpected problem!

    return res.status(200).send({
      success: true,
      message: `success to add new category - for managers`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `error in add new category - for managers`,
      error: error.message,
    });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ success: true, categories });
  } catch (error) {
    next(error);
  }
};
module.exports = { addCategory, getCategories };
