const express = require("express");
const { registerUser } = require("../controllers/SignupController");
const {userLogin}= require('../controllers/LoginController');

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.route("/signup").post(registerUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.route("/login").post(userLogin);

module.exports = router;
