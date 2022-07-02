const Slips = require("../models/slips");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");

exports.newSlip = bigPromise(async (req, res, next) => {
  const { amount, duration, userId } = req.body;
  console.log(req.body);
  if (!amount || !userId) {
    return next(new customError("Required data is not available", 400));
  }
  const slip = await Slips.create({
    amount,
    slipDuration: duration,
    slipUserId: req.user.id,
  });
  res.status(200).json({
    success: true,
    slip,
  });
});
