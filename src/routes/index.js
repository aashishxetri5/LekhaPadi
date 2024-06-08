const express = require("express");
const userSignup = require("../controllers/SignupController");
const userLogin = require("../controllers/LoginController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

router.get("/signup", (req, res) => {
  if (req.session.user === undefined) res.render("signup");
  else res.redirect("/");
});

router.post("/signup", async (req, res) => {
  await userSignup.signup(req, res);
});

router.get("/login", (req, res) => {
  if (req.session.user === undefined) res.render("login");
  else res.redirect("/");
});

router.post("/login", async (req, res) => {
  await userLogin.login(req, res);
});

router.get("/logout", userLogin.logout);

module.exports = router;
