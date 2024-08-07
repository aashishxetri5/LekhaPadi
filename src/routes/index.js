const express = require("express");
const userSignup = require("../controllers/SignupController");
const userLogin = require("../controllers/LoginController");
const blogController = require("../controllers/BlogController");
const userController = require("../controllers/UserController");
const searchController = require("../controllers/SearchController");

const authMiddleware = require("../middlewares/authMiddleware");
const noCache = require("../middlewares/noCache");

const router = express.Router();

router.get("/", noCache, async (req, res) => {
  try {
    const user = req.session.user;

    const blogsPromise = blogController.fetchDisplayBlogs();
    const blogs = await blogsPromise;

    // console.log(authorDetails);

    res.render("index", { user, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.sendStatus(500);
  }
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

router.get("/post/:slug", async (req, res) => {
  try {
    const blogPromise = blogController.fetchBlogBySlug(req, res);
    const blog = await blogPromise;

    const userPromise = userController.fetchUserById(blog.author);
    const user = await userPromise;

    res.render("blogPost", { blog, user });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.sendStatus(500);
  }
});

router.get("/draft", noCache, authMiddleware, (req, res) => {
  res.render("draft");
});

router.post("/draft", authMiddleware, async (req, res) => {
  await blogController.newBlog(req, res);
});

router.get("/search", async (req, res) => {
  try {
    searchPromise = searchController.searchBlogForKeyword(req, res);
    searchResults = await searchPromise;

    res.render("searchResults", {
      keyword: req.query.keyword,
      title: `Search Results for "${req.query.keyword}"`,
      blogs: searchResults,
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
