const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {marked} = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.content) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.content));
  }

  next();
});

// Export the Blog model
module.exports = mongoose.model("Blog", blogSchema);
