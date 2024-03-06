// This file contains the code for registration.

// @desc Get information from frontend.
// @route GET /signup
// @access public
const registerUser = (req, res) => {
  const userData=req.body;
  console.log(userData)
  res.status(200).json( {message:"hello"});
  
};

module.exports = { registerUser };
