const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
const User = require("../models/User.model");
const validatorInputCheck = require("../utils/validatorInputCheck")

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SITE_MAIL,
    pass: process.env.MAILER_PASS,
  },
});

const sendResetLink = async (req, res, next) => {
  validatorInputCheck(req)
  const { user_email } = req.body;

  try {
    const user = await User.findOne({ user_email: user_email.toLowerCase() });

    if (!user) {
      res.status(400);
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4m",
    });

    const updatedUserWithToken = await User.findByIdAndUpdate(
      { _id: user._id },
      { email_verify_token: token },
      { new: true }
    );

    if (updatedUserWithToken) {
      const emailOptions = {
        to: user_email,
        subject: "Password reset link for Store",
        html: `<h1>Hello, ${updatedUserWithToken.user_name}!</h1>
            <p>This reset link is valid for 4 minutes: 
            <a href="${process.env.CLIENT_URL}/forgot-password/${user._id}?token=${updatedUserWithToken.email_verify_token}">
            link</a></p>

            `,
      };

      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log("error: ", error);
          res.status(400).send({
            status: "400",
            success: false,
            message: "couldn't find email",
          });
        } else {
          console.log("email sent", info.response);
          res.sendStatus(201).send({ status: 201, message: "email was sent" });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {

  const { id } = req.params;
  const { email_verify_token } = req.headers;

  try {
    const validUser = await User.findOne({ _id: id, email_verify_token });

    const verifyToken = jwt.verify(email_verify_token, process.env.JWT_SECRET);

    if (verifyToken && verifyToken._id) {
      res.status(201).send({
        status: 201,
        success: true,
        message: "user verified",
        user: validUser,
      });
    } else {
      res
        .status(401)
        .send({ status: 401, success: false, message: "user not verified" });
    }
  } catch (error) {
    res.status(401).send({
      status: 401,
      success: false,
      message: "user not verified",
      error,
    });
  }
};

const updatePassword = async (req, res, next) => {
  validatorInputCheck(req)
  const { id } = req.params;
  const { user_password, email_verify_token } = req.body;

  try {
    const validUser = await User.findOne({
      _id: id,
      email_verify_token,
    });

    const verifyToken = await jwt.verify(
      email_verify_token,
      process.env.JWT_SECRET
    );

    if (validUser && verifyToken._id) {
      const newPassword = await bcrypt.hash(user_password, 10);

      const setNewUserPassword = await User.findByIdAndUpdate(
        { _id: id },
        { user_password: newPassword },
        { new: true }
      );

      res.status(201).send({
        status: 201,
        success: true,
        message: "User password changed",
        user: setNewUserPassword,
      });
    } else {
      res.status(401).send({
        status: 401,
        success: false,
        message: "User not verified",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: 401,
      success: false,
      message: "User not verified",
      error,
    });
  }
};

const sendSupportTicket = async (req, res, next) => {
  validatorInputCheck(req)

  const { user_email, user_name, message } = req.body;

  try {
    const emailOptions = {
      to: process.env.SITE_MAIL,
      subject: `New support request from user ${user_email}`,
      html: `<p>name: ${user_name}</p>
               <p>email: ${user_email}</p>
               <p>message: ${message}</p>`,
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        res.status(400).send({
          status: "400",
          success: false,
        });
      } else {
        res.sendStatus(201).send({ status: 201, message: "email was sent" });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendSupportTicket,
  sendResetLink,
  forgotPassword,
  updatePassword,
};
