const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const path = require("path");
const fs = require("fs");

exports.newBlog = async (req, res) => {
  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    var filename = "",
      imagePath = "/images/blogImages";

    if (!req.files || !req.files.coverImage) {
      filename = "defaultCover.png";
    } else {
      const img = req.files.coverImage; // get the file from the request
      filenameParts = img.name.split("."); // get the file name

      const uploadDirectory = path.join(
        __dirname,
        "../public/images/blogImages"
      );
      filename =
        filenameParts[0] + "_" + Date.now() + "." + filenameParts.pop();

      fs.mkdirSync(uploadDirectory, { recursive: true }); // create the directory if it doesn't exist

      await img.mv(path.join(uploadDirectory, filename)); // save the file
    }

    const newBlog = new Blog({
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      content: req.body.content.trim(),
      author: req.session.user.id,
      coverImage: `${imagePath}/${filename}`, // save the uploaded file name
      tags: req.body.tags
        ? req.body.tags.split(",").map((tag) => tag.trim())
        : ["uncategorized"],
      status: "published",
    });

    await newBlog.save();

    return res.redirect("/");

    // Create a new blog post
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};

exports.fetchDisplayBlogs = async (req, res) => {
  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    const blogs = await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .select(
        "title sanitizedDescription coverImage tags createdAt slug author"
      )
      .lean();

    return blogs;
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};

exports.fetchBlogBySlug = async (req, res) => {
  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    const blog = await Blog.findOne({
      slug: req.params.slug.trim(),
      status: "published",
    })
      .select(
        "title sanitizedDescription sanitizedHtml author coverImage likes tags created_at"
      )
      .lean();

    return blog;
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};
