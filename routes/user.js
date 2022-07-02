const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  emailVerify,
} = require("../controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/emailverify/:token").get(emailVerify);

module.exports = router;
