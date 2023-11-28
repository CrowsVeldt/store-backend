const router = require("express").Router();
const {
  sendSupportTicket,
  sendResetLink,
  forgotPassword,
  updatePassword,
} = require("../controllers/emails.controller");

router.post("/send-password-reset-link", sendResetLink);
router.get("/forgot-password/:id", forgotPassword);
router.post("/update-password/:id", updatePassword);

router.post("/send-tech-support-ticket", sendSupportTicket);

module.exports = router;
