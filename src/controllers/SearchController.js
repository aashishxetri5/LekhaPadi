const mongoose = require("mongoose");
const Blog = require("../models/Blog");

exports.searchBlogForKeyword = async (req, res) => {
  const searchTerm = req.query.keyword;
  let dbConnection;
  try {
    // Connect to the database
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    const blogs = await Blog.aggregate([
      {
        $match: {
          $or: [
            { title: new RegExp(searchTerm, "i") },
            { description: new RegExp(searchTerm, "i") },
            { content: new RegExp(searchTerm, "i") },
            { tags: new RegExp(searchTerm, "i") },
          ],
        },
      },
      {
        $lookup: {
          from: "users", // The name of the authors collection in MongoDB
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" }, // Deconstruct the array to include author details directly
      {
        $project: {
          title: 1,
          coverImage: 1,
          tags: 1,
          created_at: 1,
          slug: 1,
          "authorDetails.fullname": 1,
          "authorDetails.username": 1,
          "authorDetails.profileImage": 1,
        },
      },
    ]);

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.sendStatus(500);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};
