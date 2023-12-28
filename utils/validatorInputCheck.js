const { validationResult } = require("express-validator")

module.exports = (req) => {
    const inputValid = validationResult(req).formatWith((msg, param, value) => {
      msg, param, value;
    });

    if (inputValid.errors.length > 0) throw new Error("bad values")
}