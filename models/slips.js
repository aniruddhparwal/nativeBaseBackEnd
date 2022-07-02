const mongoose = require("mongoose");

const slipsSchema = mongoose.Schema({
  slipUserId: {
    type: String,
    required: [true, "Id is required"],
  },
  slipStatus: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    required: [true, "Please Amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slipData: {
    type: Object,
    required: [true, "Please provide slip data"],
  },
  bankAccountId: {
    type: String,
    required: [true, "Please provide bank account id"],
  },
  slipDuration: {
    type: Number,
    default: 7,
  },
  slipExpiryDate: {
    type: Date
  },
});
slipsSchema.pre("save", async function (next) {
  this.slipExpiryDate = new Date(
    Date.now() + this.slipDuration * 24 * 60 * 60 * 1000
  );
  // return next();
});

module.exports = mongoose.model("Slips", slipsSchema);
