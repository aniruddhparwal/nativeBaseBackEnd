const mongoose = require("mongoose");

const slipsSchema = mongoose.Schema({
  slipUserId: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  slipStatus: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    required: [true, "Please Provide Mobile Number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slipData: {
    type: Object,
  },
  bankAccountId: {
    type: String,
  },
  slipDuration: {
    type: Number,
    default: 7,
  },
  slipExpiryDate: {
    type: Date,
  },
});
slipsSchema.pre("save", async function (next) {
  this.slipExpiryDate = new Date(
    Date.now() + this.slipDuration * 24 * 60 * 60 * 1000
  );
  // return next();
});

module.exports = mongoose.model("Slips", slipsSchema);
