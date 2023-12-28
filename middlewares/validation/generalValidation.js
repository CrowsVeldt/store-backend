const { body, param } = require("express-validator");

const bodyMongoIdValid = () => body("_id").notEmpty().isMongoId();

const paramIdValid = () => param("id").notEmpty().isString()

module.exports = {
  bodyMongoIdValid,
  paramIdValid
};
