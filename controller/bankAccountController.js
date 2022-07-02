const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");
const BankAccount = require("../models/bankAccount");

exports.addBankAccount = bigPromise(async (req, res, next) => {
    const { userId, nickName, fullName,branchName, bankName, 
            accountNumber, IFSC, mobileNo } = req.body

    if (!userId || !nickName || !fullName || !branchName || !accountNumber || !IFSC || !mobileNo) {
        return res.status(422).json({ error: "Please provide all fields" })
    }

    const bankAccount = await BankAccount.create({
        userId,
        nickName,
        fullName,
        branchName,
        bankName,
        accountNumber,
        IFSC,
        mobileNo,
    });
    res.status(200).json({success: true, data: bankAccount})
    // bankAccount.save()
    // .then(bankAccount => {
    //     res.json({ message: "Bank Account Added" })
    // })
    // .catch(err => {
    //     console.log(err)
    // })
});

exports.getBankAccount = bigPromise(async (req, res, next) => {
    var query = req.params.userID;
    console.log(query, "get bank")
    // console.log(query, "")
    BankAccount.find({ "userId": query }, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error: 'Error'
            }))
        }
    })
})