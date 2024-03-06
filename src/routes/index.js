const express = require("express");
const {userLogin}= require('../controllers/LoginController');
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.route("/login").post(userLogin);

module.exports = router;
