const Slips = require("../models/slips");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");

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
  Slips.find({ userId: req.user.id }, function (err, result) {
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