const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    maxlength: [40, "Name Should be under 40 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    validate: [validator.isEmail, "Please enter email in proper format"],
    unique: true,
  },
  email_token: {
    type: String,
    default: crypto.randomBytes(16).toString("hex"),
    unique: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  mobileNo: {
    type: Number,
    required: [true, "Please Provide Mobile Number"],
    unique: true,
  },
  mobileNo_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: [6, "Password should be atleast 6 character"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  LastLoginAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // return next();
});

//validate password with passed passwords
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  let re = await bcrypt.compare(userSendPassword, this.password);
  if (re) {
    this.LastLoginAt = Date.now();
    await this.save();
  }

  return re;
};

//create and return JWT token
userSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
