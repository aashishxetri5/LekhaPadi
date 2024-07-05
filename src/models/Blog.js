const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blog Schema definition
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: {
    type: String,
    default: "images/defaultCover.png",
  },
  likes: {
    type: Number,
    default: 0,
  },
  // comments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Comment",
  //   },
  // ],
  // categoryID: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
  tags: [
    {
      type: String,
      default: ["uncategorized"],
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "draft",
  },
});

// Export the Blog model
module.exports = mongoose.model("Blog", blogSchema);
