const express = require("express");
const router = express.Router();

const { sendEmail } = require("../Controllers/emailController");

router.route("/sendMail/:mail").get(sendEmail);
router.route("/sendMail/:mail/:reset").get(sendEmail);

module.exports = router;
