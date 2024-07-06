const express = require("express");
const userSignup = require("../controllers/SignupController");
const userLogin = require("../controllers/LoginController");
const blogController = require("../controllers/BlogController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

router.get("/signup", authMiddleware, (req, res) => {
  res.redirect("/");
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

// router.get("/post", (req, res) => {
//   res.render("blogPost");
// });

router.get("/draft", authMiddleware, (req, res) => {
  res.render("draft");
});

router.post("/draft", authMiddleware, async (req, res) => {
  await blogController.newBlog(req, res);
});

module.exports = router;
