const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createSlip, getSlips, getSlipById,updateSlipStatus,getAllDetails } = require("../controller/slipsController");

router.route("/createSlip").post(auth, createSlip);
router.route("/getSlips").get(auth, getSlips);
router.route("/getSlipById/:id").get(getSlipById);
router.route("/updateSlipStatus").put(auth, updateSlipStatus);
router.route("/getAllDetails/:id").get(getAllDetails);


module.exports = router;
