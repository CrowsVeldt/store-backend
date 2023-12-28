const { body } = require("express-validator");

const nameValid = () =>
  body("product_name")
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 24 })
    .escape();

const descriptionValid = () => {};
const priceValid = () => {};
const imageValid = () => {};
const categoriesValid = () => {};

module.exports = {
  nameValid,
};
