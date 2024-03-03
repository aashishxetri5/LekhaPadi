const express = require("express");
const { registerUser } = require("../controllers/SignupController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.route("/signup").post(registerUser);

module.exports = router;
