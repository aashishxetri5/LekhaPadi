// This file contains the code for registration.

const { UserModel } = require("../models/UserModel");

// @desc Get information from frontend.
// @route GET /signup
// @access public
const registerUser = (req, res) => {
  const userData=req.body;
  console.log(userData);
  UserModel(userData)
  .then(() => {
    console.log("User registered successfully");
  })
  .catch((error) => {
    console.error("Error registering user:", error);
  });
  res.status(200).json( {message:"hello"});
  
};

module.exports = { registerUser };
