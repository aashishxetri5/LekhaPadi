const { use } = require("../routes");

const userLogin = (req, res) => {
  const { username, password } = req.body;

  res.status(200).json({ msg: "Okay" });
};

module.exports = { userLogin };
