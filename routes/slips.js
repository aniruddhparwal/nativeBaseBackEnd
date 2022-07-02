const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { newSlip } = require("../controller/slipsController");

router.route("/newSlip").post(auth, newSlip);

module.exports = router;
