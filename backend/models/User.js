const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Name is in use please enter a new name"],
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10); // bcrypt built in function to choose number of rounds - more rounds the safer but heavier aswell

  this.password = await bcrypt.hash(this.password, salt); // bcrypt built in function to hash

  next();
});

// // Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match bcrypt hashed password and the real password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// UserSchema.methods.getResetPasswordToken = function () {
//   //Generate and hash password token

//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //Hash token
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   //Set expire
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("User", UserSchema);
