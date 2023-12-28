const { body } = require("express-validator");

// reset-link: user_email
// update-password: user_password, params.id
// text-support: user_email, user_name, message

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

const messageValid = () =>
  body("message").trim().notEmpty().isAlphanumeric().escape();

module.exports = {
  emailValid,
  nameValid,
  passwordValid,
  messageValid,
};
