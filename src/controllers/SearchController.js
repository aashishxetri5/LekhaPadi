const mongoose = require("mongoose");
const Blog = require("../models/Blog");

exports.fetchDisplayBlogs = async (req, res) => {
  const searchTerm = req.query.keyword;
  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    const blogs = await Blog.find({
      $or: [
        { title: new RegExp(searchTerm, "i") },
        { description: new RegExp(searchTerm, "i") },
        { content: new RegExp(searchTerm, "i") },
        { tags: new RegExp(searchTerm, "i") },
      ],
    })
      .select("title description coverImage author slug created_at")
      .lean();

    return blogs;
    
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.sendStatus(500);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};
