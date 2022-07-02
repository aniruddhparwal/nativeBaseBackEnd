const mongoose = require("mongoose")

const bankAccount = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please Provide User Id"],
    },
    nickName: {
        type: String,
        required: [true, "Please Provide Nick Name"],
    },
    fullName: {
        type: String,
        required: [true, "Please Provide Full Name"],
    },
    branchName: {
        type: String,
        required: [true, "Please Provide Branch Name"],
    },
    bankName: { 
        type: String,
        required: [true, "Please Provide Bank Name"],
    },
    accountNumber: {
        type: String,
        required: [true, "Please Provide Account Number"],
    },
    IFSC: {
        type: String,
        required: [true, "Please Provide IFSC code"],
    },
    mobileNo: {
        type: String,
        required: [true, "Please Provide Mobile Number"],
    }
})

module.exports = mongoose.model("BankAccount", bankAccount)