const mongoose = require("mongoose");
const Blog = require("../models/UserModel");
// const path = require("path");
// const fs = require("fs");

exports.fetchUserById = async (authorId) => {
  let dbConnection;
  try {
    dbConnection = await mongoose.connect(
      "mongodb://localhost:27017/lekhapadi"
    );

    const user = await Blog.findById(authorId)
      .select("fullname username profileImage")
      .lean();

      console.log()

    return user;
  } catch (err) {
    console.error(err);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log("Closing database connection");
      await mongoose.disconnect();
    }
  }
};
