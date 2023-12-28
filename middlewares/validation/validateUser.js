const { body } = require("express-validator");

const emailValid = () => body("user_email").notEmpty().isEmail().isLowercase();

const passwordValid = () =>
  body("user_password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 36 })
    .escape();

const nameValid = () =>
  body("user_name")
    .trim()
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 24 })
    .escape();

const phoneValid = () =>
  body("user_phone").optional().trim().isNumeric().escape();

const avatarValid = () =>
  body("user_avatar").optional().trim().isBase64().escape();

const addressValid = () => body("user_address").optional().isObject();

module.exports = {
  avatarValid,
  emailValid,
  nameValid,
  passwordValid,
  phoneValid,
};
