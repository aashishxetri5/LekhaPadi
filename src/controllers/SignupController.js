// This file contains the code for registration.

// @desc Get information from frontend.
// @route GET /signup
// @access public
const registerUser = (req, res) => {
  res.status(200).json({ salt: passwordSalt });
};

module.exports = { registerUser };
