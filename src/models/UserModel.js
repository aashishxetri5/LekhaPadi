const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  profileImage: { type: String, default: "/images/defaultUser.png" },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  verificationTimestamp: { type: Date, default: null },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
