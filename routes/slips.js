const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createSlip, getSlips } = require("../controller/slipsController");

router.route("/createSlip").post(auth, createSlip);
router.route("/getSlips").get(auth, getSlips);

module.exports = router;
