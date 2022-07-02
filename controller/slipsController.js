const Slips = require("../models/slips");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");
const BankAccount = require("../models/bankAccount");


exports.createSlip = bigPromise(async (req, res, next) => {
  const { slipStatus, slipExpiryDate,
          amount, duration, slipData, 
          bankAccountId} = req.body;
  console.log(req.body);
  if (!amount || !slipStatus || !slipData || !bankAccountId) {
    return next(new customError("Required data is not available", 400));
  }
  let extendDate = new Date() 
  extendDate.setDate(extendDate.getDate() + 7)

  const slip = await Slips.create({
    amount,
    slipDuration: duration,
    slipUserId: req.user.id,
    slipStatus,
    slipData,
    bankAccountId,
    slipExpiryDate: extendDate,
  });
  res.status(200).json({
    success: true,
    slip,
  });
});

exports.getSlips = bigPromise(async (req, res, next) => {
  var id = req.user.id;
  const slips = await Slips.find({ userId: id });
  if(slips){
    res.json(slips);
  }
  else{
    return next(new customError("Invalid Token", 400));
  }
});

exports.getSlipById = bigPromise(async (req, res, next) => {
  const id= req.params.id;
  const user = await Slips.findOne({ _id: id });
  if (user) {
    res.json(user);
  }
  else{
    return next(new customError("Invalid Token", 400));
  }
});


// For Banker Side
exports.updateSlipStatus = bigPromise(async (req, res, next) => {
  const { id, status } = req.body
  const user = await Slips.findOneAndUpdate({ _id: id },{
    slipStatus: status
  });
  if (user) {
    res.json("Slip Status Updated");
  }
  else{
    return next(new customError("Invalid Token", 400));
  }
});

//Get all details (Slips and Bank Account)
exports.getAllDetails = bigPromise(async (req, res, next) => {
  const id= req.params.id;
  const user = await Slips.findOne({ _id: id });
  if (user) {
    let bankResult =user.bankAccountId;
    const bankAccount = await BankAccount.findOne({ _id: bankResult });
    if (bankAccount) {
      let allData={...user, bankAccount};
      res.json(allData);
    }
    else{
      return next(new customError("Invalid Token 40000", 400));
    }
  }
});