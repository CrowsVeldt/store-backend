const { body } = require("express-validator");

const nameValid = () =>
  body("admin_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 32 })
    .escape();

const emailValid = () =>
  body("admin_email")
    .trim()
    .notEmpty()
    .isEmail()
    .escape();

const passwordValid = () =>
  body("admin_password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 64 })
    .escape();

const phoneValid = () => body("admin_phone").trim().notEmpty().isNumeric();

module.exports = {
  nameValid,
    emailValid,
    passwordValid,
  phoneValid,
};
