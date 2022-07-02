const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");
const BankAccount = require("../models/bankAccount");

exports.addBankAccount = bigPromise(async (req, res, next) => {
  const {
    nickName,
    fullName,
    branchName,
    bankName,
    accountNumber,
    IFSC,
    mobileNo,
  } = req.body;

  if (
    !nickName ||
    !fullName ||
    !branchName ||
    !accountNumber ||
    !IFSC ||
    !mobileNo
  ) {
    return res.status(422).json({ error: "Please provide all fields" });
  }

  const bankAccount = await BankAccount.create({
    userId: req.user.id,
    nickName,
    fullName,
    branchName,
    bankName,
    accountNumber,
    IFSC,
    mobileNo,
  });
  res.status(200).json({ success: true, data: bankAccount });
});

exports.getBankAccount = bigPromise(async (req, res, next) => {
  var id = req.user.id;
  const bankAccount = await BankAccount.find({ userId: id });
  if(bankAccount){
    res.json(bankAccount);
  }
  else{
    return next(new customError("Invalid Token", 400));
  }
});
