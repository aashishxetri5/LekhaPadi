const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    // Find the user with the provided username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).redirect("/login");
    }

    // Hash the provided password using crypto
    const hash = crypto
      .createHash("sha256")
      .update(password + user.salt)
      .digest("hex");

    if (hash === user.password) {
      // Passwords match, generate session and redirect to dashboard
      req.session.user = {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      };

      return res.redirect("/");
    } else {
      return res.status(401).redirect("/login");
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

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render("serverError", { title: "Server Error" });
    }
    res.redirect("/");
  });
};
