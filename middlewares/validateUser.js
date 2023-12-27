const { body } = require("express-validator");

const emailValid = () => body("user_email").notEmpty().isEmail().isLowercase();

const passwordValid = () =>
  body("user_password")
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 36 })
    .escape();

const nameValid = () =>
  body("user_name")
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 24 })
    .escape();

const phoneValid = () => body("user_phone").isAlphanumeric();

module.exports = {
  nameValid,
  emailValid,
  passwordValid,
  phoneValid,
};
