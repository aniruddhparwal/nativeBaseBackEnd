const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { addBankAccount, getBankAccount} = require("../controller/bankAccountController");

router.route("/addBankAccount").post(auth, addBankAccount);
router.route("/getBankAccount/:userID").get(auth, getBankAccount);
module.exports = router;
