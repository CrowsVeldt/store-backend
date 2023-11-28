const UserModel = require("../models/User.model");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      error = new Error("Resource not found");
      error.code = 401;
      throw error;
    }

    res.clearCookie("token");

    return res
      .status(200)
      .json({ success: true, message: "Succesfully deleted user" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "User was not deleted" });
  }
};

const registerCustomer = async (req, res, next) => {
  try {
    const { user_name, user_email, user_password, user_phone } = req.body;

    const user = await User.create({
      user_name,
      user_email,
      user_password,
      user_phone,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User was registered succesfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User was not registered",
    });
  }
};

// login
const loginCustomer = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await UserModel.findOne({ user_email });
    if (!user) {
      throw new Error("Bad credentials");
    }

    const equal = await bcrypt.compare(user_password, user.user_password);
    if (!equal) {
      throw new Error("Bad credentials");
    }

    // user login success
    let payload = {
      _id: user._id,
    };

    const customerToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 30,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        token: refreshToken,
      },
      { new: true }
    );

    // sending refresh token as cookie
    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "None", // required if domain of api and store/site is different
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "user login successfully - for customer",
      customerToken,
      user: {
        _id: user._id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_avatar: user.user_avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutCustomer = async (req, res, next) => {
  // הניתוק משתמש צריך את הטוקן של המשתמש בצד הקליינט
  // במידה והטוקנים הם מסוג ריפרש טוקן אז צריך למחוק אותם מהדאטאבייס

  // קודם נבדוק אם קיים הדר של authorization
  if (req.headers && req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // ['bearer', 'ghfh43$R#!']
      if (!token) {
        return res
          .status(403)
          .send({ success: false, message: "Authorization failed!" });
      }
      const _id = req.user._id;
      // TODO remove token from DB in user document

      res.clearCookie("token");

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
};

const getUserInfo = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const foundUser = await User.findById({ _id });
    if (!foundUser)
      return res
        .status(401)
        .send({ success: false, message: "User not found!" });

    return res.status(200).send({
      success: true,
      message: "user login successfully - for customer",
      user: {
        _id: foundUser._id,
        user_name: foundUser.user_name,
        user_email: foundUser.user_email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: `Succeeded in updating customer by id`,
        user: {
          _id: user._id,
          user_name: user.user_name,
          user_phone: user.user_phone,
          user_address: user.user_address,
          user_email: user.user_email,
          user_avatar: user.user_avatar,
        },
      });
    } else {
      return res.status(401).send({ message: "Unauthorized action" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  deleteCustomer,
  getUserInfo,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomer,
};
