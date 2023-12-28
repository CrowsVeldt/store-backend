const { body } = require("express-validator");

const nameValid = () =>
  body("product_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 24 })
    .escape();

const descriptionValid = () =>
  body("product_description")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 50, max: 500 })
    .escape();

const priceValid = () => body("product_price").trim().notEmpty().isNumeric();

const imageValid = () => body("product_image").notEmpty().isBase64().escape();

const categoriesValid = () =>
  body("product_categories").notEmpty().isArray().escape();

module.exports = {
  nameValid,
  descriptionValid,
  priceValid,
  imageValid,
  categoriesValid,
};
