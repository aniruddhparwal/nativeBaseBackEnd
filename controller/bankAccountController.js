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
  // bankAccount.save()
  // .then(bankAccount => {
  //     res.json({ message: "Bank Account Added" })
  // })
  // .catch(err => {
  //     console.log(err)
  // })
});

exports.getBankAccount = bigPromise(async (req, res, next) => {
  BankAccount.find({ userId: req.user.id }, function (err, result) {
    if (err) throw err;
    if (result) {
      res.json(result);
    } else {
      res.send(
        JSON.stringify({
          error: "Error",
        })
      );
    }
  });
});
