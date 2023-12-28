const router = require("express").Router();
const {
  sendSupportTicket,
  sendResetLink,
  forgotPassword,
  updatePassword,
} = require("../controllers/emails.controller");
const {
  emailValid,
  nameValid,
  messageValid,
  passwordValid,
} = require("../middlewares/validation/validateEmailRoutes");

router.post("/send-password-reset-link", emailValid(), sendResetLink);
router.get("/forgot-password/:id", forgotPassword);
router.post("/update-password/:id", passwordValid(), updatePassword);

router.post(
  "/send-tech-support-ticket",
  emailValid(),
  nameValid(),
  messageValid(),
  sendSupportTicket
);

module.exports = router;
