const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

exports.signup = async (req, res) => {
  const { fullname, email, username, password } = req.body;

  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    // Find the user with the provided username
    const user = await User.findOne({ username });

    if (user) {
      console.log("User already exists");
      return res.status(401).redirect("/signup");
    } else {
      // Hash the provided password using crypto
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");

      // Create a new AdminUser document
      const newUser = new User({
        fullname,
        email,
        salt,
        username,
        password: hash,
      });
      await newUser.save();

      // Set the session user

      // req.session.user = {
      //   username: user.username,
      // };

      //Generate a random OTP and then send it to the user's email
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log(`Generated OTP: ${otp}`);

      // Send the OTP to the user's email
      // await sendEmail(user.email, "OTP for Email Verification", otp);

      return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};

function sendOtpViaEmail(to, subject, text) {

  const otp = generateOTP();
  const otpExpires = Date.now() + 60000; // OTP expires in 1 minute

  const transporter = nodemailer.createTransport({
    service: "gmail",
    
  });
}
