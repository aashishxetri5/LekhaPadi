const crypto = require("crypto");
const sqlite = require("sqlite3").verbose();

const db = new sqlite3.Database("../../blogging_platform.db");

class UserModel {
  static registerUser(formData) {
    const { cPwd, ...userData } = formData;

    // * @desc write function check whether or not the username already exists in the db.

    // * @desc generateSalt() function returns the salt for the password
    const passwordSalt = generateSalt();

    // * @desc write function to save to db
  }
}

// Generates a 16 character long salt.
function generateSalt(length = 16) {
  console.log(length);
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
